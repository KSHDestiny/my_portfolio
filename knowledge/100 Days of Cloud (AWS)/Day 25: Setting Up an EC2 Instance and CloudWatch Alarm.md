## 🎯 Objective

Create an Amazon EC2 instance and configure an Amazon CloudWatch Alarm to monitor the instance.

The goal is to understand how AWS monitoring works:

```plain text
EC2 Instance
     │
     │ Metrics
     ▼
Amazon CloudWatch
     │
     │ Monitor Condition
     ▼
CloudWatch Alarm
     │
     ├── OK
     ├── ALARM
     └── INSUFFICIENT_DATA
```

A common example is monitoring EC2 CPU utilization and triggering an alarm when CPU usage exceeds a configured threshold.

---

## 🧠 Concept

Amazon CloudWatch is AWS's monitoring and observability service.

AWS resources such as EC2 automatically publish certain metrics to CloudWatch.

For EC2, common metrics include:

```plain text
CPUUtilization
NetworkIn
NetworkOut
DiskReadBytes
DiskWriteBytes
StatusCheckFailed
```

CloudWatch can evaluate these metrics and change an alarm's state when a configured condition is met.

---

# 🖥️ Step 1: Create an EC2 Instance

Go to:

```plain text
AWS Console
    ↓
EC2
    ↓
Instances
    ↓
Launch instances
```

Configure the basic instance information:

```plain text
Name
AMI
Instance Type
Key Pair
Network
Security Group
Storage
```

For example:

```plain text
AMI           → Amazon Linux
Instance Type → t2.micro / t3.micro
```

Choose the values required by the lab or environment.

---

# 🔑 Step 2: Configure Key Pair

Select an existing key pair or create a new one.

The key pair allows SSH access to the instance.

```plain text
Local Machine
     │
     │ Private Key
     ▼
SSH
     │
     ▼
EC2 Instance
```

For example:

```bash
ssh -i <private-key.pem> ec2-user@<EC2-PUBLIC-IP>
```

Keep the private key secure.

---

# 🔐 Step 3: Configure Security Group

Configure the required inbound rules.

For SSH:

```plain text
Type     → SSH
Protocol → TCP
Port     → 22
Source   → Trusted IP
```

If the EC2 instance also hosts a website:

```plain text
Type     → HTTP
Protocol → TCP
Port     → 80
Source   → 0.0.0.0/0
```

Security Groups control which incoming connections are allowed to reach the instance.

---

# 🚀 Step 4: Launch the EC2 Instance

Review the configuration and click:

```plain text
Launch instance
```

Wait until the instance reaches:

```plain text
Instance State → Running
```

Also check:

```plain text
Status Checks → Passed
```

The EC2 instance is now ready.

---

# 📊 Step 5: Check EC2 Monitoring

Select the EC2 instance and open:

```plain text
EC2
 ↓
Instances
 ↓
Select Instance
 ↓
Monitoring
```

You should see metrics such as:

```plain text
CPU Utilization
Network In
Network Out
Disk Operations
Status Checks
```

These metrics are provided through Amazon CloudWatch.

---

# ☁️ Step 6: Open Amazon CloudWatch

Go to:

```plain text
AWS Console
    ↓
CloudWatch
    ↓
Alarms
```

CloudWatch alarms evaluate metrics against conditions that you define.

For example:

```plain text
EC2 CPU
   │
   │ CPUUtilization
   ▼
CloudWatch
   │
   │ CPU > Threshold?
   ▼
Alarm State
```

---

# 🚨 Step 7: Create a CloudWatch Alarm

Choose:

```plain text
Alarms
  ↓
All alarms
  ↓
Create alarm
```

Then:

```plain text
Select metric
```

Navigate to:

```plain text
EC2
 ↓
Per-Instance Metrics
```

Find your EC2 instance and select:

```plain text
CPUUtilization
```

---

## 🧠 CPUUtilization

The metric:

```plain text
CPUUtilization
```

represents the percentage of allocated EC2 compute capacity currently being used.

For example:

```plain text
CPUUtilization = 15%
```

means CPU usage is relatively low.

If it becomes:

```plain text
CPUUtilization = 90%
```

the instance may be experiencing a heavy workload.

---

# ⚙️ Step 8: Configure the Alarm Condition

Configure the threshold required by the task.

Example:

```plain text
Metric     → CPUUtilization
Statistic  → Average
Period     → 5 minutes

Threshold Type → Static
Condition      → Greater than
Threshold      → 80%
```

Conceptually:

```plain text
CPU ≤ 80%
    ↓
   OK

CPU > 80%
    ↓
 ALARM
```

The actual threshold and evaluation period should match the requirements of your environment.

---

# ⏱️ Understanding Period

The Period determines how CloudWatch groups metric data for evaluation.

For example:

```plain text
Period → 5 minutes
```

means CloudWatch evaluates CPU statistics in five-minute periods.

The alarm can also be configured to require multiple evaluation periods before changing state.

For example:

```plain text
CPU > 80%
for
2 evaluation periods
```

helps avoid triggering an alarm because of one short CPU spike.

---

# 🔔 Step 9: Configure Notification

CloudWatch alarms can perform actions when their state changes.

A common option is:

```plain text
CloudWatch Alarm
      │
      │ ALARM state
      ▼
Amazon SNS
      │
      ▼
Notification
```

If required, configure an SNS topic.

For example:

```plain text
Notification
     ↓
Create new topic
     ↓
Topic Name
     ↓
Email Address
```

AWS may send a subscription confirmation email.

The recipient must confirm the subscription before SNS can deliver alarm notifications to that email endpoint.

If the lab does not require notifications, configure only the actions required by the task.

---

# 📝 Step 10: Name the Alarm

Give the alarm a meaningful name.

For example:

```plain text
EC2-High-CPU-Alarm
```

Optionally add a description:

```plain text
Alarm when EC2 CPU utilization exceeds the configured threshold.
```

Then create the alarm.

---

# 🔄 CloudWatch Alarm States

A CloudWatch alarm can have three primary states.

## 🟢 OK

```plain text
OK
```

The metric is currently within the configured threshold.

Example:

```plain text
Threshold → 80%
CPU       → 20%

State → OK
```

---

## 🔴 ALARM

```plain text
ALARM
```

The metric has breached the configured threshold according to the alarm's evaluation settings.

Example:

```plain text
Threshold → 80%
CPU       → 95%

State → ALARM
```

---

## ⚪ INSUFFICIENT_DATA

```plain text
INSUFFICIENT_DATA
```

CloudWatch does not currently have enough data to determine whether the alarm should be OK or ALARM.

This can happen when:

- The alarm was recently created

- The metric has not produced enough datapoints

- Data is temporarily unavailable

---

# 🧪 Step 11: Verify the Alarm

Open:

```plain text
CloudWatch
    ↓
Alarms
    ↓
All alarms
```

Select the alarm.

Verify:

```plain text
Metric
Threshold
Period
Evaluation
Instance ID
Alarm State
```

Initially, the state may temporarily show:

```plain text
INSUFFICIENT_DATA
```

and later transition to:

```plain text
OK
```

when CloudWatch receives enough metric data.

---

# 🔥 Optional: Generate CPU Load for Testing

If your lab allows testing, connect to the EC2 instance.

For Amazon Linux, for example:

```bash
ssh -i <key.pem> ec2-user@<PUBLIC-IP>
```

You can generate temporary CPU activity using an appropriate workload or stress-testing utility available in the environment.

Then observe:

```plain text
EC2
 ↓
CPU Utilization increases
 ↓
CloudWatch receives metric
 ↓
Threshold breached
 ↓
Alarm → ALARM
```

When the CPU returns below the threshold and satisfies the configured evaluation criteria:

```plain text
ALARM
  ↓
CPU decreases
  ↓
OK
```

---

# 🧠 How EC2 and CloudWatch Work Together

The complete monitoring architecture is:

```plain text
┌───────────────────────┐
│     EC2 Instance      │
│                       │
│ CPU                    │
│ Network                │
│ Disk                   │
│ Status                 │
└───────────┬───────────┘
            │
            │ Metrics
            ▼
┌───────────────────────┐
│   Amazon CloudWatch   │
│                       │
│ Metrics               │
│ Monitoring            │
└───────────┬───────────┘
            │
            │ Evaluate
            ▼
┌───────────────────────┐
│   CloudWatch Alarm    │
│                       │
│ OK                    │
│ ALARM                 │
│ INSUFFICIENT_DATA     │
└───────────┬───────────┘
            │
            │ Optional
            ▼
┌───────────────────────┐
│      Amazon SNS       │
│                       │
│ Email / Notification  │
└───────────────────────┘
```

---

# 📊 Basic vs Detailed Monitoring

EC2 supports different CloudWatch monitoring intervals.

### Basic Monitoring

Standard EC2 monitoring commonly provides metrics at:

```plain text
5-minute intervals
```

for many instance types.

### Detailed Monitoring

Detailed monitoring provides metrics at:

```plain text
1-minute intervals
```

and may involve additional charges depending on the service and configuration.

More frequent metrics can allow alarms to react more quickly.

---

# ⚠️ Important: Memory and Disk Space

CloudWatch automatically provides several EC2 infrastructure metrics, but operating-system metrics such as:

```plain text
Memory Usage
Disk Space Usage
```

are not standard EC2 metrics automatically available in the same way.

To collect those, you commonly install and configure the:

```plain text
CloudWatch Agent
```

The flow becomes:

```plain text
EC2 Operating System
       │
       │ CloudWatch Agent
       ▼
Memory / Disk Metrics
       │
       ▼
CloudWatch
```

This distinction is important when configuring server monitoring.

---

# 🆚 CloudWatch Metric vs Alarm

These two concepts have different purposes.

### Metric

A metric is the actual measurement:

```plain text
CPUUtilization → 65%
```

### Alarm

An alarm evaluates that measurement:

```plain text
IF
CPUUtilization > 80%

THEN
ALARM
```

Therefore:

```plain text
Metric
  ↓
Data
  ↓
Alarm
  ↓
Decision
```

---

# ⚠️ Important Notes

- EC2 publishes supported metrics to CloudWatch automatically.

- CPUUtilization is one of the most commonly monitored EC2 metrics.

- CloudWatch alarms evaluate metrics against configured conditions.

- Alarm thresholds should match the application's actual requirements.

- Alarm state can be OK, ALARM, or INSUFFICIENT_DATA.

- SNS can be used for alarm notifications.

- An SNS email subscription must be confirmed before notifications can be delivered.

- Memory and filesystem usage generally require additional monitoring such as the CloudWatch Agent.

- Security Groups control network access; CloudWatch monitors resource metrics.

---

# 🧪 Validation Checklist

- [ ] EC2 instance created

- [ ] EC2 instance is running

- [ ] Status checks passed

- [ ] Security Group configured

- [ ] EC2 monitoring metrics visible

- [ ] CloudWatch opened

- [ ] EC2 metric selected

- [ ] CPUUtilization selected

- [ ] Alarm threshold configured

- [ ] Period configured

- [ ] Evaluation criteria configured

- [ ] Notification configured if required

- [ ] CloudWatch alarm created

- [ ] Alarm associated with correct EC2 instance

- [ ] Alarm state visible

---

# 📌 Summary

The basic setup is:

```plain text
Create EC2 Instance
        ↓
Instance Starts
        ↓
EC2 Publishes Metrics
        ↓
Amazon CloudWatch
        ↓
Select CPUUtilization
        ↓
Create Alarm Condition
        ↓
Monitor Threshold
        ↓
┌─────────────────────┐
│ OK                  │
│ ALARM               │
│ INSUFFICIENT_DATA   │
└─────────────────────┘
        │
        │ Optional
        ▼
Amazon SNS
        ↓
Notification
```

The four concepts to remember are:

```plain text
EC2
 ↓
Metric
 ↓
CloudWatch
 ↓
Alarm
```

For example:

```plain text
EC2 Instance
     ↓
CPUUtilization
     ↓
CPU > 80%
     ↓
CloudWatch Alarm
     ↓
ALARM 🚨
```

> Amazon CloudWatch collects metrics from EC2 instances, while CloudWatch Alarms evaluate those metrics against defined thresholds and can trigger actions or notifications when conditions are met.
