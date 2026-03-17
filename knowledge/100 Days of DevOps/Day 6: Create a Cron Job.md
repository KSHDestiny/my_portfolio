## 🎯 Objective

Automate repetitive tasks in Linux using **cron jobs**.

---

## 🧠 What is a Cron Job?

A **cron job** is a scheduled task that runs automatically at a specified time or interval.

It is managed by the **cron daemon (`crond`)**.

---

## ⚙️ Install Cron Service (if not installed)

On **RHEL / CentOS / Amazon Linux**:

```
sudo yum install cronie-y
```

On **Ubuntu / Debian**:

```
sudo apt install cron-y
```

---

## ▶️ Start and Enable Cron Service

```
sudo systemctlstart crond
sudo systemctl enable crond
```

Check status:

```
systemctl status crond
```

---

## 📝 Create a Cron Job

Open crontab editor:

```
crontab-e
```

---

## ⏰ Cron Job Format

```
* * * * * command_to_execute
│ │ │ │ │
│ │ │ │ └── Day of week (0 - 7) (Sunday = 0 or 7)
│ │ │ └──── Month (1 - 12)
│ │ └────── Day of month (1 - 31)
│ └──────── Hour (0 - 23)
└────────── Minute (0 - 59)
```

---

## 📌 Example 1: Run Every Minute

```
* * * * * echo"Hello DevOps" >> /tmp/test.txt
```

---

## 📌 Example 2: Run Every Day at 2 AM

```
02 * * * /path/to/script.sh
```

---

## 📌 Example 3: Laravel Scheduler

```
* * * * * cd /var/www/project && php artisan schedule:run >> /dev/null2>&1
```

### 🔍 Explanation:

- `* * * *` → every minute
- `cd /var/www/project` → go to project directory
- `php artisan schedule:run` → run Laravel scheduler
- `>> /dev/null 2>&1` → hide output (no logs)

---

## 📂 Where Cron Jobs Are Stored

User-specific cron jobs:

```
crontab-l
```

System-wide cron files:

```
/etc/crontab
/etc/cron.d/
/var/spool/cron/
```

Check user cron files:

```
sudols-lsh /var/spool/cron/
```

---

## 🔄 Edit / Remove Cron Jobs

Edit:

```
crontab-e
```

Remove all:

```
crontab-r
```

---

## ⚠️ Important Notes

- Always use **full paths** (e.g., `/usr/bin/php`)
- Cron runs in a **minimal environment**
- Logs are not shown unless you save them

Example with logging:

```
* * * * * /usr/bin/php /var/www/artisan schedule:run >> /var/log/cron.log2>&1
```

---

## 👨‍💻 Who Creates Cron Jobs?

- **Developers** → for app-level tasks (Laravel scheduler, scripts)
- **DevOps / SysAdmins** → for server-level automation (backup, monitoring)

---

## 🚀 Real Use Cases

- Database backups
- Sending emails
- Clearing cache
- Running scheduled scripts
- System monitoring
