## 🎯 Objective

Create and attach a Managed Disk to a Virtual Machine in Microsoft Azure for additional storage.

---

## 🧠 What is a Managed Disk?

A Managed Disk is a storage disk managed by Azure for use with Virtual Machines.

It provides:

- Persistent storage

- High availability

- Automatic management by Azure

---

## 🏗️ How It Works

```plain text
Azure Disk → Attach → Virtual Machine → Mount → Use Storage
```

---

## 📊 Disk Types

---

## 🛠️ Method 1: Create & Attach via Azure Portal

### 1️⃣ Go to Virtual Machine

Navigate to:

Azure Portal → Virtual Machines

---

### 2️⃣ Select Your VM

Choose the VM to attach disk

---

### 3️⃣ Open Disks Section

Click:

Settings → Disks

---

### 4️⃣ Add New Disk

Click:

+ Create and attach a new disk

---

### 5️⃣ Configure Disk

Fill in:

- Name → Example: my-data-disk

- Size (GiB) → e.g., 30

- Type → Standard SSD / Premium SSD

---

### 6️⃣ Click Save

👉 Azure will:

- Create disk

- Attach it to VM

---

## 🔍 Verify Disk Attached

- Go to VM → Disks

- Confirm disk is listed

---

## 💻 Mount Disk in VM (Linux)

### 1️⃣ Connect via SSH

```plain text
ssh azureuser@<public-ip>
```

---

### 2️⃣ List Disks

```plain text
lsblk
```

---

### 3️⃣ Create Filesystem

```plain text
sudo mkfs.ext4 /dev/sdc
```

---

### 4️⃣ Create Mount Point

```plain text
sudo mkdir /data
```

---

### 5️⃣ Mount Disk

```plain text
sudo mount /dev/sdc /data
```

---

### 6️⃣ Verify

```plain text
df -h
```

---

## ⚙️ Method 2: Using Azure CLI

### 📌 Create Disk

```plain text
az disk create \
--resource-group <rg-name> \
--name my-data-disk \
--size-gb30
```

---

### 📌 Attach Disk

```plain text
az vm disk attach \
--resource-group <rg-name> \
--vm-name <vm-name> \
--name my-data-disk
```

---

## ⚠️ Important Notes

- Disk is not usable until mounted

- Device name may vary (/dev/sdc, /dev/sdd)

- Charges apply based on disk size/type

- Use /etc/fstab for persistent mount

---

## 🧪 Example Use Case

👉 Add disk for:

- Application data

- Logs

- Database storage

---

## 🧠 DevOps Insight

👉 Managed Disks support:

- Scalable storage

- Separation of compute and storage

- Better performance tuning

---

## ⚠️ Common Mistakes

- ❌ Forgetting to format disk

- ❌ Not mounting disk

- ❌ Hardcoding wrong device name

- ❌ Not persisting mount

---

## 🎯 Result

A managed disk is successfully created and attached to the VM, providing additional persistent storage ready for use.
