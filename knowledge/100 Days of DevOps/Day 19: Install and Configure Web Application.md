### 🎯 Objective

Learn how to deploy a web application on a Linux server by installing a web server and configuring it to serve application files.

In many environments, applications run on a web server like:

- Apache HTTP Server

- Nginx

In this example, we will deploy a simple PHP web application using Apache.

---

# 1️⃣ Install Apache Web Server

### Ubuntu / Debian

```plain text
sudo apt update
sudo apt install apache2 -y
```

### RHEL / CentOS / Amazon Linux

```plain text
sudo yum install httpd -y
```

---

# 2️⃣ Start and Enable Apache

Start service:

```plain text
sudo systemctl start httpd
```

Enable at boot:

```plain text
sudo systemctl enable httpd
```

Check status:

```plain text
sudo systemctl status httpd
```

---

# 3️⃣ Install PHP for Web Application

Install PHP and required modules:

```plain text
sudo yum install php php-mysqlnd php-fpm php-json php-cli-y
```

Restart Apache:

```plain text
sudo systemctl restart httpd
```

---

# 4️⃣ Deploy Web Application

Default Apache web root:

```plain text
/var/www/html/
```

Create a test application:

```plain text
sudo nano /var/www/html/index.php
```

Example code:

```plain text
<?php
echo"Web Application is Running Successfully!";
?>
```

---

# 5️⃣ Set Correct Permissions

```plain text
sudo chown -R apache:apache /var/www/html
sudo chmod -R 755 /var/www/html
```

---

# 6️⃣ Configure Firewall

Allow HTTP traffic:

```plain text
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

Ports used:

---

# 7️⃣ Test Web Application

Open browser:

```plain text
http://server-ip
```

You should see:

```plain text
Web Application is Running Successfully!
```

---

# 🧠 Web Application Architecture

```plain text
User Browser
     │
     ▼
 Web Server (Apache)
     │
     ▼
 Application Code (PHP)
     │
     ▼
 Database Server
```

Example database servers:

- MariaDB

- PostgreSQL

---

# 🧪 Troubleshooting

### Check Apache status

```plain text
sudo systemctl status httpd
```

### Check logs

```plain text
sudo tail -f /var/log/httpd/error_log
```

### Test configuration

```plain text
sudo apachectl configtest
```

---

# ✅ Summary
