### Objective

Understand how to perform enable versioning for s3 bucket in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Enable Versioning for S3 Bucket matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting enable versioning for s3 bucket.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws s3api put-bucket-versioning --bucket my-demo-bucket --versioning-configuration Status=Enabled
```

---

## Summary

Day 4 focuses on Enable Versioning for S3 Bucket. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
