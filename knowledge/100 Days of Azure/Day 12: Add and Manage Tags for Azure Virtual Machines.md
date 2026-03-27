### Objective

Understand how to perform add and manage tags for azure virtual machines in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Add and Manage Tags for Azure Virtual Machines is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting add and manage tags for azure virtual machines.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az tag create --resource-id /subscriptions/<sub-id>/resourceGroups/my-rg/providers/Microsoft.Compute/virtualMachines/my-vm --tags env=dev owner=kaung
```

---

## Summary

Day 12 focuses on Add and Manage Tags for Azure Virtual Machines. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
