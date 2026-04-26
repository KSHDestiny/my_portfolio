## 🎯 Objective

Learn how to schedule automated tasks in Linux using cron jobs.

---

## 🧠 What is a Cron Job?

A cron job is a scheduled task that runs automatically at a specific time or interval.

👉 Used for:

- Running scripts (backup, cleanup)

- Scheduling Laravel jobs

- Automating deployments

- Sending emails / reports

---

## ⚙️ Cron Structure (Very Important)

A cron expression has 5 time fields + command:

```plain text
* * * * * command_to_run
│ │ │ │ │
│ │ │ │ └── Day of Week (0-7) (Sun=0 or7)
│ │ │ └──── Month (1-12)
│ │ └────── Day of Month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

---

## 📌 Common Examples

---

## 🛠️ Step 1: Open Crontab

```plain text
crontab-e
```

👉 This opens your cron configuration file.

---

## 🛠️ Step 2: Add a Cron Job

Example:

```plain text
* * * * *echo"Hello Cron" >> /tmp/cron.log
```

👉 Runs every minute and writes to a log file.

---

## 🛠️ Step 3: Save & Exit

- Press ESC

- Type :wq

- Press Enter

---

## 🔍 Step 4: Verify Cron Jobs

```plain text
crontab-l
```

👉 Lists all scheduled jobs.

---

## 🧪 Step 5: Check Output

```plain text
cat /tmp/cron.log
```

---

## 🔁 Real-World Example (Laravel)

Run Laravel scheduler every minute:

```plain text
* * * * *cd /var/www/project && php artisan schedule:run >> /dev/null2>&1
```

### 🧠 Explanation:

- cd /var/www/project → go to project folder

- php artisan schedule:run → run Laravel scheduler

- >> /dev/null 2>&1 → hide output (no logs)

---

## 🚀 Advanced Example

Run a script every day at 2 AM:

```plain text
02 * * * /usr/bin/bash /home/user/backup.sh
```

---

## ⚠️ Important Tips

### 1. Use Full Paths

Cron doesn’t load your environment like terminal:

```plain text
/usr/bin/php   ✅
php            ❌
```

---

### 2. Environment Variables Issue

Cron runs in a limited environment.

👉 Fix:

- Use .env carefully

- Or export variables inside script

---

### 3. Logging is Important

```plain text
* * * * * command >> /var/log/myjob.log2>&1
```

---

### 4. Check Cron Service

On systems using systemd:

```plain text
sudo systemctl status cron
# or
sudo systemctl status crond
```

Start if needed:

```plain text
sudo systemctlstart cron
```

---

## 🧩 Common Use Cases

- Database backup

- Clearing cache

- Sending scheduled emails

- Syncing data

- Running queue workers

---

## ❌ Common Mistakes

- Forgetting full path

- Wrong cron syntax

- No permissions on script

- Not checking logs

- Cron service not running

---

## 📌 Summary

- Cron = task scheduler in Linux

- Uses time-based syntax

- Managed via crontab

- Essential for automation & DevOps
