## Objective

Learn how indexes improve query performance, when they become expensive, and how query design affects database scalability.

---

## What an Index Does

An index helps the database find rows faster without scanning the entire table. It acts like a lookup structure built on one or more columns.

Indexes are especially useful for:

- High-frequency filters
- Join columns
- Sorting
- Uniqueness enforcement

---

## Good Index Candidates

Columns often worth indexing:

- Foreign keys used in joins
- Fields used in `WHERE`
- Fields used in `ORDER BY`
- Columns used in unique business rules

Composite indexes are useful when multiple columns are commonly queried together. The order of columns matters because databases can efficiently use the leftmost portion of a composite index.

---

## Costs of Over-Indexing

Indexes are not free.

Tradeoffs include:

- Slower inserts and updates
- More storage usage
- Extra maintenance during schema changes

A table with too many indexes can become expensive for write-heavy workloads.

---

## Query Design Principles

Performance is not only about indexes. Query shape matters too.

Useful habits:

- Select only needed columns
- Avoid unnecessary `SELECT *`
- Paginate large result sets
- Filter early
- Watch for N+1 query patterns

If a query is slow, check the execution plan before guessing. The real problem may be missing indexes, poor cardinality, or an inefficient join order.

---

## Practical Rule

Design indexes around real access patterns, not around every column that looks important in the schema.

