### Objective

Attach a managed disk to an Azure VM and prepare it for data storage.

---

## Why It Matters

Managed disks separate VM compute from persistent storage and are commonly used for application data, logs, or database volumes.

---

## Practical Steps

- Create a managed disk with the required size and performance tier.
- Attach the disk to the target VM from Azure portal or CLI.
- Log into the VM and verify the new block device is visible at the OS level.
- Partition, format, and mount the disk if it will be used by applications.

---

## Example Command or Workflow

```bash
az vm disk attach --resource-group my-rg --vm-name my-vm --name my-data-disk
```

---

## Summary

Day 8 covers adding persistent block storage to Azure virtual machines.
