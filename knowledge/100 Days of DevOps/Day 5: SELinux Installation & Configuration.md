### SELinux: Install and enable enforcing mode

Install SELinux packages and configure SELinux to enforce security policies on a Linux system.

### Step 1: Install SELinux packages (RHEL/CentOS/Rocky)

```bash
sudo yum install selinux-policy selinux-policy-targeted policycoreutils
```

### Step 2: Verify SELinux installation

```bash
sestatus
```

Example output:

```plain text
SELinux status: enabled
Current mode: enforcing
Policy from config file: targeted
```

### Step 3: Configure SELinux mode

Edit the configuration file:

```bash
sudo nano /etc/selinux/config
```

Example configuration:

```plain text
SELINUX=enforcing
SELINUXTYPE=targeted
```

### Step 4: Apply changes

Restart the system:

```bash
sudo reboot
```

### Step 5: Check current SELinux mode

```bash
getenforce
```

Example output:

```plain text
Enforcing
```

- Targeted policy protects only specific services.

- SELinux adds an extra security layer beyond standard Linux permissions.

- Avoid disabling SELinux in production environments.

### Summary

```bash
sudo yum install selinux-policy selinux-policy-targeted policycoreutils
```
