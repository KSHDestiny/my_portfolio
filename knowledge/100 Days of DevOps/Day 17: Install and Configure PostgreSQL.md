### 🎯 Objective

Learn how to install, start, and configure PostgreSQL, create databases and users, and allow connections to the database server.

PostgreSQL is a powerful open-source relational database widely used in modern applications.

---

# 📜 What is PostgreSQL?

PostgreSQL is an advanced SQL-based database system that supports:

- ACID transactions

- Advanced indexing

- JSON support

- High performance queries

- Extensibility

Used by companies like:

- Apple

- Instagram

- Reddit

---

# 1️⃣ Install PostgreSQL

### Ubuntu / Debian

```plain text
sudo apt update
sudo apt install postgresql postgresql-contrib-y
```

### RHEL / CentOS / Amazon Linux

```plain text
sudo yum install postgresql-server postgresql-contrib-y
```

Initialize database (RHEL/CentOS):

```plain text
sudo postgresql-setup initdb
```

---

# 2️⃣ Start PostgreSQL Service

```plain text
sudo systemctlstart postgresql
sudo systemctl enable postgresql
```

Check status:

```plain text
sudo systemctl status postgresql
```

---

# 3️⃣ Login to PostgreSQL

Switch to postgres user:

```plain text
sudo -i -u postgres
```

Open PostgreSQL shell:

```plain text
psql
```

Prompt will appear:

```plain text
postgres=#
```

Exit shell:

```plain text
\q
```

---

# 4️⃣ Create Database

Inside psql:

```plain text
CREATE DATABASE mydb;
```

List databases:

```plain text
\l
```

---

# 5️⃣ Create Database User

```plain text
CREATE USER dbuser WITH PASSWORD 'StrongPassword';
```

Grant privileges:

```plain text
GRANT ALL PRIVILEGES ON DATABASE mydb TO dbuser;
```

List users:

```plain text
\du
```

---

# 6️⃣ Configure Remote Access

Edit PostgreSQL configuration:

```plain text
sudo nano /var/lib/pgsql/data/postgresql.conf
```

Find:

```plain text
listen_addresses = 'localhost'
```

Change to:

```plain text
listen_addresses = '*'
```

---

# 7️⃣ Configure Client Authentication

Edit:

```plain text
sudo nano /var/lib/pgsql/data/pg_hba.conf
```

Add:

```plain text
host    all    all    0.0.0.0/0    md5
```

This allows remote authentication with password.

---

# 8️⃣ Restart PostgreSQL

```plain text
sudo systemctlrestart postgresql
```

---

# 9️⃣ Test Connection

From client machine:

```plain text
psql-h server-ip-U dbuser-d mydb
```

---

# 🧠 PostgreSQL Architecture

```plain text
Client Application
        │
        ▼
   PostgreSQL Server
        │
        ▼
   Database Cluster
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
Table  Table  Table
```

---

# 🧪 Useful PostgreSQL Commands

---

# 🔎 Troubleshooting

### Check PostgreSQL port

```plain text
sudo ss-tunlp |grep5432
```

Default port:

```plain text
5432
```

---

### View logs

```plain text
sudo journalctl-u postgresql
```

---

# ✅ Summary
