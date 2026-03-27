### Objective

Understand how to perform managing storage lifecycle in azure in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Managing Storage Lifecycle in Azure is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting managing storage lifecycle in azure.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az storage account management-policy create --account-name mystorageacct --policy @policy.json --resource-group my-rg
```

---

## Summary

Day 36 focuses on Managing Storage Lifecycle in Azure. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
