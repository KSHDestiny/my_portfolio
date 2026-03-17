Stopped## 🎯 Objective

Learn how to **monitor, analyze, and troubleshoot running processes** in Linux using system tools to identify performance issues, stuck processes, or resource overuse.

---

# 📘 What is a Process in Linux?

A **process** is a running instance of a program.

When a command or application runs in Linux, the system creates a **process** with its own:

- Process ID (**PID**)
- CPU usage
- Memory usage
- Execution state

Example:

Running:

```
firefox
```

creates a **Firefox process** in the system.

---

# 🧠 Process States in Linux

| State | Meaning                             |
| ----- | ----------------------------------- |
| R     | Running                             |
| S     | Sleeping                            |
| D     | Uninterruptible sleep (usually I/O) |
| T     | Stopped                             |
| Z     | Zombie process                      |

---

# 🔍 Viewing Running Processes

### Using `ps`

```
ps aux
```

Explanation:

| Option | Meaning                                 |
| ------ | --------------------------------------- |
| a      | Show processes for all users            |
| u      | Display user information                |
| x      | Show processes not attached to terminal |

Example output fields:

| Field   | Meaning         |
| ------- | --------------- |
| USER    | Process owner   |
| PID     | Process ID      |
| %CPU    | CPU usage       |
| %MEM    | Memory usage    |
| COMMAND | Running command |

---

### View process tree

```
ps-ef--forest
```

Shows parent-child relationship between processes.

---

# 📊 Real-Time Process Monitoring

### Using top

```
top
```

Shows:

- CPU usage
- Memory usage
- Running processes
- System load

Important keys inside `top`:

| Key | Function       |
| --- | -------------- |
| q   | Quit           |
| k   | Kill process   |
| P   | Sort by CPU    |
| M   | Sort by memory |

---

### Using htop

Install:

```
sudo yum install htop-y
```

Run:

```
htop
```

Features:

- Colorful interface
- Easy process killing
- Better visualization

---

# 🔎 Finding a Specific Process

### Using `grep`

Example:

```
ps aux |grep nginx
```

Finds **Nginx processes**.

---

### Using `pgrep`

```
pgrep nginx
```

Shows only **process IDs**.

---

# 🧾 Process Priority

Each process has a **priority value** called **nice value**.

| Nice Value | Priority         |
| ---------- | ---------------- |
| -20        | Highest priority |
| 0          | Default          |
| 19         | Lowest priority  |

---

### Run command with priority

```
nice-n10 command
```

---

### Change priority of running process

```
renice5-p1234
```

Where **1234 = PID**

---

# 🛑 Killing a Process

Sometimes processes hang or consume excessive resources.

---

### Kill by PID

```
kill1234
```

---

### Force kill process

```
kill-91234
```

Signal 9 = **SIGKILL**

---

### Kill by process name

```
pkill nginx
```

or

```
killall nginx
```

---

# 📈 Monitoring CPU Usage

Check CPU usage:

```
top
```

or

```
mpstat
```

---

# 📊 Monitoring Memory Usage

Check memory:

```
free-h
```

Example output:

| Field | Meaning      |
| ----- | ------------ |
| total | Total memory |
| used  | Used memory  |
| free  | Free memory  |

---

# 📁 Check Disk Usage

Sometimes processes fail due to **disk full issues**.

Check disk:

```
df-h
```

---

# 🔍 Identify High Resource Processes

Sort by CPU usage:

```
ps aux--sort=-%cpu
```

Sort by memory:

```
ps aux--sort=-%mem
```

---

# 🧪 Example Troubleshooting Scenario

### Problem

Server is **slow**.

---

### Step 1: Check CPU usage

```
top
```

Find process using high CPU.

---

### Step 2: Identify process

Example:

```
PID 2345 java
```

---

### Step 3: Investigate process

```
ps-p2345-f
```

---

### Step 4: Restart or kill process

```
kill2345
```

or

```
kill-92345
```

---

# 📜 Viewing Open Files by Process

Use:

```
lsof-p PID
```

Example:

```
lsof-p1234
```

Shows files opened by that process.

---

# 🌐 Viewing Process Network Connections

```
ss-tunap
```

Shows processes using network ports.

---

# 📑 Viewing System Logs

If process crashes:

```
journalctl-xe
```

or

```
journalctl-u service-name
```

Example:

```
journalctl-u nginx
```

---

# ⚠ Common Process Issues

### High CPU usage

Check:

```
top
```

Fix:

Restart or kill process.

---

### Zombie processes

Check:

```
ps aux |grep Z
```

Fix:

Restart parent process.

---

### Memory leak

Symptoms:

- Memory usage keeps increasing

Check:

```
top
```

Restart service if needed.

---

# 🧰 Useful Process Commands

| Command   | Purpose                |
| --------- | ---------------------- |
| `ps aux`  | Show running processes |
| `top`     | Real-time monitoring   |
| `htop`    | Interactive monitoring |
| `kill`    | Terminate process      |
| `pkill`   | Kill by name           |
| `renice`  | Change priority        |
| `free -h` | Check memory           |
| `df -h`   | Check disk usage       |
| `lsof`    | List open files        |

---

# ✅ Key Learning Points

- Every running program in Linux is a **process**
- Use `ps`, `top`, and `htop` to monitor processes
- `kill` and `pkill` help terminate problematic processes
- Resource monitoring helps identify performance issues
- Logs and system tools help diagnose process failures
