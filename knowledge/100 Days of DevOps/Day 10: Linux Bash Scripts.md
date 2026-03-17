## 🎯 Objective

Learn how to create, write, and execute Bash scripts in Linux to automate tasks such as running commands, managing files, and scheduling operations.

---

# 📘 What is a Bash Script?

A **Bash script** is a file containing a series of commands that the **Bash shell** executes sequentially.

Instead of typing commands one by one in the terminal, you can automate them inside a script.

Example use cases:

- Automating system administration tasks
- Running backups
- Deploying applications
- Monitoring systems
- Running scheduled jobs (cron)

---

# 📂 Script File Extension

Most Bash scripts use the extension:

```
.sh
```

Example:

```
backup.sh
deploy.sh
monitor.sh
```

Note: The extension is not required but helps readability.

---

# 🧾 Basic Bash Script Structure

Example:

```
#!/bin/bash

echo"Hello, Linux!"
```

Explanation:

| --- | --- |

---

# 🛠 Creating a Bash Script

### Step 1: Create file

```
nano hello.sh
```

or

```
vi hello.sh
```

---

### Step 2: Add script code

```
#!/bin/bash

echo"Welcome to Linux Bash scripting"
```

---

### Step 3: Save the file

---

### Step 4: Give execute permission

```
chmod+x hello.sh
```

---

### Step 5: Run the script

Method 1:

```
./hello.sh
```

Method 2:

```
bash hello.sh
```

---

# 📜 Script Execution Permission

In Linux, a file must have **execute (x) permission** to run as a program.

Check permissions:

```
ls-l hello.sh
```

Example output:

```
-rwxr-xr-x 1 user user 120 Mar 16 hello.sh
```

Explanation:

| --- | --- |

---

# 📥 Variables in Bash

Variables store values.

Example:

```
#!/bin/bash

name="Linux User"
echo"Hello$name"
```

Output:

```
Hello Linux User
```

---

# 📨 User Input in Bash

Use `read` to accept input from user.

Example:

```
#!/bin/bash

echo"Enter your name:"
read name

echo"Hello$name"
```

---

# 🔀 Conditional Statements

### If Statement

```
#!/bin/bash

number=10

if [$number-gt5 ]
then
echo"Number is greater than 5"
fi
```

Common operators:

| --- | --- |

---

# 🔁 Loops in Bash

### For Loop

```
#!/bin/bash

for iin12345
do
echo"Number:$i"
done
```

---

### While Loop

```
#!/bin/bash

count=1

while [$count-le5 ]
do
echo"Count:$count"
count=$((count+1))
done
```

---

# 📁 Working With Files in Scripts

### Check if file exists

```
if [-f"file.txt" ]
then
echo"File exists"
else
echo"File not found"
fi
```

---

### Create a file

```
touch test.txt
```

---

### Delete a file

```
rm test.txt
```

---

# 📦 Useful Bash Commands for Scripts

| --- | --- |

---

# 🧪 Example Script: System Information

```
#!/bin/bash

echo"System Information"
echo"-------------------"

echo"User:$(whoami)"
echo"Hostname:$(hostname)"
echo"Date:$(date)"
echo"Uptime:"
uptime
```

Run:

```
./systeminfo.sh
```

---

# ⚠ Common Bash Script Errors

### Permission denied

Error:

```
permission denied
```

Fix:

```
chmod+x script.sh
```

---

### Wrong interpreter

Error occurs if shebang is missing.

Correct:

```
#!/bin/bash
```

---

### Syntax errors

Example:

Missing `fi`

```
if [$x-gt5 ]
then
echo"test"
```

Correct:

```
if [$x-gt5 ]
then
echo"test"
fi
```

---

# 🛠 Debugging Bash Scripts

Run script in debug mode:

```
bash-x script.sh
```

This shows each command before execution.

---

# 🧾 Example: Backup Script

```
#!/bin/bash

backup_dir="/backup"
source_dir="/home"

echo"Starting backup..."

tar-czf$backup_dir/home_backup.tar.gz$source_dir

echo"Backup completed."
```

---

# 🔄 Automating Scripts with Cron

Example cron job:

```
02 * * * /home/user/backup.sh
```

Meaning:

Run backup script **every day at 2 AM**.

---

# ✅ Key Learning Points

- Bash scripts automate repetitive tasks
- `#!/bin/bash` defines the interpreter
- Scripts require **execute permission**
- Variables, loops, and conditions enable logic
- Scripts can interact with system commands
- Debugging can be done with `bash -x`
