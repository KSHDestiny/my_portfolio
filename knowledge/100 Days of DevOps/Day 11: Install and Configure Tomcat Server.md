### 🎯 Objective

Install Apache Tomcat, configure it to run on a custom port, deploy an application, and verify it works.

---

## 🤔 What is Tomcat?

Apache Tomcat is a Java-based web server used to run:

- Java Servlets

- JSP (Java Server Pages)

- Web applications (.war files)

---

## 📦 Step 1: Install Tomcat

```plain text
sudo yum install tomcat-y
```

---

## ⚙️ Step 2: Configure Tomcat Port

Open configuration file:

```plain text
sudo vi /etc/tomcat/server.xml
```

---

### 🔍 Find Connector Port

Search for:

```plain text
<Connectorport="8080"protocol="HTTP/1.1"
```

---

### ✏️ Change Port (Example → 5000)

```plain text
<Connectorport="5000"protocol="HTTP/1.1"
```

👉 Save and exit (:wq)

---

## 🚀 Step 3: Start and Enable Tomcat

```plain text
sudo systemctl enable --now tomcat
```

---

## 🔎 Step 4: Check Status

```plain text
sudo systemctl status tomcat
```

---

## 🌐 Step 5: Test Tomcat

```plain text
curl localhost:5001
```

or

```plain text
curl ${HOST}:5001
```

👉 You should see HTML response from Tomcat

---

## 📦 Step 6: Deploy Application (WAR File)

Move your app:

```plain text
mkdir /usr/share/tomcat/webapps/ROOT
sudo mv index.html /usr/share/tomcat/webapps/ROOT/
```

---

### 🔁 Restart (Recommended after deployment)

```plain text
sudo systemctlrestart tomcat
```

---

## 🌐 Step 7: Verify Deployment

```plain text
curl localhost:5001
```

- It will load your application instead of default page

---

## 🧠 What is ROOT in Tomcat?

In Apache Tomcat, the ROOT folder represents:

👉 The default (/) web application

---

## ⚠️ Important Notes

### 🔥 Firewall (if not accessible)

```plain text
sudo firewall-cmd--add-port=5001/tcp--permanent
sudo firewall-cmd--reload
```

---

### 📂 Important Paths

---
