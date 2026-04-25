## 🎯 Objective

Assign a static public IP (Elastic IP) to an EC2 instance so it remains reachable even after stop/start.

---

## 🧠 What is an Elastic IP?

An Elastic IP (EIP) is a static IPv4 address provided by AWS.

### Key Points:

- ✅ Persistent (does not change)

- ✅ Can be reattached to another instance

- ❌ Charged if not in use

---

## 🏗️ How It Works

```plain text
Internet → Elastic IP → EC2 Instance
```

👉 EIP is associated directly with the instance or its network interface (ENI).

---

## 🛠️ Method 1: Attach Elastic IP via AWS Console

### 📍 Steps:

1. Go to EC2 Dashboard

1. Click Elastic IPs (left sidebar)

1. Click Allocate Elastic IP address

1. Click Allocate

---

### 🔗 Associate Elastic IP

1. Select the allocated IP

1. Click Actions → Associate Elastic IP address

1. Choose:
  - Resource type → Instance

  - Select your EC2 instance

1. Click Associate

---

## ⚙️ Method 2: Using AWS CLI

### 📌 Step 1: Allocate Elastic IP

```plain text
aws ec2 allocate-address--domain vpc
```

Output will contain:

```plain text
{
  "PublicIp":"3.x.x.x",
  "AllocationId":"eipalloc-abc123"
}
```

---

### 📌 Step 2: Associate with Instance

```plain text
aws ec2 associate-address \
--instance-id i-1234567890abcdef0 \
--allocation-id eipalloc-abc123
```

---

## 🔍 Verify Elastic IP

```plain text
aws ec2 describe-addresses
```

---

## 🔐 Allow Access (Security Group)

Make sure required ports are open:

### Example:

Allow SSH:

```plain text
port22 → your IP
```

Allow HTTP:

```plain text
port80 →0.0.0.0/0
```

---

## ⚠️ Important Notes

- 🔹 One Elastic IP per instance (default limit)

- 🔹 Charged if:
  - Not attached to instance

  - Attached but instance is stopped

- 🔹 Works only with IPv4

---

## 📊 Elastic IP vs Public IP

---

## 🚀 Real Use Cases

- Hosting production websites

- Fixed IP for DNS mapping

- Whitelisting IP in firewalls

- Stable API endpoints

---

## 🧪 Test Connection

```plain text
ssh ec2-user@<elastic-ip>
```

---

## 🧩 Bonus: Disassociate / Release EIP

### Disassociate:

```plain text
aws ec2 disassociate-address--association-id eipassoc-xxxx
```

### Release:

```plain text
aws ec2 release-address--allocation-id eipalloc-xxxx
```

---

## 🧠 DevOps Tip

👉 Always use Elastic IP for production

👉 Avoid unused EIPs to prevent unnecessary charges
