## 🎯 Objective

Create an AMI (Amazon Machine Image) from an existing EC2 instance to capture its configuration, OS, and data.

AMI can be used to:

- Launch identical EC2 instances

- Create backups

- Standardize environments

---

## 🧠 What is an AMI?

An AMI (Amazon Machine Image) is a template that contains:

- Operating System

- Installed software

- Configuration

- Attached EBS snapshots

👉 It allows you to recreate the same server anytime

---

## 🏗️ How It Works

```plain text
EC2 Instance → AMI → Launch New Instances
```

---

## 📊 AMI Components

---

## 🛠️ Method 1: Create AMI via AWS Console

### 1️⃣ Go to EC2 Dashboard

Navigate to:

EC2 → Instances

---

### 2️⃣ Select Your Instance

Choose the instance you want to create AMI from

---

### 3️⃣ Create Image

Click:

Actions → Image and templates → Create Image

---

### 4️⃣ Configure AMI

Fill in:

- Image name → Example: my-app-ami

- Image description → Optional

- No reboot:
  - ❌ Unchecked → safer (recommended)

  - ✅ Checked → faster but may risk data inconsistency

---

### 5️⃣ Click Create Image

👉 AWS will:

- Create snapshots

- Register AMI

---

## 🔍 Check AMI Status

Go to:

EC2 → AMIs

Wait until status becomes:

```plain text
available
```

---

## 🚀 Launch Instance from AMI

1. Go to:EC2 → AMIs

1. Select your AMI

1. Click:Launch instance

---

## ⚙️ Method 2: Using AWS CLI

### 📌 Create AMI

```plain text
aws ec2 create-image \
--instance-id i-1234567890abcdef0 \
--name"my-app-ami" \
--no-reboot
```

---

## 🔍 Describe AMIs

```plain text
aws ec2 describe-images--owners self
```

---

## ⚠️ Important Notes

- AMI is region-specific

- Charges apply for snapshots (EBS storage)

- Use consistent naming for versioning

- Stop instance (optional) for data consistency

---

## 🧪 Example Use Case

👉 You configured:

- Nginx

- Database

- App

Create AMI → launch 10 identical servers instantly 🚀

---

## 🧠 DevOps Insight

👉 AMI = Golden Image Strategy

Used for:

- Auto Scaling Groups

- CI/CD deployments

- Immutable infrastructure

---

## ⚠️ Common Mistakes

- ❌ Not waiting for AMI to become available

- ❌ Using outdated AMI

- ❌ Ignoring storage costs

- ❌ Forgetting region limitation

---

## 🎯 Result

An AMI has been successfully created from the EC2 instance, enabling quick replication, backup, and scalable deployment of identical environments.
