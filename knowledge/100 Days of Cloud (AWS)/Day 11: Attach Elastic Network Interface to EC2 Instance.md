## 🎯 Objective

Attach an Elastic Network Interface (ENI) to an EC2 instance to enable:

- Multiple IP addresses

- Network separation

- Advanced networking setups

---

## 🧠 What is an ENI?

An Elastic Network Interface (ENI) is a virtual network card in AWS.

### Key Features:

- Private IP address (primary + secondary)

- Optional Elastic IP

- Security groups

- MAC address

- Can be attached/detached from instances

---

## 🏗️ How It Works

```plain text
Internet → ENI → EC2 Instance
```

👉 An EC2 instance can have multiple ENIs attached.

---

## 📌 Use Cases

- Multi-network architecture (public + private traffic)

- High availability / failover setups

- Running multiple services on different IPs

- Network appliances (firewall, proxy)

---

## 🛠️ Method 1: Attach ENI via AWS Console

### 📍 Step 1: Create ENI

1. Go to EC2 Dashboard

1. Click Network Interfaces

1. Click Create network interface

1. Configure:
  - Subnet (must match instance AZ)

  - Private IP (auto or manual)

  - Security group

1. Click Create

---

### 🔗 Step 2: Attach ENI

1. Select the ENI

1. Click Actions → Attach

1. Choose:
  - Instance

  - Device index (e.g., 1)

1. Click Attach

---

## ⚙️ Method 2: Using AWS CLI

### 📌 Step 1: Create ENI

```plain text
aws ec2 create-network-interface \
--subnet-id subnet-123456 \
--groups sg-123456
```

---

### 📌 Step 2: Attach ENI

```plain text
aws ec2 attach-network-interface \
--network-interface-id eni-123456 \
--instance-id i-1234567890abcdef0 \
--device-index1
```

---

## 🔍 Verify ENI Attachment

```plain text
aws ec2 describe-instances \
--instance-ids i-1234567890abcdef0
```

---

## 🧩 Device Index Explained

---

## 🖥️ Inside EC2 Instance (Linux)

Check interfaces:

```plain text
ip a
```

You’ll see:

```plain text
eth0 → primary ENI
eth1 → attached ENI
```

---

## 🔐 Security Considerations

- Each ENI has its own security groups

- Rules apply per interface

- Useful for isolating traffic

---

## ⚠️ Important Notes

- ENI must be in same Availability Zone as EC2

- Cannot detach primary ENI (eth0)

- Instance type limits number of ENIs

- Secondary ENIs can be moved to another instance

---

## 🚀 Real DevOps Use Cases

- Blue/Green deployment using network switch

- Failover by reattaching ENI

- Separate backend/admin traffic

- Running firewall/proxy servers

---

## 🧪 Example Scenario

👉 You run:

- Web traffic → eth0 (public subnet)

- Internal DB traffic → eth1 (private subnet)

---

## 🧠 DevOps Tip

👉 Use ENI for advanced networking & failover design

👉 Combine with Elastic IP + Security Groups for production setups
