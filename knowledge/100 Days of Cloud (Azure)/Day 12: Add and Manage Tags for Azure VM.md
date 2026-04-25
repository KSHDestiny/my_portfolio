## 🎯 Objective

Add and manage tags for an Azure Virtual Machine to organize, categorize, and track cloud resources efficiently.

Tags help in cost management, resource organization, automation, and governance.

---

## 🏷️ What are Tags in Azure?

Tags are key-value pairs assigned to Azure resources.

They allow you to:

- Organize resources logically

- Track costs by project, team, or environment

- Automate management tasks

- Apply governance policies

Example:

```plain text
Environment : Production
Project     : HRMS
Owner       : Kaung Sat Hein
```

---

## 📊 Common Tag Examples

---

## 🛠️ Steps to Add Tags (Azure Portal)

### 1️⃣ Sign in to Azure

Go to:

https://portal.azure.com

---

### 2️⃣ Navigate to Virtual Machine

Go to:

Virtual Machines → Your VM

---

### 3️⃣ Open Tags Section

In the left menu, click:

Tags

---

### 4️⃣ Add Tags

Click:

+ Add

Fill in:

- Name (Key) → Example: Environment

- Value → Example: Production

Add multiple tags if needed.

---

### 5️⃣ Save

Click:

Save

👉 Tags are now applied to the VM

---

## 🔍 Verify Tags

Go to:

Virtual Machines → Your VM → Tags

You will see:

```plain text
Environment : Production
Project     : HRMS
```

---

## ⚙️ Manage Tags

### ✏️ Edit Tags

- Modify key/value in Tags section

- Click Save

---

### ❌ Delete Tags

- Click Remove next to the tag

- Click Save

---

### 📋 View Tags Across Resources

Go to:

All resources

Filter by:

```plain text
Tags
```

👉 Helps find related resources easily

---

## 💻 Azure CLI (Optional)

### Add Tags:

```plain text
az resource tag \
--tagsEnvironment=ProductionProject=HRMS \
--name myVM \
--resource-group myResourceGroup \
--resource-type"Microsoft.Compute/virtualMachines"
```

---

### Update Tags:

```plain text
az resource update \
--set tags.Owner=Kaung \
--resource-group myResourceGroup \
--name myVM \
--resource-type"Microsoft.Compute/virtualMachines"
```

---

### Remove Tags:

```plain text
az resource tag \
--tags"" \
--name myVM \
--resource-group myResourceGroup \
--resource-type"Microsoft.Compute/virtualMachines"
```

---

## ⚠️ Important Notes

- Tags are case-sensitive (Env ≠ env)

- Maximum 50 tags per resource

- Tags do not inherit automatically (unless using policies)

- Use consistent naming conventions

---

## 🧠 Best Practices

- Use standard keys like:
  - Environment

  - Owner

  - Project

- Enforce tagging using Azure Policy

- Use tags for cost analysis in Azure Cost Management

---

## 🎯 Result

Tags have been successfully added and managed for the Azure Virtual Machine, enabling better organization, cost tracking, and resource governance.
