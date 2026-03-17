### 🎯 Objective

Configure **Nginx to execute PHP applications using PHP-FPM via a Unix socket**, which is usually faster than TCP for local communication.

---

## 📜 What is PHP-FPM?

**PHP-FPM (FastCGI Process Manager)** manages PHP worker processes and allows web servers like Nginx to execute PHP scripts efficiently.

Flow:

```text
Browser -> Nginx -> PHP-FPM -> PHP Application
```

---

## 1️⃣ Install Nginx and PHP-FPM

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install nginx php-fpm php-mysql -y
```

### RHEL / CentOS / Amazon Linux

```bash
sudo yum install nginx php php-fpm php-mysqlnd -y
```

---

## 2️⃣ Start and Enable Services

Start services:

```bash
sudo systemctl start nginx
sudo systemctl start php-fpm
```

Enable at boot:

```bash
sudo systemctl enable nginx
sudo systemctl enable php-fpm
```

Check status:

```bash
sudo systemctl status nginx
sudo systemctl status php-fpm
```

---

## 3️⃣ Configure PHP-FPM Unix Socket

Edit configuration:

```bash
sudo nano /etc/php-fpm.d/www.conf
```

Find:

```text
listen = 127.0.0.1:9000
```

Change to:

```text
listen = /run/php-fpm/www.sock
```

Set permissions:

```text
listen.owner = nginx
listen.group = nginx
listen.mode = 0660
```

Restart PHP-FPM:

```bash
sudo systemctl restart php-fpm
```

---

## 4️⃣ Configure Nginx to Use Socket

Edit Nginx configuration:

```bash
sudo nano /etc/nginx/conf.d/default.conf
```

Example configuration:

```nginx
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
