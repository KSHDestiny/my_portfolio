## 🎯 Objective

Allocate an Elastic IP (EIP) in AWS to provide a static public IP address that can be attached to an EC2 instance. Unlike normal public IPs, Elastic IPs do not change when the instance stops or restarts.

---

## 🌐 Types of IP Addresses in AWS

### Private IP

- Used for internal communication inside a VPC

- Automatically assigned to every EC2 instance

- Cannot be accessed from the internet

- Does not change during the instance lifecycle

Example: 172.31.25.14

Used for:

- Application communication

- Database connections

- Internal services

### Public IP

- Used to access EC2 instances from the internet

- Automatically assigned when launching an instance (if enabled)

- Changes when the instance stops and starts

Example: 3.91.124.55

Used for:

- SSH access

- Web servers

- Public APIs

### Elastic IP

- A static public IPv4 address provided by AWS

- Can be attached or moved between instances

- Does not change even if the instance stops or restarts

Example: 54.210.22.11

Used for:

- Production web servers

- DNS mapping

- High availability systems

---

## 🌐 What is an Elastic IP?

An Elastic IP is a static IPv4 address designed for dynamic cloud computing.

### Benefits

- Static public IP address

- Can be reassigned between instances

- Useful for production servers

- Prevents IP changes when instance restarts

### Example use cases

- Web servers

- Bastion hosts

- Load balancers

- DNS records pointing to servers

---

## 🛠️ Steps to Allocate Elastic IP (AWS Console)

1. Sign in to AWS
  - Go to the AWS Management Console: https://console.aws.amazon.com/

1. Navigate to EC2
  - Click Services

  - Search for EC2

  - Open EC2 Dashboard

1. Open Elastic IP section
  - Left sidebar: Network & Security → Elastic IPs

1. Allocate new Elastic IP
  1. Click Allocate Elastic IP address

  1. Keep default settings:
    - Network Border Group → Default region

    - IP Address Pool → Amazon pool

  1. Click Allocate

---

## 🔗 Associate Elastic IP with an EC2 instance

1. Select the Elastic IP

1. Click Actions → Associate Elastic IP address

1. Choose:
  - Resource type → Instance

  - Instance → Select your EC2 instance

1. Click Associate

---

## 🔍 Verify

Go to EC2 → Instances.

Your instance should now show the Elastic IP as its public IP.

---

## ⚠️ Important notes

- AWS charges for unused Elastic IPs

- 5 Elastic IPs per region by default

- Release unused Elastic IPs to avoid extra cost

- Elastic IPs are designed for production workloads
