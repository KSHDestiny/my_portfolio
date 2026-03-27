### Objective

Understand how to perform ssh into an azure virtual machine in Azure using safe, practical infrastructure steps.

---

## Why It Matters

SSH into an Azure Virtual Machine is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting ssh into an azure virtual machine.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
ssh -i ~/.ssh/id_ed25519 azureuser@<public-ip>
```

---

## Summary

Day 13 focuses on SSH into an Azure Virtual Machine. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
