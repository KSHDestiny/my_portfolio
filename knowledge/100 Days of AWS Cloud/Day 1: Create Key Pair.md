### Objective

Understand how to perform create key pair in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Create Key Pair matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting create key pair.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws ec2 create-key-pair --key-name my-keypair --query KeyMaterial --output text > my-keypair.pem
```

---

## Summary

Day 1 focuses on Create Key Pair. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
