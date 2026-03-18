### What Linux Network Services Are

Linux network services are background processes that provide server features over a network. They are the reason a Linux system can offer web access, remote login, DNS resolution, file sharing, or database connections.

### List System Services

Use this command to list available services:

```bash
sudo systemctl list-units --type=service
```

### Common Network Service Types

These are common services provided by Linux servers:

```text
SSH
HTTP/HTTPS
DNS
```

## Summary

Network services are the main way a Linux server communicates with users and other systems.
