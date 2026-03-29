## Objective

Study how to make business-critical systems traceable so teams can understand who changed what, when it changed, and why it happened.

---

## Why This Matters

In internal systems, correctness is not enough.

Teams also need traceability for:

- debugging
- compliance
- support investigations
- approval disputes
- operational trust

Without auditability, even correct systems become hard to operate.

---

## What To Record

Useful audit trails often include:

- actor
- action
- target entity
- before and after values when appropriate
- timestamp
- request or workflow context

The goal is not to log everything blindly, but to preserve meaningful business history.

---

## Audit Log vs Application Log

Application logs help engineers debug technical failures.

Audit logs explain business actions and state changes.

Both matter, but they solve different problems.

---

## Design Considerations

- Decide which actions are high-value enough to record
- Keep event naming clear and domain-specific
- Avoid storing sensitive data carelessly
- Make audit records easy to query during support work
- Tie logs to workflow transitions and approval actions when possible

---

## Project Relevance

This is especially relevant for permissions, approvals, candidate stage changes, payroll actions, and any HR feature where teams need a trustworthy change history.

---

## Practical Rule

If a user could later ask "Who changed this and why?", the feature probably needs audit-friendly business events.
