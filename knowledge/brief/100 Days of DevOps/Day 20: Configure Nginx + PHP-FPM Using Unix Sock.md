### How Nginx and PHP-FPM Work Together

Nginx handles incoming web requests, while PHP-FPM executes PHP code in the background. A Unix socket is one local communication method used between them on the same server.

### Connect Nginx to PHP-FPM

Use this directive to connect through a Unix socket:

```nginx
fastcgi_pass unix:/run/php-fpm/www.sock;
```

### Common Unix Socket Path

A common local socket path looks like this:

```text
/run/php-fpm/www.sock
```

## Summary

This setup is commonly used to run PHP applications efficiently behind Nginx.
