## 🎯 Objective

Create and assign a Public IP address to an Azure Virtual Machine so it can be accessed from the internet.

Public IPs allow users to connect to the VM using services like SSH, RDP, or web applications.

## 🌐 What is a Public IP?

A Public IP address allows Azure resources such as Virtual Machines to communicate with the internet.

It enables:

- Remote access (SSH / RDP)

- Hosting web applications

- External communication with cloud resources

Example:

20.204.120.45

## 📊 Public IP Types in Azure

For production systems, Static IPs are recommended.

## 🛠️ Steps to Create Public IP (Azure Portal)

### 1️⃣ Sign in to Azure

Go to the Azure Portal:

https://portal.azure.com

### 2️⃣ Navigate to Public IP Address Service

Search for:

Public IP addresses

Click:

Create

### 3️⃣ Configure Public IP

Fill in the following details:

- Subscription → Select your subscription

- Resource Group → Select existing resource group

- Name → Example: vm-public-ip

- Region → Same region as the VM

- IP Version → IPv4

- SKU → Standard

- Assignment → Static

### 4️⃣ Review and Create

Click:

Review + create

Then click:

Create

Azure will deploy the Public IP resource.

## 🔗 Associate Public IP with Virtual Machine

1. Navigate to:Virtual Machines → Your VM

1. Click:Networking

1. Select the Network Interface (NIC)

1. Click IP configuration

1. Under Public IP address, select the created Public IP

Save the configuration.

## 🔍 Verify Public IP

Go to:

Virtual Machines → Your VM

You should now see the Public IP address assigned to the VM.

Example:

20.204.120.45

## 🔐 Connect to the VM

Example SSH connection:

```bash
ssh azureuser@<public-ip>
```

Example:

```bash
ssh azureuser@20.204.120.45
```

## ⚠️ Important Notes

- Ensure Network Security Group (NSG) allows required ports (SSH or RDP)

- Use Static Public IPs for production workloads

- Avoid exposing unnecessary ports to the internet

## 🎯 Result

A Public IP address has been successfully created and assigned to the Azure Virtual Machine, enabling remote access from the internet.
