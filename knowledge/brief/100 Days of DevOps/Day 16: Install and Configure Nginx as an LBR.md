### What a Load Balancer Does

A load balancer distributes incoming traffic across multiple backend servers instead of sending everything to one machine. This improves application availability, scalability, and reliability.

### Install Nginx

Use this command to install Nginx before configuring it as a load balancer:

```bash
sudo yum install nginx -y
```

### Forward Requests to Backend

Use this directive to pass requests to the backend group:

```nginx
proxy_pass http://backend;
```

### Define Backend Servers

Use this upstream block to define load-balanced servers:

```nginx
upstream backend {
    server 192.168.1.10;
    server 192.168.1.11;
}
```

## Summary

Nginx can act as a load balancer to spread traffic and reduce pressure on a single server, but it must be installed before this configuration can be applied.
