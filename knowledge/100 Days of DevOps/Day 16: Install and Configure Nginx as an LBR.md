### 🎯 Objective

Configure **Nginx as a Load Balancer** to distribute incoming traffic across multiple backend servers for:

- ⚡ Better performance
- 🔁 High availability
- 📈 Scalability
- 🛡 Fault tolerance

---

# 📜 What is a Load Balancer?

A **Load Balancer** distributes client requests across multiple servers.

Example:

```
Client Request
      │
      ▼
   Nginx LBR
   ┌────┼────┐
   ▼    ▼    ▼
App1  App2  App3
```

Benefits:

| Benefit           | Description                                 |
| ----------------- | ------------------------------------------- |
| High Availability | If one server fails, traffic goes to others |
| Scalability       | Easily add more servers                     |
| Performance       | Distributes load efficiently                |

---

# 1️⃣ Install Nginx

### Ubuntu / Debian

```
sudo apt update
sudo apt install nginx-y
```

### RHEL / CentOS / Amazon Linux

```
sudo yum install nginx-y
```

Start service:

```
sudo systemctlstart nginx
sudo systemctl enable nginx
```

Check status:

```
sudo systemctl status nginx
```

---

# 2️⃣ Configure Backend Servers

Example backend servers:

| Server       | IP        |
| ------------ | --------- |
| App Server 1 | 10.0.0.11 |
| App Server 2 | 10.0.0.12 |
| App Server 3 | 10.0.0.13 |

These servers run the application (Apache, Node.js, Tomcat, etc.).

---

# 3️⃣ Configure Nginx Load Balancer

Edit configuration:

```
sudo nano /etc/nginx/nginx.conf
```

Add **upstream block**:

```
http {

    upstream backend_servers {
        server 10.0.0.11;
        server 10.0.0.12;
        server 10.0.0.13;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;
        }
    }
}
```

---

# 4️⃣ Test Configuration

```
sudo nginx-t
```

Expected output:

```
syntax is ok
test is successful
```

---

# 5️⃣ Reload Nginx

```
sudo systemctl reload nginx
```

---

# 6️⃣ Test Load Balancing

Send multiple requests:

```
curl http://your-server-ip
```

You should see responses from **different backend servers**.

---

# 7️⃣ Load Balancing Methods

Nginx supports multiple algorithms.

### 1️⃣ Round Robin (Default)

```
Request 1 → Server1
Request 2 → Server2
Request 3 → Server3
```

Configuration:

```
upstream backend_servers {
    server 10.0.0.11;
    server 10.0.0.12;
}
```

---

### 2️⃣ Least Connections

Send traffic to server with **least active connections**.

```
upstream backend_servers {
    least_conn;
    server 10.0.0.11;
    server 10.0.0.12;
}
```

---

### 3️⃣ IP Hash

Same user always goes to the **same server**.

```
upstream backend_servers {
    ip_hash;
    server 10.0.0.11;
    server 10.0.0.12;
}
```

Useful for **session persistence**.

---

# 8️⃣ Add Health Checks

Mark failed server:

```
upstream backend_servers {
    server 10.0.0.11 max_fails=3 fail_timeout=30s;
    server 10.0.0.12 max_fails=3 fail_timeout=30s;
}
```

If a server fails **3 times within 30 seconds**, it is removed temporarily.

---

# 🧠 Architecture Example

```
           Internet
               │
               ▼
        Nginx Load Balancer
               │
     ┌─────────┼─────────┐
     ▼         ▼         ▼
 App Server1 App Server2 App Server3
```

---

# 🧪 Troubleshooting

### Check Nginx status

```
sudo systemctl status nginx
```

### View logs

```
sudo tail-f /var/log/nginx/error.log
```

### Test configuration

```
sudo nginx-t
```

---

# ✅ Summary

| Step           | Command                       |
| -------------- | ----------------------------- |
| Install Nginx  | `sudo apt install nginx`      |
| Edit config    | `/etc/nginx/nginx.conf`       |
| Test config    | `sudo nginx -t`               |
| Reload service | `sudo systemctl reload nginx` |
| Test           | `curl http://server-ip`       |
