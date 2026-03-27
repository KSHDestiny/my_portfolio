### Objective

Understand how to perform create read-only iam policy for ec2 console access in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Create Read-Only IAM Policy for EC2 Console Access matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting create read-only iam policy for ec2 console access.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws iam create-policy --policy-name EC2ReadOnlyConsole --policy-document file://ec2-readonly.json
```

---

## Summary

Day 18 focuses on Create Read-Only IAM Policy for EC2 Console Access. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
