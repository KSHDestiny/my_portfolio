### Enable HTTPS Listener

Use this Nginx directive to listen on HTTPS:

```nginx
listen 443 ssl;
```

### Set SSL Certificate Path

Use this directive to point to the certificate file:

```nginx
ssl_certificate /path/to/cert.pem;
```

### Set SSL Private Key Path

Use this directive to point to the private key file:

```nginx
ssl_certificate_key /path/to/private.key;
```

## Summary

SSL/TLS protects data in transit and is a standard requirement for secure web applications.
