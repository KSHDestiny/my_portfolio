## 🎯 Objective

Create a public container in Microsoft Azure Blob Storage and understand how to enable anonymous (public) access.

---

## 🧠 What is Azure Blob Storage?

Azure Blob Storage is an object storage service for:

- Images

- Videos

- Documents

- Static website assets

👉 “Blob” = Binary Large Object

---

## 📊 Access Levels

---

## 🏗️ How It Works

```plain text
Storage Account → Container → Blobs (Files)
```

---

## ⚠️ Important Concept: Anonymous Access Setting

### 🔐 What is Anonymous Access?

Anonymous access allows users to access blobs without authentication.

---

### 🚫 Default Behavior

By default, anonymous access may be disabled at the storage account level.

👉 If disabled:

- Even if container is set to public ❌

- Access will still be denied ❌

---

### ✅ Enable Anonymous Access (Required Step)

To allow public containers, you must enable it at storage account level.

---

## 🛠️ Step 1: Enable Anonymous Access

1. Go to Storage Account

1. Click Settings → Configuration

1. Find:

👉 Allow Blob Public Access

1. Set to:

```plain text
Enabled
```

1. Click Save

---

## 📌 Key Insight

> 🔥 Public access = TWO levels must allow it

---

## 📦 Step 2: Create Storage Account

1. Go to Azure Portal

1. Search → Storage Accounts

1. Click Create

Fill:

- Resource Group

- Name → nautilusstorage

- Region

- Performance → Standard

- Redundancy → LRS

👉 Review + Create → Create

---

## 📁 Step 3: Create Container

1. Open storage account

1. Go to Containers

1. Click + Container

Fill:

- Name → public-container

- Public Access → Blob or Container

👉 Click Create

---

## ⬆️ Step 4: Upload File

1. Open container

1. Click Upload

1. Select file

---

## 🌐 Step 5: Get Public URL

Example:

```plain text
https://nautilusstorage.blob.core.windows.net/public-container/image.png
```

---

## 🧪 Step 6: Test Public Access

```plain text
curl https://nautilusstorage.blob.core.windows.net/public-container/<file-name>
```

✅ Should work without login

---

## 🔄 Step 7: Change Access Level (Optional)

1. Open container

1. Click Change access level

1. Choose:

- Private

- Blob

- Container

---

## 🧾 Azure CLI (Optional)

### Enable Public Access

```plain text
az storage account update \
--name nautilusstorage \
--resource-group <RG_NAME> \
--allow-blob-public-accesstrue
```

---

### Create Container

```plain text
az storage container create \
--account-name nautilusstorage \
--name public-container \
--public-access blob
```

---

## 📌 Key Notes

- Both account + container must allow public access

- If account disables → container setting is ignored

- Public URLs are accessible globally 🌍

---

## 🔐 Security Best Practices

- Avoid public access for sensitive data ❌

- Prefer:
  - Private container

  - SAS token access

---

## 🔁 Azure Blob vs AWS S3

---

## 🧾 Command Summary

```plain text
az storage account update \
--name nautilusstorage \
--resource-group <RG_NAME> \
--allow-blob-public-accesstrue

az storage container create \
--account-name nautilusstorage \
--name public-container \
--public-access blob
```

---

## ✅ Outcome

- Anonymous access enabled at account level

- Public container created

- Files accessible via public URL
