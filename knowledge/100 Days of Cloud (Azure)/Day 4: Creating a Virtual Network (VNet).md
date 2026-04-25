### 🎯 Objective

Create a Virtual Network (VNet) in Azure to enable secure communication between Azure resources such as Virtual Machines, databases, and services.

A VNet allows resources to communicate privately within Azure, and optionally with on-premises networks or the internet.

---

### 🌐 What is a Virtual Network (VNet)?

A Virtual Network (VNet) is a logically isolated network in Azure, similar to a traditional network in a data center.

It allows Azure resources to:

- Communicate securely with each other

- Connect to the internet

- Connect to on-premises networks (VPN or ExpressRoute)

Example address space

```plain text
10.0.0.0/16
```

---

### 📌 Key Components of a VNet

---

### 🛠️ Steps to Create a VNet (Azure Portal)

1. Sign in to Azure
  - Go to the Azure Portal: https://portal.azure.com

1. Navigate to Virtual Networks
  - Click Create a resource

  - Search for Virtual Network

  - Click Create

1. Basic configuration
  - Subscription: select your subscription

  - Resource Group: select existing or create new

  - Virtual network name: for example devops-vnet

  - Region: choose your preferred region

1. Configure address space
  - Define the VNet IP range, for example:
```plain text
10.0.0.0/16
```

  - This range will be used to create subnets inside the VNet.

1. Create a subnet
  Example:

  This subnet will host resources such as VMs.

1. Review and create
  - Click Review + create

  - Click Create

  - Azure will deploy the virtual network.

---

### 🔍 Verify the VNet

Navigate to:

Virtual Networks → devops-vnet

You should see:

- Address space

- Subnets

- Connected resources

---

### ⚠️ Important Notes

- VNets allow secure communication between Azure resources.

- Subnets divide the network into smaller segments.

- NSGs can be used to control inbound and outbound traffic.

- Plan IP ranges carefully to avoid network conflicts.
