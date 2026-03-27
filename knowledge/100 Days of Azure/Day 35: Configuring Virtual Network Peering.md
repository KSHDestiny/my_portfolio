### Objective

Understand how to perform configuring virtual network peering in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Configuring Virtual Network Peering is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting configuring virtual network peering.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az network vnet peering create --resource-group my-rg --name peer-to-core --vnet-name app-vnet --remote-vnet core-vnet --allow-vnet-access
```

---

## Summary

Day 35 focuses on Configuring Virtual Network Peering. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
