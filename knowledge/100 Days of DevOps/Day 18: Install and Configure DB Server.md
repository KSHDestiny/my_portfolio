### 🎯 Objective

Learn how to install, start, and configure a database server so applications can store and retrieve data securely and efficiently.

A database server stores structured data and allows applications to communicate with it using SQL.

Common database servers include:

- MySQL

- MariaDB

- PostgreSQL

For this exercise we will configure MariaDB, a popular open-source database server.

---

# 1️⃣ Install MariaDB Server

### Ubuntu / Debian

```plain text
sudo apt update
sudo apt install mariadb-server -y
```

### RHEL / CentOS / Amazon Linux

```plain text
sudo yum install mariadb-server -y
```

---

# 2️⃣ Start and Enable Database Service

Start the server:

```plain text
sudo systemctlstart mariadb
```

Enable it at boot:

```plain text
sudo systemctl enable mariadb
```

Check status:

```plain text
sudo systemctl status mariadb
```

---

# 3️⃣ Secure the Database Installation

Run the security script:

```plain text
sudo mysql_secure_installation
```

This script helps you:

- Set root password

- Remove anonymous users

- Disable remote root login

- Remove test database

- Reload privilege tables

Example prompt:

```plain text
Set root password? Y
Remove anonymous users? Y
Disallow root login remotely? Y
Remove test database? Y
Reload privilege tables? Y
```

---

# 4️⃣ Login to Database Server

```plain text
sudo mysql
```

You will see:

```plain text
MariaDB [(none)]>
```

Exit:

```plain text
exit;
```

---

# 5️⃣ Create a Database

```plain text
CREATE DATABASE companydb;
```

Show databases:

```plain text
SHOW DATABASES;
```

---

# 6️⃣ Create a Database User

```plain text
CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'StrongPassword';
```

Grant privileges:

```plain text
GRANT ALL PRIVILEGES ON companydb.*TO'dbuser'@'localhost';
```

Apply privileges:

```plain text
FLUSH PRIVILEGES;
```

---

# 7️⃣ Test Database Connection

Login using the new user:

```plain text
mysql -u dbuser -p companydb
```

---

# 8️⃣ Check Database Port

Default database port:

```plain text
3306
```

Check listening port:

```plain text
sudo ss-tunlp | grep3306
```

---

# 🧠 Database Server Architecture

```plain text
Client Application
        │
        ▼
   Database Server
        │
        ▼
     Databases
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
Tables Tables Tables
```

---

# 🧪 Troubleshooting

### Check service status

```plain text
sudo systemctl status mariadb
```

### Restart database server

```plain text
sudo systemctl restart mariadb
```

### View logs

```plain text
sudo journalctl -u mariadb
```

---

# ✅ Summary
