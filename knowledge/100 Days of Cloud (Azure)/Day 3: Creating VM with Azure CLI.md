### 1) Verify Azure Login

Check the currently logged-in account:

```bash
az account show
```

If not logged in:

```bash
az login
```

### 2) List Available Resource Groups

```bash
az group list
```

Set your resource group as a variable:

```bash
RG_NAME="kml_rg_main-6d63632173014aad"
```

### 3) Create the Virtual Machine

```bash
az vm create \
	--resource-group $RG_NAME \
	--name nautilus-vm \
	--image Ubuntu2204 \
	--size Standard_B2s \
	--admin-username azureuser \
	--generate-ssh-keys \
	--storage-sku Standard_LRS \
	--os-disk-size-gb 30
```

### Explanation of Parameters

- --resource-group → Resource group name

- --name → VM name

- --image → OS image (Ubuntu 22.04)

- --size → VM size

- --admin-username → SSH login username

- --generate-ssh-keys → Automatically creates SSH key if it does not exist

- --storage-sku → Disk type (Standard_LRS)

- --os-disk-size-gb → OS disk size (30 GB)

### 4) Verify VM Creation

Check VM details:

```bash
az vm show --resource-group $RG_NAME --name nautilus-vm
```

Get public IP address:

```bash
az vm show \
	--resource-group $RG_NAME \
	--name nautilus-vm \
	--show-details \
	--query 'publicIps' \
	--output tsv
```

### 5) Connect to the VM via SSH

```bash
ssh azureuser@<Public-IP>
```

Example:

```bash
ssh azureuser@52.186.140.102
```

### Best Practices

- Avoid exposing SSH to the public internet in production.

- Use NSG rules to restrict SSH access to your IP.

- Store SSH keys securely in ~/.ssh/.

- Use Infrastructure as Code (Terraform or Bicep) for production deployments.

### Result

- VM created successfully using Azure CLI.

- SSH key generated automatically.

- VM accessible via public IP.

- Fully DevOps-friendly workflow.
