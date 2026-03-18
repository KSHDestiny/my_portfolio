### What a Cron Job Is

A cron job is a scheduled task that runs automatically at a specific time or interval. It is commonly used for automation tasks such as backups, cleanup scripts, and recurring checks.

### Open Cron Configuration

Use this command to edit the current user's cron jobs:

```bash
crontab -e
```

### Cron Job Format

Use this format to schedule a command:

```text
* * * * * command_to_execute
```

### Cron Time Field Order

The fields are read in this order:

```text
Minute Hour Day_of_Month Month Day_of_Week
```

## Summary

Cron helps automate repeated Linux tasks without running them manually each time.
