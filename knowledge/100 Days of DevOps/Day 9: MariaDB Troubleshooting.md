## 🎯 Objective

Learn how to identify, diagnose, and fix common MariaDB issues such as service failures, connection problems, authentication errors, and database access issues.

## 📘 What is MariaDB Troubleshooting?

MariaDB troubleshooting means finding out why the MariaDB database server is not working properly and fixing the issue.

Common problems include:

- MariaDB service not starting
- Unable to connect to database
- Access denied errors
- Wrong port or socket issue
- Database corruption
- Full disk or permission problems

## 🔍 Common MariaDB Troubleshooting Commands

### 1. Check MariaDB service status

```bash
sudo systemctl status mariadb
```

On some systems:

```bash
sudo systemctl status mysql
```

Purpose:

- Checks whether MariaDB is running, stopped, or failed

### 2. Start MariaDB service

```bash
sudo systemctl start mariadb
```

### 3. Stop MariaDB service

```bash
sudo systemctl stop mariadb
```

### 4. Restart MariaDB service

```bash
sudo systemctl restart mariadb
```

Purpose:

- Useful after config changes or when troubleshooting temporary issues

### 5. Enable MariaDB at boot

```bash
sudo systemctl enable mariadb
```

### 6. Check if MariaDB process is running

```bash
ps -ef | grep maria
```

Or:

```bash
ps -ef | grep mysql
```

Purpose:

- Verifies whether the database process exists

### 7. Check listening port

```bash
sudo ss -tulnp | grep 3306
```

Or:

```bash
sudo netstat -tulnp | grep 3306
```

Purpose:

- Confirms MariaDB is listening on default port **3306**

### 8. Login to MariaDB

```bash
mysql -u root -p
```

Purpose:

- Tests whether authentication works

### 9. Test database connection manually

```bash
mysql -u root -p -h localhost
```

Or with port:

```bash
mysql -u root -p -h 127.0.0.1 -P 3306
```

Purpose:

- Helps identify hostname, socket, or port issues

### 10. Check MariaDB logs

```bash
sudo journalctl -u mariadb
```

Or:

```bash
sudo tail -f /var/log/mariadb/mariadb.log
```

Sometimes:

```bash
sudo tail -f /var/log/mysql/error.log
```

Purpose:

- Shows actual startup and runtime errors

### 11. Check configuration file

```bash
sudo cat /etc/my.cnf
```

Or:

```bash
sudo cat /etc/mysql/my.cnf
```

Purpose:

- Verifies port, socket, bind-address, and other settings

### 12. Check disk space

```bash
df -h
```

Purpose:

- MariaDB may fail if disk is full

### 13. Check database directory permissions

```bash
sudo ls -ld /var/lib/mysql
```

Purpose:

- Ensures MariaDB has correct ownership and permissions

### 14. Repair databases

```bash
mysqlcheck -u root -p --auto-repair --all-databases
```

Purpose:

- Repairs corrupted tables when possible

## ⚠ Common MariaDB Problems and Fixes

### 1. MariaDB service failed to start

Check:

```bash
sudo systemctl status mariadb
sudo journalctl -u mariadb
```

Possible causes:

- Wrong config in `my.cnf`
- Port already in use
- Permission issue
- Full disk
- Corrupted database files

### 2. Access denied for user

Example error:

```bash
ERROR 1045 (28000): Access denied for user 'root'@'localhost'
```

Fix:

- Check username/password
- Ensure correct authentication method
- Reset password if needed

Example:

```bash
sudo mysql
```

Then:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword';
FLUSH PRIVILEGES;
```

### 3. Can't connect through socket

Example error:

```bash
Can't connect to local MariaDB server through socket
```

Possible causes:

- Service is not running
- Wrong socket path in config
- Client using wrong socket file

Check:

```bash
sudo systemctl status mariadb
sudo find / -name "*.sock" 2>/dev/null
```

### 4. Port 3306 already in use

Check:

```bash
sudo ss -tulnp | grep 3306
```

Fix:

- Stop conflicting service
- Or change MariaDB port in config file

### 5. Database is read-only or not writable

Check:

```bash
df -h
sudo ls -ld /var/lib/mysql
```

Possible causes:

- Disk full
- Wrong ownership
- File system mounted read-only

Fix ownership if needed:

```bash
sudo chown -R mysql:mysql /var/lib/mysql
```

## 🧪 Useful SQL Commands for Troubleshooting

### Show databases

```sql
SHOW DATABASES;
```

### Show users

```sql
SELECT User, Host FROM mysql.user;
```

### Check current user

```sql
SELECT USER(), CURRENT_USER();
```

### Show grants

```sql
SHOW GRANTS FOR 'root'@'localhost';
```

### Show MariaDB version

```sql
SELECT VERSION();
```

## 🛠 Basic Troubleshooting Workflow

### Step 1: Check service

```bash
sudo systemctl status mariadb
```

### Step 2: Check logs

```bash
sudo journalctl -u mariadb
```

### Step 3: Test login

```bash
mysql -u root -p
```

### Step 4: Check port

```bash
sudo ss -tulnp | grep 3306
```

### Step 5: Check config

```bash
sudo cat /etc/my.cnf
```

### Step 6: Check disk and permissions

```bash
df -h
sudo ls -ld /var/lib/mysql
```

## 📝 Example Troubleshooting Scenario

### Problem:

MariaDB is not starting.

### Diagnose:

```bash
sudo systemctl status mariadb
sudo journalctl -u mariadb
```

### Found issue:

Port 3306 already in use.

### Verify:

```bash
sudo ss -tulnp | grep 3306
```

### Fix:

- Stop other process using port 3306
- Or change MariaDB port in config

Then restart:

```bash
sudo systemctl restart mariadb
```

## ✅ Key Learning Points

- Use `systemctl status mariadb` first
- Logs are the best place to find real errors
- Check port `3306`, config file, permissions, and disk space
- Authentication and socket issues are very common
- Restart MariaDB after fixing config issues
