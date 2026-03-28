### What an Index Does

An index helps the database locate rows faster for common filters, joins, sorting, and uniqueness checks.

### Good Query Habits

Efficient query design includes selecting only needed columns, paginating large datasets, and avoiding repeated N+1 access patterns.

### Index Tradeoff

More indexes can improve reads, but they also increase write cost and storage usage.

## Summary

Indexes should be designed around real query patterns, not added broadly without measuring the workload.

