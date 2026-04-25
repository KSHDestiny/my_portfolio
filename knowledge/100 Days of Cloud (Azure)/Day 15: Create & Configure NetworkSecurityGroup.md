## 🎯 Objective

Create and configure a Network Security Group (NSG) to control inbound and outbound traffic for resources in a virtual network.

---

## 🧠 What is a Network Security Group (NSG)?

A Network Security Group (NSG) is a firewall in Microsoft Azure that filters traffic based on rules.

👉 It controls:

- Inbound traffic (incoming requests)

- Outbound traffic (outgoing responses)

---

## 📊 NSG Rule Components

---

## 🏗️ How It Works

```plain text
Internet → NSG → Subnet / VM → Application
```

---

## 🛠️ Step 1: Create NSG (Azure Portal)

1. Go to Azure Portal

1. Search: Network Security Group

1. Click Create

Fill details:

- Subscription

- Resource Group

- Name → nautilus-nsg

- Region → Same as VM

Click Review + Create → Create

---

## 🔗 Step 2: Associate NSG

You can attach NSG to:

### Option A: Subnet (Recommended)

1. Go to Virtual Network

1. Select Subnets

1. Choose subnet

1. Attach NSG

---

### Option B: Network Interface (NIC)

1. Go to Virtual Machine

1. Select Networking

1. Click Network Interface

1. Attach NSG

---

## 🔓 Step 3: Add Inbound Rules

Go to:

👉 NSG → Inbound Security Rules → Add

### Allow SSH (Port 22)

---

### Allow HTTP (Port 80)

---

### Allow HTTPS (Port 443)

---

## 🚫 Step 4: Understand Default Rules

Azure NSG already includes:

👉 Custom rules must have higher priority (lower number)

---

## 🧪 Step 5: Verify Access

From local machine:

```plain text
ssh azureuser@<public-ip>
curl http://<public-ip>
curl-k https://<public-ip>
```

---

## 🔐 Security Best Practices

- Avoid using Source = Any in production

- Restrict IP ranges (e.g., your IP only)

- Use least privilege principle

- Keep ports closed unless required

---

## 🔁 NSG vs Security Group (AWS)

---

## 🧾 Command (Azure CLI - Optional)

Create NSG:

```plain text
az network nsg create \
--resource-group <RG_NAME> \
--name nautilus-nsg
```

Add rule:

```plain text
az network nsg rule create \
--resource-group <RG_NAME> \
--nsg-name nautilus-nsg \
--name Allow-SSH \
--protocol Tcp \
--direction Inbound \
--priority1000 \
--destination-port-range22 \
--access Allow
```

---

## 📌 Key Notes

- NSG acts like a firewall

- Rules are processed by priority

- Can be applied at Subnet or NIC level

- Default deny rule blocks all unspecified traffic

---

## ✅ Outcome

- NSG created and attached

- Required ports (22, 80, 443) opened

- Secure traffic control implemented
