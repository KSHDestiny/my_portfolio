## 🎯 Objective

Attach additional disk storage to an Azure Linux Virtual Machine, prepare the disk, mount it to the filesystem, and configure it to remain mounted after a reboot.

The overall process is:

```plain text
Azure Managed Disk
        ↓
Attach to VM
        ↓
Detect Disk
        ↓
Partition
        ↓
Create Filesystem
        ↓
Create Mount Point
        ↓
Mount Disk
        ↓
Configure /etc/fstab
        ↓
Persistent Storage
```

Reference: Microsoft Learn — Attach a data disk to a Linux VM

---

## 🧠 Concept

An Azure VM normally has an OS disk that contains the operating system.

Additional data disks can be attached when more storage is required.

```plain text
Azure VM
│
├── OS Disk
│     └── Linux OS /
│
└── Data Disk
      └── Application / Data Storage
```

After attaching a new disk through Azure, Linux still needs to prepare and mount it before applications can use it.

For a new empty disk, the normal process is:

```plain text
Attach
  ↓
Partition
  ↓
Format
  ↓
Mount
  ↓
Persist
```

Microsoft's Linux VM documentation follows this general process: attach the disk, identify it with lsblk, partition/format a new empty disk, mount it, and add it to /etc/fstab for persistence.

---

# ☁️ Step 1: Attach a New Disk in Azure

Open:

```plain text
Azure Portal
    ↓
Virtual Machines
    ↓
Select VM
    ↓
Settings
    ↓
Disks
```

Under Data disks, select:

```plain text
Create and attach a new disk
```

Configure the disk according to your requirements:

```plain text
Disk Name
Storage Type
Size (GiB)
Encryption
Host Caching
```

Then save the VM configuration.

Azure creates the managed disk and attaches it to the VM.

---

# 🔐 Step 2: Connect to the VM

SSH into the Linux VM:

```bash
ssh azureuser@<PUBLIC_IP>
```

If a specific SSH key is required:

```bash
ssh -i ~/.ssh/<private-key> azureuser@<PUBLIC_IP>
```

Once connected, we can prepare the newly attached disk.

---

# 🔍 Step 3: Check Existing Disks

Run:

```bash
lsblk
```

For more details:

```bash
lsblk -o NAME,HCTL,SIZE,FSTYPE,MOUNTPOINT
```

Example:

```plain text
NAME    SIZE FSTYPE MOUNTPOINT
sda      30G
├─sda1 29.9G ext4   /
├─sda14   4M
└─sda15 106M vfat   /boot/efi
sdb      14G ext4   /mnt
sdc       4G
```

Here:

```plain text
sda → OS Disk
sdb → Existing disk
sdc → Newly attached disk
```

The exact device name can vary, so always identify the correct disk using lsblk rather than assuming it is /dev/sdc.

---

# ⚠️ Step 4: Check Whether the Disk Contains Data

Before formatting anything, verify that you are working with a new empty disk.

Formatting an existing disk can destroy its data.

> If the attached disk already contains data, do not run the partitioning and filesystem-creation commands below.

Microsoft specifically warns that the preparation steps for a new empty disk delete existing data.

---

# 🧩 Step 5: Partition the New Disk

For this example, assume the new disk is:

```plain text
/dev/sdc
```

Create a GPT partition covering the disk:

```bash
sudo parted /dev/sdc --script mklabel gpt mkpart xfspart xfs 0% 100%
```

The result becomes:

```plain text
/dev/sdc
   │
   └── /dev/sdc1
```

### Why GPT?

GPT stands for:

```plain text
GUID Partition Table
```

It is a modern disk partitioning scheme and is required for disks of 2 TiB or larger; Microsoft notes that disks smaller than 2 TiB can use either GPT or MBR.

---

# 📦 Step 6: Create a Filesystem

Create an XFS filesystem:

```bash
sudo mkfs.xfs /dev/sdc1
```

Then notify the kernel about the partition:

```bash
sudo partprobe /dev/sdc1
```

The storage structure is now:

```plain text
Azure Managed Disk
      ↓
/dev/sdc
      ↓
Partition
/dev/sdc1
      ↓
XFS Filesystem
```

Microsoft's example uses XFS for the new data disk and recommends partprobe so the kernel is aware of the new partition/filesystem.

---

# 📂 Step 7: Create a Mount Point

A filesystem needs a directory where it will be accessible.

For example:

```bash
sudo mkdir /datadrive
```

The directory:

```plain text
/datadrive
```

will become the entry point to the new disk.

---

# 🔗 Step 8: Mount the Disk

Mount the new partition:

```bash
sudo mount /dev/sdc1 /datadrive
```

The relationship is now:

```plain text
/dev/sdc
   ↓
/dev/sdc1
   ↓
XFS
   ↓
/datadrive
```

Applications and users can now access the new disk through:

```plain text
/datadrive
```

Microsoft documents the same mkdir → mount process for making the filesystem available to Linux.

---

# 🔍 Step 9: Verify the Mount

Run:

```bash
lsblk
```

You should now see something similar to:

```plain text
NAME    SIZE FSTYPE MOUNTPOINT
sda      30G
└─sda1 29.9G ext4   /
sdc       4G
└─sdc1    4G xfs    /datadrive
```

You can also use:

```bash
df -h
```

Look for:

```plain text
/dev/sdc1    ...    /datadrive
```

This confirms that the new disk is mounted.

---

# 🧪 Step 10: Test the Storage

Create a test file:

```bash
sudo touch /datadrive/test.txt
```

Verify:

```bash
ls -lah /datadrive
```

You should see:

```plain text
test.txt
```

This confirms that the mounted disk can be used for storage.

---

# ⚠️ Temporary vs Persistent Mount

The command:

```bash
sudo mount /dev/sdc1 /datadrive
```

mounts the disk immediately.

However:

```plain text
mount command
     ↓
Works now
     ↓
VM reboot
     ↓
Mount may disappear ❌
```

To automatically mount the disk after reboot, configure:

```plain text
/etc/fstab
```

---

# 🔑 Step 11: Get the Disk UUID

Instead of relying on /dev/sdc1, use the filesystem's UUID for persistent mounting.

Run:

```bash
sudo blkid
```

Example:

```plain text
/dev/sdc1: UUID="33333333-3b3b-3c3c-3d3d-3e3e3e3e3e3e" TYPE="xfs"
```

Copy the UUID.

Microsoft recommends UUIDs in /etc/fstab instead of device names such as /dev/sdc1, because device names can change.

---

# 📝 Step 12: Configure /etc/fstab

First, back up the file:

```bash
sudo cp /etc/fstab /etc/fstab.backup
```

Edit:

```bash
sudo vi /etc/fstab
```

Add:

```plain text
UUID=<DISK_UUID> /datadrive xfs defaults,nofail 1 2
```

Example:

```plain text
UUID=33333333-3b3b-3c3c-3d3d-3e3e3e3e3e3e /datadrive xfs defaults,nofail 1 2
```

The important option is:

```plain text
nofail
```

This allows the VM to continue booting if the disk is unavailable. Microsoft warns that incorrect /etc/fstab configuration can make a Linux VM unbootable and recommends backing it up before editing.

---

# 🧪 Step 13: Test /etc/fstab

Before rebooting, test the configuration.

Unmount:

```bash
sudo umount /datadrive
```

Then mount everything defined in /etc/fstab:

```bash
sudo mount -a
```

Check:

```bash
df -h
```

or:

```bash
lsblk
```

If /datadrive appears again:

```plain text
/dev/sdc1
     ↓
/etc/fstab
     ↓
/datadrive ✅
```

the persistent mount configuration is working.

---

# 🧠 Why Use UUID?

Device names such as:

```plain text
/dev/sdc1
```

can potentially change.

A UUID uniquely identifies the filesystem:

```plain text
Device Name
/dev/sdc1
    ↓
May change

UUID
33333333-...
    ↓
Stable filesystem identifier
```

Therefore:

```plain text
UUID → /datadrive
```

is safer for /etc/fstab than relying only on:

```plain text
/dev/sdc1 → /datadrive
```

---

# 📈 Understanding Disk Expansion

There are two related but different storage operations.

### Add a New Disk

```plain text
VM
├── OS Disk
└── New Data Disk
```

This is the workflow covered in this lab.

### Increase an Existing Disk

```plain text
Existing Disk
100 GB
   ↓
Resize
   ↓
200 GB
```

Increasing the Azure managed-disk size alone may not automatically make all of the additional capacity available to the Linux filesystem. Depending on the existing partition/filesystem layout, the partition and filesystem may also need to be expanded.

Always inspect:

```bash
lsblk
df -h
```

before and after storage changes.

---

# ⚠️ Important Notes

- Always use lsblk to identify the correct disk.

- Never format a disk that contains required data.

- mkfs.xfs creates a new filesystem and destroys existing filesystem data on the target partition.

- mount alone does not guarantee persistence after reboot.

- Use /etc/fstab for persistent mounts.

- Prefer filesystem UUIDs in /etc/fstab.

- Back up /etc/fstab before modifying it.

- nofail can prevent a missing data disk from blocking normal VM startup.

- Test /etc/fstab with mount -a before rebooting.

---

# ⚙️ Complete Workflow

Check disks:

```bash
lsblk
```

Assuming the new empty disk is /dev/sdc, partition it:

```bash
sudo parted /dev/sdc --script mklabel gpt mkpart xfspart xfs 0% 100%
```

Create the filesystem:

```bash
sudo mkfs.xfs /dev/sdc1
sudo partprobe /dev/sdc1
```

Create mount point:

```bash
sudo mkdir /datadrive
```

Mount:

```bash
sudo mount /dev/sdc1 /datadrive
```

Verify:

```bash
lsblk
df -h
```

Find UUID:

```bash
sudo blkid
```

Back up fstab:

```bash
sudo cp /etc/fstab /etc/fstab.backup
```

Configure:

```plain text
UUID=<DISK_UUID> /datadrive xfs defaults,nofail 1 2
```

Test:

```bash
sudo umount /datadrive
sudo mount -a
df -h
```

---

# 🧪 Validation Checklist

- [ ] Azure data disk created

- [ ] Disk attached to the correct VM

- [ ] Connected to VM through SSH

- [ ] New disk identified using lsblk

- [ ] Verified that disk is safe to format

- [ ] GPT partition created

- [ ] XFS filesystem created

- [ ] /datadrive created

- [ ] Disk mounted to /datadrive

- [ ] Mount verified with lsblk

- [ ] Disk usage verified with df -h

- [ ] Filesystem UUID retrieved

- [ ] /etc/fstab backed up

- [ ] Persistent mount configured

- [ ] mount -a succeeds

- [ ] /datadrive remains correctly mounted

---

# 📌 Summary

The storage flow is:

```plain text
Azure Portal
    ↓
Create Data Disk
    ↓
Attach to Linux VM
    ↓
lsblk
    ↓
Identify New Disk
    ↓
parted
    ↓
/dev/sdc1
    ↓
mkfs.xfs
    ↓
XFS Filesystem
    ↓
mkdir /datadrive
    ↓
mount
    ↓
/datadrive
    ↓
blkid
    ↓
UUID
    ↓
/etc/fstab
    ↓
Persistent Mount ✅
```

The main Linux commands are:

```bash
lsblk

sudo parted /dev/sdc --script mklabel gpt mkpart xfspart xfs 0% 100%
sudo mkfs.xfs /dev/sdc1
sudo partprobe /dev/sdc1

sudo mkdir /datadrive
sudo mount /dev/sdc1 /datadrive

lsblk
df -h

sudo blkid
```

Then configure /etc/fstab:

```plain text
UUID=<DISK_UUID> /datadrive xfs defaults,nofail 1 2
```

> Attaching a disk in Azure makes the block device available to the VM, but Linux must still partition, format, and mount a new empty disk. Configuring the filesystem UUID in /etc/fstab makes that mount persistent across reboots.
