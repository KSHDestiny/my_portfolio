### Connecting to the Server

To connect to a Linux server over SSH:

```bash
ssh username@server_ip
```

### Password Authentication

This method allows login by using the account password. It is simple to use, but it is less secure for production servers.

```text
PasswordAuthentication yes
```

### SSH Key Authentication

This method uses a private key on the client and a public key on the server. It is more secure than password login and is widely used in DevOps environments.

```bash
ssh-keygen
ssh-copy-id username@server_ip
```

## Summary

SSH authentication controls remote server access. Password login is easier to start with, but SSH keys are safer and better for real server environments.
