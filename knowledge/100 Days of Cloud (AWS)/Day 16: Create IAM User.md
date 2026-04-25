## 🎯 Objective

Create an IAM User in AWS and grant appropriate permissions for secure access.

---

## 🧠 What is IAM User?

An IAM User is an identity in AWS used to:

- Access AWS resources

- Perform actions based on assigned permissions

- Replace root account usage (best practice)

---

## 🛠️ Create IAM User (AWS Console)

### 1️⃣ Go to IAM Dashboard

- Open AWS Console

- Navigate to IAM → Users

---

### 2️⃣ Create User

- Click Create user

- Enter User name

---

### 3️⃣ Select Access Type

Choose one or both:

- ✅ Management Console Access (login via browser)

- ✅ Programmatic Access (CLI / API)

---

### 4️⃣ Set Permissions

Choose one method:

- Attach existing policy (Recommended)

- Add user to group

- Copy permissions from another user

👉 Example policies:

- AmazonEC2FullAccess

- AmazonS3ReadOnlyAccess

---

### 5️⃣ Review & Create

- Review settings

- Click Create user

---

### 6️⃣ Save Credentials ⚠️

- Download .csv OR copy:
  - Access Key ID

  - Secret Access Key

👉 Secret key is shown only once

---

## 🔐 Best Practices

- ❌ Do NOT use root account

- ✅ Use IAM users with limited permissions

- ✅ Enable MFA (Multi-Factor Authentication)

- ✅ Use groups for permission management

---

## 🧪 Verification

- Login using IAM user credentials

- Test access based on assigned permissions

---

## 📌 Summary

- IAM User = Identity for AWS access

- Permissions controlled via policies

- Supports Console + CLI/API access
