## 🎯 Objective

Inspect and fix the JupyterLab server configuration for the xFusionCorp Industries data science team.

The final JupyterLab server must:

- Listen on port 8888

- Bind to 0.0.0.0

- Use /root/notebooks/ as the notebook root directory

- Ensure /root/notebooks/ exists

- Start successfully using the provided configuration file

The JupyterLab installation already exists inside:

```plain text
/root/code/ml-env/
```

The configuration file is located at:

```plain text
/root/code/jupyter_lab_config.py
```

---

## 🧠 Concept

JupyterLab runs as a web application.

Its server configuration controls:

```plain text
IP Address
Port
Notebook Root Directory
Browser Behavior
Authentication / Permissions
```

The expected architecture is:

```plain text
Browser / Jupyter UI
        │
        │ HTTP
        ▼
JupyterLab Server
        │
        ├── IP: 0.0.0.0
        ├── Port: 8888
        └── Root: /root/notebooks/
```

If any of these values are incorrect, the Jupyter UI may fail to open or display the wrong directory.

---

## 🔍 Step 1: Start JupyterLab and Observe the Error

First, start JupyterLab using the existing configuration:

```bash
/root/code/ml-env/bin/jupyter lab --config /root/code/jupyter_lab_config.py
```

The purpose of this step is to observe how the server starts and identify configuration problems.

Possible issues include:

```plain text
Wrong port
Wrong bind address
Invalid root directory
Missing directory
Deprecated configuration keys
Root user restrictions
```

---

## 📄 Step 2: Inspect the Configuration File

Check the configuration:

```bash
cat /root/code/jupyter_lab_config.py
```

The required settings should be equivalent to:

```python
c.ServerApp.ip = "0.0.0.0"
c.ServerApp.port = 8888
c.ServerApp.root_dir = "/root/notebooks/"
```

---

## 🧠 What These Settings Mean

### Bind Address

```python
c.ServerApp.ip = "0.0.0.0"
```

This means JupyterLab listens on all available network interfaces.

```plain text
127.0.0.1
```

would only allow local access.

```plain text
0.0.0.0
```

allows access through the server's network interface.

---

### Port

```python
c.ServerApp.port = 8888
```

JupyterLab will listen on:

```plain text
TCP 8888
```

The expected endpoint becomes:

```plain text
http://<server-ip>:8888
```

---

### Notebook Root Directory

```python
c.ServerApp.root_dir = "/root/notebooks/"
```

This defines the directory JupyterLab displays as its filesystem root.

The file browser will start from:

```plain text
/root/notebooks/
```

instead of another directory such as:

```plain text
/root/code/
```

---

## 📂 Step 3: Create the Notebook Directory

Make sure the required directory exists:

```bash
mkdir -p /root/notebooks
```

Verify it:

```bash
ls -ld /root/notebooks
```

Example:

```plain text
drwxr-xr-x ... /root/notebooks
```

The -p option means:

```plain text
Create directory if missing
Do nothing if it already exists
```

---

## ⚙️ Step 4: Correct the Jupyter Configuration

Edit the configuration:

```bash
vi /root/code/jupyter_lab_config.py
```

A correct configuration can look like:

```python
c = get_config()

c.ServerApp.ip = "0.0.0.0"
c.ServerApp.port = 8888
c.ServerApp.root_dir = "/root/notebooks/"
c.ServerApp.open_browser = False
c.ServerApp.allow_root = True
```

---

## 🧩 Configuration Breakdown

### get_config()

```python
c = get_config()
```

Gets the Jupyter configuration object.

---

### IP

```python
c.ServerApp.ip = "0.0.0.0"
```

Makes the server accessible through all interfaces.

---

### Port

```python
c.ServerApp.port = 8888
```

Runs the server on port 8888.

---

### Root Directory

```python
c.ServerApp.root_dir = "/root/notebooks/"
```

Sets the notebook workspace directory.

---

### Disable Browser Auto-Launch

```python
c.ServerApp.open_browser = False
```

Useful for servers because there may be no graphical browser installed locally.

---

### Allow Root

```python
c.ServerApp.allow_root = True
```

Allows JupyterLab to run under the root user.

This is needed in environments where the Jupyter process is launched as root.

---

## ⚠️ ServerApp vs NotebookApp

Older Jupyter configurations may use:

```python
c.NotebookApp.port = 8888
```

Modern Jupyter Server configurations use:

```python
c.ServerApp.port = 8888
```

Similarly:

```python
c.ServerApp.ip
c.ServerApp.root_dir
```

should be preferred for newer JupyterLab versions.

If startup logs show warnings about deprecated NotebookApp options, update them to ServerApp.

---

## 🚀 Step 5: Start JupyterLab

Start the server with the corrected config:

```bash
/root/code/ml-env/bin/jupyter lab \
  --config /root/code/jupyter_lab_config.py
```

If root execution still needs to be explicitly allowed:

```bash
/root/code/ml-env/bin/jupyter lab \
  --config /root/code/jupyter_lab_config.py \
  --allow-root
```

The server should remain running.

---

## 🔍 Step 6: Verify Port and Bind Address

Check listening ports:

```bash
ss -lntp | grep 8888
```

Expected result should include:

```plain text
0.0.0.0:8888
```

The important part is:

```plain text
0.0.0.0:8888
```

This confirms both:

```plain text
Bind Address → 0.0.0.0
Port         → 8888
```

---

## 📂 Step 7: Verify Notebook Root Directory

Check:

```bash
ls -ld /root/notebooks
```

Then confirm the configured path:

```bash
grep root_dir /root/code/jupyter_lab_config.py
```

Expected:

```plain text
/root/notebooks/
```

---

## 🌐 Step 8: Verify Jupyter UI

Once the server is running correctly, use the Jupyter UI button.

The request flow is:

```plain text
Jupyter UI Button
       │
       ▼
Server :8888
       │
       ▼
JupyterLab
       │
       ▼
/root/notebooks/
```

If the configuration is correct, the notebook interface should open successfully.

---

## 🛠️ Troubleshooting

### Server Only Binds to Localhost

If you see:

```plain text
127.0.0.1:8888
```

instead of:

```plain text
0.0.0.0:8888
```

check:

```python
c.ServerApp.ip = "0.0.0.0"
```

---

### Wrong Port

If Jupyter starts on another port such as:

```plain text
8889
```

check:

```python
c.ServerApp.port = 8888
```

Also make sure another process is not already using port 8888:

```bash
ss -lntp | grep 8888
```

---

### Root Directory Does Not Exist

If Jupyter reports that the root directory is invalid:

```bash
mkdir -p /root/notebooks
```

Then restart JupyterLab.

---

### Jupyter Refuses to Run as Root

Use:

```python
c.ServerApp.allow_root = True
```

or:

```bash
--allow-root
```

---

## ⚙️ Complete Workflow

Start with the existing configuration:

```bash
/root/code/ml-env/bin/jupyter lab \
  --config /root/code/jupyter_lab_config.py
```

Inspect the config:

```bash
cat /root/code/jupyter_lab_config.py
```

Create the notebook directory:

```bash
mkdir -p /root/notebooks
```

Edit the config:

```bash
vi /root/code/jupyter_lab_config.py
```

Use:

```python
c = get_config()

c.ServerApp.ip = "0.0.0.0"
c.ServerApp.port = 8888
c.ServerApp.root_dir = "/root/notebooks/"
c.ServerApp.open_browser = False
c.ServerApp.allow_root = True
```

Start JupyterLab:

```bash
/root/code/ml-env/bin/jupyter lab \
  --config /root/code/jupyter_lab_config.py
```

Verify:

```bash
ss -lntp | grep 8888
```

Check directory:

```bash
ls -ld /root/notebooks
```

---

## 🧪 Validation Checklist

- [ ] JupyterLab exists in /root/code/ml-env/

- [ ] Configuration file inspected

- [ ] ServerApp.ip set to 0.0.0.0

- [ ] ServerApp.port set to 8888

- [ ] ServerApp.root_dir set to /root/notebooks/

- [ ] /root/notebooks/ exists

- [ ] Root execution allowed if required

- [ ] JupyterLab starts without configuration errors

- [ ] ss shows 0.0.0.0:8888

- [ ] Jupyter UI opens successfully

- [ ] File browser starts from /root/notebooks/

---

## 📌 Summary

The final configuration should be:

```python
c = get_config()

c.ServerApp.ip = "0.0.0.0"
c.ServerApp.port = 8888
c.ServerApp.root_dir = "/root/notebooks/"
c.ServerApp.open_browser = False
c.ServerApp.allow_root = True
```

Create the required directory:

```bash
mkdir -p /root/notebooks
```

Start JupyterLab:

```bash
/root/code/ml-env/bin/jupyter lab \
  --config /root/code/jupyter_lab_config.py
```

Verify:

```bash
ss -lntp | grep 8888
```

The final server state is:

```plain text
JupyterLab
   │
   ├── IP       → 0.0.0.0
   ├── Port     → 8888
   └── Root Dir → /root/notebooks/
```

The key takeaway is:

> JupyterLab server behavior is controlled by ServerApp configuration. Correcting the bind address, port, and root directory ensures the server is reachable and opens the expected notebook workspace.
