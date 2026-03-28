## Objective

Study how software architecture decisions involve tradeoffs between scalability, simplicity, delivery speed, consistency, and operational cost.

---

## No Design Is Free

Every architecture choice improves one area while making another area harder.

Examples:

- Microservices can improve team independence but add operational complexity.
- Event-driven systems improve decoupling but increase debugging difficulty.
- Strong consistency improves correctness but can reduce availability or latency.

---

## Common Tradeoff Areas

### Monolith vs Microservices

A modular monolith is often faster to build, easier to debug, and simpler to deploy early on.

Microservices may become useful when domains are large, teams are independent, or scaling requirements differ significantly across services.

### Sync vs Async Work

Synchronous flows are easier to reason about for users and developers, but they increase coupling and can lengthen response times.

Asynchronous processing improves resilience and user-perceived speed, but requires queues, retries, observability, and idempotent consumers.

### Consistency vs Availability

For some domains, slightly stale data is acceptable. For others, such as payroll or financial actions, correctness matters more than immediate availability.

---

## Decision Framework

When evaluating a design, ask:

- What problem are we solving today?
- What future growth is likely versus hypothetical?
- Which failure mode is acceptable?
- Which complexity will the team actually be able to operate?

Good engineering decisions fit both the business problem and the team’s operational maturity.

---

## Practical Rule

Prefer the simplest design that handles current reality, then evolve it when real constraints appear.

