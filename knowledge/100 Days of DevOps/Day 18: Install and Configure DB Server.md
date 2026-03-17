### 🎯 Objective

Learn how to **install, start, and configure a database server** so applications can store and retrieve data securely and efficiently.

A database server stores structured data and allows applications to communicate with it using SQL.

Common database servers include:

- MySQL
- MariaDB
- PostgreSQL

For this exercise, we will configure **MariaDB**, a popular open-source database server.

---

## 1️⃣ Install MariaDB Server

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install mariadb-server -y
```

### RHEL / CentOS / Amazon Linux

```bash
sudo yum install mariadb-server -y
```

---

## 2️⃣ Start and Enable Database Service

Start the server:

```bash
sudo systemctl start mariadb
```

Enable it at boot:

```bash
sudo systemctl enable mariadb
```

Check status:

```bash
sudo systemctl status mariadb
```

---

## 3️⃣ Secure the Database Installation

Run the security script:

```bash
sudo mysql_secure_installation
```

This script helps you:

- Set root password
- Remove anonymous users
- Disable remote root login
- Remove test database
- Reload privilege tables

Example prompt flow:

```text
Set root password? Y
Remove anonymous users? Y
Disallow root login remotely? Y
Remove test database? Y
Reload privilege tables? Y
```

---

## 4️⃣ Login to Database Server

```bash
sudo mysql
```

You will see:

```text
MariaDB [(none)]>
```

Exit:

```sql
exit;
```

---

## 5️⃣ Create a Database

```sql
CREATE DATABASE companydb;
```

Show databases:

```sql
SHOW DATABASES;
```

---

## 6️⃣ Create a Database User

```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'StrongPassword';
GRANT ALL PRIVILEGES ON companydb.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```
