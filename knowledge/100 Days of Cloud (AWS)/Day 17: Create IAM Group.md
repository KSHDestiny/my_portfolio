## 🎯 Objective

Create an IAM Group to manage permissions for multiple users efficiently in Amazon Web Services.

---

## 🧠 What is an IAM Group?

An IAM Group is a collection of IAM users with shared permissions.

👉 Benefits:

- Assign permissions once → apply to many users

- Easier access management

- Follows least privilege principle

---

## 📊 IAM Structure

```plain text
IAM User → IAM Group → IAM Policy → AWS Resources
```

---

## 🛠️ Step 1: Open IAM Dashboard

1. Go to AWS Console

1. Search → IAM

1. Click User Groups

---

## ➕ Step 2: Create IAM Group

1. Click Create group

1. Enter:

- Group Name → Developers

Click Next

---

## 🔐 Step 3: Attach Permissions

Attach policies to define access.

### Example Policies:

- AmazonEC2FullAccess

- AmazonS3ReadOnlyAccess

👉 Select required policies → Click Create group

---

## 👥 Step 4: Add Users to Group

1. Open the created group

1. Click Add users

1. Select users → Add

---

## 🧪 Step 5: Verify Permissions

Login as user and test access:

```plain text
aws ec2 describe-instances
aws s3ls
```

---

## 🧾 AWS CLI (Optional)

### Create Group

```plain text
aws iam create-group--group-name Developers
```

---

### Attach Policy

```plain text
aws iam attach-group-policy \
--group-name Developers \
--policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess
```

---

### Add User to Group

```plain text
aws iam add-user-to-group \
--user-name <username> \
--group-name Developers
```

---

## 📌 Key Concepts

### 🔐 IAM Policy

---

### 🧩 Why Use Groups?

- Avoid assigning policies per user

- Centralized permission control

- Easier scaling for teams

---

## 🔐 Best Practices

- Follow least privilege principle

- Avoid full access policies in production

- Use separate groups:
  - Admins

  - Developers

  - ReadOnly

---

## 🔁 IAM Group vs Role

---

## 🧾 Command Summary

```plain text
aws iam create-group--group-name Developers

aws iam attach-group-policy \
--group-name Developers \
--policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess

aws iam add-user-to-group \
--user-name <username> \
--group-name Developers
```

---

## ✅ Outcome

- IAM Group created

- Policies attached

- Users added to group

- Centralized permission management enabled
