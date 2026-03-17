## 🎯 Objective

Learn how to install, configure, and manage **Linux firewall rules** using iptables to control incoming and outgoing network traffic.

---

# 📘 What is iptables?

**iptables** is a **command-line firewall utility** used to manage network traffic rules in the Linux kernel.

It allows administrators to:

- Allow or block traffic
- Filter packets
- Protect servers from unauthorized access
- Control network communication

iptables works with the **Linux Netfilter framework**.

---

# 🔍 How iptables Works

iptables filters packets using **rules** organized into **tables and chains**.

### Tables

| Table  | Purpose                            |
| ------ | ---------------------------------- |
| filter | Default table for packet filtering |
| nat    | Network address translation        |
| mangle | Packet modification                |
| raw    | Advanced packet processing         |

---

### Chains

| Chain   | Purpose                        |
| ------- | ------------------------------ |
| INPUT   | Incoming traffic               |
| OUTPUT  | Outgoing traffic               |
| FORWARD | Traffic passing through server |

---

# 📦 Install iptables

Most Linux systems already include iptables.

Install on **RHEL / CentOS / Rocky Linux**

```
sudo yum install iptables-services-y
```

Install on **Ubuntu / Debian**

```
sudo apt install iptables-y
```

---

# 🔎 Check iptables Status

List current rules:

```
sudo iptables-L
```

Detailed view:

```
sudo iptables-L-v-n
```

Explanation:

| Option | Meaning                |
| ------ | ---------------------- |
| -L     | List rules             |
| -v     | Verbose                |
| -n     | Show numeric addresses |

---

# 📊 View Rules with Line Numbers

```
sudo iptables-L--line-numbers
```

Useful when deleting specific rules.

---

# 🚀 Start iptables Service

```
sudo systemctlstart iptables
```

Enable at boot:

```
sudo systemctl enable iptables
```

Check status:

```
sudo systemctl status iptables
```

---

# 🛡 Basic iptables Rules

### Allow SSH traffic

```
sudo iptables-A INPUT-p tcp--dport22-j ACCEPT
```

Meaning:

| Option     | Explanation      |
| ---------- | ---------------- |
| -A         | Append rule      |
| INPUT      | Incoming traffic |
| -p tcp     | Protocol         |
| --dport 22 | Destination port |
| ACCEPT     | Allow packet     |

---

### Allow HTTP traffic

```
sudo iptables-A INPUT-p tcp--dport80-j ACCEPT
```

---

### Allow HTTPS traffic

```
sudo iptables-A INPUT-p tcp--dport443-j ACCEPT
```

---

### Block a specific IP

```
sudo iptables-A INPUT-s192.168.1.100-j DROP
```

Meaning:

Drop all traffic from that IP.

---

### Allow localhost traffic

```
sudo iptables-A INPUT-i lo-j ACCEPT
```

---

### Allow established connections

```
sudo iptables-A INPUT-m state--state ESTABLISHED,RELATED-j ACCEPT
```

---

# ❌ Drop All Other Traffic

Set default policy:

```
sudo iptables-P INPUT DROP
```

Meaning:

All incoming traffic is blocked unless explicitly allowed.

---

# 🧹 Delete iptables Rules

Delete specific rule:

```
sudo iptables-D INPUT2
```

Delete by rule specification:

```
sudo iptables-D INPUT-p tcp--dport80-j ACCEPT
```

---

# 🔄 Flush All Rules

Remove all rules:

```
sudo iptables-F
```

Delete all chains:

```
sudo iptables-X
```

---

# 💾 Save iptables Rules

Rules disappear after reboot unless saved.

Save rules:

```
sudoservice iptables save
```

or

```
sudo iptables-save > /etc/sysconfig/iptables
```

---

# 🔁 Restore Rules

```
sudo iptables-restore < /etc/sysconfig/iptables
```

---

# 🌐 Check Listening Ports

Useful when configuring firewall:

```
sudo ss-tulnp
```

---

# 🧪 Example Firewall Configuration

Allow only:

- SSH
- HTTP
- HTTPS

Block everything else.

```
sudo iptables-F

sudo iptables-A INPUT-i lo-j ACCEPT

sudo iptables-A INPUT-m state--state ESTABLISHED,RELATED-j ACCEPT

sudo iptables-A INPUT-p tcp--dport22-j ACCEPT
sudo iptables-A INPUT-p tcp--dport80-j ACCEPT
sudo iptables-A INPUT-p tcp--dport443-j ACCEPT

sudo iptables-P INPUT DROP
```

---

# ⚠ Common iptables Issues

### Locked out from SSH

If SSH rule missing:

```
sudo iptables-A INPUT-p tcp--dport22-j ACCEPT
```

Always allow SSH **before setting DROP policy**.

---

### Firewall rules lost after reboot

Fix:

Save rules:

```
sudo iptables-save
```

---

### Service not running

Check:

```
sudo systemctl status iptables
```

---

# 📁 Important iptables Files

| File                      | Purpose                 |
| ------------------------- | ----------------------- |
| `/etc/sysconfig/iptables` | Saved firewall rules    |
| `/etc/services`           | Port-to-service mapping |

---

# 🧰 Useful iptables Commands

| Command            | Purpose       |
| ------------------ | ------------- |
| `iptables -L`      | List rules    |
| `iptables -A`      | Add rule      |
| `iptables -D`      | Delete rule   |
| `iptables -F`      | Flush rules   |
| `iptables-save`    | Save rules    |
| `iptables-restore` | Restore rules |

---

# 🔎 Example Troubleshooting

### Web server not reachable

Check firewall:

```
sudo iptables-L
```

If port 80 blocked:

```
sudo iptables-A INPUT-p tcp--dport80-j ACCEPT
```

Restart service if needed.

---

# ✅ Key Learning Points

- iptables is the **Linux firewall management tool**
- It controls **network traffic rules**
- Uses **tables, chains, and rules**
- Always allow **SSH before applying DROP policy**
- Save rules to keep them after reboot
