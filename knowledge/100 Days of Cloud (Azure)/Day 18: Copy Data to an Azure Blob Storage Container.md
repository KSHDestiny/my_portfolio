## 🎯 Objective

Upload and copy data into an Azure Blob Storage Container for secure and scalable storage.

---

## 🧠 What is Blob Upload?

Copying data to a container means:

- Upload files from local system

- Transfer data between containers

- Store application assets (images, backups, logs)

---

## ⚙️ Prerequisites

- Storage Account created

- Container created (Private/Public)

- Access method (Access Key / SAS / Azure CLI login)

---

## 🛠️ Method 1: Upload via Azure Portal

### 1️⃣ Open Storage Account

→ Go to Containers

### 2️⃣ Select Container

→ Choose your container

### 3️⃣ Upload File

- Click Upload

- Select file

- Click Upload

---

## 💻 Method 2: Upload via Azure CLI

### 🔐 Login

```plain text
az login
```

---

### 📦 Upload File

```plain text
az storage blob upload \
--account-name <storage-account> \
--container-name <container> \
--name <file-name> \
--file <local-file-path> \
--auth-mode login
```

---

## 🔁 Method 3: Copy Between Containers

```plain text
az storage blob copystart \
--destination-blob <new-file-name> \
--destination-container <container> \
--source-uri <blob-url>
```

---

## 🔍 Verify Upload

```plain text
az storage blob list \
--account-name <storage-account> \
--container-name <container> \
--output table
```

---

## 🧪 Test Access

```plain text
https://<storage-account>.blob.core.windows.net/<container>/<file>
```

- Private container → ❌ Access denied without auth

- Public container → ✅ Accessible

---

## 🔐 Secure Access Options

- Azure AD login

- Access Keys

- SAS Token (recommended for temporary access)

---

## ⚠️ Common Issues

- Wrong container name

- Missing permissions

- Private container access denied

- Incorrect file path

---

## 📌 Commands Summary

```plain text
az login
az storage blob upload--account-name <name>--container-name <container>--name <file>--file <path>
az storage blob list--account-name <name>--container-name <container>
```

---

## 💡 Key Notes

- Blob = file object in container

- Use CLI for automation

- Use SAS for controlled sharing
