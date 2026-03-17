### 🎯 Objective

Learn how to **deploy a web application on a Linux server** by installing a web server and configuring it to serve application files.

In many environments, applications run on a web server like:

- Apache HTTP Server
- Nginx

In this example, we will deploy a simple **PHP web application** using **Apache**.

---

## 1️⃣ Install Apache Web Server

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install apache2 -y
```

### RHEL / CentOS / Amazon Linux

```bash
sudo yum install httpd -y
```

---

## 2️⃣ Start and Enable Apache

Start service:

```bash
sudo systemctl start httpd
```

Enable at boot:

```bash
sudo systemctl enable httpd
```

Check status:

```bash
sudo systemctl status httpd
```

---

## 3️⃣ Install PHP for Web Application

Install PHP and required modules:

```bash
sudo yum install php php-mysqlnd php-fpm php-json php-cli -y
```

Restart Apache:

```bash
sudo systemctl restart httpd
```

---

## 4️⃣ Deploy Web Application

Default Apache web root:

```text
/var/www/html/
```

Create a test application:

```bash
sudo nano /var/www/html/index.php
```

Example code:

```php
<?php
echo "Web Application is Running Successfully!";
?>
```

---

## 5️⃣ Set Correct Permissions

```bash
sudo chown -R apache:apache /var/www/html
sudo chmod -R 755 /var/www/html
```

---

## 6️⃣ Configure Firewall

Allow HTTP traffic:

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

Ports used:

| Port | Protocol |
| ---- | -------- |
| 80   | HTTP     |
| 443  | HTTPS    |

---

## 7️⃣ Test Web Application

Open in browser:

```text
http://your-server-ip
```
