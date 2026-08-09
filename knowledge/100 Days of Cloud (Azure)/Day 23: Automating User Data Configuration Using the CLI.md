# Day 23: Automating User Data Configuration Using Azure CLI

## 🎯 Objective

Create an Azure Virtual Machine using Azure CLI and automatically configure it at launch using a User Data / cloud-init script.

In this example, we will:

- Create an Ubuntu VM using Azure CLI

- Automatically install Nginx

- Start and enable the Nginx service

- Open port 80 for HTTP traffic

- Verify the VM, resources, and Network Security Group (NSG) rules

👉 This eliminates the need to SSH into the VM and manually install Nginx after deployment.

---

## 🧠 Concept

Azure CLI allows us to create and configure Azure resources directly from the terminal.

Instead of manually creating a VM through the Azure Portal, we can use:

```bash
az vm create
```

We can also provide a startup script using:

```bash
--custom-data nginx.sh
```

The VM's cloud-init process reads the script during the initial boot and executes the configuration automatically.

### Flow

```plain text
Azure CLI
    ↓
az vm create
    ↓
Azure VM Created
    ↓
cloud-init reads nginx.sh
    ↓
Install Nginx
    ↓
Start Nginx
    ↓
VM ready to serve HTTP traffic
```

---

## ⚙️ Step 1: Check Azure Account

Before creating resources, verify that Azure CLI is authenticated with the correct account.

```bash
az account show
```

This displays information such as:

- Subscription

- Tenant

- Current Azure account

- Subscription state

---

## 📦 Step 2: List Resource Groups

Check the available resource groups:

```bash
az group list -o table
```

The -o table option displays the result in an easier-to-read table format.

---

## 🔧 Step 3: Store Resource Group Name

Instead of repeatedly typing the resource group name, store it in a shell variable:

```bash
rg_name="{resource-group-name}"
```

Example:

```bash
rg_name="devops-rg"
```

Now we can reference it using:

```bash
$rg_name
```

---

## 📝 Step 4: Create the User Data Script

Create a shell script:

```bash
vim nginx.sh
```

Add:

```bash
#!/bin/bash

apt update -y
apt install -y nginx

systemctl start nginx
systemctl enable nginx
```

Save and exit the file.

### What This Script Does

```plain text
apt update
    ↓
Update package repository

apt install nginx
    ↓
Install Nginx

systemctl start nginx
    ↓
Start Nginx immediately

systemctl enable nginx
    ↓
Automatically start Nginx after reboot
```

---

## 🚀 Step 5: Create the Azure VM

Create the VM and pass the Nginx script as custom data:

```bash
az vm create \
  --resource-group "$rg_name" \
  --name devops-vm \
  --image Ubuntu2404 \
  --location eastus \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --custom-data nginx.sh \
  --os-disk-size-gb 30 \
  --storage-sku Standard_LRS
```

### Important Options

The important part for automation is:

```bash
--custom-data nginx.sh
```

This allows the VM to configure itself during the initial boot.

---

## 📋 Step 6: Check Created Resources

List all resources created inside the resource group:

```bash
az resource list \
  --resource-group "$rg_name" \
  -o table
```

You should see resources related to the VM, such as:

- Virtual Machine

- Network Interface

- Network Security Group

- Public IP

- Virtual Network

- Disk

---

## 🌐 Step 7: Open HTTP Port 80

Nginx listens on TCP port 80 by default.

Allow incoming HTTP traffic:

```bash
az vm open-port \
  --resource-group "$rg_name" \
  --name devops-vm \
  --port 80
```

This creates or updates an inbound rule in the VM's Network Security Group (NSG).

Without this rule, Nginx may be running correctly but won't be accessible from the internet.

---

## 🔐 Step 8: Verify NSG Rules

Check the Network Security Group rules:

```bash
az network nsg rule list \
  --resource-group "$rg_name" \
  --nsg-name devops-vmNSG \
  -o table
```

Look for an inbound rule allowing:

```plain text
TCP → Port 80 → Allow
```

> The actual NSG name can differ depending on how the VM/network resources were created. Check your resource list if devops-vmNSG is not the generated name.

---

## 🔍 Step 9: Check VM Details

Display detailed VM information:

```bash
az vm show \
  --resource-group "$rg_name" \
  --name devops-vm \
  --show-details
```

This provides information such as:

- VM status

- Public IP address

- Private IP address

- VM size

- Operating system

- Resource group

For a cleaner output, you can also use:

```bash
az vm show \
  --resource-group "$rg_name" \
  --name devops-vm \
  --show-details \
  -o table
```

---

## 🌍 Step 10: Test Nginx

Get the public IP address:

```bash
az vm show \
  --resource-group "$rg_name" \
  --name devops-vm \
  --show-details \
  --query publicIps \
  -o tsv
```

Then test it:

```bash
curl http://<PUBLIC_IP>
```

Or open it in a browser:

```plain text
http://<PUBLIC_IP>
```

If the configuration was successful, the default Welcome to nginx! page should appear.

---

## 🔍 Troubleshooting User Data

If Nginx was not installed correctly, SSH into the VM:

```bash
ssh azureuser@<PUBLIC_IP>
```

Check Nginx:

```bash
sudo systemctl status nginx
```

Check cloud-init status:

```bash
cloud-init status
```

Check the cloud-init output:

```bash
sudo cat /var/log/cloud-init-output.log
```

These logs are especially useful when the nginx.sh script fails during the first boot.

---

## ⚠️ Important Notes

- #!/bin/bash should be the first line of the script.

- Ubuntu uses the apt package manager.

- -custom-data passes the initialization script to the VM.

- The configuration is processed by cloud-init during VM initialization.

- Opening port 80 is required for external HTTP access.

- systemctl enable nginx ensures Nginx starts automatically after VM reboot.

- A running Nginx service does not automatically mean it is publicly accessible; Azure networking and NSG rules must also allow the traffic.

---

## 🧪 Validation Checklist

- [ ] Azure CLI authenticated

- [ ] Correct resource group selected

- [ ] nginx.sh created

- [ ] VM created successfully

- [ ] Custom data passed to VM

- [ ] Nginx installed automatically

- [ ] Nginx service running

- [ ] Nginx enabled at startup

- [ ] Port 80 opened

- [ ] NSG inbound rule verified

- [ ] Public IP retrieved

- [ ] Nginx page accessible from browser

---

## 🔗 Reference

Microsoft Azure CLI — VM Commands:

https://learn.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest

---

## 📌 Summary

Azure CLI can automate both infrastructure provisioning and initial server configuration.

Instead of:

```plain text
Create VM
→ SSH into VM
→ Update packages
→ Install Nginx
→ Start Nginx
→ Configure networking
```

we can automate most of the process:

```plain text
nginx.sh
        ↓
az vm create --custom-data
        ↓
Azure creates VM
        ↓
cloud-init executes script
        ↓
Nginx installed and started
        ↓
Port 80 opened through NSG
        ↓
Web server ready
```

This approach makes VM deployment faster, repeatable, and less dependent on manual configuration.
