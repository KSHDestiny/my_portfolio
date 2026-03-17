### 🎯 Objective

Allow a script to be **executed as a program** by setting the correct **execution permission**.

In Linux, a file must have **execute (`x`) permission** before it can run as a script.

### 📜 What is script execution permission?

Linux uses **file permissions** to control who can:

- **Read (`r`)** → view the file
- **Write (`w`)** → modify the file
- **Execute (`x`)** → run the file as a program

Permissions are defined for three categories:

- **User (`u`)** → file owner
- **Group (`g`)** → users in the same group
- **Others (`o`)** → all other users

Without execute permission, the script cannot be run directly (you will see an error like `Permission denied`).

### 🛠️ Step 1: Create a script

```bash
nano script.sh
```

Add the following content:

```bash
#!/bin/bash
echo "Hello DevOps"
```

Save and exit.

### 🔍 Step 2: Check current permissions

```bash
ls -l script.sh
```

Example output:

```bash
-rw-r--r-- 1 user user 30 Mar 4 script.sh
```

This shows there is **no execute permission** yet.

### ⚙️ Step 3: Add execute permission

```bash
chmod +x script.sh
```

Check again:

```bash
ls -l script.sh
```

Example output:

```bash
-rwxr-xr-x 1 user user 30 Mar 4 script.sh
```

Now the script is executable.

### 🧠 Understanding `chmod +x`

```bash
chmod +x script.sh
```

Adds execute permission for **all users**. It is equivalent to:

```bash
chmod a+x script.sh
```

Where `a` means **u + g + o**.

### ▶️ Step 4: Run the script

```bash
./script.sh
```

Output:

```bash
Hello DevOps
```

### ⚠️ Important notes

- `chmod +x` makes the script executable.
- `./script.sh` runs the script from the current directory.
- Avoid using `chmod 777` unless absolutely necessary.
- Follow the **least privilege** principle.
