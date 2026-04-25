## 🎯 Objective

Attach an EBS (Elastic Block Store) volume to an EC2 instance and make it usable (mount + persist).

---

## 🧠 What is an EBS Volume?

An EBS volume is a network-attached disk for EC2.

### Key Features:

- Persistent storage (data survives reboot)

- Can detach/attach to other instances

- Works within the same Availability Zone

---

## 🏗️ Architecture

```plain text
EC2 Instance ←→ EBS Volume
```

👉 After attaching, you must format + mount it manually.

---

# 🛠️ Method 1: Attach via AWS Console

## 📍 Step 1: Create Volume

1. Go to EC2 Dashboard

1. Click Volumes

1. Click Create Volume

1. Configure:
  - Size (e.g., 10 GiB)

  - Type (gp3 recommended)

  - Availability Zone (must match EC2)

1. Click Create

---

## 🔗 Step 2: Attach Volume

1. Select volume

1. Click Actions → Attach Volume

1. Choose:
  - Instance

  - Device name (e.g., /dev/xvdf)

1. Click Attach

---

# ⚙️ Method 2: Using AWS CLI

## 📌 Create Volume

```plain text
aws ec2 create-volume \
--availability-zone ap-southeast-1a \
--size10 \
--volume-type gp3
```

---

## 📌 Attach Volume

```plain text
aws ec2 attach-volume \
--volume-id vol-123456 \
--instance-id i-1234567890abcdef0 \
--device /dev/xvdf
```

---

# 🔍 Step 3: Verify in EC2 Instance

SSH into instance:

```plain text
ssh ec2-user@<public-ip>
```

List disks:

```plain text
lsblk
```

👉 You should see:

```plain text
xvda   → root disk
xvdf   → new volume
```

---

# 🧱 Step 4: Format the Volume

👉 Only if it’s a new volume

```plain text
sudo mkfs-t ext4 /dev/xvdf
```

---

# 📂 Step 5: Mount the Volume

Create mount point:

```plain text
sudomkdir /data
```

Mount:

```plain text
sudo mount /dev/xvdf /data
```

---

## 🔍 Verify Mount

```plain text
df-h
```

---

# 💾 Step 6: Make It Persistent (IMPORTANT)

Edit fstab:

```plain text
sudovi /etc/fstab
```

Add:

```plain text
/dev/xvdf   /data   ext4   defaults,nofail   0   2
```

---

## ✅ Test fstab

```plain text
sudo mount -a
```

👉 If no error → correct

---

# ⚠️ Important Notes

- Volume must be in same AZ as EC2

- Device name may appear as:
  - /dev/xvdf → /dev/nvme1n1 (on newer instances)

- Always check using lsblk

---

# 🚀 Real Use Cases

- Store application data

- Database storage

- Logs directory

- Backup volumes

---

# 🧪 Example Scenario

👉 Attach volume for logs:

```plain text
sudomkdir /var/log/app
sudo mount /dev/xvdf /var/log/app
```

---

# ⚠️ Common Mistakes

- ❌ Not formatting volume

- ❌ Wrong device name

- ❌ Forgetting /etc/fstab

- ❌ Different Availability Zone

- ❌ Mount lost after reboot

---

# 🧠 DevOps Insight

👉 Real production flow:

```plain text
Attach → Format → Mount → Persist (fstab)
```
