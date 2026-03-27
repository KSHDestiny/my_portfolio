### Objective

Provision a basic Azure virtual machine from the portal with networking and authentication configured correctly.

---

## Why It Matters

Virtual machines are a core Azure compute service and are often the starting point for learning networking, storage, security groups, and remote administration.

---

## Practical Steps

- Create or select a resource group and choose the target Azure region.
- Select a Linux image, choose a VM size, and configure the admin username.
- Use SSH key authentication instead of a password when possible.
- Review public inbound ports carefully before deployment and create the VM.

---

## Example Command or Workflow

```bash
Resource Group -> Virtual Machine -> Image -> Size -> Authentication -> Networking -> Review + Create
```

---

## Summary

Day 2 is about provisioning a VM correctly from the Azure portal with the right defaults for security and connectivity.
