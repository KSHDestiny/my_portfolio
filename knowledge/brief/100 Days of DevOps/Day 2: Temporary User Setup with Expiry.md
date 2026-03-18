### What a Temporary User Is

A temporary user is a Linux account that is only meant to exist for a limited time. It is useful for short-term access such as internships, training, project work, or external support.

### Create User with Expiry Date

Use this command to create a user account that expires automatically:

```bash
sudo useradd -e YYYY-MM-DD username
```

### Example Expiry User

This example creates a user that expires on a specific date:

```bash
sudo useradd -e 2026-06-11 devopsuser
```

## Summary

Temporary users help prevent old accounts from staying active longer than necessary.
