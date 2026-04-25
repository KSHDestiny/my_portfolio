### 🎯 Objective

Launch an Amazon EC2 (Elastic Compute Cloud) instance to create a virtual server in the AWS cloud.

EC2 instances allow users to run applications, host websites, and perform computing tasks on scalable infrastructure.

### ☁️ What is EC2?

Amazon EC2 provides resizable compute capacity in the cloud.

It allows you to launch virtual machines called instances.

Common use cases:

- Web servers

- Application servers

- DevOps environments

- Development and testing systems

### 🛠️ Steps to Launch an EC2 Instance (AWS Console)

1. Sign in to AWS
  Go to the AWS Management Console:

  - https://console.aws.amazon.com/

1. Navigate to EC2
  - Click Services

  - Search for EC2

  - Open the EC2 Dashboard

1. Launch Instance
  Click: Launch Instance

1. Configure Instance Details
  Fill in the following:

  - Name → devops-ec2

  - Amazon Machine Image (AMI) → Amazon Linux 2 or Ubuntu

  - Instance Type → t2.micro

  - Key Pair → Select an existing key pair

1. Configure Network Settings
  - VPC → Select your VPC

  - Subnet → Choose subnet

  - Auto-assign Public IP → Enable

  - Security Group → Allow SSH (Port 22)

  Example rule:

  - Type: SSH

  - Protocol: TCP

  - Port: 22

  - Source: My IP

1. Configure Storage
  Example configuration:

  - Volume Type: gp3 (SSD)

  - Size: 8 GiB

  This storage is provided by Amazon EBS.

1. Launch Instance
  Click: Launch Instance

  AWS will deploy the EC2 instance.

### 🔍 Verify Instance

Navigate to: EC2 → Instances

Check:

- Instance state → Running

- Public IP address

- Instance ID

### 🔐 Connect to the Instance

Use SSH:

ssh -i keypair.pem ec2-user@<public-ip>

Example:

ssh -i devops-key.pem ec2-user@3.91.124.55

### 📡 Check EC2 Instance Metadata

EC2 instances expose metadata that provides information about the instance.

Metadata includes:

- Instance ID

- Public IP

- Private IP

- Availability Zone

- Security groups

- IAM role

You can access it from inside the instance.

Check all metadata categories

curl http://169.254.169.254/latest/meta-data/

Example output:

ami-id

hostname

instance-id

local-ipv4

public-ipv4

security-groups

Get Instance ID

curl http://169.254.169.254/latest/meta-data/instance-id

Get Public IP

curl http://169.254.169.254/latest/meta-data/public-ipv4

Get Private IP

curl http://169.254.169.254/latest/meta-data/local-ipv4

### ⚠️ Important Notes

- Metadata is only accessible inside the EC2 instance.

- Metadata uses a special link-local IP: 169.254.169.254.

- Do not expose metadata access to untrusted applications.

### 🎯 Result

- EC2 instance successfully launched

- Connected via SSH

- Instance metadata accessible for automation and configuration
