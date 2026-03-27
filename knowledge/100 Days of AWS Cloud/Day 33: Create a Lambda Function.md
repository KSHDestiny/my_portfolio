### Objective

Understand how to perform create a lambda function in AWS using safe, practical cloud infrastructure steps.

---

## Why It Matters

Create a Lambda Function matters in real AWS environments because it supports secure provisioning, networking, storage, automation, deployment, or operational reliability.

---

## Practical Steps

- Review the AWS resources and permissions required before starting create a lambda function.
- Create or update the target resource from console, CLI, or infrastructure template workflow.
- Validate the result from both AWS resource state and application or network behavior.
- Document the main settings, dependencies, and rollback or troubleshooting checks.

---

## Example Command or Workflow

```bash
aws lambda create-function --function-name hello-lambda --runtime python3.12 --handler lambda_function.lambda_handler --zip-file fileb://function.zip --role arn:aws:iam::123456789012:role/lambda-exec-role
```

---

## Summary

Day 33 focuses on Create a Lambda Function. The goal is to complete the AWS task in a way that is practical, secure, and reusable in real environments.
