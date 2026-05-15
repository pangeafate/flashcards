window.FLASHCARDS = [
  {
    id: "master-positioning",
    category: "Master positioning",
    prompt: `Use this when asked: "Tell me about yourself" or "Why this role?"`,
    answer: `I bring a combination of consulting rigor, large-scale technology transformation, and hands-on AI delivery. At BCG, I worked on complex, data-heavy technology projects, including digital twin and financial data programs. At Maersk, I helped lead a large technology transformation and later modernization work across very uneven technology maturity levels, from legacy systems to cloud-native environments. More recently, I have worked directly with AI implementation, data pipelines, RAG, and agentic workflows through my consultancy and startup work. What attracts me to Toloka is that the role sits exactly at the intersection of technical complexity, messy real-world data, client delivery, and commercial discipline. I am strongest in situations where the problem is ambiguous, the system is underdefined, and someone needs to turn it into a scoped, measurable, margin-aware delivery program.`
  },
  {
    id: "main-1",
    category: "Main Question 1",
    prompt: `At Toloka, we often operate in the messy gap between what a research lab builds and what an enterprise customer actually needs. Given your BCG background and your recent work leading Evolone AI, how do you approach translating ambiguous enterprise needs into concrete, scoped agentic AI data projects? Can you walk me through a time you had to balance a complex technical architecture with strict P&L and gross margin targets?`,
    answer: `My approach is to separate the stated request from the real operational bottleneck. In enterprise AI work, customers often ask for something broad, like "we need an AI agent," but the actual issue is usually more concrete: inconsistent data, unclear process ownership, missing evaluation criteria, or an undefined handoff between deterministic systems and AI reasoning.

I usually structure the project in three layers. First, I define the business outcome and acceptance criteria: what needs to improve, by how much, and what counts as usable output. Second, I decompose the workflow into stages such as ingestion, classification, retrieval, tool use, reasoning, action execution, and escalation. Third, I translate that into a scoped delivery plan with specific artifacts: datasets, evaluation rubrics, calibration batches, QC process, and delivery gates.

A recent example was a fintech implementation where multiple partners - banks, insurers, and other data providers - were sending inconsistent data into a customer-facing platform. The client initially wanted to add AI broadly, but the real issue was that the underlying data pipeline was unstable and success criteria were unclear. I stepped in, separated deterministic pipeline fixes from the places where AI could add value, rebuilt the backlog, aligned stakeholders on what "good" looked like, and renegotiated scope and commercial terms where the project had materially changed.

The margin lesson is important: if scope, task design, and evaluation are unclear, rework explodes and margin disappears. So I protect margin by making scope explicit early, running small calibration batches before scale, using targeted QC instead of brute-force review, and treating scope changes as commercial events rather than hidden delivery cost.`
  },
  {
    id: "main-2",
    category: "Main Question 2",
    prompt: `I see from your stealth startup and Evolone experience that you build multi-agent communication architectures and LLM-as-judge evaluation frameworks. We are currently building complex virtual environments and MCP replicas of enterprise tools to capture agent trajectories and graded evaluation signals. How would you approach designing an evaluation pipeline to benchmark an agent's long-horizon performance in a highly structured corporate environment?`,
    answer: `I would design long-horizon evaluation as a layered system rather than a single success score. In structured enterprise environments, final success is too coarse. An agent can reach the correct final answer while using the wrong tool, violating policy, hallucinating intermediate reasoning, or relying on a path that would not be acceptable in production.

I would start by modeling the enterprise workflow as a set of stages: intent understanding, planning, tool selection, retrieval, action execution, policy compliance, escalation, and final task completion. For each stage, I would define what can be checked automatically and what requires human or expert judgment.

The environment should be replayable. If Toloka builds MCP replicas or virtual versions of enterprise tools, I would capture full trajectories: prompts, tool calls, tool outputs, intermediate decisions, final answer, and recovery behavior after errors. Then I would score the agent on task success, step-level correctness, tool validity, policy compliance, stability, and cost or latency where relevant.

I would also separate actor evaluation from judge evaluation. Automated and LLM-as-judge signals are useful, but I would calibrate them against expert review and keep blind holdout scenarios to reduce specification gaming. The goal is not only to say whether the agent passed, but to identify where it failed and what training or data signal is needed next.`
  },
  {
    id: "main-3",
    category: "Main Question 3",
    prompt: `This role requires you to be the "execution backbone," sometimes stepping in as a hands-on project manager to ensure delivery teams hit timeline and gross margin targets. Drawing on your experience scaling operations across 70 countries at Algorithmics Global or your modernization leadership at Maersk, how do you enforce rigorous quality control and operational stability when scaling a massive AI data pipeline?`,
    answer: `I treat quality control as a system, not as a final inspection step. When scaling a massive AI data pipeline, the biggest risks are unclear task design, inconsistent calibration, wrong workforce routing, delayed feedback loops, and uncontrolled rework.

My first principle is calibration before scale. I would run a small batch, align with the client on examples, build or validate a gold set, measure disagreement, and only then scale. If a task does not work at 50 examples, scaling it to 50,000 only scales the problem.

My second principle is operational visibility. I want daily metrics on throughput, acceptance rate, rework, inter-annotator agreement, cost per accepted task, client reject rate, quality by cohort, and gross margin burn. That allows me to detect whether the issue is task design, workforce quality, input data shift, or QC design.

My third principle is tiered execution. Complex or high-risk tasks go to stronger experts or senior reviewers; simpler tasks go to broader pools; automated checks handle deterministic failures. That protects both quality and margin.

When needed, I step in hands-on: rebuild the backlog, run the cadence, sample outputs myself, fix instructions, align the client on acceptance criteria, and make the trade-offs explicit. The goal is to stabilize the system quickly, then hand it back to the delivery team once control is restored.`
  },
  {
    id: "main-4",
    category: "Main Question 4",
    prompt: `When evaluating complex agent trajectories, we use a hybrid QA approach that combines automated checks with senior human judgment to catch things like hallucinated statistics or culturally nuanced errors. In your experience deploying RAG systems and transaction validation agents, how have you integrated human feedback or "mock experts" to reduce drift and prevent specification gaming or reward hacking?`,
    answer: `I would use a hybrid QA model with three layers: deterministic checks, model-based evaluation, and senior human judgment. Each layer catches a different type of failure. Deterministic checks are good for schema validity, tool call validity, policy rules, and obvious data mismatches. Model-based checks are useful for scalable triage and semantic comparison. Human experts are needed for ambiguity, cultural nuance, business context, and cases where the model sounds plausible but is wrong.

In RAG and transaction validation work, I have seen that systems can drift when the evaluator is too close to the generation process. They may optimize for the visible rubric while missing the real-world objective. To prevent that, I use blind holdouts, adversarial examples, expert calibration, and periodic review of cases where automated scores and human judgment disagree.

Mock experts are useful when actual domain experts are scarce. I would use senior reviewers or trained operators to act as domain proxies for structured tasks, especially after they are calibrated on gold examples created with true experts. Their job is not only to reject bad outputs, but to classify failure modes and produce correction signals.

The output should be more than pass/fail. It should include failure taxonomy, corrected examples, judge calibration data, and edge cases for future regression testing. That is how feedback becomes a model improvement loop rather than a one-time QA layer.`
  },
  {
    id: "main-5",
    category: "Main Question 5",
    prompt: `The Delivery Director role explicitly requires a consulting toolkit, and we both know the rigorous demands of top-tier firms like McKinsey and BCG. How have you adapted your consulting toolkit to thrive in a rapid-iteration, 0->1 startup environment? Can you give an example of how you apply consulting-style change management and stakeholder alignment to unblock a stalled technical delivery?`,
    answer: `The biggest adaptation was moving from presentation-driven alignment to execution-driven alignment. The consulting toolkit is still useful: structured problem solving, stakeholder mapping, issue trees, KPI discipline, risk management, and change management. But in 0->1 AI delivery, these tools must run in much shorter loops.

In startups, I use consulting structure to create clarity quickly, then immediately translate it into execution: backlog, owners, decision gates, metrics, and daily cadence. The artifact is not the end product; it is a way to make delivery move.

A good example was a fintech AI implementation that had stalled. The client expected a broad AI system, but the engineers were blocked by unstable data, unclear access, and no real task ownership from the client side. I stepped in, reset scope, defined what AI would and would not do, secured dedicated client-side access owners, rebuilt the backlog, and established daily execution control.

We also realigned commercial expectations because the actual project had changed. That is where consulting and startup execution meet: clear stakeholder alignment, but with direct operational ownership and willingness to renegotiate scope when reality changes.`
  },
  {
    id: "sub-1",
    category: "Follow-up",
    prompt: `Sub-question 1: What is the first artifact you create when enterprise needs are ambiguous?  [Scoping]`,
    answer: `Short answer: I create a one-page delivery charter: business outcome, in-scope and out-of-scope workflows, data inputs, acceptance criteria, owners, risks, and delivery gates.
Example: For a support agent, the charter might say: evaluate refund, delivery, and account-access cases only; success is policy-compliant resolution with less than 5% critical errors on gold cases.`
  },
  {
    id: "sub-2",
    category: "Follow-up",
    prompt: `Sub-question 2: How do you decide what should be AI and what should be deterministic?  [Architecture]`,
    answer: `Short answer: I use AI where the task involves language, ambiguity, reasoning, retrieval, or summarization. I use deterministic systems for schema validation, exact calculations, hard policy rules, and compliance gates.
Example: In transaction validation, AI can explain anomalies or query data, but balance reconciliation and schema checks should be deterministic.`
  },
  {
    id: "sub-3",
    category: "Follow-up",
    prompt: `Sub-question 3: How exactly do you protect gross margin in an AI data project?  [Margin]`,
    answer: `Short answer: I reduce rework before adding capacity: calibrate early, fix task design, use tiered workforce routing, apply QC only where risk is high, and treat new requirements as change requests.
Example: Instead of double-reviewing every task, I would use senior reviewers only for ambiguous or high-impact cases and automate checks for schema or policy violations.`
  },
  {
    id: "sub-4",
    category: "Follow-up",
    prompt: `Sub-question 4: How would you evaluate policy compliance?  [Policy compliance]`,
    answer: `Short answer: I would translate policy into explicit checks: hard constraints for deterministic rules, rubric items for judgment-based cases, and expert review for ambiguous exceptions.
Example: Refund policy: within 30 days can be refunded; outside 30 days requires manager approval; agent must not promise compensation outside policy.`
  },
  {
    id: "sub-5",
    category: "Follow-up",
    prompt: `Sub-question 5: How do you evaluate long-horizon performance without only judging final success?  [Trajectory scoring]`,
    answer: `Short answer: I score both the final outcome and the trajectory: intent, plan, tool choice, retrieval, action, policy compliance, escalation, and recovery from errors.
Example: An agent may solve a support case but expose private data or skip mandatory approval. Final success alone would miss that.`
  },
  {
    id: "sub-6",
    category: "Follow-up",
    prompt: `Sub-question 6: What edge cases would you include in an enterprise agent benchmark?  [Benchmark design]`,
    answer: `Short answer: I would include missing information, conflicting records, stale documents, tool failures, duplicate entities, ambiguous user intent, policy conflicts, and locale or cultural nuance.
Example: A customer asks for a refund, CRM shows two orders, policy changed last week, and the delivery tool is temporarily unavailable.`
  },
  {
    id: "sub-7",
    category: "Follow-up",
    prompt: `Sub-question 7: What daily metrics would you track in a large AI data delivery program?  [Operating metrics]`,
    answer: `Short answer: Throughput, acceptance rate, rejection rate, inter-annotator agreement, rework %, cost per accepted task, cycle time, client reject rate, quality by cohort, open blockers, and gross margin burn.
Example: If rework jumps from 8% to 30% after scaling, I would inspect task ambiguity and new annotator cohort quality immediately.`
  },
  {
    id: "sub-8",
    category: "Follow-up",
    prompt: `Sub-question 8: Quality drops after scaling from 50 to 500 annotators. What do you do first?  [Scaling failure]`,
    answer: `Short answer: I pause further scale, compare output quality by cohort, check whether the input distribution changed, audit instruction clarity, and run a controlled retraining or filtering batch.
Example: If original experts had 90% agreement and the new crowd has 55%, I would restrict the task, retrain, add examples, and re-route complex cases.`
  },
  {
    id: "sub-9",
    category: "Follow-up",
    prompt: `Sub-question 9: What does hands-on DPM mean in practice?  [Hands-on DPM]`,
    answer: `Short answer: It means I personally take control of execution: backlog, task ownership, daily cadence, client updates, risk log, sample audits, and scope decisions until the project is stable.
Example: In a failing project, I would personally review 20-50 outputs, rewrite the rubric, run daily recovery standups, and send daily client progress updates.`
  },
  {
    id: "sub-10",
    category: "Follow-up",
    prompt: `Sub-question 10: How do you integrate mock experts into an AI evaluation workflow?  [Human feedback]`,
    answer: `Short answer: I use true experts to define gold examples and calibrate senior reviewers; then mock experts handle scaled review of difficult cases, disagreement resolution, and failure taxonomy.
Example: For legal-support tasks, lawyers may create the first 100 gold cases, while trained reviewers use the rubric for scaled evaluation and escalate uncertain cases.`
  },
  {
    id: "sub-11",
    category: "Follow-up",
    prompt: `Sub-question 11: How do you detect specification gaming or reward hacking?  [Reward hacking]`,
    answer: `Short answer: I look for divergence between benchmark scores and human judgment, suspiciously high judge scores with poor real-world outcomes, repeated shortcut behavior, and failures on blind/adversarial holdouts.
Example: An agent learns to always cite a policy section to appear grounded, but the cited section is irrelevant. Human review and source relevance checks catch that.`
  },
  {
    id: "sub-12",
    category: "Follow-up",
    prompt: `Sub-question 12: What edge cases have you seen in RAG or transaction validation systems?  [RAG edge cases]`,
    answer: `Short answer: Stale sources, conflicting records, missing API fields, Excel upload errors, duplicate transactions, hallucinated confidence, source mismatch, and unauthorized inferences from incomplete data.
Example: A platform shows a customer as paid because an Excel file was uploaded late, while the bank API shows the transaction as pending.`
  },
  {
    id: "sub-13",
    category: "Follow-up",
    prompt: `Sub-question 13: Which parts of the consulting toolkit still work in a startup AI delivery environment?  [Consulting toolkit]`,
    answer: `Short answer: Structured problem solving, stakeholder mapping, issue trees, KPI discipline, risk management, executive communication, and change management still work, but they must be much faster.
Example: Instead of a six-week diagnostic, I might run a two-day reset that produces a scope map, risk register, owner list, and delivery backlog.`
  },
  {
    id: "sub-14",
    category: "Follow-up",
    prompt: `Sub-question 14: What did you change from consulting when moving into startups and AI implementation?  [Startup adaptation]`,
    answer: `Short answer: I moved from deck-first alignment to evidence-first execution: prototypes, small batches, fast calibration, daily cadence, and direct ownership of backlog and blockers.
Example: For AI data quality, I would rather run 200 test cases and inspect failures than spend two weeks debating the perfect rubric abstractly.`
  },
  {
    id: "sub-15",
    category: "Follow-up",
    prompt: `Sub-question 15: How do you unblock a stalled technical delivery?  [Unblocking delivery]`,
    answer: `Short answer: I take control of the operating system: current-state audit, root-cause diagnosis, scope reset, backlog rebuild, owners, daily cadence, client decision log, and visible progress metrics.
Example: If engineers cannot move because data access is missing, I escalate for named client-side owners with SLA, not just another alignment meeting.`
  },
  {
    id: "compact-c1",
    category: "Compact flashcard bank",
    prompt: `Sub-question C1: What is the core delivery principle for ambiguous AI projects?`,
    answer: `Short answer: Separate the stated AI ambition from the actual operational bottleneck, then convert it into scoped workflows, acceptance criteria, data artifacts, and delivery gates.`
  },
  {
    id: "compact-c2",
    category: "Compact flashcard bank",
    prompt: `Sub-question C2: How do you protect margin in AI data delivery?`,
    answer: `Short answer: Prevent rework: calibrate early, fix task design, route work by complexity, use targeted QC, and commercialize scope changes.`
  },
  {
    id: "compact-c3",
    category: "Compact flashcard bank",
    prompt: `Sub-question C3: What does "calibration before scale" mean?`,
    answer: `Short answer: Run a small batch, align with the client on examples, validate gold data and rubric, measure disagreement, then scale only after quality is stable.`
  },
  {
    id: "compact-c4",
    category: "Compact flashcard bank",
    prompt: `Sub-question C4: Why is final success insufficient for long-horizon agent evaluation?`,
    answer: `Short answer: Because an agent can reach the final answer while using wrong tools, violating policy, leaking data, or hallucinating intermediate steps.`
  },
  {
    id: "compact-c5",
    category: "Compact flashcard bank",
    prompt: `Sub-question C5: What is a good trajectory evaluation structure?`,
    answer: `Short answer: Intent -> plan -> tool choice -> retrieval -> action execution -> policy compliance -> escalation -> final outcome -> recovery behavior.`
  },
  {
    id: "compact-c6",
    category: "Compact flashcard bank",
    prompt: `Sub-question C6: When should a task go to experts instead of crowd?`,
    answer: `Short answer: When it requires domain judgment, high-risk policy interpretation, subtle errors, cultural nuance, or ambiguous edge-case resolution.`
  },
  {
    id: "compact-c7",
    category: "Compact flashcard bank",
    prompt: `Sub-question C7: What is the main root cause of many AI data quality failures?`,
    answer: `Short answer: Unclear task design and misaligned acceptance criteria, not necessarily poor annotator effort.`
  },
  {
    id: "compact-c8",
    category: "Compact flashcard bank",
    prompt: `Sub-question C8: How do you respond to "just add more QC"?`,
    answer: `Short answer: QC may help, but first fix root cause. More review on a broken task increases cost without improving signal.`
  },
  {
    id: "compact-c9",
    category: "Compact flashcard bank",
    prompt: `Sub-question C9: What is hands-on DPM behavior?`,
    answer: `Short answer: Personally run backlog, cadence, blockers, sample audits, task redesign, client updates, and scope decisions until delivery stabilizes.`
  },
  {
    id: "compact-c10",
    category: "Compact flashcard bank",
    prompt: `Sub-question C10: How do mock experts help?`,
    answer: `Short answer: They scale expert judgment after calibration: review difficult cases, resolve disagreements, label failure modes, and produce correction examples.`
  },
  {
    id: "compact-c11",
    category: "Compact flashcard bank",
    prompt: `Sub-question C11: How do you prevent reward hacking?`,
    answer: `Short answer: Use blind holdouts, adversarial cases, separate actor and judge signals, compare automated scores with human judgment, and rotate evaluation cases.`
  },
  {
    id: "compact-c12",
    category: "Compact flashcard bank",
    prompt: `Sub-question C12: What is the best startup adaptation of consulting?`,
    answer: `Short answer: Keep structured problem solving but compress it into fast delivery loops: prototype, measure, align, decide, and execute.`
  },
  {
    id: "closing-pitch",
    category: "Closing pitch",
    prompt: `Closing pitch: why Toloka should hire you`,
    answer: `I bring the combination this role needs: consulting rigor, large-scale operational experience, and hands-on AI delivery. I have worked in environments where the problem is ambiguous, the stakeholders are senior, the systems are messy, and delivery still has to land. What I would bring to Toloka is the ability to translate complex AI and data problems into scoped, margin-aware execution programs; to work credibly with both commercial and technical stakeholders; and to step in hands-on when quality, timeline, or client trust is at risk. That combination is exactly what I understand this Program Director role to require.`
  }
];
