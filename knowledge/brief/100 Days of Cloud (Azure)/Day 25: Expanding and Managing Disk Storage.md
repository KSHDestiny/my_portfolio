### Key Idea

Attach additional disk storage to an Azure Linux Virtual Machine, prepare the disk, mount it to the filesystem, and configure it to remain mounted after a reboot.

### What Matters

- Always use lsblk to identify the correct disk.
- Never format a disk that contains required data.
- mkfs.xfs creates a new filesystem and destroys existing filesystem data on the target partition.
- mount alone does not guarantee persistence after reboot.
- Use /etc/fstab for persistent mounts.

### Quick Summary

The overall process is: Reference: Microsoft Learn — Attach a data disk to a Linux VM
