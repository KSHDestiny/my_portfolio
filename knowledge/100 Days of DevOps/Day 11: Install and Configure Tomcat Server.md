## 🎯 Objective

Learn how to install, configure, and manage the **Apache Tomcat server** on Linux to deploy Java web applications.

---

# 📘 What is Apache Tomcat?

Apache Tomcat is an **open-source Java servlet container** used to run **Java-based web applications**.

It implements several Java technologies such as:

- Java Servlet
- JavaServer Pages (JSP)
- WebSocket
- Java Expression Language

Tomcat allows developers to deploy **WAR (Web Application Archive)** files and run Java web applications.

---

# 🏗 Tomcat Architecture Overview

Tomcat consists of several components:

| Component | Purpose           |
| --------- | ----------------- |
| Catalina  | Servlet container |
| Coyote    | HTTP connector    |
| Jasper    | JSP engine        |

---

# ⚙ Prerequisites

Before installing Tomcat, ensure:

- Linux server access
- Java installed
- Internet connection
- Root or sudo privileges

---

# ☕ Step 1: Install Java

Tomcat requires **Java Runtime Environment (JRE)**.

Install Java:

```
sudo yum install java-11-openjdk-y
```

Check installation:

```
java-version
```

Example output:

```
openjdk version "11.0.x"
```

---

# 📦 Step 2: Download Apache Tomcat

Go to Tomcat installation directory:

```
cd /opt
```

Download Tomcat:

```
sudowget https://downloads.apache.org/tomcat/tomcat-9/v9.0.x/bin/apache-tomcat-9.0.x.tar.gz
```

---

# 📂 Step 3: Extract Tomcat

```
sudo tar-xvzf apache-tomcat-9.0.x.tar.gz
```

Rename directory:

```
sudomv apache-tomcat-9.0.x tomcat
```

---

# 👤 Step 4: Create Tomcat User

For security, Tomcat should run under a dedicated user.

```
sudo useradd-r-m-U-d /opt/tomcat-s /bin/false tomcat
```

Set ownership:

```
sudochown-R tomcat:tomcat /opt/tomcat
```

---

# ⚙ Step 5: Configure Permissions

Give execute permissions:

```
sudochmod+x /opt/tomcat/bin/*.sh
```

---

# 🚀 Step 6: Start Tomcat Server

Run startup script:

```
/opt/tomcat/bin/startup.sh
```

Check if Tomcat started:

```
ps-ef |grep tomcat
```

---

# 🌐 Step 7: Access Tomcat Web Interface

Open browser and go to:

```
http://SERVER_IP:8080
```

Example:

```
http://192.168.1.10:8080
```

You should see the **Tomcat welcome page**.

---

# 🛑 Stop Tomcat Server

```
/opt/tomcat/bin/shutdown.sh
```

---

# 🔍 Check Tomcat Port

Tomcat runs on **port 8080** by default.

Check port:

```
sudo ss-tulnp |grep8080
```

---

# 📁 Important Tomcat Directories

| Directory           | Purpose                      |
| ------------------- | ---------------------------- |
| /opt/tomcat/bin     | Startup and shutdown scripts |
| /opt/tomcat/conf    | Configuration files          |
| /opt/tomcat/webapps | Deployed applications        |
| /opt/tomcat/logs    | Log files                    |
| /opt/tomcat/temp    | Temporary files              |

---

# ⚙ Important Configuration Files

| File             | Purpose                          |
| ---------------- | -------------------------------- |
| server.xml       | Tomcat server configuration      |
| web.xml          | Default web application settings |
| tomcat-users.xml | User authentication              |

Location:

```
/opt/tomcat/conf/
```

---

# 👥 Step 8: Configure Tomcat Manager User

Edit:

```
sudo nano /opt/tomcat/conf/tomcat-users.xml
```

Add:

```
<rolerolename="manager-gui"/>
<rolerolename="admin-gui"/>

<userusername="admin"password="StrongPassword"roles="manager-gui,admin-gui"/>
```

Save the file.

---

# 🔁 Restart Tomcat

```
/opt/tomcat/bin/shutdown.sh
/opt/tomcat/bin/startup.sh
```

---

# 🔐 Allow Manager Access

Edit context file:

```
sudo nano /opt/tomcat/webapps/manager/META-INF/context.xml
```

Comment the **RemoteAddrValve** restriction.

Example:

```
<!--
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
 allow="127\.\d+\.\d+\.\d+|::1" />
-->
```

Restart Tomcat.

---

# 📦 Deploying a Web Application

Copy `.war` file:

```
cp sample.war /opt/tomcat/webapps/
```

Tomcat automatically deploys it.

Access:

```
http://SERVER_IP:8080/sample
```

---

# 🛠 Create Systemd Service for Tomcat

Create service file:

```
sudo nano /etc/systemd/system/tomcat.service
```

Example:

```
[Unit]
Description=Apache Tomcat
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment=CATALINA_HOME=/opt/tomcat
ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

[Install]
WantedBy=multi-user.target
```

Reload systemd:

```
sudo systemctl daemon-reload
```

Start service:

```
sudo systemctlstart tomcat
```

Enable at boot:

```
sudo systemctl enable tomcat
```

---

# 🔍 Check Tomcat Service

```
sudo systemctl status tomcat
```

---

# ⚠ Common Tomcat Issues

### Port 8080 already in use

Check:

```
sudo ss-tulnp |grep8080
```

Change port in:

```
/opt/tomcat/conf/server.xml
```

---

### Permission errors

Fix:

```
sudochown-R tomcat:tomcat /opt/tomcat
```

---

### Java not installed

Check:

```
java-version
```

Install if missing.

---

# 🧾 Useful Tomcat Commands

Start:

```
sudo systemctlstart tomcat
```

Stop:

```
sudo systemctlstop tomcat
```

Restart:

```
sudo systemctlrestart tomcat
```

Status:

```
sudo systemctl status tomcat
```

---

# ✅ Key Learning Points

- Tomcat is a **Java web application server**
- Requires **Java Runtime Environment**
- Default port is **8080**
- Applications are deployed using **WAR files**
- Important configuration files are in `/conf`
- Use **systemd** to manage Tomcat as a service
