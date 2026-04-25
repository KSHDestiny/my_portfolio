## 🎯 Objective

Change the instance type of an EC2 instance to adjust its CPU, memory, or performance capacity.

This is useful when scaling resources up or down depending on workload requirements.

## ☁️ What is an Instance Type?

An EC2 instance type defines the hardware configuration of the virtual machine.

It determines:

- CPU capacity

- Memory (RAM)

- Network performance

- Storage performance

Example instance types:

## ⚠️ Important Requirement

Before changing the instance type, the instance must be stopped.

## 🛠️ Steps to Change EC2 Instance Type (AWS Console)

### 1️⃣ Sign in to AWS

Go to the AWS Management Console:

https://console.aws.amazon.com/

### 2️⃣ Navigate to EC2

- Click Services

- Search for EC2

- Open EC2 Dashboard

### 3️⃣ Stop the Instance

1. Go to:EC2 → Instances

1. Select your instance

1. Click:Instance state → Stop instance

Wait until the instance state becomes Stopped.

### 4️⃣ Change Instance Type

1. Select the stopped instance

1. Click:Actions → Instance settings → Change instance type

1. Choose a new instance typeExample:t3.medium

1. Click Apply

### 5️⃣ Start the Instance

Start the instance again:
Instance state → Start instance

## 🔍 Verify Instance Type

Navigate to:
EC2 → Instances

Check the Instance type column to confirm the change.

## ⚠️ Important Notes

- Instance must be stopped before changing instance type

- Ensure the instance type is supported in the region

- Changing instance type may affect cost

- Public IP may change if not using Elastic IP

## 🎯 Result

- EC2 instance type successfully modified

- Instance restarted with updated compute capacity

- Resources scaled according to workload requirements
