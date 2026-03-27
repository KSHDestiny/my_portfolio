### Objective

Provision an Azure virtual machine from the command line using Azure CLI.

---

## Why It Matters

Using Azure CLI makes VM creation repeatable, scriptable, and easier to standardize across environments.

---

## Practical Steps

- Log in with `az login` and select the correct subscription if needed.
- Create a resource group before creating the VM resources.
- Use `az vm create` with image, admin username, SSH key, and public IP options.
- Capture the output values such as public IP and VM resource identifiers for later use.

---

## Example Command or Workflow

```bash
az vm create --resource-group my-rg --name my-vm --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys
```

---

## Summary

Day 3 focuses on creating VMs through Azure CLI so the process can be reused in scripts and automation.
