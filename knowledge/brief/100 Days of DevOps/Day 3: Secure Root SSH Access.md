### Why Root SSH Access Should Be Restricted

Direct root SSH login is risky because it exposes the most powerful account on the server to remote login attempts. A safer practice is to log in with a normal user first and use `sudo` only when needed.

### Disable Root SSH Login

Add this setting in the SSH configuration to block direct root login:

```text
PermitRootLogin no
```

### Edit SSH Configuration File

Use this file to apply the SSH root login setting:

```bash
sudo nano /etc/ssh/sshd_config
```

### Restart SSH Service

Restart SSH after changing the configuration:

```bash
sudo systemctl restart sshd
```

## Summary

Restricting root SSH access reduces risk and makes remote administration safer.
