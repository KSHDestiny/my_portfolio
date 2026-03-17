## 🎯 Objective

Understand and manage common **Linux network services**, learn how they work, and how to start, stop, and troubleshoot them.

---

# 📘 What are Linux Network Services?

**Network services** are background processes that allow a system to provide functionality over a network.

They allow computers to communicate and share resources such as:

- Web pages
- Files
- Remote login
- Databases
- DNS resolution

These services usually run as **daemons** in the background.

---

# ⚙ Common Linux Network Services

| Service | Purpose                               | Default Port |
| ------- | ------------------------------------- | ------------ |
| SSH     | Secure remote login                   | 22           |
| HTTP    | Web server communication              | 80           |
| HTTPS   | Secure web communication              | 443          |
| FTP     | File transfer between systems         | 21           |
| DNS     | Converts domain names to IP addresses | 53           |
| SMTP    | Sending email                         | 25           |

---

# 🔍 Checking Running Network Services

### List active services

```
systemctl list-units--type=service
```

Shows all currently running services.

---

### Check a specific service

Example:

```
sudo systemctl status sshd
```

or

```
sudo systemctl status httpd
```

This shows:

- Whether service is running
- Process ID
- Logs
- Startup status

---

# 🚀 Starting and Stopping Services

Start service:

```
sudo systemctlstart sshd
```

Stop service:

```
sudo systemctlstop sshd
```

Restart service:

```
sudo systemctlrestart sshd
```

Enable service on boot:

```
sudo systemctl enable sshd
```

Disable service on boot:

```
sudo systemctl disable sshd
```

---

# 🌐 Checking Open Network Ports

### Using `ss`

```
sudo ss-tulnp
```

Explanation:

| Option | Meaning             |
| ------ | ------------------- |
| t      | TCP                 |
| u      | UDP                 |
| l      | listening           |
| n      | numeric output      |
| p      | process information |

Example:

```
sudo ss-tulnp |grep22
```

---

### Using `netstat`

```
sudo netstat-tulnp
```

---

# 📡 Checking Network Connections

List active connections:

```
ss-tunap
```

---

# 🧪 Testing Network Services

### Test SSH connection

```
ssh user@server-ip
```

---

### Test HTTP service

```
curl http://localhost
```

---

### Test port connectivity

```
telnet localhost80
```

or

```
nc-zv localhost80
```

---

# 📁 Important Network Configuration Files

| File                   | Purpose                  |
| ---------------------- | ------------------------ |
| `/etc/hosts`           | Local DNS resolution     |
| `/etc/resolv.conf`     | DNS server configuration |
| `/etc/services`        | Port-to-service mapping  |
| `/etc/ssh/sshd_config` | SSH server configuration |

---

# 🔧 Example: Managing SSH Service

Check SSH status:

```
sudo systemctl status sshd
```

Start SSH:

```
sudo systemctlstart sshd
```

Enable SSH at boot:

```
sudo systemctl enable sshd
```

Restart SSH after config change:

```
sudo systemctlrestart sshd
```

---

# 🔎 Check Network Interface

Show network interfaces:

```
ip addr
```

or

```
ip a
```

---

# 🌍 Test Internet Connectivity

Ping Google DNS:

```
ping8.8.8.8
```

Test DNS resolution:

```
ping google.com
```

---

# 🛠 Troubleshooting Network Services

### Step 1: Check service status

```
systemctl status service-name
```

---

### Step 2: Check listening port

```
ss-tulnp |grep PORT
```

---

### Step 3: Check firewall rules

```
sudo firewall-cmd--list-all
```

or

```
sudo iptables-L
```

---

### Step 4: Check logs

```
journalctl-u service-name
```

---

# ⚠ Common Network Service Problems

### Service not running

Fix:

```
sudo systemctlstart service-name
```

---

### Port blocked by firewall

Open port:

```
sudo firewall-cmd--add-port=80/tcp--permanent
sudo firewall-cmd--reload
```

---

### DNS not resolving

Check:

```
cat /etc/resolv.conf
```

---

### Service running but not reachable

Check:

- firewall
- bind address
- port configuration

---

# 📊 Example Workflow

Example: Web server not accessible.

Check service:

```
sudo systemctl status httpd
```

Check port:

```
sudo ss-tulnp |grep80
```

Check firewall:

```
sudo firewall-cmd--list-all
```

Test locally:

```
curl http://localhost
```

---

# 🧾 Useful Network Commands

| Command      | Purpose                 |
| ------------ | ----------------------- |
| `ip a`       | Show network interfaces |
| `ss -tulnp`  | Show listening ports    |
| `ping`       | Test connectivity       |
| `curl`       | Test web services       |
| `netstat`    | Show network statistics |
| `traceroute` | Trace network path      |
| `hostname`   | Show system hostname    |

---

# ✅ Key Learning Points

- Network services allow systems to communicate over the network
- Services are managed using **systemctl**
- Ports determine how services communicate
- Tools like `ss`, `curl`, `ping`, and `netstat` help diagnose issues
- Firewall configuration can affect network service accessibility
