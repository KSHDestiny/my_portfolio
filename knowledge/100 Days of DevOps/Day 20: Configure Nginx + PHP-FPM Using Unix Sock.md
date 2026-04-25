### 🎯 Objective

Configure Nginx to execute PHP applications using PHP-FPM via a Unix socket, which is faster than using TCP ports because communication happens locally through a file.

---

# 📜 What is PHP-FPM?

PHP-FPM (FastCGI Process Manager) manages PHP worker processes and allows web servers like Nginx to execute PHP scripts efficiently.

Flow:

```plain text
Browser → Nginx → PHP-FPM → PHP Application
```

---

# 1️⃣ Install Nginx and PHP-FPM

### Ubuntu / Debian

```plain text
sudo apt update
sudo apt install nginx php-fpm php-mysql-y
```

### RHEL / CentOS / Amazon Linux

```plain text
sudo yum install nginx php php-fpm php-mysqlnd-y
```

---

# 2️⃣ Start and Enable Services

Start services:

```plain text
sudo systemctlstart nginx
sudo systemctlstart php-fpm
```

Enable at boot:

```plain text
sudo systemctl enable nginx
sudo systemctl enable php-fpm
```

Check status:

```plain text
sudo systemctl status nginx
sudo systemctl status php-fpm
```

---

# 3️⃣ Configure PHP-FPM Unix Socket

Edit configuration:

```plain text
sudo nano /etc/php-fpm.d/www.conf
```

Find:

```plain text
listen = 127.0.0.1:9000
```

Change to:

```plain text
listen = /run/php-fpm/www.sock
```

Set permissions:

```plain text
listen.owner = nginx
listen.group = nginx
listen.mode = 0660
```

Restart PHP-FPM:

```plain text
sudo systemctl restart php-fpm
```

---

# 4️⃣ Configure Nginx to Use Socket

Edit Nginx configuration:

```plain text
sudo nano /etc/nginx/conf.d/default.conf
```

Example configuration:

```plain text
server {
    listen 80;
    server_name example.com;

    root /usr/share/nginx/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php-fpm/www.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

---

# 5️⃣ Test Configuration

```plain text
sudo nginx -t
```

Expected output:

```plain text
syntax is ok
test is successful
```

---

# 6️⃣ Restart Nginx

```plain text
sudo systemctl restart nginx
```

---

# 7️⃣ Create Test PHP File

```plain text
sudo nano /usr/share/nginx/html/info.php
```

Add:

```plain text
<?php
phpinfo();
?>
```

Open browser:

```plain text
http://server-ip/info.php
```

You should see the PHP configuration page.

---

# 🧠 Architecture

```plain text
Client Browser
      │
      ▼
   Nginx Web Server
      │
      ▼
Unix Socket (/run/php-fpm/www.sock)
      │
      ▼
    PHP-FPM
      │
      ▼
 PHP Application
```

---

# ⚡ Why Use Unix Socket Instead of TCP?

Example comparison:

```plain text
TCP: 127.0.0.1:9000
Socket: /run/php-fpm/www.sock
```

---

# 🧪 Troubleshooting

### Check PHP-FPM socket

```plain text
ls-l /run/php-fpm/
```

### Check Nginx logs

```plain text
sudo tail-f /var/log/nginx/error.log
```

### Restart services

```plain text
sudo systemctlrestart nginx
sudo systemctlrestart php-fpm
```

---

# ✅ Summary
