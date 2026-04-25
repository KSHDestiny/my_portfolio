### 🌐 What is a Subnet?

A subnet is a smaller network created inside a VPC (Virtual Private Cloud).

- A VPC might have CIDR: 172.31.0.0/16

- A subnet divides that VPC into smaller network ranges (for example, /20, /24)

- Each subnet belongs to one Availability Zone

### 📐 Example VPC CIDR

VPC CIDR: 172.31.0.0/16

- /16 means:
  - 16 bits for network

  - 16 bits for hosts

  - Total IPs = 2^{16} = 65,536

### 📘 Example Subnet CIDR

Subnet CIDR: 172.31.96.0/20

Breakdown:

- /20 → 20 network bits

- Remaining 12 bits for hosts

- Total IPs = 2^{12} = 4,096 IP addresses

### 📍 Address Calculation

For subnet 172.31.96.0/20:

- Network address → 172.31.96.0

- Broadcast address → 172.31.111.255

- Total IPs → 4,096

### ⚠️ AWS Reserved IPs

AWS reserves 5 IP addresses in each subnet:

1. Network address

1. VPC router

1. DNS

1. Future use

1. Broadcast

So usable IPs:

- 4096 - 5 = 4091 usable IP addresses

### 🛠️ Steps to Create a Subnet in AWS Console

1. Go to AWS Management Console

1. Navigate to: VPC → Subnets

1. Click Create subnet

Fill in details:

- VPC ID → Select your VPC (172.31.0.0/16)

- Subnet name → for example, devops-public-subnet

- Availability Zone → for example, us-east-1a

- IPv4 CIDR block → 172.31.96.0/20

Click Create subnet

### 🔐 Public vs Private Subnet

- Public subnet
  - Has route to an Internet Gateway

  - Used for web servers and bastion hosts

- Private subnet
  - No direct internet access

  - Used for databases and internal services

### 🎯 Result

- Subnet created inside the VPC

- 4,091 usable IP addresses

- Ready for EC2 instance deployment
