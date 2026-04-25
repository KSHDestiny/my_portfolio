## 🎯 Objective

Attach an IAM Policy to an IAM User to grant specific permissions.

---

## 🧠 What is Policy Attachment?

Policy attachment means:

👉 Assigning permissions (policy)

👉 To a user (identity)

```plain text
User → Policy → Permissions
```

---

## 🛠️ Attach Policy (AWS Console)

### 1️⃣ Go to IAM

→ Navigate to Users

---

### 2️⃣ Select User

→ Click on target IAM user

---

### 3️⃣ Add Permissions

→ Click Add permissions

---

### 4️⃣ Choose Method

Select:

- ✅ Attach policies directly

---

### 5️⃣ Select Policy

👉 Choose existing policy (e.g.):

- EC2ReadOnlyPolicy

- AmazonS3FullAccess

---

### 6️⃣ Review & Confirm

→ Click Add permissions

---

## 🔍 Verify Attachment

- Go to User → Permissions tab

- Confirm policy is listed

---

## 🧪 Test Access

Login with IAM user:

- ✅ Allowed actions based on policy

- ❌ Restricted actions blocked

---

## ⚠️ Common Mistakes

- Attaching wrong policy

- Giving excessive permissions ❌

- Forgetting to verify access

---

## 📌 Alternative Method (Using Groups)

👉 Better practice:

```plain text
User → Group → Policy
```

Steps:

- Create Group

- Attach Policy to Group

- Add User to Group

---

## 📌 Commands Summary (Conceptual)

```plain text
IAM → Users → Select User → Add permissions → Attach Policy
```

---

## 💡 Key Notes

- Follow Least Privilege Principle ✅

- Prefer Group-based permissions

- Avoid attaching too many policies directly
