### 1️⃣ What PHP-FPM Actually Is

PHP-FPM is a process manager for PHP that handles PHP execution for web servers.

Important point:

> Web servers like Nginx cannot execute PHP directly.

So they send PHP requests to PHP-FPM, which runs the PHP code and returns the result.

---

## 2️⃣ Why PHP-FPM Exists

Older PHP setups used mod_php with Apache HTTP Server.

Problems with mod_php:

- High memory usage

- Poor performance under heavy traffic

- Harder scaling

PHP-FPM solves this by managing PHP workers efficiently.

---

# 3️⃣ How PHP-FPM Works

### Request Flow

```plain text
Browser Request
      │
      ▼
Nginx Web Server
      │
      ▼
FastCGI Request
      │
      ▼
PHP-FPM Worker Process
      │
      ▼
Execute PHP Script
      │
      ▼
Return Response → Nginx → Browser
```

Example request:

```plain text
http://example.com/index.php
```

Flow:

```plain text
Nginx → PHP-FPM → index.php → HTML Output
```

---

# 4️⃣ PHP-FPM Architecture

PHP-FPM works using a master process + worker processes.

```plain text
PHP-FPM Master Process
        │
        ├── Worker 1
        ├── Worker 2
        ├── Worker 3
        └── Worker 4
```

### Master Process

Responsible for:

- Managing worker processes

- Restarting crashed workers

- Monitoring resources

### Worker Processes

Responsible for:

- Executing PHP scripts

- Handling requests

---

# 5️⃣ Process Management Modes

In the PHP-FPM config (www.conf) you will see:

```plain text
pm = dynamic
```

There are 3 modes.

---

### 1️⃣ Static Mode

Fixed number of workers.

```plain text
pm = static
pm.max_children = 10
```

Meaning:

```plain text
10 PHP processes always running
```

Good for predictable workloads.

---

### 2️⃣ Dynamic Mode (Most Common)

Workers are created based on demand.

```plain text
pm = dynamic
pm.max_children = 20
pm.start_servers = 5
pm.min_spare_servers = 3
pm.max_spare_servers = 10
```

Meaning:

```plain text
Start with 5 workers
Minimum idle = 3
Maximum idle = 10
```

Best for most production servers.

---

### 3️⃣ On-Demand Mode

Workers start only when request arrives.

```plain text
pm = ondemand
pm.max_children = 10
pm.process_idle_timeout = 10s
```

Good for low traffic servers.

---

# 6️⃣ Unix Socket vs TCP

PHP-FPM can communicate with Nginx in two ways.

---

### TCP Connection

```plain text
127.0.0.1:9000
```

Example config:

```plain text
fastcgi_pass 127.0.0.1:9000;
```

Pros:

- Can work across servers

Cons:

- Slightly slower

---

### Unix Socket (Recommended)

```plain text
/run/php-fpm/www.sock
```

Example config:

```plain text
fastcgi_pass unix:/run/php-fpm/www.sock;
```

Pros:

- Faster

- More secure

- No network overhead

---

# 7️⃣ PHP-FPM Pools

PHP-FPM supports multiple pools.

A pool is a group of PHP workers with its own settings.

Example:

```plain text
/etc/php-fpm.d/www.conf
```

Example pool:

```plain text
[website1]
user = nginx
group = nginx
listen = /run/php-fpm-site1.sock
```

This allows:

```plain text
Site1 → PHP Pool1
Site2 → PHP Pool2
```

Benefits:

- Isolation between websites

- Resource control

- Better security

---

# 8️⃣ Important PHP-FPM Files

---

# 9️⃣ Check PHP-FPM Status

Check service:

```plain text
systemctl status php-fpm
```

Check running processes:

```plain text
ps aux |grep php-fpm
```

Check socket:

```plain text
ls /run/php-fpm/
```

---

# 🔟 Real Production Architecture

Modern architecture often looks like this:

```plain text
Internet
    │
    ▼
Nginx Load Balancer
    │
    ▼
Nginx Web Server
    │
    ▼
PHP-FPM
    │
    ▼
PHP Application
    │
    ▼
Database Server
```

Database example:

- MariaDB

- PostgreSQL

---

# 🧠 Why DevOps Engineers Care About PHP-FPM

Because you must tune:

This directly affects:

- CPU usage

- Memory usage

- Website performance

---

✅ Simple summary

PHP-FPM is:

> A process manager that executes PHP scripts and communicates with web servers through FastCGI.
