## 🎯 Objective

Create an IAM Role for EC2 and attach a policy so EC2 instances can securely access AWS services.

---

## 🧠 What is IAM Role?

An IAM Role is a temporary identity that:

- Is assumed by AWS services (like EC2)

- Provides permissions without storing credentials

- Uses temporary security tokens

```plain text
EC2 Instance → IAM Role → AWS Services (S3, EC2, etc.)
```

---

## 🛠️ Create IAM Role (AWS Console)

### 1️⃣ Go to IAM

→ Navigate to Roles

---

### 2️⃣ Create Role

→ Click Create role

---

### 3️⃣ Select Trusted Entity

- Choose: AWS Service

- Use case: EC2 ✅

---

### 4️⃣ Attach Permissions Policy

👉 Select required policy (example):

- AmazonS3ReadOnlyAccess

- AmazonEC2ReadOnlyAccess

---

### 5️⃣ Name Role

- Example: EC2S3AccessRole

→ Click Create role

---

## 🔗 Attach Role to EC2 Instance

### 1️⃣ Go to EC2 Dashboard

### 2️⃣ Select Instance

### 3️⃣ Actions → Security → Modify IAM Role

### 4️⃣ Select Role → Save

---

## 🧪 Verification

SSH into EC2:

```plain text
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

👉 Should return role name

---

## ⚠️ Common Mistakes

- Not attaching role to EC2 ❌

- Wrong policy attached ❌

- Using IAM user instead of role ❌

---

## 📌 Commands Summary (Conceptual)

```plain text
IAM → Roles → Create Role → EC2 → Attach Policy → Assign to EC2
```

---

## 💡 Key Notes

- Roles = secure & recommended way for EC2 access ✅

- No need to store access keys

- Follow least privilege principle

---

## 🚀 Example Use Case

- EC2 reads files from S3

- EC2 writes logs to CloudWatch

- EC2 accesses other AWS services securely
