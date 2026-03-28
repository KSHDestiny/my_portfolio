### What Idempotency Means

Idempotency means repeating the same operation does not create extra side effects beyond the first successful result.

### Why It Matters

Retries are common in distributed systems, especially for APIs, background jobs, webhooks, and payment workflows.

### Common Approaches

Teams usually implement idempotency with keys, unique constraints, or state checks before applying side effects.

## Summary

Idempotency is a core reliability practice for any workflow that may be retried.

