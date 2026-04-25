## 🎯 Objective

Attach an additional Network Interface Card (NIC) to an Azure Virtual Machine to enable advanced networking and traffic separation.

---

## 🧠 What is a NIC in Azure?

In Microsoft Azure, a Network Interface (NIC) is a virtual network adapter that connects a VM to a Virtual Network (VNet).

Each NIC can have:

- Private IP address

- Public IP (optional)

- Network Security Group (NSG)

- Subnet association

---

## ⚙️ Why Attach Multiple NICs?

- 🔹 Separate public & private traffic

- 🔹 Isolate backend services

- 🔹 Improve security (multi-network segmentation)

- 🔹 Support multi-tier architectures

---

## ⚠️ Requirements

Before attaching a NIC:

- ❗ VM must be Stopped (Deallocated)

- ❗ VM size must support multiple NICs

- ❗ NIC must be in the same region & VNet

---

## 🖥️ Method 1: Attach NIC via Azure Portal

### Steps:

1. Go to Microsoft Azure Portal

1. Navigate to Virtual Machines

1. Select your VM

1. Click Stop (Deallocate)

1. Go to Networking

1. Click Attach network interface

1. Select an existing NIC or create a new one

1. Click Attach

1. Start the VM again

---

## 💻 Method 2: Attach NIC using Azure CLI

### Step 1: Create NIC (if not created)

```plain text
az network nic create \
--resource-group myResourceGroup \
--name myNIC \
--vnet-name myVNet \
--subnet mySubnet
```

---

### Step 2: Stop the VM

```plain text
az vm deallocate \
--resource-group myResourceGroup \
--name myVM
```

---

### Step 3: Attach NIC

```plain text
az vm nic add \
--resource-group myResourceGroup \
--vm-name myVM \
--nics myNIC
```

---

### Step 4: Start VM

```plain text
az vmstart \
--resource-group myResourceGroup \
--name myVM
```

---

## 🔍 Verify NIC Attachment

```plain text
az vm show \
--name myVM \
--resource-group myResourceGroup \
--query"networkProfile.networkInterfaces"
```

---

## 🧠 Inside the VM (Linux)

After attaching NIC, check interfaces:

```plain text
ip a
```

You may see:

- eth0 → Primary NIC

- eth1 → Newly attached NIC

👉 You might need to:

- Configure IP manually

- Update routing rules

---

## 🧠 Real DevOps Use Cases

### 🌐 Multi-tier architecture

- NIC 1 → Frontend (public subnet)

- NIC 2 → Backend (private subnet)

---

### 🔐 Security isolation

- Separate admin traffic

- Separate application traffic

---

### 🔀 Load balancing / routing setups

---

## ⚠️ Important Notes

- Primary NIC cannot be removed

- Secondary NICs can be added/removed

- NSG rules apply per NIC/subnet

- OS may not auto-configure new interface

---

## 🔥 Pro Tips

- Always document:
  - eth0 = public

  - eth1 = private

- Use NSGs for traffic control

- Combine with:
  - Azure Load Balancer

  - Application Gateway
