### 🎯 Objective

Attach a Managed Data Disk to an Azure Virtual Machine and configure it for use.

---

## 🤔 What is a Managed Data Disk?

A Managed Disk in Microsoft Azure is a separate storage volume attached to a VM.

👉 Types of disks:

- OS Disk → Contains operating system

- Data Disk → Used for:
  - Application data

  - Databases

  - Logs

---

## 🧱 Architecture Overview

===================================================================

======================================================================

---

## 🔗 Method 1: Attach Disk via Azure Portal

### 🪜 Steps:

1. Go to Azure Portal

1. Navigate to Virtual Machines

1. Select your VM

1. Click Disks

1. Click + Create and attach a new disk

### ⚙️ Configure Disk:

- Name: myDataDisk

- Size: e.g. 10 GiB

- Type:
  - Standard HDD

  - Standard SSD

  - Premium SSD

1. Click Save

---

## 💻 Method 2: Attach Disk via Azure CLI

### 🔹 Step 1: Create a Managed Disk

```plain text
az disk create \
--resource-group myResourceGroup \
--name myDataDisk \
--size-gb10
```

---

### 🔹 Step 2: Attach Disk to VM

```plain text
az vm disk attach \
--resource-group myResourceGroup \
--vm-name myVM \
--name myDataDisk
```

---

## 🧪 Step 3: Configure Disk Inside VM (Linux)

After attaching, SSH into your VM:

```plain text
ssh user@your-vm-ip
```

---

### 🔍 1. Check New Disk

```plain text
lsblk
```

👉 You will see something like:

```plain text
sda    30G  (OS disk)
sdb    10G  (New data disk)
```

---

### 🧱 2. Create Partition

```plain text
sudo fdisk /dev/sdb
```

Inside fdisk:

- Press n → new partition

- Press w → write changes

---

### 🧾 3. Format Disk

```plain text
sudo mkfs.ext4 /dev/sdb1
```

---

### 📂 4. Create Mount Point

```plain text
sudomkdir /data
```

---

### 🔗 5. Mount Disk

```plain text
sudo mount /dev/sdb1 /data
```

---

### 🔄 6. Make Mount Persistent

Edit /etc/fstab:

```plain text
sudo nano /etc/fstab
```

Add:

```plain text
/dev/sdb1 /data ext4 defaults,nofail02
```

---

## 🧪 Verify Mount

```plain text
df-h
```

---

## ⚠️ Important Notes

- Data disk is independent of OS disk

- You can:
  - Detach

  - Resize

  - Snapshot

👉 Data persists even if VM is deleted (if configured)

---

## 🧠 Real-World Use Case

- 🗄️ Store database files on data disk

- 📦 Separate logs from OS

- 🚀 Improve performance using Premium SSD

---

## 📌 Summary

---
