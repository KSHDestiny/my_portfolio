## 🎯 Objective

Learn how to securely connect to an Azure Virtual Machine (VM) using SSH (Secure Shell).

---

## 🧠 What is SSH?

SSH (Secure Shell) is a protocol used to securely access and manage remote servers.

👉 Used for:

- Server management

- Deployment

- Debugging applications

- Running commands remotely

---

## ☁️ What is an Azure VM?

An Azure VM is a cloud-based server provided by Microsoft Azure.

👉 It behaves like a normal Linux/Windows server but runs in the cloud.

---

## 📋 Prerequisites

Before connecting, make sure:

- ✅ VM is created

- ✅ Public IP address is available

- ✅ Port 22 (SSH) is open in Network Security Group (NSG)

- ✅ You have:
  - Username (e.g., azureuser)

  - SSH private key (.pem) OR password

---

## 🔍 Step 1: Get VM Public IP

Go to:

- Azure Portal → Virtual Machines → Your VM

👉 Copy:

```plain text
Public IP Address
```

Example:

```plain text
20.55.100.10
```

---

## 🔑 Step 2: Set Permission for Key (Important)

```plain text
chmod400 my-key.pem
```

👉 Restricts access (required for SSH security)

---

## 🛠️ Step 3: SSH into VM (Using Key)

```plain text
ssh-i my-key.pem azureuser@20.55.100.10
```

### 🧠 Breakdown:

- ssh → SSH command

- i my-key.pem → private key

- azureuser → VM username

- 20.55.100.10 → public IP

---

## 🔐 Alternative: SSH Using Password

```plain text
ssh azureuser@20.55.100.10
```

👉 Then enter password when prompted.

---

## ⚙️ Step 4: First-Time Connection

You may see:

```plain text
Are you sure you want to continue connecting (yes/no)?
```

👉 Type:

```plain text
yes
```

---

## 🧪 Step 5: Verify Connection

Once connected, you’ll see:

```plain text
azureuser@vm-name:~$
```

Test:

```plain text
whoami
```

Expected output:

```plain text
azureuser
```

---

## 🚫 Common Errors & Fixes

### ❌ Permission denied (publickey)

👉 Fix:

```plain text
chmod400 my-key.pem
```

---

### ❌ Connection timed out

👉 Check:

- NSG allows port 22

- VM is running

---

### ❌ Host unreachable

👉 Check:

- Public IP is correct

- Internet connectivity

---

## 🔥 Advanced: Using SSH Config (Cleaner Way)

Edit config file:

```plain text
nano ~/.ssh/config
```

Add:

```plain text
Host azure-vm
    HostName20.55.100.10
    User azureuser
    IdentityFile ~/my-key.pem
```

Now connect easily:

```plain text
ssh azure-vm
```

---

## 🧩 Real-World Use Cases

- Deploy Laravel / Node apps

- Configure Nginx / Apache

- Setup Docker containers

- Monitor logs & debug issues

---

## ⚠️ Security Best Practices

- ❌ Don’t share .pem file

- ❌ Avoid root login

- ✅ Use SSH keys instead of password

- ✅ Restrict IP access in NSG

- ✅ Rotate keys periodically

---

## 📌 Summary

- SSH = secure remote access

- Requires IP + username + key/password

- Port 22 must be open

- Essential for cloud server management
