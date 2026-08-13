### Key Idea

Create an Amazon EC2 instance and configure an Amazon CloudWatch Alarm to monitor the instance.

### What Matters

- The alarm was recently created
- The metric has not produced enough datapoints
- Data is temporarily unavailable
- EC2 publishes supported metrics to CloudWatch automatically.
- CPUUtilization is one of the most commonly monitored EC2 metrics.

### Quick Summary

The goal is to understand how AWS monitoring works: A common example is monitoring EC2 CPU utilization and triggering an alarm when CPU usage exceeds a configured threshold.
