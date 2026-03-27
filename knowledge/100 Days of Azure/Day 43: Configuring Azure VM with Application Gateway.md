### Objective

Understand how to perform configuring azure vm with application gateway in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Configuring Azure VM with Application Gateway is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting configuring azure vm with application gateway.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
az network application-gateway create --name my-appgw --location eastus --resource-group my-rg --vnet-name my-vnet --subnet appgw-subnet --capacity 1 --sku Standard_v2 --frontend-port 80 --http-settings-port 80 --http-settings-protocol Http --public-ip-address my-appgw-ip
```

---

## Summary

Day 43 focuses on Configuring Azure VM with Application Gateway. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
