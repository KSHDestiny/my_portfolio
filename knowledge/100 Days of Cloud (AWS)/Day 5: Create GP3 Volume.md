### 🎯 Objective

Create an Amazon EBS gp3 volume to provide additional storage for an EC2 instance.

### 💾 What is an EBS Volume?

An Elastic Block Store (EBS) volume is persistent block storage that can be attached to an EC2 instance. It behaves like a virtual hard disk.

Common uses:

- Application storage

- Databases

- File systems

- Backup storage

### ⚡ What is a gp3 Volume?

gp3 (General Purpose SSD) is AWS’s latest generation of general-purpose SSD EBS volumes.

Key features:

- High performance SSD storage

- Lower cost compared to gp2

- Independent configuration of IOPS and throughput

- Suitable for most workloads

### 📊 gp3 Specifications (at a glance)

### 🛠️ Create a gp3 volume (AWS Console)

1. Sign in to AWS Console: https://console.aws.amazon.com/

1. Go to EC2
  - Open Services

  - Search for EC2

  - Open EC2 Dashboard

1. Open Volumes
  - Left sidebar: Elastic Block Store → Volumes

  - Click Create volume

1. Configure the volume
  - Volume type: gp3

  - Size: example 10 GiB

  - Availability Zone: same AZ as your EC2 instance

  - IOPS: default 3000

  - Throughput: default

  - Click Create volume

### 🔗 Attach the volume to an EC2 instance

1. Select the new volume

1. Click Actions → Attach volume

1. Choose:
  - Instance: your EC2 instance

  - Device name: /dev/xvdf

1. Click Attach volume

### 🔍 Verify the attachment

- Go to: EC2 → Instances

- Select the instance and check the Storage section

- The volume must be in the same Availability Zone as the EC2 instance.

- After attaching, the volume must be formatted and mounted inside the OS.

- gp3 typically provides better performance and lower cost than gp2.
