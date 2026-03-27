### Objective

Understand how to perform load balancing ec2 instances with application load balancer in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Load Balancing EC2 Instances with Application Load Balancer matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting load balancing ec2 instances with application load balancer.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws elbv2 create-target-group --name app-targets --protocol HTTP --port 80 --vpc-id vpc-12345678
```

---

## Summary

Day 36 focuses on Load Balancing EC2 Instances with Application Load Balancer. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
