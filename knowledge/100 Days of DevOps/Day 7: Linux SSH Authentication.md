## 🎯 Objective

Configure SSH authentication in Linux to securely allow users to access a server remotely.

SSH authentication ensures that only authorized users can connect to the system.

## 🔐 What is SSH?

SSH (Secure Shell) is a protocol used to securely connect to remote systems over a network.

It provides:

- Encrypted communication

- Secure remote login

- Secure command execution

- Secure file transfer (SCP / SFTP)

Example connection:

```bash
ssh user@server-ip
```

Example:

```bash
ssh devops@192.168.1.10
```

## 🔑 Types of SSH Authentication

Linux supports two common authentication methods:

Key-based authentication is more secure and commonly used in DevOps environments.

## 🛠️ Step 1: Generate SSH Key Pair

Generate an SSH key on the client machine:

```bash
ssh-keygen
```

Example output:

```bash
Generating public/private rsa key pair.
```

Files created:

```bash
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

## 📤 Step 2: Copy Public Key to Server

Use the following command:

```bash
ssh-copy-id user@server-ip
```

Example:

```bash
ssh-copy-id devops@192.168.1.10
```

This copies the public key to:

```bash
/home/user/.ssh/authorized_keys
```

## 🔍 Step 3: Test SSH Login

Now login without a password:

```bash
ssh user@server-ip
```

Example:

```bash
ssh devops@192.168.1.10
```

## ⚙️ Step 4: Configure SSH Server

Edit the SSH configuration file:

```bash
sudo nano /etc/ssh/sshd_config
```

Important settings:

```bash
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
```

Restart SSH service:

```bash
sudo systemctl restart sshd
```

## 🔍 Step 5: Verify SSH Service

Check SSH service status:

```bash
sudo systemctl status sshd
```

## ⚠️ Important Notes

- Keep the private key secure

- Do not share private keys

- Disable password authentication in production

- Restrict SSH access using firewalls or security groups

## 🎯 Result

- SSH key authentication configured

- Secure remote login enabled

- Password-based access disabled for better security
