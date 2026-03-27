### Objective

Understand how to perform securing virtual machine ssh access in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Securing Virtual Machine SSH Access is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting securing virtual machine ssh access.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
sudo sed -i "s/^#PasswordAuthentication yes/PasswordAuthentication no/" /etc/ssh/sshd_config
```

---

## Summary

Day 24 focuses on Securing Virtual Machine SSH Access. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
