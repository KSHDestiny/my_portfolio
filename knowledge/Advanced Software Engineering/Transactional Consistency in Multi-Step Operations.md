## Objective

Study how to protect data consistency when one user action triggers multiple dependent backend steps.

---

## Why This Matters

Real product features often do more than one thing at a time.

A single request may:

- parse a file
- create records
- update workflow state
- write related child records
- trigger downstream sync

If one step succeeds and another fails, the system can end up in a partially broken state.

---

## Common Consistency Strategies

### Database Transactions

Use transactions when multiple writes must succeed or fail together.

This is often the safest option for operations that remain inside one database boundary.

### Idempotent Retries

If work is retried, repeated execution should not create duplicates or inconsistent side effects.

### Compensating Actions

When a process spans multiple systems, full rollback may not be possible.

In those cases, teams may need explicit recovery or compensation logic.

---

## Tradeoffs

Stronger consistency often increases implementation complexity.

But in domains like candidate creation, payroll processing, or approval systems, correctness usually matters more than shortcut simplicity.

---

## Project Relevance

This topic fits features such as CV upload to candidate creation, HRMS synchronization, approval updates, and any workflow that combines parsing, persistence, and downstream effects.

---

## Practical Rule

Whenever one action crosses multiple data changes, define the transaction boundary before writing the feature.
