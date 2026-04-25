## 🎯 Objective

Prevent accidental deletion of an EC2 instance by enabling termination protection.

---

## 🧠 What is Termination Protection?

Termination Protection is a safety feature in Amazon EC2 that:

- ❌ Blocks accidental Terminate Instance action

- ✅ Ensures critical servers are not deleted unintentionally

- 🔒 Adds an extra layer of infrastructure safety

---

## ⚠️ Why It Matters

In real-world DevOps:

- Production servers must never be deleted by mistake

- One wrong click = 💥 downtime + data loss

- This setting acts like a “Are you REALLY sure?” shield

---

## 🖥️ Method 1: Enable via AWS Console

### Steps:

1. Go to Amazon EC2 Dashboard

1. Click Instances

1. Select your EC2 instance

1. Click Actions → Instance Settings → Change Termination Protection

1. Choose:
  - ✅ Enable

1. Click Save

---

## 💻 Method 2: Enable via AWS CLI

### Command:

```plain text
aws ec2 modify-instance-attribute \
--instance-id i-1234567890abcdef0 \
--disable-api-termination
```

👉 This enables termination protection

---

## 🔍 Verify Status

```plain text
aws ec2 describe-instance-attribute \
--instance-id i-1234567890abcdef0 \
--attribute disableApiTermination
```

Expected output:

```plain text
{
  "DisableApiTermination": {
    "Value":true
  }
}
```

---

## 🔓 Disable Termination Protection (if needed)

```plain text
aws ec2 modify-instance-attribute \
--instance-id i-1234567890abcdef0 \
--no-disable-api-termination
```

---

## 🧠 Real DevOps Use Cases

- ✅ Production servers

- ✅ Database servers

- ✅ Critical backend APIs

- ❌ Not needed for temporary/test instances

---

## ⚠️ Important Notes

- This only prevents termination, NOT:
  - Stop

  - Reboot

- To terminate:
  1. Disable protection first

  1. Then terminate

---

## 🔥 Pro Tip

Combine with:

- IAM restrictions

- Backups (snapshots)

- Auto Scaling protection

👉 Gives you multi-layer safety
