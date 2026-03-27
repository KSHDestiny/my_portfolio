### Objective

Understand how to perform sql database migration and setup in Azure using safe, practical infrastructure steps.

---

## Why It Matters

SQL Database Migration and Setup is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting sql database migration and setup.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az sql db import --admin-user sqladmin --admin-password <password> --name appdb --resource-group my-rg --server my-sql-server --storage-key <key> --storage-key-type StorageAccessKey --storage-uri https://mystorageacct.blob.core.windows.net/backups/app.bacpac
```

---

## Summary

Day 47 focuses on SQL Database Migration and Setup. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
