## 🎯 Objective

Install **Ansible**, an open-source automation tool used for **configuration management, application deployment, and task automation**.

Ansible allows administrators to manage multiple servers from a **single control node**.

## 🤖 What is Ansible?

**Ansible** is an agentless automation tool that uses **SSH** to manage remote systems.

It is commonly used for:

- Configuration management
- Application deployment
- Infrastructure automation
- Server provisioning

Key features:

- Agentless architecture
- Simple YAML-based playbooks
- Uses SSH for communication
- Easy to learn and maintain

## 📦 Step 1: Install Ansible (RHEL / CentOS / Rocky Linux)

Update system packages:

```bash
sudo yum update -y
```

Install Ansible:

```bash
sudo yum install ansible -y
```

## 📦 Install Ansible (Ubuntu / Debian)

Update package list:

```bash
sudo apt update
```

Install Ansible:

```bash
sudo apt install ansible -y
```

## 🔍 Step 2: Verify Installation

Check the installed version:

```bash
ansible --version
```

Example output:

```bash
ansible [core 2.15]
```

## 🖥️ Step 3: Test Ansible Command

Run a simple test command:

```bash
ansible localhost -m ping
```

Expected output:

```bash
localhost | SUCCESS => {
    "ping": "pong"
}
```

## 📁 Important Ansible Files

| --- | --- |

## ⚠️ Important Notes

- Ansible works **without installing agents on remote servers**
- Requires **SSH access to managed nodes**
- Uses **Python on remote systems**
- Control node sends commands to managed nodes via SSH

## 🎯 Result

- Ansible installed successfully
- Automation tool ready for configuration management
- System ready to manage remote servers
