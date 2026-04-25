## 🎯 Objective

Create a subnet inside an Azure Virtual Network (VNet) to divide the network into smaller segments for better organization, security, and resource management.

Subnets let Azure resources like Virtual Machines, databases, and services live in separate network segments.

---

## 🌐 What is a Subnet?

A subnet is a smaller network created inside a Virtual Network (VNet).

It divides a larger network into smaller address ranges so resources can be grouped logically.

Example

- VNet: 10.0.0.0/16

- Subnet: 10.0.1.0/24

This means the subnet uses part of the VNet IP range.

---

## 📊 Example Network Layout

---

## 🛠️ Steps to Create a Subnet (Azure Portal)

1. Sign in to Azure
  - Go to the Azure Portal: https://portal.azure.com

1. Navigate to Virtual Networks
  - Search Virtual Networks

  - Select your VNet (example: devops-vnet)

1. Open the Subnets section
  - In the left menu, click Subnets

  - Click + Subnet

1. Configure the subnet
  - Subnet name: example web-subnet

  - Subnet address range: example 10.0.1.0/24

  - This range must be inside the VNet address space

1. Create subnet
  - Click Save

---

## 🔍 Verify Subnet

Go to:

- Virtual Networks → devops-vnet → Subnets

You should see the new subnet listed.

---

## ⚠️ Important Notes

- The subnet IP range must be within the VNet address space.

- Subnets cannot overlap.

- Each subnet can have its own Network Security Group (NSG) for traffic control.

- Plan subnet sizes carefully before deployment.

---

## ✅ Result

A subnet has been successfully created inside the Azure Virtual Network, allowing resources to be deployed in separate network segments.
