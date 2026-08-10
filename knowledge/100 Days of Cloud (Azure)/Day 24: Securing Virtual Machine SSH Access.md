## 🎯 Objective

Create an Azure Linux Virtual Machine and configure secure remote access using SSH key-based authentication.

Instead of authenticating to the VM with a password:

```plain text
Username + Password
```

we use:

```plain text
Username + SSH Key Pair
```

The goal is:

```plain text
Local Machine
     │
     │ SSH Private Key
     ▼
Azure Virtual Machine
     │
     │ Verify against Public Key
     ▼
Secure SSH Access
```

---

## 🧠 Concept

SSH (Secure Shell) is a protocol used to securely connect to remote Linux servers.

The standard SSH port is:

```plain text
TCP 22
```

There are two common authentication methods:

```plain text
SSH Authentication
      │
      ├── Password Authentication
      │
      └── SSH Key Authentication ✅
```

For this setup, we use SSH key-based authentication.

---

## 🔑 SSH Key-Based Authentication

SSH key authentication uses a pair of cryptographic keys:

```plain text
SSH Key Pair
    │
    ├── Private Key 🔐
    │
    └── Public Key 🔑
```

### Private Key

The private key remains on your local machine.

Example:

```plain text
~/.ssh/id_ed25519
```

or:

```plain text
~/.ssh/id_rsa
```

It should never be shared or uploaded publicly.

### Public Key

The public key can be safely installed on the Azure VM.

Example:

```plain text
~/.ssh/id_ed25519.pub
```

The relationship is:

```plain text
Local Machine                         Azure VM

Private Key                           Public Key
     │                                     │
     └──────── Authentication ─────────────┘
                        │
                        ▼
                   SSH Access
```

The private key itself is not sent to the server during login.

---

# 🔑 Step 1: Check Existing SSH Keys

On your local machine, check:

```bash
ls -lah ~/.ssh
```

You may already have:

```plain text
id_ed25519
id_ed25519.pub
```

or:

```plain text
id_rsa
id_rsa.pub
```

Remember:

```plain text
id_ed25519      → Private Key 🔐
id_ed25519.pub  → Public Key 🔑
```

---

# 🛠️ Step 2: Generate an SSH Key

If you don't already have an SSH key pair, generate one:

```bash
ssh-keygen -t ed25519
```

Follow the prompts to select where the key should be stored and optionally configure a passphrase.

You can then verify:

```bash
ls -lah ~/.ssh
```

---

# 👀 Step 3: View the Public Key

Display the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

The output will look similar to:

```plain text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... user@machine
```

This is the key that can be added to the Azure VM.

⚠️ Do not use:

```bash
cat ~/.ssh/id_ed25519
```

for copying to Azure.

That file is the private key and must remain secret.

---

# ☁️ Step 4: Create an Azure Virtual Machine

In the Azure Portal, go to:

```plain text
Azure Portal
    ↓
Virtual Machines
    ↓
Create
    ↓
Azure Virtual Machine
```

Configure the basic VM settings such as:

```plain text
Resource Group
VM Name
Region
Image
VM Size
```

For example:

```plain text
Image → Ubuntu Server
```

---

# 👤 Step 5: Configure Administrator Account

Under the administrator account configuration, select:

```plain text
Authentication type
        ↓
SSH public key
```

Set an administrator username.

Example:

```plain text
azureuser
```

The login identity becomes:

```plain text
azureuser@<VM-IP>
```

---

# 🔑 Step 6: Add the SSH Public Key

Azure can either generate a new key pair or allow you to provide an existing public key, depending on the VM creation flow you choose.

When using your existing key, provide the contents of:

```plain text
~/.ssh/id_ed25519.pub
```

Conceptually:

```plain text
Local Machine

~/.ssh/id_ed25519.pub
        │
        │ Public Key
        ▼
      Azure
        │
        ▼
   Create VM
        │
        ▼
~azureuser/.ssh/authorized_keys
```

The VM stores the authorized public key for the administrator account.

---

# 🔐 Step 7: Configure SSH Inbound Access

The VM must allow SSH network traffic.

The Network Security Group should contain an inbound rule for:

```plain text
Protocol    → TCP
Destination → Port 22
Action      → Allow
```

Conceptually:

```plain text
Your Machine
     │
     │ TCP :22
     ▼
Azure NSG
     │
     │ Allow
     ▼
Azure VM
     │
     ▼
SSH Service
```

For better security, restrict the source to your trusted public IP or network when practical instead of allowing SSH from every internet address.

---

# 🌐 Step 8: Get the VM Public IP

After the VM has been created, find its:

```plain text
Public IP Address
```

You can also retrieve it using Azure CLI:

```bash
az vm show \
  --resource-group <resource-group> \
  --name <vm-name> \
  --show-details \
  --query publicIps \
  -o tsv
```

Example result:

```plain text
20.x.x.x
```

---

# 🚀 Step 9: Connect Using SSH

Connect to the VM:

```bash
ssh azureuser@<PUBLIC_IP>
```

For example:

```bash
ssh azureuser@20.x.x.x
```

SSH uses your private key on the local machine to authenticate against the public key configured for azureuser on the VM.

If the correct key is not selected automatically, specify it:

```bash
ssh -i ~/.ssh/id_ed25519 azureuser@<PUBLIC_IP>
```

---

## ⚙️ How Authentication Works

When you run:

```bash
ssh azureuser@<PUBLIC_IP>
```

the simplified authentication flow is:

```plain text
Local Machine
     │
     │ Has Private Key
     ▼
SSH Client
     │
     │ Connect :22
     ▼
Azure NSG
     │
     ▼
Azure VM
     │
     ▼
SSH Server
     │
     │ Check authorized public key
     ▼
Authentication Challenge
     │
     │ Prove possession of Private Key
     ▼
Access Granted ✅
```

The important concept is:

> The private key stays on your local machine.

---

# 📁 Public Key on the VM

For the Azure administrator user, authorized SSH public keys are typically stored under:

```plain text
~/.ssh/authorized_keys
```

For example:

```plain text
/home/azureuser/.ssh/authorized_keys
```

After logging into the VM, you can inspect:

```bash
cat ~/.ssh/authorized_keys
```

This should contain the public key authorized for the account.

---

# 🔍 Step 10: Verify the Connection

After successfully connecting:

```bash
whoami
```

Expected:

```plain text
azureuser
```

Check the machine:

```bash
hostname
```

You can also check:

```bash
pwd
```

This confirms that you are now operating inside the Azure VM.

---

# 🛡️ Why SSH Keys Are Better Than Passwords

Password authentication relies on something the user knows:

```plain text
Username
   +
Password
```

SSH key authentication relies on possession of the private key:

```plain text
Public Key
     ↕
Cryptographic Verification
     ↕
Private Key
```

SSH keys are generally preferred for cloud server administration because they:

- Resist password guessing attacks

- Support strong cryptographic authentication

- Avoid sending or storing a reusable login password for SSH

- Work well with automation

- Can be individually managed and revoked

---

# 🔒 Protect the Private Key

The most important security rule is:

> Never share your private SSH key.

Private:

```plain text
~/.ssh/id_ed25519
```

Public:

```plain text
~/.ssh/id_ed25519.pub
```

Think of them as:

```plain text
Private Key 🔐
    │
    └── KEEP SECRET

Public Key 🔑
    │
    └── Can be installed on servers
```

Check private-key permissions:

```bash
ls -l ~/.ssh/id_ed25519
```

If necessary:

```bash
chmod 600 ~/.ssh/id_ed25519
```

---

# ⚠️ Important Notes

- SSH normally uses TCP port 22.

- The private key stays on the client machine.

- The public key is installed on the VM.

- Azure NSG rules must permit the required SSH traffic.

- Restricting SSH inbound access to trusted source IPs is safer than exposing port 22 to the entire internet.

- ~/.ssh/authorized_keys contains public keys authorized to log into an account.

- Never share or commit a private SSH key to Git.

- A passphrase can provide additional protection for the private key.

---

# 🧪 Validation Checklist

- [ ] SSH key pair available

- [ ] Private key stored securely

- [ ] Public key identified

- [ ] Azure VM created

- [ ] Authentication type configured for SSH public key

- [ ] azureuser configured

- [ ] Public key added to VM

- [ ] NSG permits required SSH traffic

- [ ] VM public IP retrieved

- [ ] SSH connection successful

- [ ] whoami returns azureuser

- [ ] No private key exposed

---

# 📌 Summary

SSH key authentication uses:

```plain text
Local Machine
│
├── id_ed25519      🔐 Private
│
└── id_ed25519.pub  🔑 Public
                         │
                         │ Add during VM creation
                         ▼
                    Azure VM
                         │
                         ▼
              authorized_keys
```

Connect using:

```bash
ssh azureuser@<PUBLIC_IP>
```

or explicitly select the key:

```bash
ssh -i ~/.ssh/id_ed25519 azureuser@<PUBLIC_IP>
```

The complete flow is:

```plain text
Create SSH Key Pair
        ↓
Keep Private Key Locally 🔐
        ↓
Add Public Key to Azure 🔑
        ↓
Create Azure VM
        ↓
Allow SSH through NSG
        ↓
ssh azureuser@<PUBLIC_IP>
        ↓
VM verifies key ownership
        ↓
Secure Key-Based Login ✅
```

The key takeaway is:

> SSH key-based authentication secures Azure VM access by keeping the private key on the client while the VM stores only the corresponding public key.
