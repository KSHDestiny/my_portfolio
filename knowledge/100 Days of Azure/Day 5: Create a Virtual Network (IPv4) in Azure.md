### Objective

Create an IPv4-based Azure virtual network with an address range suitable for subnet planning.

---

## Why It Matters

Most practical Azure labs begin with IPv4 addressing, and good address planning prevents overlap with existing networks and future services.

---

## Practical Steps

- Select a clean IPv4 CIDR block such as `10.20.0.0/16` or `172.16.0.0/16`.
- Confirm the range does not conflict with on-premises or other cloud environments.
- Create the VNet using the chosen IPv4 address space.
- Reserve enough room for application, database, and management subnets later.

---

## Example Command or Workflow

```bash
az network vnet create --resource-group my-rg --name my-vnet --address-prefixes 10.20.0.0/16
```

---

## Summary

Day 5 focuses on IPv4 network planning and safe address allocation inside Azure.
