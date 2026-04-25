## 🔐 What is a Security Group?

A Security Group (SG) acts as a virtual firewall that controls inbound and outbound traffic for your virtual machine (EC2 instance).

- Works at instance level

- Stateful (return traffic is automatically allowed)

- Supports Allow rules only

## 🛠️ Steps to Create a Security Group in AWS

### 1️⃣ Sign in to AWS Console

- Go to AWS Management Console

- Navigate to: Services → EC2 → Security Groups

### 2️⃣ Click "Create Security Group"

Fill in the details:

- Security group name → (e.g. datacenter-sg)

- Description → Allow SSH and HTTP access

- VPC → Select your VPC

### 🔽 Configure Inbound Rules

Click Add Rule and configure:

- Use My IP instead of Anywhere for SSH.

- Avoid opening port 22 to the whole internet.

### 🔼 Configure Outbound Rules

- Default rule allows All traffic

- Usually no changes needed

### 3️⃣ Click Create Security Group

Your Security Group is now ready.

## 🔗 Attach Security Group to EC2 Instance

1. Go to EC2 → Instances

1. Select your instance

1. Click Actions → Security → Change security groups

1. Select your new SG

1. Click Save

## 🎯 Result

- SSH access controlled

- Web traffic allowed

- Instance protected by firewall rules

- Secure and production-ready configuration

## 📚 Additional Guides

- 🔁 Modify existing Security Group

- 🚫 Restrict SSH to corporate IP

- 🏗️ Production-level security group architecture

- ☁️ Azure NSG version of this guide
