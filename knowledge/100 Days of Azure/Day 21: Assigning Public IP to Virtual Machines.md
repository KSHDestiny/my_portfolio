### Objective

Understand how to perform assigning public ip to virtual machines in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Assigning Public IP to Virtual Machines is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting assigning public ip to virtual machines.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az network nic ip-config update --resource-group my-rg --nic-name myNic --name ipconfig1 --public-ip-address myPublicIp
```

---

## Summary

Day 21 focuses on Assigning Public IP to Virtual Machines. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
