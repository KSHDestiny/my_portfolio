## 🎯 Objective

Terminate an EC2 instance in Amazon Web Services to permanently delete it and stop compute billing.

---

## 🧠 What is EC2 Termination?

Termination is the process of permanently deleting an EC2 instance.

Once terminated:

- ❌ Instance cannot be recovered

- ❌ Instance store data is lost

- 💸 Compute billing stops

---

## 🏗️ How It Works

```plain text
EC2 Instance → Terminate → Instance Deleted
```

---

## 📊 What Happens After Termination

---

## 🛠️ Method 1: Terminate via AWS Console

### 1️⃣ Go to EC2 Dashboard

Navigate to:

EC2 → Instances

---

### 2️⃣ Select Your Instance

Choose the instance you want to terminate

---

### 3️⃣ Terminate Instance

Click:

Instance state → Terminate instance

---

### 4️⃣ Confirm Termination

Click:

Terminate

---

## 🔍 Check Instance Status

```plain text
running → shutting-down → terminated
```

---

## ⚙️ Method 2: Using AWS CLI

### 📌 Get Instance ID

```plain text
aws ec2 describe-instances \
--query"Reservations[].Instances[].InstanceId" \
--output text
```

---

### 📌 Terminate Instance

```plain text
aws ec2 terminate-instances \
--instance-ids i-1234567890abcdef0
```

---

## ⚠️ Important Notes

- Termination protection must be disabled

- EBS volumes may still incur charges if not deleted

- Elastic IP must be released manually

- Action is irreversible

---

## 🧪 Example Use Case

👉 You finished testing environment → terminate instance to save cost

---

## 🧠 DevOps Insight

👉 Termination is part of resource lifecycle management

Used for:

- Cost optimization

- Cleanup of unused resources

- Ephemeral environments

---

## ⚠️ Common Mistakes

- ❌ Terminating wrong instance

- ❌ Forgetting to backup data

- ❌ Leaving unused EBS / Elastic IP

- ❌ Not disabling termination protection

---

## 🎯 Result

The EC2 instance is successfully terminated, ensuring no further compute charges and proper cleanup of resources.
