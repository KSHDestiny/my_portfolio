## 🎯 Objective

Create a Virtual Network (VNet) in Azure using an IPv4 address space to allow secure communication between Azure resources such as Virtual Machines, databases, and services.

## 🌐 What is a Virtual Network (VNet)?

A Virtual Network (VNet) is a logically isolated network in Azure that enables Azure resources to communicate with each other securely.

It is similar to a traditional network in a data center, but hosted in the Azure cloud.

## 📌 IPv4 Address Space

When creating a VNet, you must define an IPv4 address range called the Address Space.

Example

```plain text
10.0.0.0/16
```

Explanation

This address range will be used to create subnets inside the VNet.

## 📊 Example Network Layout

Subnets divide the VNet into smaller networks for better organization and security.

## 🛠️ Steps to Create VNet (Azure Portal)

1. Sign in to Azure
  - Go to the Azure Portal: https://portal.azure.com

1. Navigate to Virtual Network
  - Click Create a resource

  - Search for Virtual Network

  - Click Create

1. Basic configuration
  - Subscription: Select your subscription

  - Resource group: Select existing or create new

  - Virtual network name: Example: devops-vnet

  - Region: Choose your preferred region

1. Configure IPv4 address space
  - Set the IPv4 address range, for example: 10.0.0.0/16

1. Create a subnet
  - Example:
    - Subnet name: web-subnet

    - Address range: 10.0.1.0/24

  - This subnet can host resources such as Virtual Machines.

1. Review and create
  - Click Review + create

  - Click Create

  - Azure will deploy the Virtual Network.

## 🔍 Verify the VNet

Navigate to:

Virtual Networks → devops-vnet

You should see:

- IPv4 address space

- Subnets

- Connected resources

## ⚠️ Important Notes

- Always plan the IPv4 address space carefully.

- Subnets help organize and secure resources.

- VNets allow secure communication between Azure services.

- Network Security Groups (NSG) can control traffic within the VNet.
