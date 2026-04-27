## 🎯 Objective

Learn how to:

- Launch an EC2 instance

- Allocate and associate an Elastic IP

- Prepare the server for application hosting

---

## 🧠 What is EC2?

Amazon EC2 (Elastic Compute Cloud) is a service that provides scalable virtual servers in the cloud.

👉 You can:

- Run backend apps (Laravel, Node.js)

- Host APIs

- Deploy full-stack applications

---

## 🧠 What is an Elastic IP?

An Elastic IP address is a static public IP address that:

- Does not change after reboot

- Can be re-associated to another instance

👉 Useful for:

- Stable DNS mapping

- Production servers

- Avoiding IP change issues

---

## ⚙️ Architecture Overview

```plain text
User Request
     ↓
Elastic IP (Static Public IP)
     ↓
EC2 Instance (Web Server)
     ↓
Application (Laravel / Node.js / React API)
```

---

## 🚀 Step 1: Launch EC2 Instance

### 🔹 1. Go to AWS Console

- Navigate to EC2 Dashboard

### 🔹 2. Launch Instance

Basic Configuration:

- Name: app-server

- AMI: Amazon Linux / Ubuntu

- Instance Type: t2.micro (free tier)

Key Pair:

- Create or select existing .pem key

Network Settings:

- Allow:
  - SSH (22)

  - HTTP (80)

  - HTTPS (443)

---

## 🔐 Step 2: Connect to EC2 via SSH

```plain text
chmod400 my-key.pem

ssh-i my-key.pem ec2-user@<public-ip>
```

👉 For Ubuntu:

```plain text
ssh-i my-key.pem ubuntu@<public-ip>
```

---

## 🌐 Step 3: Allocate Elastic IP

### 🔹 1. Go to Elastic IPs

- Click Allocate Elastic IP

### 🔹 2. Allocate

- Use default settings

- Click Allocate

---

## 🔗 Step 4: Associate Elastic IP with EC2

- Select Elastic IP

- Click Actions → Associate

- Choose your EC2 instance

👉 Now your server has a static public IP

---

## 🧪 Step 5: Verify Connection

```plain text
ping <elastic-ip>
```

Open browser:

```plain text
http://<elastic-ip>
```

---

## 🧩 Step 6: Install Basic Web Server

### 🔹 For Amazon Linux:

```plain text
sudo yum update-y
sudo yum install-y nginx
sudo systemctl enable--now nginx
```

### 🔹 For Ubuntu:

```plain text
sudo apt update
sudo apt install-y nginx
sudo systemctl enable--now nginx
```

---

## 🔍 Step 7: Test Web Server

```plain text
curl http://localhost
```

👉 Or open in browser:

```plain text
http://<elastic-ip>
```

You should see Nginx default page

---

## 🧠 Key Concepts

---

## ⚠️ Best Practices

- 🔒 Restrict SSH access (avoid 0.0.0.0/0)

- 🔑 Never expose .pem key

- 💸 Release unused Elastic IP (to avoid charges)

- 🔄 Use Elastic IP for production stability

- 🛡️ Consider using a Load Balancer later

---

## 🧪 Real-World Use Case

👉 Hosting your backend:

- Laravel API (PHP-FPM + Nginx)

- Node.js API (PM2 + Nginx reverse proxy)

- Full stack app (React + API)

---

## 📌 Summary

- EC2 provides compute power

- Elastic IP provides stable public access

- Together → perfect for production-ready hosting
