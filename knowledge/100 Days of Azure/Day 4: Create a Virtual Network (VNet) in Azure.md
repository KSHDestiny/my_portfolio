### Objective

Create a Virtual Network and understand how it defines the private network boundary for Azure resources.

---

## Why It Matters

A VNet is the foundation for private IP communication between Azure resources and is central to VM, subnet, NSG, and routing design.

---

## Practical Steps

- Choose a resource group, region, and a non-overlapping address space.
- Create the VNet from portal or CLI and give it a clear, environment-specific name.
- Plan address ranges with future growth in mind to avoid painful redesign later.
- Document the VNet CIDR because subnetting and peering decisions depend on it.

---

## Example Command or Workflow

```bash
az network vnet create --resource-group my-rg --name my-vnet --address-prefix 10.10.0.0/16
```

---

## Summary

Day 4 covers creating the private network boundary that Azure workloads depend on.
