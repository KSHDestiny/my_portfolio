### Objective

Create a public IP resource and understand when a VM should or should not be directly exposed to the internet.

---

## Why It Matters

Public IPs provide direct external reachability, but they also increase exposure and should be used intentionally with proper security controls.

---

## Practical Steps

- Create the public IP as a separate Azure resource in the same region as the VM.
- Choose dynamic or static allocation based on whether the address must remain stable.
- Review whether a public IP is really needed or whether bastion, VPN, or private access is safer.
- Pair public exposure with restrictive NSG rules and monitored access patterns.

---

## Example Command or Workflow

```bash
az network public-ip create --resource-group my-rg --name my-public-ip --sku Standard --allocation-method Static
```

---

## Summary

Day 7 focuses on internet-facing connectivity and the security tradeoffs of assigning public IPs.
