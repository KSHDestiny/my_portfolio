## 🎯 Objective

Fix service accessibility issues by ensuring:

- Apache runs on HTTPS (custom port)

- Port is not conflicted

- Firewall (iptables) allows traffic

- Everything else is blocked securely

---

# 🧠 Scenario

👉 You try:

```plain text
curl-k https://localhost:8443
```

❌ Not working → Possible causes:

- Apache not running

- Port conflict

- Port not allowed in iptables

- SELinux blocking

---

# 🔍 Step 1: Check Apache Service

```plain text
sudo systemctl status httpd# Ubuntu: apache2
```

If not running:

```plain text
sudo systemctlstart httpd
sudo systemctl enable httpd
```

---

# 🔍 Step 2: Check Port Configuration

## Apache SSL config

```plain text
sudovi /etc/httpd/conf.d/ssl.conf
```

Make sure:

```plain text
Listen 8443 https

<VirtualHost *:8443>
    DocumentRoot "/var/www/html"
    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/localhost.crt
    SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
</VirtualHost>
```

---

## 🔍 Check if port is in use

```plain text
sudo ss-tulnp |grep :8443
```

### ❗ If conflict:

```plain text
sudo lsof-i :8443
```

👉 Stop conflicting service OR change port

---

# 🔴 Step 3: SELinux Check (RHEL/CentOS)

👉 Apache cannot use random ports by default

### Fix:

```plain text
sudo semanage port-a-t http_port_t-p tcp8443
```

---

# 🔥 Step 4: Configure iptables (Using I)

## ⚠️ Clean (optional)

```plain text
sudo iptables-F
sudo iptables-X
```

---

## 🔒 Default policy (secure)

```plain text
sudo iptables-P INPUT DROP
sudo iptables-P FORWARD DROP
sudo iptables-P OUTPUT ACCEPT
```

---

## ✅ Insert rules (TOP priority)

### 1. Allow localhost

```plain text
sudo iptables-I INPUT1-i lo-j ACCEPT
```

---

### 2. Allow established connections

```plain text
sudo iptables-I INPUT2-m conntrack--ctstate ESTABLISHED,RELATED-j ACCEPT
```

---

### 3. Allow SSH

```plain text
sudo iptables-I INPUT3-p tcp--dport22-j ACCEPT
```

---

### 4. Allow HTTPS (custom port)

```plain text
sudo iptables-I INPUT4-p tcp--dport8443-j ACCEPT
```

---

# 🔍 Step 5: Verify Rule Order

```plain text
sudo iptables-L--line-numbers
```

Expected:

```plain text
1  ACCEPT  lo
2  ACCEPT  ESTABLISHED,RELATED
3  ACCEPT  tcp dpt:22
4  ACCEPT  tcp dpt:8443
5  DROP    all
```

👉 Order matters → iptables reads top → down

---

# 💾 Step 6: Save Rules

### RHEL / CentOS

```plain text
sudo iptables-save |sudotee /etc/sysconfig/iptables
```

### Ubuntu

```plain text
sudo netfilter-persistent save
```

---

# 🧪 Step 7: Test

## From server:

```plain text
curl-k https://localhost:8443
```

## From browser:

```plain text
https://<server-ip>:8443
```

---

# 🧩 Troubleshooting Flow (REAL)

```plain text
Service down
   ↓
Check systemctl
   ↓
Check port (ss / lsof)
   ↓
Check SELinux
   ↓
Check iptables (order!)
   ↓
Test with curl
```

---

# ⚠️ Common Mistakes

- ❌ Using A instead of I (rule order wrong)

- ❌ Forgetting SELinux config

- ❌ Port not actually listening

- ❌ Firewall blocking port

- ❌ Apache config wrong

---

# 🧠 DevOps Insight

👉 Always debug in this order:

> Service → Port → SELinux → Firewall → Test
