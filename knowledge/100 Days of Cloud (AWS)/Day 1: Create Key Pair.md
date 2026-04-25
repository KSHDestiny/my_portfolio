## 🔐 What is an SSH Key Pair?

An SSH key pair is used to securely access your EC2 instance.

It consists of:

- Public Key → Stored on the EC2 instance

- Private Key (.pem file) → Downloaded and kept securely by the user

These two keys work together to authenticate your connection securely.

---

## ❗ Why Creating a Key Pair is Mandatory

A key pair must be created before launching an EC2 instance, because:

- 🔐 Enables secure, passwordless SSH authentication

- 🚫 Protects against brute-force password attacks

- 🧑‍💻 Ensures only users with the private key can log in

- ⚠️ If the private key is lost, you cannot access the instance

> AWS does not store your private key. You are fully responsible for keeping it safe.

---

## 🛠️ Steps to Create a Key Pair in AWS

### 1️⃣ Sign in to AWS

- Go to the AWS Management Console

- Navigate to:
  Services → EC2 → Network & Security → Key Pairs

---

### 2️⃣ Create the Key Pair

- Click Create key pair

- Enter a Key pair name
  Example: devops-training-key

Select:

- Key pair type → RSA

- Private key file format → .pem (for Mac/Linux/WSL)

Then click Create key pair

---

### 3️⃣ Download and Secure the Key

- The .pem file will download automatically

- Store it in a secure location (e.g., ~/.ssh/)

- Set proper file permissions (for Linux/Mac):

```plain text
chmod400 devops-training-key.pem
```

⚠️ Important:

- Do NOT share your private key

- Do NOT upload it to GitHub

- Do NOT lose it

---

## 🎯 Result

- Key pair successfully created

- Ready to be used while launching EC2

- Secure SSH access enabled
