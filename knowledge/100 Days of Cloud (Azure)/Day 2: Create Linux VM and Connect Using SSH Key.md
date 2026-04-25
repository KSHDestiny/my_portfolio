- Go to the Microsoft Azure Portal

- https://portal.azure.com/

- Navigate to: Home → Virtual Machines

- Click Create → Azure virtual machine

- Subscription: Select your subscription

- Resource group: Choose existing (example: kml_rg_main_3908bbd1fc154dfd)

- Virtual machine name: example datacenter-vm-01

- Region: Choose your preferred region

- Image: Linux OS (example: Ubuntu Server 22.04 LTS)

- Size: Choose a VM size (example: Standard_B1s for testing)

- Authentication type: ✅ SSH public key

- Username: example azureuser

- SSH public key source: Use existing key

- Select your previously created key (example: datacenter-kp)

This ensures secure, passwordless login, and only users with the private key can access the VM.

- Public inbound ports: Allow selected ports

- Select SSH (22)

⚠️ If port 22 is not allowed, SSH will fail.

OS disk type

- Standard HDD: Low cost

- Standard SSD: Balanced performance

- Premium SSD: High performance

OS disk size (GiB)

- Example: 30 GB, 64 GB, 128 GB

Notes:

- Default is often 30 GB

- Larger disk increases cost

- Disk can be expanded later (cannot be reduced)

- Click Review + create

- Click Create

- Wait for deployment to complete

After deployment:

1. Go to Virtual Machines → your VM

1. Copy the Public IP address

1. Open Terminal (Mac/Linux) or PowerShell (Windows)

Run:

```bash
ssh -i /path/to/private-key.pem azureuser@<Public-IP>
```

Example:

```bash
ssh -i datacenter-kp.pem azureuser@20.204.xxx.xxx
```

- Keep your private key (.pem) secure

- Never share your private key

- If the private key is lost, access may be permanently lost

- Set strict permissions on the key:

```bash
chmod 400 datacenter-kp.pem
```

In Networking → Network security group → Inbound security rules:

- Allow SSH from your IP only
  - Source: IP Addresses (your public IP, or CIDR like 203.0.113.10/32)

  - Source port ranges: *

  - Destination: Any

  - Service: SSH

  - Destination port ranges: 22

  - Protocol: TCP

  - Action: Allow

  - Priority: 1000

  - Name: Allow-SSH-MyIP

- Deny SSH from Internet (fallback guardrail)
  - Source: Internet

  - Destination port: 22

  - Protocol: TCP

  - Action: Deny

  - Priority: 1010

  - Name: Deny-SSH-Internet

Notes:

- Prefer using Azure Bastion instead of opening SSH to the internet.

- If you must allow SSH broadly, limit it temporarily and remove it after setup.
