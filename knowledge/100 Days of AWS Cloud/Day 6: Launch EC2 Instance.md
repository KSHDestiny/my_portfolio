### Objective

Understand how to perform launch ec2 instance in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Launch EC2 Instance matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting launch ec2 instance.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws ec2 run-instances --image-id ami-12345678 --instance-type t3.micro --key-name my-keypair --security-group-ids sg-12345678 --subnet-id subnet-12345678
```

---

## Summary

Day 6 focuses on Launch EC2 Instance. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
