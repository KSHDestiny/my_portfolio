## 🎯 Objective

Create a Private Azure Blob Storage Container to securely store data with restricted access.

---

## 🧠 What is Azure Blob Storage?

Azure Blob Storage is used to store:

- Files (images, videos, documents)

- Backups

- Logs & unstructured data

👉 A Container = like a folder inside storage account

---

## 🔒 Access Levels

---

## 🛠️ Create Storage Account (If not exists)

- Go to Azure Portal

- Navigate → Storage Accounts

- Click Create

### Basic Setup:

- Resource Group

- Storage Account Name

- Region

- Performance: Standard

- Redundancy: LRS

---

## 📦 Create Private Container

### 1️⃣ Open Storage Account

→ Go to Containers

---

### 2️⃣ Create Container

- Click + Container

- Enter Name

---

### 3️⃣ Set Access Level

👉 Select:

- Private (no anonymous access) ✅

---

### 4️⃣ Create

- Click Create

---

## 🔍 Verify Container

- Container should appear in list

- Access level = Private

---

## 🧪 Test Access

👉 Try accessing blob via URL:

```plain text
https://<storage-account>.blob.core.windows.net/<container>/<file>
```

❌ Should NOT be accessible without authentication

---

## 🔐 Secure Access Methods

- Azure AD authentication

- Shared Access Signature (SAS)

- Access Keys

---

## ⚠️ Common Mistakes

- Setting container to public ❌

- Sharing access keys insecurely ❌

- Forgetting authentication when accessing ❌

---

## 📌 Commands Summary (Conceptual)

```plain text
Azure Portal → Storage Account → Containers →+ Container → Private
```

---

## 💡 Key Notes

- Private container = secure by default

- Only authorized users can access

- Best for sensitive data / production apps
