## 🎯 Objective

Enable passwordless SSH access by:

- Generating SSH keys on local machine

- Copying public key to server

- Connecting securely via SSH

---

## 🧠 Concept

- Private Key (id_rsa) → stays on client (never share)

- Public Key (id_rsa.pub) → added to server

- Server verifies key → grants access without password

---

## ⚙️ Step-by-Step (Your Actual Flow)

## 🖥️ On Client Machine

### 1️⃣ Navigate to SSH Directory

```plain text
cd /root/.ssh
ls -lah
```

---

### 2️⃣ Generate SSH Key Pair

```plain text
ssh-keygen
```

👉 Generates:

```plain text
id_rsa       (private key)
id_rsa.pub   (public key)
```

---

### 3️⃣ View Public Key

```plain text
cat id_rsa.pub
```

👉 Copy this key

---

## 🌐 On Remote Server

### 4️⃣ Login (Initial - Password Based)

```plain text
ssh root@18.207.121.91
```

---

### 5️⃣ Navigate to SSH Directory

```plain text
cd ~/.ssh
ls -lah
```

---

### 6️⃣ Add Public Key

```plain text
vi authorized_keys
```

👉 Paste copied id_rsa.pub

---

### 7️⃣ Verify Key Added

```plain text
cat authorized_keys
```

---

## 🔐 Final Test

### 8️⃣ SSH Without Password

```plain text
ssh root@18.207.121.91
```

✅ Should login without password

---

## 🔒 Important Permissions

```plain text
chmod700 ~/.ssh
chmod600 ~/.ssh/authorized_keys
```

---

## ⚠️ Common Issues

### ❌ Permission Denied

- Check file permissions

- Ensure correct key pasted

---

### ❌ SSH Still Asking Password

- Wrong user (root vs ec2-user)

- Key not saved correctly

- SSH config issue

---

## 🧪 Validation Checklist

- [ ] SSH key generated

- [ ] Public key copied to server

- [ ] authorized_keys updated

- [ ] Permissions set correctly

- [ ] Passwordless SSH works

---

## 📌 Summary

You configured SSH access manually using ssh-keygen, enabling secure, passwordless login by linking your local key pair with the server’s authorized_keys.
