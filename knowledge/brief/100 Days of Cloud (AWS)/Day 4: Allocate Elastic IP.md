### Key Idea

Allocate an Elastic IP (EIP) in AWS to provide a static public IP address that can be attached to an EC2 instance. Unlike normal public IPs, Elastic IPs do not change when the instance stops or restarts.

### What Matters

- Used for internal communication inside a VPC
- Automatically assigned to every EC2 instance
- Cannot be accessed from the internet
- Does not change during the instance lifecycle
- Application communication

### Quick Summary

Example: 172.31.25.14 Used for:
