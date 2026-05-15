(function () {
  const cards = window.FLASHCARDS;
  const storeKey = "tolokaInterviewFlashcards.v1";
  const minute = 60 * 1000;
  const day = 24 * 60 * minute;
  const ratingLabels = {
    again: "Again",
    hard: "Hard",
    good: "Good",
    easy: "Easy"
  };

  const elements = {
    dueCount: document.getElementById("dueCount"),
    todayCount: document.getElementById("todayCount"),
    accuracyValue: document.getElementById("accuracyValue"),
    streakValue: document.getElementById("streakValue"),
    totalCardsValue: document.getElementById("totalCardsValue"),
    masteredValue: document.getElementById("masteredValue"),
    reviewedValue: document.getElementById("reviewedValue"),
    averageTimeValue: document.getElementById("averageTimeValue"),
    nextReviewValue: document.getElementById("nextReviewValue"),
    newCardsValue: document.getElementById("newCardsValue"),
    categoryLabel: document.getElementById("categoryLabel"),
    positionLabel: document.getElementById("positionLabel"),
    timerLabel: document.getElementById("timerLabel"),
    nextDueLabel: document.getElementById("nextDueLabel"),
    questionText: document.getElementById("questionText"),
    answerPanel: document.getElementById("answerPanel"),
    answerText: document.getElementById("answerText"),
    showAnswerButton: document.getElementById("showAnswerButton"),
    starButton: document.getElementById("starButton"),
    ratingGrid: document.getElementById("ratingGrid"),
    goodIntervalLabel: document.getElementById("goodIntervalLabel"),
    easyIntervalLabel: document.getElementById("easyIntervalLabel"),
    resetButton: document.getElementById("resetButton"),
    searchInput: document.getElementById("searchInput"),
    deckList: document.getElementById("deckList")
  };

  let appState = loadState();
  let currentMode = "due";
  let currentIndex = 0;
  let currentCardId = cards[0].id;
  let answerVisible = false;
  let cardStartedAt = Date.now();
  let tickHandle = window.setInterval(updateTimer, 1000);

  function defaultCardState() {
    return {
      dueAt: 0,
      interval: 0,
      ease: 2.4,
      attempts: 0,
      remembered: 0,
      repetitions: 0,
      lapses: 0,
      totalSeconds: 0,
      lastReviewedAt: 0,
      starred: false
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storeKey));
      if (parsed && parsed.cards && parsed.history) {
        return normalizeState(parsed);
      }
    } catch (error) {
      console.warn("Could not load flashcard state", error);
    }
    return normalizeState({ cards: {}, history: [] });
  }

  function normalizeState(state) {
    const next = {
      cards: {},
      history: Array.isArray(state.history) ? state.history : []
    };
    cards.forEach((card) => {
      next.cards[card.id] = {
        ...defaultCardState(),
        ...(state.cards && state.cards[card.id] ? state.cards[card.id] : {})
      };
    });
    return next;
  }

  function saveState() {
    localStorage.setItem(storeKey, JSON.stringify(appState));
  }

  function now() {
    return Date.now();
  }

  function todayKey(timestamp = now()) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${dayOfMonth}`;
  }

  function getDueCards() {
    const timestamp = now();
    return cards.filter((card) => appState.cards[card.id].dueAt <= timestamp);
  }

  function getVisibleCards() {
    if (currentMode === "all") {
      return cards;
    }
    if (currentMode === "starred") {
      return cards.filter((card) => appState.cards[card.id].starred);
    }
    return getDueCards();
  }

  function selectNextCard(preferredId) {
    const visible = getVisibleCards();
    if (!visible.length) {
      currentCardId = cards
        .slice()
        .sort((left, right) => appState.cards[left.id].dueAt - appState.cards[right.id].dueAt)[0].id;
      currentIndex = 0;
      return;
    }
    const preferredIndex = visible.findIndex((card) => card.id === preferredId);
    currentIndex = preferredIndex >= 0 ? preferredIndex : Math.min(currentIndex, visible.length - 1);
    currentCardId = visible[currentIndex].id;
  }

  function currentCard() {
    return cards.find((card) => card.id === currentCardId) || cards[0];
  }

  function currentProgress(card) {
    return appState.cards[card.id];
  }

  function showCard() {
    const visible = getVisibleCards();
    const card = currentCard();
    const progress = currentProgress(card);
    answerVisible = false;
    cardStartedAt = now();

    elements.categoryLabel.textContent = card.category;
    elements.positionLabel.textContent = visible.length
      ? `${currentIndex + 1} / ${visible.length}`
      : `Next due`;
    elements.questionText.textContent = card.prompt;
    elements.answerText.textContent = card.answer;
    elements.answerPanel.hidden = true;
    elements.ratingGrid.hidden = true;
    elements.showAnswerButton.hidden = false;
    elements.starButton.textContent = progress.starred ? "Starred" : "Star";
    elements.starButton.classList.toggle("is-starred", progress.starred);
    elements.nextDueLabel.textContent = formatDue(progress.dueAt);
    elements.goodIntervalLabel.textContent = formatInterval(nextInterval("good", progress));
    elements.easyIntervalLabel.textContent = formatInterval(nextInterval("easy", progress));
    updateTimer();
    renderStats();
    renderDeck();
  }

  function revealAnswer() {
    answerVisible = true;
    elements.answerPanel.hidden = false;
    elements.ratingGrid.hidden = false;
    elements.showAnswerButton.hidden = true;
  }

  function rateCard(rating) {
    const card = currentCard();
    const progress = currentProgress(card);
    const elapsedSeconds = Math.max(1, Math.round((now() - cardStartedAt) / 1000));
    const remembered = rating === "good" || rating === "easy";
    const interval = nextInterval(rating, progress);

    progress.attempts += 1;
    progress.remembered += remembered ? 1 : 0;
    progress.repetitions = remembered ? progress.repetitions + 1 : 0;
    progress.lapses += rating === "again" ? 1 : 0;
    progress.interval = interval;
    progress.ease = nextEase(rating, progress.ease);
    progress.dueAt = now() + interval;
    progress.totalSeconds += elapsedSeconds;
    progress.lastReviewedAt = now();

    appState.history.push({
      cardId: card.id,
      rating,
      label: ratingLabels[rating],
      reviewedAt: now(),
      seconds: elapsedSeconds
    });
    if (appState.history.length > 1000) {
      appState.history = appState.history.slice(-1000);
    }

    saveState();
    advanceAfterRating(card.id);
  }

  function advanceAfterRating(reviewedId) {
    const visible = getVisibleCards().filter((card) => card.id !== reviewedId);
    if (visible.length) {
      currentIndex = currentIndex % visible.length;
      currentCardId = visible[currentIndex].id;
    } else {
      selectNextCard();
    }
    showCard();
  }

  function nextEase(rating, ease) {
    if (rating === "again") {
      return Math.max(1.3, ease - 0.25);
    }
    if (rating === "hard") {
      return Math.max(1.3, ease - 0.1);
    }
    if (rating === "easy") {
      return Math.min(3.2, ease + 0.15);
    }
    return ease;
  }

  function nextInterval(rating, progress) {
    if (rating === "again") {
      return minute;
    }
    if (rating === "hard") {
      return progress.interval ? Math.max(10 * minute, Math.round(progress.interval * 1.2)) : 10 * minute;
    }
    if (rating === "good") {
      return progress.interval ? Math.round(progress.interval * progress.ease) : day;
    }
    if (rating === "easy") {
      return progress.interval ? Math.round(progress.interval * (progress.ease + 0.7)) : 3 * day;
    }
    return day;
  }

  function renderStats() {
    const timestamp = now();
    const due = getDueCards().length;
    const today = todayKey(timestamp);
    const todayReviews = appState.history.filter((item) => todayKey(item.reviewedAt) === today);
    const attempts = appState.history.length;
    const remembered = appState.history.filter((item) => item.rating === "good" || item.rating === "easy").length;
    const accuracy = attempts ? Math.round((remembered / attempts) * 100) : 0;
    const mastered = cards.filter((card) => appState.cards[card.id].repetitions >= 3).length;
    const reviewedCards = cards.filter((card) => appState.cards[card.id].attempts > 0).length;
    const totalSeconds = cards.reduce((sum, card) => sum + appState.cards[card.id].totalSeconds, 0);
    const avgSeconds = attempts ? Math.round(totalSeconds / attempts) : 0;
    const nextDue = cards
      .map((card) => appState.cards[card.id].dueAt)
      .sort((left, right) => left - right)[0];

    elements.dueCount.textContent = due;
    elements.todayCount.textContent = todayReviews.length;
    elements.accuracyValue.textContent = `${accuracy}%`;
    elements.streakValue.textContent = calculateStreak();
    elements.totalCardsValue.textContent = cards.length;
    elements.masteredValue.textContent = mastered;
    elements.reviewedValue.textContent = attempts;
    elements.averageTimeValue.textContent = avgSeconds ? `${avgSeconds}s` : "0s";
    elements.nextReviewValue.textContent = formatDue(nextDue);
    elements.newCardsValue.textContent = cards.length - reviewedCards;
  }

  function calculateStreak() {
    const reviewDays = new Set(appState.history.map((item) => todayKey(item.reviewedAt)));
    let streak = 0;
    const cursor = new Date();
    while (reviewDays.has(todayKey(cursor.getTime()))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function renderDeck() {
    const query = elements.searchInput.value.trim().toLowerCase();
    const filtered = cards.filter((card) => {
      const searchable = `${card.category} ${card.prompt} ${card.answer}`.toLowerCase();
      return searchable.includes(query);
    });

    elements.deckList.innerHTML = "";
    filtered.forEach((card) => {
      const progress = currentProgress(card);
      const item = document.createElement("article");
      item.className = "deck-item";
      item.innerHTML = `
        <strong></strong>
        <span></span>
        <span></span>
        <span></span>
      `;
      item.querySelector("strong").textContent = card.prompt;
      const spans = item.querySelectorAll("span");
      spans[0].textContent = card.category;
      spans[1].textContent = `Due: ${formatDue(progress.dueAt)}`;
      spans[2].textContent = `Reviews: ${progress.attempts}`;
      item.addEventListener("click", () => {
        currentMode = "all";
        setActiveMode("all");
        selectNextCard(card.id);
        setActiveView("review");
        showCard();
      });
      elements.deckList.appendChild(item);
    });
  }

  function formatDue(dueAt) {
    const remaining = dueAt - now();
    if (remaining <= 0) {
      return "Now";
    }
    return `in ${formatInterval(remaining)}`;
  }

  function formatInterval(ms) {
    if (ms < 90 * 1000) {
      return "1m";
    }
    if (ms < 60 * minute) {
      return `${Math.round(ms / minute)}m`;
    }
    if (ms < 36 * 60 * minute) {
      return `${Math.round(ms / (60 * minute))}h`;
    }
    return `${Math.round(ms / day)}d`;
  }

  function updateTimer() {
    const elapsed = Math.max(0, Math.round((now() - cardStartedAt) / 1000));
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    elements.timerLabel.textContent = `${minutes}:${seconds}`;
    elements.nextDueLabel.textContent = formatDue(currentProgress(currentCard()).dueAt);
  }

  function setActiveView(viewName) {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.toggle("is-active", view.id === `${viewName}View`);
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.view === viewName);
    });
  }

  function setActiveMode(mode) {
    currentMode = mode;
    document.querySelectorAll(".mode-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === mode);
    });
  }

  elements.showAnswerButton.addEventListener("click", revealAnswer);
  elements.starButton.addEventListener("click", () => {
    const progress = currentProgress(currentCard());
    progress.starred = !progress.starred;
    saveState();
    showCard();
  });
  elements.ratingGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rating]");
    if (button) {
      rateCard(button.dataset.rating);
    }
  });
  elements.resetButton.addEventListener("click", () => {
    if (window.confirm("Reset all local practice statistics?")) {
      localStorage.removeItem(storeKey);
      appState = loadState();
      currentIndex = 0;
      currentCardId = cards[0].id;
      showCard();
    }
  });
  elements.searchInput.addEventListener("input", renderDeck);
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setActiveView(tab.dataset.view));
  });
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveMode(button.dataset.mode);
      currentIndex = 0;
      selectNextCard();
      showCard();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(tickHandle);
    } else {
      cardStartedAt = now();
      tickHandle = window.setInterval(updateTimer, 1000);
      updateTimer();
    }
  });

  selectNextCard(cards[0].id);
  showCard();
})();
