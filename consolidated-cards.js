window.EXTRA_FLASHCARDS = [
  {
    id: "consolidated-q1-f2",
    category: "Consolidated follow-up",
    prompt: `Follow-up 2: How do you prevent scope creep when the client keeps adding agent capabilities?`,
    answer: `Answer: I convert every new request into a change against the charter: impact on data, evaluation, timeline, expert hours, QA burden, and margin. Then I offer options: keep timeline and reduce scope, expand scope with budget, or split into a phase two.`
  },
  {
    id: "consolidated-q2-f4",
    category: "Consolidated follow-up",
    prompt: `Follow-up 4: What cost metrics would you look at?`,
    answer: `Answer: Cost per accepted task, expert minutes per accepted task, rework percentage, first-pass yield, QA cost as a percentage of delivery cost, throughput per annotator, and margin burn versus plan.`
  },
  {
    id: "consolidated-q2-f5",
    category: "Consolidated follow-up",
    prompt: `Follow-up 5: What if the new annotators are simply not skilled enough?`,
    answer: `Answer: I would segment the task. The crowd handles simpler, well-structured labels after certification. Experts handle ambiguous, domain-heavy, or high-risk cases. If too much work requires experts, the project was under-scoped or under-priced and needs a commercial reset.`
  },
  {
    id: "consolidated-q2-f6",
    category: "Consolidated follow-up",
    prompt: `Follow-up 6: What if the task itself is too complex?`,
    answer: `Answer: I split it. For example, instead of asking one annotator to judge intent, retrieve policy, evaluate compliance, and write a correction, I separate intent classification, policy check, final resolution rating, and correction generation.`
  },
  {
    id: "consolidated-q3-f4",
    category: "Consolidated follow-up",
    prompt: `Follow-up 4: How do you avoid overfitting the benchmark?`,
    answer: `Answer: I use held-out edge cases, adversarial variants, paraphrased workflows, rotating gold sets, and independent human audits. I also test whether the agent generalizes across similar but not identical scenarios.`
  },
  {
    id: "consolidated-q3-f5",
    category: "Consolidated follow-up",
    prompt: `Follow-up 5: What is a good metric set for long-horizon agents?`,
    answer: `Answer: Final success rate, process compliance rate, tool-use accuracy, retrieval grounding, policy violation rate, unsafe action rate, escalation appropriateness, recovery from tool failure, and trajectory-level pass rate.`
  },
  {
    id: "consolidated-q4-f1",
    category: "Consolidated follow-up",
    prompt: `Follow-up 1: What metric tells you the task design is broken?`,
    answer: `Answer: High disagreement, high rework, inconsistent client feedback, slow task completion, and recurring annotator questions are strong signs that task design or instructions are broken.`
  },
  {
    id: "consolidated-q4-f2",
    category: "Consolidated follow-up",
    prompt: `Follow-up 2: What does "hands-on" mean in the first 48 hours?`,
    answer: `Answer: I personally inspect outputs, identify failure patterns, rewrite the critical parts of the task, run a small validation batch, reset the backlog, and communicate the recovery plan to the client.`
  },
  {
    id: "consolidated-q4-f3",
    category: "Consolidated follow-up",
    prompt: `Follow-up 3: What is the difference between managing a PM and stepping in as DPM?`,
    answer: `Answer: Managing a PM means asking for updates and guiding decisions. Acting as DPM means directly owning execution: backlog, cadence, task clarity, quality gates, blockers, and client-facing delivery commitments.`
  },
  {
    id: "consolidated-q4-f4",
    category: "Consolidated follow-up",
    prompt: `Follow-up 4: How do you know the project is recovering?`,
    answer: `Answer: First-pass acceptance improves, rework drops, cycle time stabilizes, client rejects fewer samples, blockers close faster, and cost per accepted item starts moving back toward plan.`
  },
  {
    id: "consolidated-q5-f2",
    category: "Consolidated follow-up",
    prompt: `Follow-up 2: What is a mock expert in simple terms?`,
    answer: `Answer: A trained evaluator who is not a full domain expert but can reliably apply a domain-specific rubric to common cases and escalate unclear cases to true experts.`
  },
  {
    id: "consolidated-q5-f3",
    category: "Consolidated follow-up",
    prompt: `Follow-up 3: How do you certify mock experts?`,
    answer: `Answer: Give them a training set, a gold evaluation test, edge-case examples, and require minimum accuracy before production. Then monitor drift through gold tasks and expert audits.`
  },
  {
    id: "consolidated-q5-f4",
    category: "Consolidated follow-up",
    prompt: `Follow-up 4: What is specification gaming?`,
    answer: `Answer: The agent learns to satisfy the written evaluation criteria without achieving the underlying business outcome. For example, it includes a citation because the rubric rewards citations, but the citation does not support the answer.`
  },
  {
    id: "consolidated-q5-f5",
    category: "Consolidated follow-up",
    prompt: `Follow-up 5: What is reward hacking in an enterprise agent?`,
    answer: `Answer: The agent finds a shortcut to maximize the score. For example, it escalates every difficult case because escalation is safer than solving, so it avoids errors but fails the productivity goal.`
  },
  {
    id: "consolidated-q6",
    category: "Role-specific deep dive",
    prompt: `QUESTION 6: You led a massive modernization across thousands of applications at Maersk, including designing recovery sequences for critical incidents. I have shipped over 60 virtual worlds for agent testing, including full ERP stacks and browser-based workflows. How would you leverage your enterprise architecture experience to help our delivery teams ensure these synthetic environments are robust enough for deterministic replay and fault-tolerant data collection?`,
    answer: `Main answer
I would treat synthetic enterprise environments as production-like systems, not demos.

From enterprise architecture and modernization work, the key lesson is that robustness comes from clear boundaries, versioning, observability, recovery design, and disciplined state management. For agent evaluation, this translates into several requirements.

First, deterministic replay. Every environment run should have:
- versioned environment configuration;
- fixed data snapshots;
- controlled randomness or seeds;
- immutable event logs;
- recorded tool calls;
- state diffs before and after each action;
- clear trajectory IDs.

Second, fault-tolerant data collection. The environment should handle partial failures without losing the trajectory. That means:
- checkpoints;
- idempotent tool calls;
- retries with clear failure labels;
- timeout handling;
- environment reset mechanisms;
- separation between agent failure and environment failure.

Third, operational observability. Delivery teams need dashboards for run completion rate, environment error rate, tool-call failure rate, replay success rate, data loss rate, and cost per collected trajectory.

Fourth, reusable architecture. The goal is not to build every synthetic company from scratch. We should have reusable templates for common enterprise systems: ERP, CRM, ticketing, document management, email, approvals, and role-based access.

The Maersk parallel is that modernization at scale forced us to think in terms of dependencies, critical paths, recovery sequences, and operational resilience. I would bring the same discipline here: define the environment as a stateful system with auditability, recovery, and repeatability built in from the start.`
  },
  {
    id: "consolidated-q6-f1",
    category: "Role-specific follow-up",
    prompt: `Follow-up 1: What does deterministic replay mean?`,
    answer: `Answer: The same agent trajectory can be replayed against the same environment version and data state to reproduce the same observable conditions, so evaluation and debugging are reliable.`
  },
  {
    id: "consolidated-q6-f2",
    category: "Role-specific follow-up",
    prompt: `Follow-up 2: Why is deterministic replay important for agent evaluation?`,
    answer: `Answer: Without replay, you cannot tell whether a failure came from the agent, the environment, data drift, or randomness. Replay makes failures debuggable and evidence-based.`
  },
  {
    id: "consolidated-q6-f3",
    category: "Role-specific follow-up",
    prompt: `Follow-up 3: What would you log in a virtual enterprise environment?`,
    answer: `Answer: User prompt, agent plan, tool calls, input/output payloads, permissions, retrieved documents, state changes, errors, timestamps, environment version, data snapshot version, and final outcome.`
  },
  {
    id: "consolidated-q6-f4",
    category: "Role-specific follow-up",
    prompt: `Follow-up 4: How do you protect margin in synthetic environment projects?`,
    answer: `Answer: Productize reusable environment components, avoid bespoke builds when templates work, use modular connectors, and scope the first delivery around the minimum environment complexity needed to produce valid evaluation signals.`
  },
  {
    id: "consolidated-q7",
    category: "Role-specific deep dive",
    prompt: `QUESTION 7: The Delivery Director role emphasizes managing gross margin targets and optimizing resource allocation across a portfolio of complex data projects. I noticed that as COO at Algorithmics Global, you fixed unit economics from negative double digits to +45% in five months. If one of our high-volume agent trajectory annotation projects was suddenly bleeding margin due to high expert reviewer costs, how would you systematically diagnose and turn around that P&L without sacrificing the rigorous quality required by frontier lab clients?`,
    answer: `Main answer
I would start with a unit-economics diagnostic, not an across-the-board cost cut.

The key question is: why are expert reviewer costs high? Possible drivers include low first-pass quality, unclear task design, too many cases routed to experts, overuse of full expert review instead of sampling, poor reviewer utilization, scope creep, or a mispriced complexity level.

I would break the P&L into unit metrics:
- revenue per accepted trajectory;
- total cost per accepted trajectory;
- expert minutes per accepted trajectory;
- first-pass yield;
- rework percentage;
- QA cost per trajectory;
- percentage of tasks escalated to experts;
- defect rate after expert review;
- margin by task type and complexity bucket.

Then I would act in sequence.

First, reduce rework by fixing task design, rubrics, examples, and calibration. Rework is usually the most expensive margin leak.

Second, change the review model. Experts should not review everything. They should design rubrics, certify mock experts, audit samples, handle escalations, and resolve ambiguous cases. Routine review can often be handled by trained mock experts or senior crowd workers under expert supervision.

Third, route by risk. High-risk or ambiguous trajectories get expert review. Low-risk, deterministic, or well-calibrated tasks get lighter QC and automated checks.

Fourth, add automation where it is reliable: schema validation, tool-call validity, PII checks, duplicate detection, missing evidence checks, and policy rule checks.

Fifth, if the project complexity is materially different from what was sold, I would prepare a commercial reset: either adjusted pricing, reduced scope, or a phased delivery.

The principle is not to remove quality. It is to move expensive expert judgment to the points where it creates the most value.`
  },
  {
    id: "consolidated-q7-f3",
    category: "Role-specific follow-up",
    prompt: `Follow-up 3: Would you ever reduce quality to save margin?`,
    answer: `Answer: No. I would reduce waste, not quality. If quality requirements are genuinely higher than priced, I would make the trade-off explicit and renegotiate scope or budget.`
  },
  {
    id: "consolidated-q7-f5",
    category: "Role-specific follow-up",
    prompt: `Follow-up 5: How do you know the P&L turnaround is working?`,
    answer: `Answer: Cost per accepted trajectory decreases, first-pass yield increases, expert minutes per accepted item decrease, rework drops, and external quality remains stable or improves.`
  },
  {
    id: "consolidated-q8",
    category: "Role-specific deep dive",
    prompt: `QUESTION 8: At Toloka, Delivery Directors must partner closely with Business Development to structure project proposals and convert prospects into successful deliveries. As CCO at Simplyture ApS, you owned the commercial and tech P&L while processing over a billion annual transactions. How do you handle the tension between a sales team wanting to promise highly complex, unproven agentic RL-gym setups to win a strategic deal, and the reality of what your delivery engineering team can actually execute?`,
    answer: `Main answer
I would not block ambition, but I would force it into a deliverable commercial structure.

The tension between sales and delivery is healthy if managed correctly. Business Development wants to win strategic deals; delivery must protect credibility, quality, and margin. My role is to translate the ambition into a phased proposal with clear assumptions, risk controls, and decision gates.

I would do four things.

First, run a delivery feasibility review before the proposal is finalized. We classify components as green, amber, or red:
- green: proven capabilities;
- amber: extensions of proven capabilities;
- red: unproven or requiring discovery.

Second, separate paid discovery from committed delivery. If the client wants a complex RL-gym or synthetic enterprise environment that has not been built before, I would propose a short scoping or prototype phase with explicit success criteria before committing to full-scale production.

Third, use milestone-based contracting. The proposal should define what is delivered at each stage: environment prototype, initial benchmark, calibration batch, scaled trajectory collection, final dataset, evaluation report.

Fourth, price risk explicitly. Unproven complexity requires contingency, change-control language, and client responsibilities around access, data, and domain experts.

The message to sales is: we can sell the strategic vision, but we should contract the first executable step. That makes us more credible, not less ambitious.`
  },
  {
    id: "consolidated-q8-f1",
    category: "Role-specific follow-up",
    prompt: `Follow-up 1: How do you say no to Sales without damaging the deal?`,
    answer: `Answer: I do not say "no." I say, "We can position the vision, but we should contract it in phases so the first commitment is deliverable and the expansion path is clear."`
  },
  {
    id: "consolidated-q8-f2",
    category: "Role-specific follow-up",
    prompt: `Follow-up 2: What should be in the proposal to protect delivery?`,
    answer: `Answer: Scope boundaries, assumptions, acceptance criteria, data/access dependencies, client responsibilities, QA model, change control, milestone gates, and pricing tied to complexity.`
  },
  {
    id: "consolidated-q8-f3",
    category: "Role-specific follow-up",
    prompt: `Follow-up 3: What if the client insists on a fixed timeline for an unproven setup?`,
    answer: `Answer: I would offer a reduced first milestone that can be delivered with confidence, then define expansion gates. I would avoid committing to full-scale delivery without validating feasibility.`
  },
  {
    id: "consolidated-q8-f4",
    category: "Role-specific follow-up",
    prompt: `Follow-up 4: What is the commercial risk of overpromising?`,
    answer: `Answer: It creates rework, client dissatisfaction, margin erosion, and reputational damage. In complex AI delivery, trust is built by delivering what was promised, not by promising the largest possible vision upfront.`
  },
  {
    id: "consolidated-q9",
    category: "Role-specific deep dive",
    prompt: `QUESTION 9: During your time at BCG, you led the implementation of a digital twin for a metals and mining company that delivered major impact. We frequently build synthetic companies - multi-user virtual organizations with realistic communications, document exchanges, and business processes - to create stateful context for agent evaluation. How does your experience modeling complex industrial digital twins translate to scoping and designing these virtual corporate environments?`,
    answer: `Main answer
The translation is very direct at the systems-design level.

A digital twin and a synthetic company are both attempts to model a complex real-world system in a way that is useful for decisions. The hard part is not modeling everything. The hard part is choosing the right level of abstraction.

In the mining digital twin work, the temptation was to model the entire value chain in excessive detail. The useful approach was to identify the parts of the process where the model could support decisions and create measurable value.

I would apply the same principle to synthetic companies.

First, define the evaluation objective. Are we testing email handling, ERP workflows, procurement approvals, customer support, finance reconciliation, or cross-functional decision-making?

Second, model the actors and systems only to the level needed for that objective: roles, permissions, documents, tools, approval chains, state transitions, and failure modes.

Third, define the stateful context: prior conversations, document history, open tasks, conflicting instructions, system records, and business constraints.

Fourth, design agent tasks that exercise the relevant capabilities: retrieval, planning, tool use, escalation, compliance, collaboration, and recovery from errors.

Fifth, instrument the environment so every action can be evaluated and replayed.

The key lesson from digital twins is that fidelity should be purposeful. A synthetic company is not valuable because it imitates every detail of a corporation. It is valuable if it creates realistic pressure on the agent capabilities we need to evaluate.`
  },
  {
    id: "consolidated-q9-f1",
    category: "Role-specific follow-up",
    prompt: `Follow-up 1: What is an example of purposeful fidelity?`,
    answer: `Answer: If we evaluate procurement agents, we need realistic approval thresholds, vendor records, email threads, ERP state, and policy documents. We do not need a fully modeled HR system unless it affects procurement decisions.`
  },
  {
    id: "consolidated-q9-f2",
    category: "Role-specific follow-up",
    prompt: `Follow-up 2: What is the biggest scoping mistake in synthetic environments?`,
    answer: `Answer: Trying to model everything. That creates cost and complexity without improving evaluation quality.`
  },
  {
    id: "consolidated-q9-f3",
    category: "Role-specific follow-up",
    prompt: `Follow-up 3: How do you validate that a synthetic company is realistic enough?`,
    answer: `Answer: Use SME review, compare with real workflows, test whether realistic failure modes occur, and confirm that the environment produces useful evaluation signals for the target agent capability.`
  },
  {
    id: "consolidated-q9-f4",
    category: "Role-specific follow-up",
    prompt: `Follow-up 4: How does this relate to delivery margin?`,
    answer: `Answer: Correct abstraction protects margin. Overbuilding environments creates cost without proportional evaluation value.`
  },
  {
    id: "consolidated-q10",
    category: "Role-specific deep dive",
    prompt: `QUESTION 10: Your stealth startup is building an agentic operating system utilizing a self-composing DAG to orchestrate stakeholders and specialist AI agents. Toloka recently released Tendem MCP, a tool that allows agents to delegate complex judgment calls or verify hallucinated statistics with human experts mid-trajectory, without blocking the agent's other work. From a delivery and architectural standpoint, what specific challenges do you foresee when integrating asynchronous human-in-the-loop workflows into highly autonomous, enterprise-grade multi-agent architectures?`,
    answer: `Main answer
The main challenge is that asynchronous human-in-the-loop workflows introduce latency, uncertainty, and state-management complexity into systems that are already hard to reason about.

Architecturally, I would focus on seven challenges.

First, context packaging. The human expert must receive enough context to make a judgment, but not so much that the task becomes slow, expensive, or exposes unnecessary sensitive data.

Second, non-blocking orchestration. If a human judgment takes time, the agent system needs to continue other safe work, pause dependent actions, and resume correctly when the judgment returns.

Third, state consistency. The world may change while the human is reviewing. The system must know whether the human answer still applies to the current state.

Fourth, provenance and auditability. Every human intervention must be logged: who judged, what context they saw, what decision they made, and how it changed the trajectory.

Fifth, routing and cost control. Not every uncertainty should go to a senior expert. The system needs thresholds for when to use automation, mock experts, senior experts, or escalation.

Sixth, SLA and fallback design. If the human answer is late or unavailable, the agent needs safe fallback behavior.

Seventh, evaluation drift. Human experts may disagree or change standards over time, so calibration and gold examples are still required.

From a delivery standpoint, I would start with a limited set of high-value intervention points: hallucinated statistics, policy exceptions, regulated claims, or high-impact customer actions. Then I would measure whether human intervention improves trajectory success enough to justify its latency and cost.`
  },
  {
    id: "consolidated-q10-f1",
    category: "Role-specific follow-up",
    prompt: `Follow-up 1: What is the biggest risk of asynchronous human review?`,
    answer: `Answer: The human answer returns after the system state has changed, causing the agent to apply a stale judgment. This requires state snapshots, validity checks, and timeout rules.`
  },
  {
    id: "consolidated-q10-f2",
    category: "Role-specific follow-up",
    prompt: `Follow-up 2: How do you decide when to call a human expert?`,
    answer: `Answer: Use risk and uncertainty thresholds: high-impact decisions, low model confidence, conflicting evidence, regulated domains, policy exceptions, or potential hallucinated facts.`
  },
  {
    id: "consolidated-q10-f3",
    category: "Role-specific follow-up",
    prompt: `Follow-up 3: How do you control cost?`,
    answer: `Answer: Route only high-risk or high-uncertainty cases to humans, use mock experts for structured judgments, cache repeated decisions where appropriate, and track cost per successful intervention.`
  },
  {
    id: "consolidated-q10-f4",
    category: "Role-specific follow-up",
    prompt: `Follow-up 4: What should be logged for auditability?`,
    answer: `Answer: Trigger reason, context packet, expert identity or role, decision, timestamp, state snapshot, agent action after the decision, and whether the decision changed the outcome.`
  },
  {
    id: "consolidated-q10-f5",
    category: "Role-specific follow-up",
    prompt: `Follow-up 5: How would you test this integration?`,
    answer: `Answer: Run controlled scenarios with and without human intervention, measure quality uplift, latency, cost, stale-decision rate, escalation accuracy, and final trajectory success.`
  },
  {
    id: "consolidated-q11",
    category: "Additional question",
    prompt: `QUESTION 11: You inherit a portfolio of AI delivery projects with mixed health: some are on track, some have quality problems, and some are margin-negative. What do you do in your first 30 days?`,
    answer: `Main answer
I would create a portfolio control tower.

In the first week, I would classify each project by delivery health, client risk, quality risk, and margin risk. I would use simple categories: green, amber, red.

Then I would build a common operating view:
- project scope;
- client commitments;
- current quality metrics;
- timeline status;
- gross margin versus plan;
- key blockers;
- escalation needs.

For red projects, I would run recovery sprints: task audit, client calibration, backlog reset, resource reallocation, and commercial review if the scope has changed.

For amber projects, I would add early warning metrics: rework, queue aging, expert cost, client feedback delay, and calibration drift.

For green projects, I would look for standardization opportunities: reusable rubrics, workflow templates, QA logic, and delivery practices that can be scaled across the portfolio.

The goal in 30 days is not to personally fix everything. It is to create visibility, stabilize the highest-risk work, and install a repeatable delivery operating system.`
  },
  {
    id: "consolidated-q11-f1",
    category: "Additional follow-up",
    prompt: `Follow-up 1: What is the most important first artifact?`,
    answer: `Answer: A portfolio health dashboard with quality, timeline, margin, client risk, and blockers by project.`
  },
  {
    id: "consolidated-q11-f2",
    category: "Additional follow-up",
    prompt: `Follow-up 2: How do you decide where to spend your time?`,
    answer: `Answer: I prioritize projects with high client value, high revenue impact, high margin leakage, or high reputational risk.`
  },
  {
    id: "consolidated-q12",
    category: "Additional question",
    prompt: `QUESTION 12: A frontier lab client rejects the first delivery batch and says the data is "too shallow" and not useful for model improvement. How do you recover?`,
    answer: `Main answer
I would treat "too shallow" as a signal that the task is not producing the right training or evaluation signal, not simply as a workforce quality issue.

First, I would ask the client to calibrate on concrete examples: which outputs are shallow, what deeper judgment would look like, and how the data will be used downstream.

Second, I would revise the task design to capture richer signal. For example, instead of a binary label, we might collect:
- failure type;
- evidence used;
- missing reasoning step;
- corrected answer;
- preference comparison;
- policy or tool-use error;
- confidence and rationale.

Third, I would run a controlled batch and review it with the client before scaling.

Fourth, I would check the resource mix. If the client needs deeper domain reasoning, we may need experts, mock experts, or a more structured rubric.

Finally, I would reassess margin. Richer signal costs more. If the required depth is materially different from the original scope, I would propose a revised scope or phased delivery.`
  },
  {
    id: "consolidated-q12-f1",
    category: "Additional follow-up",
    prompt: `Follow-up 1: What does "deeper data" mean?`,
    answer: `Answer: Data that explains why the model failed and gives the model usable improvement signal, not just a surface-level label.`
  },
  {
    id: "consolidated-q12-f2",
    category: "Additional follow-up",
    prompt: `Follow-up 2: What should you avoid doing?`,
    answer: `Answer: Avoid adding more annotators or more QA before clarifying what the client means by useful signal.`
  },
  {
    id: "consolidated-q13",
    category: "Additional question",
    prompt: `QUESTION 13: How would you structure acceptance criteria for a project that uses experts, crowd workers, and automated checks across many languages and domains?`,
    answer: `Main answer
I would define layered acceptance criteria.

At the task level:
- gold accuracy threshold;
- inter-annotator agreement;
- required evidence fields;
- allowed labels;
- escalation rules.

At the workforce level:
- certification requirements;
- performance by cohort;
- language/domain eligibility;
- drift monitoring.

At the batch level:
- sample audit pass rate;
- defect severity distribution;
- rework threshold;
- client acceptance threshold.

At the project level:
- delivery volume;
- timeline;
- quality bar;
- cost per accepted item;
- business-relevant signal delivered.

For multilingual work, I would also track language-specific disagreement, cultural nuance issues, translation ambiguity, and whether local reviewers are needed for high-risk markets.`
  },
  {
    id: "consolidated-q13-f1",
    category: "Additional follow-up",
    prompt: `Follow-up 1: Why not use one global quality metric?`,
    answer: `Answer: A single metric hides problems. Quality may be strong in one language or domain and weak in another. Delivery needs segmented visibility.`
  },
  {
    id: "consolidated-q13-f2",
    category: "Additional follow-up",
    prompt: `Follow-up 2: Who signs off on acceptance criteria?`,
    answer: `Answer: The client and delivery team should agree on them during calibration, using real examples rather than abstract definitions.`
  },
  {
    id: "consolidated-q14",
    category: "Additional question",
    prompt: `QUESTION 14: A client wants an agent benchmark for a complex workflow but cannot provide clean data, clear policies, or reliable access to internal tools. How do you proceed?`,
    answer: `Main answer
I would not start full-scale delivery immediately. I would propose a discovery and stabilization phase.

The deliverables would be:
- workflow map;
- available data inventory;
- access dependency list;
- policy/document quality assessment;
- synthetic or anonymized initial environment;
- initial benchmark design;
- feasibility and risk assessment.

If real tool access is blocked, we can start with logs, exports, mock interfaces, or synthetic replicas. But I would be explicit that benchmark validity depends on fidelity to the real workflow.

The important point is to avoid pretending that messy inputs will magically produce reliable evaluation. Poor input maturity needs to be converted into a scoped delivery plan with assumptions, risks, and client responsibilities.`
  },
  {
    id: "consolidated-q14-f1",
    category: "Additional follow-up",
    prompt: `Follow-up 1: What should be in the client responsibility list?`,
    answer: `Answer: Data access, tool access, policy documents, SME availability, security approvals, calibration participation, and timely acceptance decisions.`
  },
  {
    id: "consolidated-q14-f2",
    category: "Additional follow-up",
    prompt: `Follow-up 2: How do you protect the relationship?`,
    answer: `Answer: Position discovery as risk reduction, not delay. The message is: "This makes the larger delivery more reliable and prevents expensive rework."`
  },
  {
    id: "consolidated-q15-f1",
    category: "Additional follow-up",
    prompt: `Follow-up 1: What should you emphasize to a recruiter?`,
    answer: `Answer: Delivery leadership, client-facing execution, AI implementation experience, operating discipline, and comfort with ambiguity.`
  },
  {
    id: "consolidated-q15-f2",
    category: "Additional follow-up",
    prompt: `Follow-up 2: What should you avoid overemphasizing?`,
    answer: `Answer: Avoid sounding like you only want strategy or product. This role is execution-heavy, so emphasize ownership, delivery, and operational problem-solving.`
  },
  {
    id: "consolidated-compact-speed-quality",
    category: "Compact flashcard bank",
    prompt: `FLASHCARD: What is the best way to answer client pressure about speed versus quality?`,
    answer: `Answer:
"I define the minimum quality bar tied to business risk, then optimize speed within that boundary. If the timeline is compressed, I recommend reducing scope rather than lowering the quality bar."`
  },
  {
    id: "consolidated-compact-business-value",
    category: "Compact flashcard bank",
    prompt: `FLASHCARD: How do you prove business value in four weeks?`,
    answer: `Answer:
"Establish a baseline on representative scenarios, agree on the primary business KPI, show measurable improvement on the same benchmark, connect intermediate improvements to the KPI, and leave the client with a reusable evaluation pipeline."`
  }
];
