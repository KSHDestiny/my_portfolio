## 🎯 Objective

Learn how to install, configure, and manage Linux firewall rules using iptables to control incoming and outgoing network traffic.

---

# 📘 What is iptables?

iptables is a command-line firewall utility used to manage network traffic rules in the Linux kernel.

It allows administrators to:

- Allow or block traffic

- Filter packets

- Protect servers from unauthorized access

- Control network communication

iptables works with the Linux Netfilter framework.

---

# 🔍 How iptables Works

iptables filters packets using rules organized into tables and chains.

### Tables

---

### Chains

---

# 📦 Install iptables

Most Linux systems already include iptables.

Install on RHEL / CentOS / Rocky Linux

```plain text
sudo yum install iptables-services-y
```

Install on Ubuntu / Debian

```plain text
sudo apt install iptables-y
```

---

# 🔎 Check iptables Status

List current rules:

```plain text
sudo iptables-L
```

Detailed view:

```plain text
sudo iptables-L-v-n
```

Explanation:

---

# 📊 View Rules with Line Numbers

```plain text
sudo iptables-L--line-numbers
```

Useful when deleting specific rules.

---

# 🚀 Start iptables Service

```plain text
sudo systemctl start iptables
```

Enable at boot:

```plain text
sudo systemctl enable iptables
```

Check status:

```plain text
sudo systemctl status iptables
```

---

# 🛡 Basic iptables Rules

### Allow SSH traffic

```plain text
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

Meaning:

---

### Allow HTTP traffic

```plain text
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

---

### Allow HTTPS traffic

```plain text
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

---

### Block a specific IP

```plain text
sudo iptables -A INPUT -s 192.168.1.100 -j DROP
```

Meaning:

Drop all traffic from that IP.

---

### Allow localhost traffic

```plain text
sudo iptables -A INPUT -i lo -j ACCEPT
```

---

### Allow established connections

```plain text
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

---

# ❌ Drop All Other Traffic

Set default policy:

```plain text
sudo iptables -P INPUT DROP
```

Meaning:

All incoming traffic is blocked unless explicitly allowed.

---

# 🧹 Delete iptables Rules

Delete specific rule:

```plain text
sudo iptables -D INPUT2
```

Delete by rule specification:

```plain text
sudo iptables -D INPUT -p tcp --dport 80 -j ACCEPT
```

---

# 🔄 Flush All Rules

Remove all rules:

```plain text
sudo iptables -F
```

Delete all chains:

```plain text
sudo iptables -X
```

---

# 💾 Save iptables Rules

Rules disappear after reboot unless saved.

Save rules:

```plain text
sudo service iptables save
```

or

```plain text
sudo iptables-save > /etc/sysconfig/iptables
```

---

# 🔁 Restore Rules

```plain text
sudo iptables-restore < /etc/sysconfig/iptables
```

---

# 🌐 Check Listening Ports

Useful when configuring firewall:

```plain text
sudo ss-tulnp
```

---

# 🧪 Example Firewall Configuration

Allow only:

- SSH

- HTTP

- HTTPS

Block everything else.

```plain text
sudo iptables -F

sudo iptables -A INPUT -i lo -j ACCEPT

sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

sudo iptables -P INPUT DROP
```

---

# ⚠ Common iptables Issues

### Locked out from SSH

If SSH rule missing:

```plain text
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

Always allow SSH before setting DROP policy.

---

### Firewall rules lost after reboot

Fix:

Save rules:

```plain text
sudo iptables-save
```

---

### Service not running

Check:

```plain text
sudo systemctl status iptables
```

---

# 📁 Important iptables Files

---

# 🧰 Useful iptables Commands

---

# 🔎 Example Troubleshooting

### Web server not reachable

Check firewall:

```plain text
sudo iptables -L
```

If port 80 blocked:

```plain text
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

Restart service if needed.

---

# ✅ Key Learning Points

- iptables is the Linux firewall management tool

- It controls network traffic rules

- Uses tables, chains, and rules

- Always allow SSH before applying DROP policy

- Save rules to keep them after reboot
