### Objective

Understand how to perform deploying a static website using containers on azure in Azure using safe, practical infrastructure steps.

---

## Why It Matters

Deploying a Static Website Using Containers on Azure is useful in real Azure environments because it improves provisioning, networking, security, storage, deployment flow, or operations readiness.

---

## Practical Steps

- Review the Azure resources required before starting deploying a static website using containers on azure.
- Create or update the target resource from portal, CLI, or template-based workflow.
- Validate the result from both Azure resource state and the workload point of view.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
docker run -d -p 80:80 -v $(pwd)/site:/usr/share/nginx/html:ro nginx
```

---

## Summary

Day 39 focuses on Deploying a Static Website Using Containers on Azure. The goal is to complete the Azure task in a way that is practical, secure, and reusable in real environments.
