### 🎯 Objective

Secure your website by enabling **HTTPS** using an **SSL/TLS certificate** so that communication between the client and server is encrypted.

---

## 📜 What is SSL/TLS?

**SSL (Secure Sockets Layer)** and **TLS (Transport Layer Security)** encrypt data between a browser and the server.

Benefits:

- 🔒 Encrypts sensitive data
- 🛡 Protects against MITM attacks
- 🌐 Enables **HTTPS**
- 📈 Improves SEO and trust

Example:

```
http://example.com   ❌ Not secure
https://example.com  ✅ Secure
```

---

# 1️⃣ Install SSL Certificate Tool

The most common free SSL provider is **Let's Encrypt**.

Install **Certbot** for Nginx.

### Ubuntu / Debian

```
sudo apt update
sudo apt install certbot python3-certbot-nginx-y
```

### RHEL / CentOS / Amazon Linux

```
sudo yum install epel-release-y
sudo yum install certbot python3-certbot-nginx-y
```

---

# 2️⃣ Configure Nginx Server Block

Edit your Nginx configuration:

```
sudo nano /etc/nginx/conf.d/example.conf
```

Example configuration:

```
server {
    listen 80;
    server_name example.com www.example.com;

    root /usr/share/nginx/html;
    index index.html;
}
```

Check configuration:

```
sudo nginx-t
```

Reload Nginx:

```
sudo systemctl reload nginx
```

---

# 3️⃣ Generate SSL Certificate

Run:

```
sudo certbot--nginx-d example.com-d www.example.com
```

Certbot will:

- Verify domain ownership
- Generate certificate
- Update Nginx config automatically

Example prompt:

```
Select redirect option:
1: No redirect
2: Redirect HTTP → HTTPS
```

Choose:

```
2
```

---

# 4️⃣ Test HTTPS

Open browser:

```
https://example.com
```

You should see 🔒 **Secure connection**.

---

# 5️⃣ SSL Certificate Location

Certificates are stored in:

```
/etc/letsencrypt/live/example.com/
```

Important files:

| File          | Purpose         |
| ------------- | --------------- |
| fullchain.pem | SSL certificate |
| privkey.pem   | Private key     |

---

# 6️⃣ Automatic SSL Renewal

Let's Encrypt certificates expire every **90 days**.

Test renewal:

```
sudo certbot renew--dry-run
```

Check cron job:

```
sudo systemctl list-timers |grep certbot
```

---

# 7️⃣ Verify SSL Configuration

Check SSL using:

```
https://www.ssllabs.com/ssltest/
```

---

# 🧠 Architecture Flow

```
User Browser
      │
      │ HTTPS Request
      ▼
   Nginx Server
      │
      │ SSL Decryption
      ▼
   Web Application
```

---

# 🧪 Troubleshooting

### Check Nginx Status

```
sudo systemctl status nginx
```

### Test Configuration

```
sudo nginx-t
```

### Check Firewall

```
sudo firewall-cmd--list-all
```

Ports required:

```
80 (HTTP)
443 (HTTPS)
```

---

# ✅ Summary

| Step            | Command                                          |
| --------------- | ------------------------------------------------ |
| Install certbot | `sudo apt install certbot python3-certbot-nginx` |
| Generate SSL    | `sudo certbot --nginx -d domain.com`             |
| Test config     | `sudo nginx -t`                                  |
| Reload nginx    | `sudo systemctl reload nginx`                    |
| Test renewal    | `sudo certbot renew --dry-run`                   |
