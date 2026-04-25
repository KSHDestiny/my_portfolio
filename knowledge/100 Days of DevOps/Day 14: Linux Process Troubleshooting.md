## 🎯 Objective

Learn how to monitor, analyze, and troubleshoot running processes in Linux using system tools to identify performance issues, stuck processes, or resource overuse.

---

# 📘 What is a Process in Linux?

A process is a running instance of a program.

When a command or application runs in Linux, the system creates a process with its own:

- Process ID (PID)

- CPU usage

- Memory usage

- Execution state

Example:

Running:

```plain text
firefox
```

creates a Firefox process in the system.

---

# 🧠 Process States in Linux

---

# 🔍 Viewing Running Processes

### Using ps

```plain text
ps aux
```

Explanation:

Example output fields:

---

### View process tree

```plain text
ps -ef --forest
```

Shows parent-child relationship between processes.

---

# 📊 Real-Time Process Monitoring

### Using top

```plain text
top
```

Shows:

- CPU usage

- Memory usage

- Running processes

- System load

Important keys inside top:

---

### Using htop

Install:

```plain text
sudo yum install htop -y
```

Run:

```plain text
htop
```

Features:

- Colorful interface

- Easy process killing

- Better visualization

---

# 🔎 Finding a Specific Process

### Using grep

Example:

```plain text
ps aux | grep nginx
```

Finds Nginx processes.

---

### Using pgrep

```plain text
pgrep nginx
```

Shows only process IDs.

---

# 🧾 Process Priority

Each process has a priority value called nice value.

---

### Run command with priority

```plain text
nice -n 10 command
```

---

### Change priority of running process

```plain text
renice5 -p 1234
```

Where 1234 = PID

---

# 🛑 Killing a Process

Sometimes processes hang or consume excessive resources.

---

### Kill by PID

```plain text
kill 1234
```

---

### Force kill process

```plain text
kill -9 1234
```

Signal 9 = SIGKILL

---

### Kill by process name

```plain text
pkill nginx
```

or

```plain text
killall nginx
```

---

# 📈 Monitoring CPU Usage

Check CPU usage:

```plain text
top
```

or

```plain text
mpstat
```

---

# 📊 Monitoring Memory Usage

Check memory:

```plain text
free -h
```

Example output:

---

# 📁 Check Disk Usage

Sometimes processes fail due to disk full issues.

Check disk:

```plain text
df -h
```

---

# 🔍 Identify High Resource Processes

Sort by CPU usage:

```plain text
ps aux --sort=-%cpu
```

Sort by memory:

```plain text
ps aux --sort=-%mem
```

---

# 🧪 Example Troubleshooting Scenario

### Problem

Server is slow.

---

### Step 1: Check CPU usage

```plain text
top
```

Find process using high CPU.

---

### Step 2: Identify process

Example:

```plain text
PID 2345 java
```

---

### Step 3: Investigate process

```plain text
ps -p 2345 -f
```

---

### Step 4: Restart or kill process

```plain text
kill 2345
```

or

```plain text
kill -9 2345
```

---

# 📜 Viewing Open Files by Process

Use:

```plain text
lsof -p PID
```

Example:

```plain text
lsof -p 1234
```

Shows files opened by that process.

---

# 🌐 Viewing Process Network Connections

```plain text
ss -tunap
```

Shows processes using network ports.

---

# 📑 Viewing System Logs

If process crashes:

```plain text
journalctl -xe
```

or

```plain text
journalctl -u service-name
```

Example:

```plain text
journalctl -u nginx
```

---

# ⚠ Common Process Issues

### High CPU usage

Check:

```plain text
top
```

Fix:

Restart or kill process.

---

### Zombie processes

Check:

```plain text
ps aux | grep Z
```

Fix:

Restart parent process.

---

### Memory leak

Symptoms:

- Memory usage keeps increasing

Check:

```plain text
top
```

Restart service if needed.

---

# 🧰 Useful Process Commands

---

# ✅ Key Learning Points

- Every running program in Linux is a process

- Use ps, top, and htop to monitor processes

- kill and pkill help terminate problematic processes

- Resource monitoring helps identify performance issues

- Logs and system tools help diagnose process failures
