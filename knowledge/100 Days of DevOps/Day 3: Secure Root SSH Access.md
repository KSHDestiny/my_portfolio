# 🔐 Disable direct root SSH login

<aside>
Improve server security by restricting direct root login via SSH.
</aside>

## Objective

Make sure you can log in with a _non-root_ user that has `sudo` **before** disabling root login, otherwise you can lock yourself out.

## Why this matters

- Reduces brute-force risk against the `root` account
- Limits blast radius if credentials are leaked
- Forces least-privilege access through `sudo`

## Step 1: Connect to the server

```bash
ssh {user}@{ip-address}
```

Example:

```bash
ssh tony@52.186.140.102
```

## Step 2: Edit SSH configuration

```bash
sudo nano /etc/ssh/sshd_config
```

Find:

```bash
PermitRootLogin yes
```

Change to:

```bash
PermitRootLogin no
```

## Step 3: Restart SSH

Depending on the distro:

```bash
sudo systemctl restart ssh
```

or

```bash
sudo systemctl restart sshd
```

## Step 4: Verify

```bash
sudo grep PermitRootLogin /etc/ssh/sshd_config
```

Expected:

```bash
PermitRootLogin no
```

## Security best practices (recommended)

- Use SSH keys instead of passwords
- Limit SSH access to specific IPs (firewall or security group)
- Keep `sudo` access limited to trusted admins
- Consider changing the default SSH port only if it fits your operational model
