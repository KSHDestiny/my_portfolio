### What `iptables` Is Used For

`iptables` is a Linux firewall utility used to control incoming and outgoing traffic. It helps protect a server by deciding which network connections should be allowed, rejected, or blocked.

### Install `iptables`

Use this command to install `iptables` if it is not already available on the system:

```bash
sudo yum install iptables-services -y
```

### List Firewall Rules

Use this command to view current firewall rules:

```bash
sudo iptables -L
```

### Allow SSH Traffic

Use this command to allow incoming SSH access on port 22:

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

## Summary

`iptables` is one of the core tools used to secure Linux servers at the network level, and the first step is making sure it is installed and available.
