### A **non-interactive shell** is used to create a user account **without login access**.

This is commonly used for:

- Service accounts
- Application users
- FTP-only users
- Security hardening

Such users **cannot log in via SSH** or access the system shell.

### 🚫 Common Non-Interactive Shell Paths

Depending on the Linux distribution, you can use:

- `/sbin/nologin`
- `/usr/sbin/nologin`
- `/bin/false`

These shells prevent interactive login.

### 🖥️ Entering the Server (SSH Access)

To connect to a Linux server:

```bash
ssh {user}@{ip-address}
```

Example:

```bash
ssh james@172.16.238.11
```

### 👤 Creating a User with Non-Interactive Shell

To add a user without login access:

```bash
sudo useradd -s /sbin/nologin {username}
```

Example:

```bash
sudo useradd -s /sbin/nologin appuser
```

This will:

- Create the user
- Set shell to `/sbin/nologin`
- Prevent SSH login

### 🔍 Verify the User's Shell

You can check the assigned shell using:

```bash
cat /etc/passwd | grep appuser
```

Output example:

```bash
appuser:x:1002:1002::/home/appuser:/sbin/nologin
```

### 🎯 Best Practice

- Use non-interactive shells for service accounts.
- Do not allow unnecessary SSH access.
- Follow the principle of least privilege.
