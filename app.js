(function () {
  const cards = [...window.FLASHCARDS, ...(window.EXTRA_FLASHCARDS || [])];
  const storeKey = "tolokaInterviewFlashcards.v1";
  const bucketNames = ["hard", "medium", "easy"];
  const bucketLabels = {
    hard: "Hard",
    medium: "Medium",
    easy: "Easy",
    starred: "Starred"
  };

  const elements = {
    hardCount: document.getElementById("hardCount"),
    mediumCount: document.getElementById("mediumCount"),
    easyCount: document.getElementById("easyCount"),
    starredCount: document.getElementById("starredCount"),
    totalCardsValue: document.getElementById("totalCardsValue"),
    sessionLeftValue: document.getElementById("sessionLeftValue"),
    reviewedValue: document.getElementById("reviewedValue"),
    averageTimeValue: document.getElementById("averageTimeValue"),
    todayValue: document.getElementById("todayValue"),
    streakValue: document.getElementById("streakValue"),
    categoryLabel: document.getElementById("categoryLabel"),
    positionLabel: document.getElementById("positionLabel"),
    timerLabel: document.getElementById("timerLabel"),
    sessionLabel: document.getElementById("sessionLabel"),
    questionText: document.getElementById("questionText"),
    answerPanel: document.getElementById("answerPanel"),
    answerText: document.getElementById("answerText"),
    showAnswerButton: document.getElementById("showAnswerButton"),
    starButton: document.getElementById("starButton"),
    ratingGrid: document.getElementById("ratingGrid"),
    resetButton: document.getElementById("resetButton"),
    searchInput: document.getElementById("searchInput"),
    deckList: document.getElementById("deckList")
  };

  let appState = loadState();
  let selectedBucket = "medium";
  let sessionQueue = [];
  let sessionTotal = 0;
  let sessionSeen = 0;
  let currentCardId = null;
  let cardStartedAt = Date.now();
  let tickHandle = window.setInterval(updateTimer, 1000);

  function defaultCardState() {
    return {
      bucket: "medium",
      attempts: 0,
      moves: 0,
      totalSeconds: 0,
      lastReviewedAt: 0,
      starred: false
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storeKey));
      if (parsed && parsed.cards) {
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
      const source = state.cards && state.cards[card.id] ? state.cards[card.id] : {};
      next.cards[card.id] = {
        ...defaultCardState(),
        ...source,
        bucket: normalizeBucket(source),
        attempts: Number(source.attempts || 0),
        moves: Number(source.moves || source.attempts || 0),
        totalSeconds: Number(source.totalSeconds || 0),
        lastReviewedAt: Number(source.lastReviewedAt || 0),
        starred: Boolean(source.starred)
      };
    });

    return next;
  }

  function normalizeBucket(source) {
    if (bucketNames.includes(source.bucket)) {
      return source.bucket;
    }
    if (source.lapses > 0 && !source.repetitions) {
      return "hard";
    }
    if (source.repetitions >= 3) {
      return "easy";
    }
    return "medium";
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

  function cardsForBucket(bucket) {
    if (bucket === "starred") {
      return cards.filter((card) => appState.cards[card.id].starred);
    }
    return cards.filter((card) => appState.cards[card.id].bucket === bucket);
  }

  function shuffle(values) {
    const shuffled = values.slice();
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function startSession(bucket = selectedBucket, preferredId) {
    selectedBucket = bucket;
    const ids = shuffle(cardsForBucket(bucket).map((card) => card.id));
    if (preferredId && ids.includes(preferredId)) {
      ids.splice(ids.indexOf(preferredId), 1);
      ids.unshift(preferredId);
    }
    sessionQueue = ids;
    sessionTotal = ids.length;
    sessionSeen = 0;
    currentCardId = sessionQueue[0] || null;
    setActiveBucket(bucket);
    showCard();
  }

  function currentCard() {
    return cards.find((card) => card.id === currentCardId) || null;
  }

  function currentProgress(card) {
    return appState.cards[card.id];
  }

  function showCard() {
    const card = currentCard();
    cardStartedAt = now();
    elements.answerPanel.hidden = true;
    elements.ratingGrid.hidden = true;
    elements.showAnswerButton.hidden = false;

    if (!card) {
      elements.categoryLabel.textContent = bucketLabels[selectedBucket];
      elements.positionLabel.textContent = "0 / 0";
      elements.questionText.textContent = sessionTotal ? "Session complete" : `No ${bucketLabels[selectedBucket]} cards`;
      elements.answerText.textContent = "";
      elements.showAnswerButton.textContent = "Shuffle again";
      elements.starButton.hidden = true;
      elements.sessionLabel.textContent = "0 left";
      updateTimer();
      renderStats();
      renderDeck();
      return;
    }

    const progress = currentProgress(card);
    elements.categoryLabel.textContent = `${card.category} / ${bucketLabels[progress.bucket]}`;
    elements.positionLabel.textContent = `${sessionSeen + 1} / ${sessionTotal}`;
    elements.questionText.textContent = card.prompt;
    elements.answerText.textContent = card.answer;
    elements.showAnswerButton.textContent = "Show answer";
    elements.starButton.hidden = false;
    elements.starButton.textContent = progress.starred ? "Starred" : "Star";
    elements.starButton.classList.toggle("is-starred", progress.starred);
    updateTimer();
    renderStats();
    renderDeck();
  }

  function revealAnswer() {
    if (!currentCard()) {
      startSession(selectedBucket);
      return;
    }
    elements.answerPanel.hidden = false;
    elements.ratingGrid.hidden = false;
    elements.showAnswerButton.hidden = true;
  }

  function moveCurrentCard(targetBucket) {
    const card = currentCard();
    if (!card || !bucketNames.includes(targetBucket)) {
      return;
    }

    const progress = currentProgress(card);
    const elapsedSeconds = Math.max(1, Math.round((now() - cardStartedAt) / 1000));
    const fromBucket = progress.bucket;

    progress.bucket = targetBucket;
    progress.attempts += 1;
    progress.moves += 1;
    progress.totalSeconds += elapsedSeconds;
    progress.lastReviewedAt = now();

    appState.history.push({
      cardId: card.id,
      fromBucket,
      toBucket: targetBucket,
      sessionBucket: selectedBucket,
      reviewedAt: now(),
      seconds: elapsedSeconds
    });
    if (appState.history.length > 1000) {
      appState.history = appState.history.slice(-1000);
    }

    sessionQueue.shift();
    sessionSeen += 1;
    currentCardId = sessionQueue[0] || null;
    saveState();
    showCard();
  }

  function toggleStar() {
    const card = currentCard();
    if (!card) {
      return;
    }
    const progress = currentProgress(card);
    progress.starred = !progress.starred;
    saveState();
    elements.starButton.textContent = progress.starred ? "Starred" : "Star";
    elements.starButton.classList.toggle("is-starred", progress.starred);
    renderStats();
    renderDeck();
  }

  function renderStats() {
    const hard = cardsForBucket("hard").length;
    const medium = cardsForBucket("medium").length;
    const easy = cardsForBucket("easy").length;
    const starred = cardsForBucket("starred").length;
    const attempts = appState.history.length;
    const totalSeconds = cards.reduce((sum, card) => sum + appState.cards[card.id].totalSeconds, 0);
    const avgSeconds = attempts ? Math.round(totalSeconds / attempts) : 0;
    const today = todayKey();
    const todayMoves = appState.history.filter((item) => todayKey(item.reviewedAt) === today).length;

    elements.hardCount.textContent = hard;
    elements.mediumCount.textContent = medium;
    elements.easyCount.textContent = easy;
    elements.starredCount.textContent = starred;
    elements.totalCardsValue.textContent = cards.length;
    elements.sessionLeftValue.textContent = sessionQueue.length;
    elements.reviewedValue.textContent = attempts;
    elements.averageTimeValue.textContent = avgSeconds ? `${avgSeconds}s` : "0s";
    elements.todayValue.textContent = todayMoves;
    elements.streakValue.textContent = calculateStreak();
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
      const progress = currentProgress(card);
      const searchable = `${card.category} ${card.prompt} ${card.answer} ${bucketLabels[progress.bucket]}`.toLowerCase();
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
        <span></span>
      `;
      item.querySelector("strong").textContent = card.prompt;
      const spans = item.querySelectorAll("span");
      spans[0].textContent = card.category;
      spans[1].textContent = `Bucket: ${bucketLabels[progress.bucket]}`;
      spans[2].textContent = `Reviews: ${progress.attempts}`;
      spans[3].textContent = progress.starred ? "Starred" : "";
      item.addEventListener("click", () => {
        startSession(progress.bucket, card.id);
        setActiveView("review");
      });
      elements.deckList.appendChild(item);
    });
  }

  function updateTimer() {
    const card = currentCard();
    if (!card) {
      elements.timerLabel.textContent = "00:00";
      elements.sessionLabel.textContent = "0 left";
      return;
    }

    const elapsed = Math.max(0, Math.round((now() - cardStartedAt) / 1000));
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    elements.timerLabel.textContent = `${minutes}:${seconds}`;
    elements.sessionLabel.textContent =
      sessionQueue.length <= 1 ? "Last card" : `${sessionQueue.length - 1} left after this`;
  }

  function setActiveView(viewName) {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.toggle("is-active", view.id === `${viewName}View`);
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.view === viewName);
    });
  }

  function setActiveBucket(bucket) {
    document.querySelectorAll(".mode-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.bucket === bucket);
    });
  }

  elements.showAnswerButton.addEventListener("click", revealAnswer);
  elements.starButton.addEventListener("click", toggleStar);
  elements.ratingGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-bucket-target]");
    if (button) {
      moveCurrentCard(button.dataset.bucketTarget);
    }
  });
  elements.resetButton.addEventListener("click", () => {
    if (window.confirm("Reset all local practice statistics and buckets?")) {
      localStorage.removeItem(storeKey);
      appState = loadState();
      startSession("medium");
    }
  });
  elements.searchInput.addEventListener("input", renderDeck);
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setActiveView(tab.dataset.view));
  });
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => startSession(button.dataset.bucket));
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

  startSession("medium");
})();
