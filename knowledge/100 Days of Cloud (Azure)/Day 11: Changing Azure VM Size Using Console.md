## 🎯 Objective

Resize an Azure Virtual Machine to increase or decrease:

- CPU (vCPUs)

- Memory (RAM)

- Performance tier

---

## 🧠 What is VM Resizing?

Changing VM size means switching to a different SKU (Virtual Machine size) like:

- Standard_B1s → small (low cost)

- Standard_D2s_v3 → medium

- Standard_E4s_v3 → high memory

👉 Useful for scaling based on workload.

---

## 🏗️ Concept

```plain text
Azure VM → Resize → New CPU / RAM → Restart VM
```

👉 VM may need to restart during resize.

---

## 🛠️ Steps to Change VM Size (Azure Portal)

### 📍 Step-by-Step:

1. Go to Azure Portal

1. Navigate to Virtual Machines

1. Select your VM

1. In left menu → Click Size

1. Browse available VM sizes

1. Select desired size

1. Click Resize

---

## 🔍 What You Will See

- Available sizes (filtered by region + availability)

- Cost per hour

- Specs:
  - vCPU

  - RAM

  - Temp storage

---

## ⚠️ Important Notes

### 🔹 1. VM Must Be Stopped (Sometimes)

- If size not available → Stop (deallocate) VM first

👉 From Portal:

- Click Stop

- Then resize

---

### 🔹 2. Region & Hardware Limits

- Not all sizes available in all regions

- Depends on underlying hardware cluster

---

### 🔹 3. Disk Compatibility

- Some sizes require Premium Disk support

---

### 🔹 4. Temporary Downtime

- VM will restart → short downtime

---

## 💰 Cost Impact

👉 Billing changes immediately after resize

---

## 🚀 Real Use Cases

- Scale up during high traffic

- Scale down to save cost

- Upgrade performance for database

- Testing different VM tiers

---

## 🧪 Example Scenario

👉 Your app is slow on:

```plain text
Standard_B1s (1 vCPU, 1GB RAM)
```

👉 Upgrade to:

```plain text
Standard_D2s_v3 (2 vCPU, 8GB RAM)
```

Result:

- Faster response

- Better concurrency

---

## 🧩 Alternative: Azure CLI

```plain text
az vm resize \
--resource-group myResourceGroup \
--name myVM \
--size Standard_D2s_v3
```

---

## 🔎 Check Available Sizes via CLI

```plain text
az vm list-vm-resize-options \
--resource-group myResourceGroup \
--name myVM \
--output table
```

---

## 🧠 DevOps Tip

👉 Always monitor before resizing:

- CPU usage

- Memory usage

👉 Use:

- Azure Monitor

- Metrics

---

## ⚠️ Common Mistakes

- ❌ Not stopping VM when required

- ❌ Choosing unsupported size

- ❌ Ignoring cost increase

- ❌ Not checking disk compatibility

---

## 🔄 Quick Summary

- Resize VM from Portal → Size → Select → Resize

- May require stop/deallocate

- Causes short downtime

- Impacts cost & performance
