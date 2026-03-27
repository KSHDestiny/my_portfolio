### Objective

Understand how Azure NICs connect VMs to VNets and how additional NICs can support traffic separation.

---

## Why It Matters

NICs control private IP attachment, subnet placement, and network flow for a VM. Multi-NIC setups are useful in advanced routing and segmented designs.

---

## Practical Steps

- Create the NIC in the correct subnet and region before attachment.
- Review VM size compatibility because not every VM supports multiple NICs.
- Attach the NIC to the VM and verify network settings from both Azure and the guest OS.
- Use clear naming so primary and secondary network roles are easy to understand.

---

## Example Command or Workflow

```bash
az network nic create --resource-group my-rg --name app-nic --vnet-name my-vnet --subnet app-subnet
```

---

## Summary

Day 9 focuses on VM network attachment and the role of NICs in Azure network design.
