## 🎯 Objective

Change an existing Public Azure Blob Container to Private to restrict unauthorized access.

---

## 🧠 What is Container Access Level?

Azure Blob containers support:

- Private → No anonymous access ✅

- Blob → Public read access (blobs only)

- Container → Full public read access

👉 We are converting → Public ➜ Private

---

## 🛠️ Method 1: Azure Portal

### 1️⃣ Open Storage Account

→ Go to Containers

---

### 2️⃣ Select Container

→ Click your target container

---

### 3️⃣ Change Access Level

- Click Change access level

- Select:

👉 Private (no anonymous access) ✅

---

### 4️⃣ Save Changes

→ Click OK / Save

---

## 💻 Method 2: Azure CLI

```plain text
az login
```

```plain text
az storage container set-permission \
--account-name <storage-account> \
--name <container> \
--public-access off \
--auth-mode login
```

---

## 🔍 Verify Access

```plain text
az storage container show \
--account-name <storage-account> \
--name <container> \
--query"properties.publicAccess"
```

👉 Output should be:

```plain text
null
```

---

## 🧪 Test Access

```plain text
https://<storage-account>.blob.core.windows.net/<container>/<file>
```

👉 Result:

- ❌ Access denied (expected for private)

---

## ⚠️ Important Impact

- Public URLs will stop working ❌

- Applications must use:
  - Azure AD

  - Access Key

  - SAS Token

---

## 🔐 Best Practices

- Always use Private by default ✅

- Use SAS tokens for temporary sharing

- Avoid public containers in production

---

## 📌 Commands Summary

```plain text
az storage container set-permission--public-access off
```

---

## 💡 Key Notes

- Private = secure access only

- No anonymous/public read allowed

- Recommended for sensitive data
