# IBCS Dashboard Compliance Checker

## Starting point / purpose
This project builds an application to **check whether a dashboard is IBCS-compliant** (International Business Communication Standards).  
Given a dashboard (e.g., screenshot, exported image/PDF, or other agreed input), the app should:

- **Detect violations** of selected IBCS rules
- **Explain what is not compliant** and **where** (rule + affected chart/element)
- Provide actionable guidance to make the dashboard compliant

This is developed in the context of an **IBCS workshop** where the client will act as the customer, provide limited training data, and monitor progress (questions, feedback, and guidance).

## IBCS constraints in scope (initial)
The dashboard we validate against should follow these workshop constraints:

- **Proper scaling**
  - Same units must be scaled the same across comparable visuals
  - Use **scaling indicators** when necessary (e.g., “k”, “M”, axis labels, or explicit notation)
- **Unified scenarios**
  - Use consistent scenario styles:
    - **outlined**
    - **hatched**
    - **solid**
- **Stick to one solid color**
  - Avoid multi-color encoding unless explicitly allowed by the client’s workshop rules

> Note: The exact rule checklist can be expanded/adjusted with the client as the workshop progresses.

## What is expected (workshop deliverables)
By the end of the workshop, we are expected to deliver:

- **Plan & strategy**
  - Approach for building the checker
  - Milestones, risks, and how feedback will be incorporated
  - Definition of “IBCS-compliant” for the implemented rule set
- **Technical solution**
  - Working application that evaluates a dashboard and outputs findings
  - Clear outputs: pass/fail per rule, and detailed “what exactly is not compliant”
- **Final presentation**
  - Research summary (what we tested/learned, limitations)
  - Live demo of the app on example dashboards

## Data situation & strategy (limited training data)
The client will provide limited training data. To improve robustness, we will pursue additional data sources/approaches:

- **Synthetic data generation**
  - Create compliant/non-compliant dashboard variants by controlled transformations:
    - scale changes, missing indicators, inconsistent units
    - scenario styling swaps (outlined/hatched/solid)
    - color palette violations (multiple hues, inconsistent saturation)
- **Public/permissioned examples**
  - Collect dashboards from public reports or internal examples **only if legally permitted**
  - If needed, build a curated dataset from screenshots with annotation guidelines
- **Rule-based baselines**
  - Implement deterministic checks where possible (e.g., color count/palette, line/area styles, axis label parsing)
  - Use ML only where heuristics are insufficient, keeping explainability as a priority

## Success criteria (definition of “done”)
- The app can ingest agreed dashboard inputs and produce a **clear compliance report**
- Each violation includes:
  - **Rule name**
  - **Description of the problem**
  - **Where it occurs** (chart/region/element reference)
  - **Recommended fix**
- Results are consistent and reproducible for the same input

## Project scope (current)
- This repository currently contains documentation only; implementation will be added during the workshop.

