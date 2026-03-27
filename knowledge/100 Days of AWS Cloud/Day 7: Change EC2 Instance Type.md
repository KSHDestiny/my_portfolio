### Objective

Understand how to perform change ec2 instance type in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Change EC2 Instance Type matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting change ec2 instance type.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws ec2 modify-instance-attribute --instance-id i-1234567890abcdef0 --instance-type "{"Value":"t3.small"}"
```

---

## Summary

Day 7 focuses on Change EC2 Instance Type. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
