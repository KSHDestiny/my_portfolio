### SELinux: Install and enable enforcing mode

<aside>
🎯

**Objective**

Install SELinux packages and configure SELinux to enforce security policies on a Linux system.

</aside>

### Step 1: Install SELinux packages (RHEL/CentOS/Rocky)

```bash
sudo yum install selinux-policy selinux-policy-targeted policycoreutils
```

| Package                   | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `selinux-policy`          | Base SELinux security policy                 |
| `selinux-policy-targeted` | Default targeted policy used by most systems |
| `policycoreutils`         | Utilities for managing SELinux               |

### Step 2: Verify SELinux installation

```bash
sestatus
```

Example output:

```
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

```
SELINUX=enforcing
SELINUXTYPE=targeted
```

| Mode       | Description                                 |
| ---------- | ------------------------------------------- |
| Enforcing  | SELinux actively blocks unauthorized access |
| Permissive | Violations are logged but not blocked       |
| Disabled   | SELinux is turned off                       |

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

```
Enforcing
```

<aside>
⚠️

**Important notes**

- Targeted policy protects only specific services.
- SELinux adds an extra security layer beyond standard Linux permissions.
- Avoid disabling SELinux in production environments.
</aside>

### Summary

```bash
sudo yum install selinux-policy selinux-policy-targeted policycoreutils
```
