### Objective

Create subnets inside a VNet to segment workloads and prepare for access control.

---

## Why It Matters

Subnets help organize Azure networks, support security boundaries, and prepare resources for NSGs, route tables, and private service access.

---

## Practical Steps

- Review the parent VNet CIDR and decide how much address space the subnet needs.
- Create the subnet with a clear purpose such as web, app, or database.
- Avoid oversizing or undersizing the subnet because later resizing can be disruptive.
- Document the subnet purpose so security rules stay aligned with architecture intent.

---

## Example Command or Workflow

```bash
az network vnet subnet create --resource-group my-rg --vnet-name my-vnet --name web-subnet --address-prefixes 10.20.1.0/24
```

---

## Summary

Day 6 is about segmenting Azure networking into practical subnet boundaries.
