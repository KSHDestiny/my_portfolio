### What a Non-Interactive Shell User Is

A non-interactive shell user is an account that exists on the server but cannot open a normal login shell. It is commonly used for service accounts, restricted users, and better system security.

### Create User with Non-Interactive Shell

Use this command to create a user that cannot log in with a normal shell:

```bash
sudo useradd -s /usr/sbin/nologin username
```

### Common Non-Interactive Shell Paths

These shell paths are commonly used to block interactive access:

```text
/usr/sbin/nologin
/sbin/nologin
/bin/false
```

## Summary

This type of user is useful when an account should exist on the system without being allowed normal shell access.
