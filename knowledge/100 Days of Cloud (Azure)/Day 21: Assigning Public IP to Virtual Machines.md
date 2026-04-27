## 🎯 Objective

Learn how to:

- Assign a Public IP to a Virtual Machine

- Understand dynamic vs static IP

- Enable external access to your server

---

## 🧠 What is a Public IP?

A Public IP Address is an IP that allows your VM to be accessed from the internet.

👉 Without Public IP:

- VM is private (internal network only)

👉 With Public IP:

- VM is accessible from anywhere (via SSH / HTTP / API)

---

## 🧠 Public IP Types

---

## 🌐 Cloud Examples

- AWS → Elastic IP address

- Azure → Azure Public IP Address

- GCP → Static / Ephemeral External IP

---

## ⚙️ Architecture Overview

```plain text
Internet User
     ↓
Public IP (Static / Dynamic)
     ↓
Virtual Machine (EC2 / Azure VM / GCE)
     ↓
Application (Web Server / API)
```

---

## 🚀 Method 1: Assign Public IP During VM Creation

### 🔹 AWS (EC2)

Using Amazon EC2

- Enable:
  - Auto-assign Public IP → Enable

👉 Instance gets dynamic public IP

---

### 🔹 Azure VM

- During creation:
  - Choose Public IP → Create New

  - Select:
    - Basic / Standard

    - Static / Dynamic

👉 Public IP is attached automatically

---

## 🔗 Method 2: Assign Public IP After Creation

---

### ☁️ AWS (Elastic IP)

### Steps:

1. Allocate Elastic IP

1. Associate with EC2 instance

👉 Result:

- Static Public IP attached to VM

---

### ☁️ Azure

### Steps:

1. Go to VM → Networking

1. Attach Public IP resource

1. Save configuration

---

## 🔐 Step 3: Allow Traffic (Firewall / Security Rules)

### AWS (Security Group)

Allow:

- SSH → Port 22

- HTTP → Port 80

- HTTPS → Port 443

---

### Azure (NSG - Network Security Group)

Allow:

- Inbound rules for:
  - 22 (SSH)

  - 80 (HTTP)

  - 443 (HTTPS)

---

## 🧪 Step 4: Test Public Access

### 🔹 SSH Access

```plain text
ssh user@<public-ip>
```

---

### 🔹 Web Access

```plain text
http://<public-ip>
```

---

## 🧠 Key Concepts

---

## ⚠️ Best Practices

- 🔒 Restrict SSH access (use specific IP)

- 🔑 Use key-based authentication

- 🚫 Avoid exposing unnecessary ports

- 💸 Release unused static IPs (cost applies)

- 🛡️ Use reverse proxy (Nginx) for apps

---

## 🧩 Real-World Use Case

👉 Your production server:

- Assign Static Public IP

- Map domain (DNS → IP)

- Deploy:
  - Laravel backend

  - Node.js API

  - Nginx reverse proxy

---

## 📌 Summary

- Public IP enables internet access

- Static IP ensures stability

- Must configure firewall + security
