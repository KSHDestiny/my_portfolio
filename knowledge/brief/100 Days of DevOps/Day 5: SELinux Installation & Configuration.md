### What SELinux Does

SELinux is a Linux security layer that controls how processes, files, and services are allowed to interact. It adds policy-based protection on top of normal file permissions.

### Install SELinux Packages

Use this command to install the core SELinux packages on RHEL-based systems:

```bash
sudo yum install selinux-policy selinux-policy-targeted policycoreutils
```

### Edit SELinux Configuration File

Open the main SELinux configuration file:

```bash
nano /etc/selinux/config
```

### Set Enforcing Mode

Use this setting to enable enforcing mode:

```text
SELINUX=enforcing
```

## Summary

SELinux helps protect the system by enforcing security rules between services and files.
