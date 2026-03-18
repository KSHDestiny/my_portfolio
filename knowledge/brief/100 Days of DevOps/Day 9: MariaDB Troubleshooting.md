### Check MariaDB Service Status

Use this command to see whether the MariaDB service is running, stopped, or failed:

```bash
sudo systemctl status mariadb
```

### Restart the MariaDB Service

Use this command when the service needs to be started again after a temporary failure or configuration change:

```bash
sudo systemctl restart mariadb
```

### View MariaDB Logs

Use this command to check recent logs and identify startup or runtime errors:

```bash
sudo journalctl -u mariadb
```

### Test Database Login

Use this command to check whether authentication is working correctly:

```bash
mysql -u root -p
```

### Check Listening Port

Use this command to confirm MariaDB is listening on port `3306`:

```bash
sudo ss -tulnp | grep 3306
```

## Summary

It helps to check service health, logs, login issues, and port availability to find the real cause of database failures.
