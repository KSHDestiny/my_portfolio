### 👤 Create user with an expiry date

Command syntax

```bash
sudo useradd -e YYYY-MM-DD username
```

- -e sets the account expiration date.

- Date format must be YYYY-MM-DD.

Example (100 days access)

If today is 2026-03-03, 100 days ahead is 2026-06-11:

```bash
sudo useradd -e 2026-06-11 devopsuser
```

This means:

- User devopsuser can access until June 11, 2026.

- After that date, login is automatically disabled.

### 🔍 Check account expiry information

```bash
sudo chage -l devopsuser
```

Example output:

```plain text
Account expires : Jun 11, 2026
Password expires : never
```

### 🔐 Optional: set a password for the user

```bash
sudo passwd devopsuser
```

### 🚫 What happens after expiry?

- User cannot log in.

- SSH access is blocked.

- Account remains in the system but is disabled.

### 🎯 Best practices

- Always define an expiry for temporary accounts.

- Remove the user completely after training:

```bash
sudo userdel -r devopsuser
```

- Follow the least privilege principle.

- Track temporary accounts properly.
