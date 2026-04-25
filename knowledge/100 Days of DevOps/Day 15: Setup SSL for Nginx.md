## 🎯 Objective

Configure SSL/TLS for Nginx to enable secure HTTPS communication.

---

## 🧠 What is SSL/TLS?

SSL/TLS encrypts communication between client and server.

👉 Benefits:

- Secure data transfer

- Prevents man-in-the-middle attacks

- Enables https:// access

---

## 📦 Step 1: Install Nginx

```plain text
sudo yum install-y nginx
```

Start and enable service:

```plain text
sudo systemctl enable--now nginx
```

---

## 🌐 Step 2: Verify HTTP Works

```plain text
curl localhost
curl http://localhost
```

✅ Expected: HTML response

---

## ❌ Step 3: Verify HTTPS Not Working (Before SSL)

```plain text
curl https://localhost
```

❌ Expected: Error (no SSL configured yet)

---

## 📁 Step 4: Create SSL Directory

```plain text
sudomkdir /etc/nginx/ssl
```

Move certificate and key:

```plain text
sudomv <config_name>.crt /etc/nginx/ssl
sudomv <config_name>.key /etc/nginx/ssl
```

Set secure permission:

```plain text
sudochmod600 /etc/nginx/ssl/<config_name>.key
```

---

## ⚙️ Step 5: Verify Nginx Main Config

```plain text
sudocat /etc/nginx/nginx.conf
```

Ensure this line exists:

```plain text
include /etc/nginx/conf.d/*.conf;
```

---

## 📝 Step 6: Create SSL Config File

```plain text
sudotouch /etc/nginx/conf.d/<config_name>.conf
sudovi /etc/nginx/conf.d/<config_name>.conf
```

Add:

```plain text
server {
    listen       443 ssl http2;
    listen       [::]:443 ssl http2;
    server_name  _;
    root         /usr/share/nginx/html;

    ssl_certificate "/etc/nginx/ssl/<config_name>.crt";
    ssl_certificate_key "/etc/nginx/ssl/<config_name>.key";

    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🧪 Step 7: Test Configuration

```plain text
sudo nginx-t
```

---

## 🔄 Step 8: Reload Nginx

```plain text
sudo nginx-s reload
sudo systemctlrestart nginx
```

---

## 🔒 Step 9: Test HTTPS

```plain text
curl--insecure https://localhost
```

👉 --insecure is required for self-signed certificates

---

## ✏️ Step 10: Update Web Page

```plain text
sudovi /usr/share/nginx/html/index.html
```

Add:

```plain text
Welcome!
```

Test again:

```plain text
curl--insecure https://localhost
```

---

## 🌍 Step 11: Test with Server Name

```plain text
curl--insecure https://<server_name>
curl-Ik https://<server_name>
```

---

## 📊 Key Concepts

### 🔐 SSL Certificate vs Key

---

### 🔑 Why chmod 600?

- Restricts access to owner only

- Protects sensitive private key

---

### ⚠️ Why -insecure?

- Self-signed certs are not trusted by default

- This flag bypasses verification

---

### 🌐 server_name _;

- Default catch-all server

- Handles requests without specific domain match

---

## 🧾 Command Summary

```plain text
sudo yum install-y nginx
sudo systemctl enable--now nginx

curl localhost
curl http://localhost
curl https://localhost

sudomkdir /etc/nginx/ssl
sudomv <config_name>.crt /etc/nginx/ssl
sudomv <config_name>.key /etc/nginx/ssl
sudochmod600 /etc/nginx/ssl/<config_name>.key

sudocat /etc/nginx/nginx.conf

sudotouch /etc/nginx/conf.d/<config_name>.conf
sudovi /etc/nginx/conf.d/<config_name>.conf

sudo nginx-t
sudo nginx-s reload
sudo systemctlrestart nginx

curl--insecure https://localhost

sudovi /usr/share/nginx/html/index.html

curl--insecure https://<server_name>
curl-Ik https://<server_name>
```

---

## ✅ Outcome

- Nginx serving content over HTTPS

- SSL certificate configured correctly

- Secure communication enabled
