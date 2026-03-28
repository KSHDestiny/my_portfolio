## Objective

Understand how caching improves performance, where to place caches, and why invalidation rules matter as much as cache hits.

---

## Why Caching Matters

Caching reduces repeated work by storing data closer to where it is needed. This can lower latency, reduce database load, and improve throughput for read-heavy systems.

Common places to cache:

- Browser or CDN edge
- API gateway or reverse proxy
- Application memory
- Distributed cache such as Redis
- Database query cache or materialized view

---

## Common Cache Patterns

### Cache-Aside

The application checks the cache first. If the data is missing, it reads from the database, returns the result, and writes the value into the cache.

This pattern is simple and widely used, but it can produce stale reads if invalidation is not handled carefully.

### Read-Through

The cache layer itself loads missing data from the backing store. This centralizes cache loading logic but often requires a managed caching layer or a more opinionated platform.

### Write-Through

Writes go to the cache and the backing store together. This keeps cache and source data synchronized at write time, but increases write latency.

### Write-Behind

The cache accepts the write first and persists later. This improves write performance but introduces durability and consistency risk if the cache fails before persistence completes.

---

## Invalidation Strategies

Invalidation is often harder than storing data.

Common approaches:

- Time-based expiration using TTL
- Explicit invalidation on write
- Versioned cache keys
- Event-driven invalidation from domain events

A short TTL is easy to implement, but it trades freshness for simplicity. Explicit invalidation is more accurate, but it requires discipline and strong ownership of data flows.

---

## Design Tradeoffs

Questions to ask before adding a cache:

- Is the bottleneck read latency, throughput, or database cost?
- Can the business tolerate stale data?
- What happens on a cache miss or cache outage?
- Is the cache warming strategy acceptable at startup or deploy time?

If the answer to stale data tolerance is no, caching may need to be limited to derived or non-critical views.

---

## Practical Rule

Do not add a cache just because a query is slow once. First identify the hot path, the acceptable staleness window, and the invalidation owner.

