### Objective

Understand how to perform attach iam policy to iam user in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Attach IAM Policy to IAM User matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting attach iam policy to iam user.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws iam attach-user-policy --user-name devops-reader --policy-arn arn:aws:iam::123456789012:policy/EC2ReadOnlyConsole
```

---

## Summary

Day 19 focuses on Attach IAM Policy to IAM User. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
