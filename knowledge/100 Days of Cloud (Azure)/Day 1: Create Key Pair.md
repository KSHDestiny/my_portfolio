## 🔐 What is an SSH Key Pair?

An SSH key pair is used to securely access a Linux Virtual Machine (VM) in Azure.

It consists of:

- Public Key → Stored on the Azure VM

- Private Key (.pem file) → Downloaded and kept securely by the user

Both keys work together to authenticate your connection securely without using passwords.

---

## ❗ Why SSH Keys Are Important in Azure

Azure uses SSH keys to provide secure, passwordless authentication when connecting to Linux VMs.

Benefits:

- 🔐 Enables secure SSH access (no passwords required)

- 🚫 Protects against brute-force attacks

- 🧑‍💻 Only users with the private key can log in

- ⚠️ If the private key is lost, you may lose access to the VM

- 🔒 More secure than password-based authentication

> Azure does not store your private key. You are responsible for keeping it safe.

---

## 🛠️ Steps to Create an SSH Key in Azure Portal

### 1️⃣ Sign in to Azure

Go to the Microsoft Azure Portal: 🔗 https://portal.azure.com

---

### 2️⃣ Navigate to SSH Keys

- From the search bar, type SSH keys

- Click SSH keys service

- Click + Create

---

### 3️⃣ Configure the SSH Key

Fill in:

- Subscription → Select your subscription

- Resource Group → Select existing or create new
  (e.g. kml_rg_main_3908bbd1fc154dfd)

- Name → Enter key name
  (e.g. datacenter-kp)

- SSH public key source → Generate new key pair

Click Review + create

Then click Create

---

### 4️⃣ Download and Secure the Private Key

- The private key file (.pem) will download automatically

- Store it securely (e.g., inside ~/.ssh/ folder)

- Set proper permission (Mac/Linux):

```plain text
chmod400 datacenter-kp.pem
```

⚠️ Important:

- Do NOT share the private key

- Do NOT upload it to GitHub

- Keep a secure backup

---

## 🎯 Result

- SSH key successfully created in Azure

- Ready to use when creating a Linux VM

- Secure authentication enabled
