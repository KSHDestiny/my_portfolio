## 🎯 Objective

Create a Read-Only IAM Policy that allows users to view EC2 resources in AWS Console without modifying anything.

---

## 🧠 What is IAM Policy?

An IAM Policy is a JSON document that defines:

- ✅ What actions are allowed

- ❌ What actions are denied

- 📍 Which resources are affected

---

## 🔒 Read-Only Access Concept

👉 User can:

- View EC2 instances

- Check status, metrics, security groups

👉 User cannot:

- Launch / stop instances

- Modify configurations

- Delete resources

---

## 🛠️ Create Policy (AWS Console)

### 1️⃣ Go to IAM

→ Navigate to Policies

---

### 2️⃣ Create Policy

→ Click Create policy

---

### 3️⃣ Use JSON Editor

```plain text
{
  "Version":"2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
"ec2:Describe*"
      ],
      "Resource":"*"
    }
  ]
}
```

---

### 4️⃣ Review & Create

- Policy Name: EC2ReadOnlyPolicy

- Click Create policy

---

## 🔗 Attach Policy to User

### 1️⃣ Go to IAM → Users

### 2️⃣ Select User

### 3️⃣ Add Permissions

### 4️⃣ Attach Policy → Select EC2ReadOnlyPolicy

---

## 🧪 Verification

Login with IAM user:

- ✅ Can view EC2 Dashboard

- ❌ Cannot start/stop instances

---

## ⚠️ Common Mistakes

- Missing Describe* permission

- Using  actions (too permissive) ❌

- Not attaching policy to user

---

## 📌 Commands Summary (Conceptual)

```plain text
IAM → Policies → Create Policy → JSON → Attach to User
```

---

## 💡 Key Notes

- Principle of Least Privilege ✅

- Use read-only policies for monitoring users

- Avoid giving full access unless necessary
