### Objective

Understand how to perform create azure sql database in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Create Azure SQL Database is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting create azure sql database.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az sql db create --resource-group my-rg --server my-sql-server --name appdb --service-objective Basic
```

---

## Summary

Day 30 focuses on Create Azure SQL Database. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
