### 🎯 Objective

Prevent accidental stopping of an EC2 instance by enabling Stop Protection (also called API Stop Protection).

---

## 🤔 What is Stop Protection?

Stop Protection ensures that your EC2 instance cannot be stopped accidentally via:

- AWS Console

- CLI commands

- API calls

👉 It’s especially useful for:

- Production servers

- Critical databases

- Long-running jobs

---

## 🔒 Method 1: Enable Stop Protection via AWS Console

### 🪜 Steps:

1. Go to AWS Console

1. Navigate to EC2 Dashboard

1. Click Instances

1. Select your instance

1. Click Actions → Instance Settings → Change Stop Protection

1. Choose:
  - ✅ Enable

1. Click Save

---

## 💻 Method 2: Enable Stop Protection via AWS CLI

Run the following command:

```plain text
aws ec2 modify-instance-attribute \
--instance-id i-1234567890abcdef0 \
--disable-api-stopfalse
```

### 🔍 Explanation:

- -disable-api-stop false → Enables stop protection

- Instance cannot be stopped via API/CLI

---

## 🔎 Verify Stop Protection

```plain text
aws ec2 describe-instance-attribute \
--instance-id i-1234567890abcdef0 \
--attribute disableApiStop
```

---

## ❗ Important Notes

- Stop Protection only prevents stopping, NOT:
  - Termination

  - Reboot

👉 For termination protection, use:

- Disable API Termination

---

## 🚫 To Disable Stop Protection

```plain text
aws ec2 modify-instance-attribute \
--instance-id i-1234567890abcdef0 \
--disable-api-stoptrue
```

---

## 🧠 Real-World Example

Imagine you have:

- 🏦 Production database server

- 🚀 Live application server

Without stop protection:

- Someone runs:
```plain text
aws ec2 stop-instances--instance-ids i-123...
```

- ❌ Your app goes down

With stop protection:

- ✅ AWS blocks the stop request

---

## 📌 Summary
