## 🎯 Objective

Assign a Public IP address to an Azure VM so it can be accessed from the internet (e.g., SSH, RDP, web apps).

---

## 🧠 What is a Public IP in Azure?

A Public IP Address allows your VM to:

- Be reachable over the internet

- Host web apps / APIs

- Enable remote access (SSH / RDP)

Without it → VM is private only inside the VNet.

---

## 🏗️ How Azure Networking Works (Simple Flow)

```plain text
Internet → Public IP → Network Interface (NIC) → Virtual Machine
```

👉 Public IP is attached to NIC, not directly to VM.

---

## 🛠️ Method 1: Attach Public IP via Azure Portal (GUI)

### 📍 Steps:

1. Go to Azure Portal

1. Navigate to Virtual Machines

1. Select your VM

1. Click Networking

1. Click on the Network Interface (NIC)

1. Go to IP configuration

1. Click ipconfig1

1. Under Public IP address:
  - Click Associate

  - Choose:
    - Existing Public IP OR

    - Create new

1. Click Save

---

## ⚙️ Method 2: Using Azure CLI

### 📌 Step 1: Create Public IP

```plain text
az network public-ip create \
--resource-group myResourceGroup \
--name myPublicIP \
--sku Basic \
--allocation-method Static
```

---

### 📌 Step 2: Attach to NIC

```plain text
az network nic ip-config update \
--name ipconfig1 \
--nic-name myNIC \
--resource-group myResourceGroup \
--public-ip-address myPublicIP
```

---

## 🔍 Verify Public IP

```plain text
az vm show \
--name myVM \
--resource-group myResourceGroup \
--show-details \
--query publicIps \
--output tsv
```

---

## 🔐 Open Required Ports (Very Important)

If you don’t open ports, you still can’t access VM.

### Example:

Allow SSH (Linux):

```plain text
az vm open-port--port22--resource-group myResourceGroup--name myVM
```

Allow HTTP:

```plain text
az vm open-port--port80--resource-group myResourceGroup--name myVM
```

---

## 📌 Static vs Dynamic Public IP

👉 Recommended: Static (for production)

---

## ⚠️ Common Mistakes

- ❌ Attaching Public IP to VM instead of NIC

- ❌ Forgetting to open NSG ports

- ❌ Using Dynamic IP in production

- ❌ Not checking correct resource group

---

## 🚀 Real Use Cases

- SSH into Linux VM

- Host a website

- Expose API server

- Remote administration

---

## 🧪 Test Connection

After attaching Public IP:

### Linux VM:

```plain text
ssh azureuser@<public-ip>
```

### Windows VM:

- Use Remote Desktop (RDP)

- Connect to: <public-ip>

---

## 🧩 Bonus: Check NIC Details

```plain text
az network nic show \
--name myNIC \
--resource-group myResourceGroup
```
