## 🎯 Objective

Create a snapshot of a storage volume to back up data and enable recovery.

---

## 🧠 What is a Snapshot?

A snapshot is a point-in-time backup of a volume.

👉 Used for:

- Backup and recovery

- Disaster recovery

- Creating new volumes from existing data

---

## 📊 Snapshot Characteristics

---

## 🏗️ How It Works

```plain text
Volume → Snapshot → New Volume → Attach to Instance
```

---

## 🛠️ Method 1: Create Snapshot via AWS Console

### Step 1: Go to EBS Volumes

1. Open Amazon Web Services Console

1. Navigate to:

👉 EC2 → Elastic Block Store → Volumes

---

### Step 2: Select Volume

- Choose the volume attached to your EC2 instance

---

### Step 3: Create Snapshot

1. Click Actions → Create Snapshot

1. Add details:

- Name → nautilus-snapshot

- Description → Backup of volume

1. Click Create Snapshot

---

### Step 4: Verify Snapshot

Go to:

👉 EC2 → Snapshots

Check status:

- pending → creating

- completed → ready to use

---

## 🧪 Step 5: Create Volume from Snapshot (Optional)

1. Select snapshot

1. Click Actions → Create Volume

1. Choose:

- Availability Zone (must match instance)

- Volume type

1. Attach to EC2 instance

---

## 🔗 Step 6: Attach Volume to Instance

1. Go to EC2 → Volumes

1. Select new volume

1. Click Attach Volume

1. Choose instance

---

## 💻 Step 7: Verify on Instance

```plain text
lsblk
```

Mount if needed:

```plain text
sudo mount /dev/xvdf /mnt
```

---

## 🧾 AWS CLI (Optional)

Create snapshot:

```plain text
aws ec2 create-snapshot \
--volume-id <volume-id> \
--description"Backup snapshot"
```

---

## 📌 Key Notes

- Snapshots are incremental → saves storage cost

- Stored in S3 (managed by AWS internally)

- Can be used to restore or clone volumes

- Volume must be in same AZ when restoring

---

## 🔐 Best Practices

- Take snapshots before major changes

- Use naming conventions (env-app-date)

- Automate with lifecycle policies

---

## 🔁 Snapshot vs AMI

---

## 🧾 Command Summary

```plain text
# Create snapshot
aws ec2 create-snapshot \
--volume-id <volume-id> \
--description"Backup snapshot"

# Check disks
lsblk

# Mount volume
sudo mount /dev/xvdf /mnt
```

---

## ✅ Outcome

- Snapshot created successfully

- Backup of volume available

- Ready for restore or cloning
