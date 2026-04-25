## 🎯 Objective

Create a backup of a Blob Container and safely delete it using Azure Portal (UI) or CLI.

---

## 🧠 What is Backup (Blob)?

Backup =

👉 Copying all blobs to another location

```plain text
Source Container → Backup Container
```

---

## ⚙️ Prerequisites

- Storage Account exists

- Source container exists

- Backup container ready

---

# 🖥️ Method 1: Azure Portal (UI)

---

## 🛠️ Step 1: Create Backup Container

- Go to Azure Portal

- Navigate → Storage Account → Containers

- Click + Container

- Name: backup-container

- Access level: Private ✅

---

## 📦 Step 2: Backup Data (UI Method)

### Option A: Manual Copy (Small Data)

1. Open Source Container

1. Select blobs (or all)

1. Click Copy / Download

👉 Then:

1. Open Backup Container

1. Click Upload

1. Upload files

---

### Option B: Copy Blob (Single File)

1. Select a blob

1. Click Copy URL

1. Go to backup container

1. Upload using URL (or use CLI for full automation)

---

## 🔍 Step 3: Verify Backup

- Open Backup Container

- Ensure all files exist ✅

---

## 🗑️ Step 4: Delete Source Container

1. Go to Containers list

1. Select source container

1. Click Delete

1. Confirm name

---

## 🔍 Verify Deletion

- Container should be removed from list

---

# 💻 Method 2: Azure CLI (Automation)

---

## 🔐 Login

```plain text
az login
```

---

## 📦 Backup Container Data

```plain text
az storage blob copy start-batch \
--destination-container backup-container \
--source-container <source-container> \
--account-name <storage-account> \
--auth-mode login
```

---

## 🔍 Verify Backup

```plain text
az storage blob list \
--account-name <storage-account> \
--container-name backup-container \
--output table
```

---

## 🗑️ Delete Source Container

```plain text
az storage container delete \
--account-name <storage-account> \
--name <source-container> \
--auth-mode login
```

---

## ⚠️ Common Mistakes

- ❌ Deleting before backup

- ❌ Missing files after copy

- ❌ Wrong container selected

- ❌ Assuming UI auto-backups (it doesn’t)

---

## 📌 Commands Summary

```plain text
az login
az storage blob copy start-batch--destination-container backup-container--source-container <source>
az storage container delete--name <source-container>
```

---

## 💡 Key Notes

- Portal UI = good for manual/small data

- CLI = best for automation & bulk operations

- Always verify backup before delete ✅

---

## 🚀 Pro Tips

- Use AzCopy for large data transfers

- Enable Soft Delete for recovery

- Use Versioning in production
