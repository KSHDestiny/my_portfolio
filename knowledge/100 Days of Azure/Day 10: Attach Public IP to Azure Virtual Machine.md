### Objective

Associate a public IP with a VM network interface so the VM can be reached from external networks.

---

## Why It Matters

Attaching a public IP is a common administrative step, but it should be done with clear security controls and only when private access patterns are not enough.

---

## Practical Steps

- Identify the NIC and IP configuration attached to the VM.
- Associate the public IP resource with the NIC configuration.
- Validate NSG rules so only required ports are open.
- Test connectivity carefully and avoid leaving broad inbound access in place.

---

## Example Command or Workflow

```bash
az network nic ip-config update --resource-group my-rg --nic-name my-vmVMNic --name ipconfig1 --public-ip-address my-public-ip
```

---

## Summary

Day 10 is about exposing a VM through a public IP while keeping connectivity controlled and intentional.
