### 🎯 Objective

Learn how to **install, start, and configure PostgreSQL**, create databases and users, and allow connections to the database server.

PostgreSQL is a **powerful open-source relational database** widely used in modern applications.

---

## 📜 What is PostgreSQL?

PostgreSQL is an advanced **SQL-based database system** that supports:

- ACID transactions
- Advanced indexing
- JSON support
- High-performance queries
- Extensibility

Used by companies like:

- Apple
- Instagram
- Reddit

---

## 1️⃣ Install PostgreSQL

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

### RHEL / CentOS / Amazon Linux

```bash
sudo yum install postgresql-server postgresql-contrib -y
```

Initialize database (RHEL/CentOS):

```bash
sudo postgresql-setup initdb
```

---

## 2️⃣ Start PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Check status:

```bash
sudo systemctl status postgresql
```

---

## 3️⃣ Login to PostgreSQL

Switch to postgres user:

```bash
sudo -i -u postgres
```

Open PostgreSQL shell:

```bash
psql
```

Prompt will appear:

```bash
postgres=#
```

Exit shell:

```bash
\q
```

---

## 4️⃣ Create Database

Inside `psql`:

```sql
CREATE DATABASE mydb;
```

List databases:

```bash
\l
```

---

## 5️⃣ Create Database User

```sql
CREATE USER dbuser WITH PASSWORD 'StrongPassword';
```

Grant privileges:

```sql
GRANT ALL PRIVILEGES ON DATABASE mydb TO dbuser;
```
