### Objective

Understand how to perform push docker image to amazon ecr in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Push Docker Image to Amazon ECR matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting push docker image to amazon ecr.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-southeast-1.amazonaws.com
```

---

## Summary

Day 29 focuses on Push Docker Image to Amazon ECR. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
