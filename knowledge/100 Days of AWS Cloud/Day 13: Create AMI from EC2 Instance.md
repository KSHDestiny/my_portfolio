### Objective

Understand how to perform create ami from ec2 instance in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Create AMI from EC2 Instance matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting create ami from ec2 instance.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws ec2 create-image --instance-id i-1234567890abcdef0 --name "my-server-ami" --no-reboot
```

---

## Summary

Day 13 focuses on Create AMI from EC2 Instance. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
