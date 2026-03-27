### Objective

Understand how to perform create and attach managed disks in azure in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Create and Attach Managed Disks in Azure is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting create and attach managed disks in azure.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az disk create --resource-group my-rg --name extra-disk --size-gb 64 --sku StandardSSD_LRS
```

---

## Summary

Day 14 focuses on Create and Attach Managed Disks in Azure. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
