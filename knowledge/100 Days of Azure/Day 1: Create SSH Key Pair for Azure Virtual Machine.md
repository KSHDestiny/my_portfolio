### Objective

Create an SSH key pair and prepare secure key-based access for Linux virtual machines in Azure.

---

## Why It Matters

SSH key authentication is the standard secure way to access Linux VMs. It avoids weak password logins and fits better with infrastructure automation.

---

## Practical Steps

- Generate a new SSH key pair locally with `ssh-keygen -t ed25519 -C "azure-vm"`.
- Store the private key safely and avoid sharing it or committing it into repositories.
- Copy the public key content so it can be used during Azure VM creation.
- Verify the public key format before using it in Azure portal or CLI workflows.

---

## Example Command or Workflow

```bash
ssh-keygen -t ed25519 -C "azure-vm"
```

---

## Summary

Day 1 focuses on preparing secure SSH access for Azure Linux VMs using a reusable key pair.
