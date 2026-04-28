## 🎯 Objective

Automatically configure an instance at launch using User Data scripts.

---

## 🧠 Concept

- User Data → Script that runs when an instance starts (first boot)

- Used for:
  - Installing packages

  - Starting services

  - Configuring environment

- Common in cloud platforms like Amazon Web Services (EC2)

👉 Saves time → no manual setup after launch

---

## ⚙️ How It Works

1. Instance launches

1. Cloud-init reads User Data

1. Script executes automatically

---

## 🧩 Basic Example (Install Apache)

```plain text
#!/bin/bash

yum update-y
yum install-y httpd

systemctlstart httpd
systemctl enable httpd

echo"Welcome from User Data" > /var/www/html/index.html
```

---

## 🚀 Steps to Use User Data (EC2)

### 1️⃣ Launch Instance

- Go to EC2 dashboard

- Click Launch Instance

---

### 2️⃣ Add User Data Script

- Scroll to Advanced Details

- Paste script into User Data

---

### 3️⃣ Launch Instance

- Instance runs script automatically on first boot

---

## 🔍 Verification

### Check Service

```plain text
sudo systemctl status httpd
```

---

### Test Website

```plain text
curl http://localhost
```

---

### Check Logs

```plain text
sudocat /var/log/cloud-init-output.log
```

---

## ⚠️ Important Notes

- Runs only on first boot (by default)

- Must include shebang:

```plain text
#!/bin/bash
```

- Requires proper permissions and package manager (yum, apt)

---

## 🔄 Re-run User Data (Advanced)

```plain text
sudo cloud-init clean
sudo reboot
```

---

## 🧪 Validation Checklist

- [ ] Script added in User Data

- [ ] Apache installed

- [ ] Service running

- [ ] Website accessible

- [ ] Logs show successful execution

---

## 📌 Summary

User Data allows you to automate instance setup during launch, enabling consistent, repeatable, and fast provisioning without manual intervention.
