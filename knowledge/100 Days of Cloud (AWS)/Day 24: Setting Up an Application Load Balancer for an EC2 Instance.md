## 🎯 Objective

Set up an Application Load Balancer (ALB) in AWS to receive HTTP traffic and forward requests to an application running on an EC2 instance.

In this task, we will understand and configure:

- Application Load Balancer

- Security Groups

- Target Groups

- Inbound Rules

- Listeners

- Health Checks

- EC2 target registration

The final traffic flow will be:

```plain text
Internet
   ↓
Application Load Balancer
   ↓
Target Group
   ↓
EC2 Instance
   ↓
Application
```

---

## 🧠 Concept

An Application Load Balancer (ALB) distributes incoming HTTP/HTTPS requests to registered backend targets.

Instead of users accessing an EC2 instance directly:

```plain text
User
 ↓
EC2
```

we place a load balancer in front:

```plain text
Internet
                  │
                  ▼
        Application Load Balancer
                  │
                  ▼
             Target Group
                  │
          ┌───────┴───────┐
          ▼               ▼
        EC2-1           EC2-2
```

Even when starting with only one EC2 instance, using a load balancer provides an architecture that can later support multiple instances.

---

# 🏗️ Main Components

The important components are:

```plain text
Application Load Balancer
        │
        ├── Security Group
        │
        ├── Listener
        │
        └── Target Group
                 │
                 ├── Health Check
                 │
                 └── EC2 Instance
```

Each component has a different responsibility.

---

## 1️⃣ Application Load Balancer

The Application Load Balancer is the public entry point for the application.

It receives HTTP or HTTPS requests and forwards them to healthy targets.

For example:

```plain text
User
 │
 │ HTTP :80
 ▼
ALB
 │
 │ Forward
 ▼
Target Group
 │
 ▼
EC2
```

An ALB operates at Layer 7 — Application Layer, so it understands HTTP and HTTPS traffic.

It can support features such as:

- Host-based routing

- Path-based routing

- HTTP → HTTPS redirects

- Multiple target groups

- TLS/SSL termination

---

# 🚀 Step 1: Prepare the EC2 Instance

Before configuring the load balancer, make sure the EC2 instance is running a web application.

For example:

```bash
sudo systemctl status httpd
```

or:

```bash
sudo systemctl status nginx
```

Test locally from the instance:

```bash
curl http://localhost
```

The application must be reachable on the port that will be configured in the target group.

For example:

```plain text
Apache/Nginx
      ↓
TCP Port 80
```

---

# 🎯 Step 2: Create a Target Group

Go to:

```plain text
EC2
 ↓
Target Groups
 ↓
Create target group
```

Choose:

```plain text
Target type → Instances
```

Configure the target group.

Example:

```plain text
Target Type → Instances
Protocol    → HTTP
Port        → 80
VPC         → Same VPC as EC2
```

---

## 🧠 What Is a Target Group?

A Target Group defines where the load balancer should send requests.

```plain text
ALB
 │
 │ Forward traffic
 ▼
Target Group
 │
 ├── EC2 Instance 1
 ├── EC2 Instance 2
 └── EC2 Instance 3
```

The load balancer itself does not directly define all backend servers.

Instead:

```plain text
ALB
 ↓
Target Group
 ↓
Registered Targets
```

---

# 🖥️ Step 3: Register EC2 Instance

During target group configuration, register the EC2 instance.

Select:

```plain text
EC2 Instance
```

Then:

```plain text
Include as pending below
```

and create/save the target group.

The architecture becomes:

```plain text
Target Group
     │
     └── EC2 Instance
             │
             └── Application :80
```

---

# ❤️ Step 4: Configure Health Check

The target group periodically checks whether the EC2 application is healthy.

Example:

```plain text
Protocol → HTTP
Path     → /
Port     → Traffic Port
```

The ALB sends requests similar to:

```plain text
GET /
```

to the EC2 instance.

If the application responds successfully:

```plain text
Target
  ↓
Healthy ✅
```

If the health check repeatedly fails:

```plain text
Target
  ↓
Unhealthy ❌
```

The load balancer does not normally route application traffic to unhealthy targets.

---

# 🔐 Step 5: Configure Security Groups

Security Groups act as virtual firewalls around AWS resources.

For this architecture, there are ideally two security groups:

```plain text
Internet
   │
   ▼
ALB Security Group
   │
   ▼
Application Load Balancer
   │
   ▼
EC2 Security Group
   │
   ▼
EC2 Instance
```

---

## 🌐 ALB Security Group

The ALB needs to receive traffic from users.

For HTTP:

```plain text
Inbound Rule

Type        → HTTP
Protocol    → TCP
Port        → 80
Source      → 0.0.0.0/0
```

For HTTPS:

```plain text
Type        → HTTPS
Protocol    → TCP
Port        → 443
Source      → 0.0.0.0/0
```

This allows internet users to reach the load balancer.

---

# 🔒 EC2 Security Group

The EC2 instance should accept application traffic from the ALB, rather than exposing the application port directly to the entire internet.

For example:

```plain text
Inbound Rule

Type        → HTTP
Protocol    → TCP
Port        → 80
Source      → ALB Security Group
```

The important difference is:

```plain text
❌ Less Restricted

Internet
   │
   │ :80
   ▼
EC2


✅ Better

Internet
   │
   │ :80
   ▼
ALB
   │
   │ :80
   ▼
EC2
```

Using the ALB's security group as the EC2 inbound source limits application traffic to requests coming through the load balancer.

---

# 🚦 Step 6: Create the Application Load Balancer

Go to:

```plain text
EC2
 ↓
Load Balancers
 ↓
Create Load Balancer
 ↓
Application Load Balancer
```

Configure:

```plain text
Scheme          → Internet-facing
IP address type → IPv4
```

Choose:

- The correct VPC

- At least two appropriate Availability Zone/subnet mappings for an ALB

For an internet-facing ALB, select subnets that provide the required public-facing network connectivity.

---

# 🎧 Step 7: Configure Listener

A Listener waits for incoming connections on a specific protocol and port.

For HTTP:

```plain text
Protocol → HTTP
Port     → 80
```

Configure the default action:

```plain text
Forward to
    ↓
Target Group
```

The request path is now:

```plain text
User
 │
 │ HTTP :80
 ▼
ALB Listener
 │
 │ Forward
 ▼
Target Group
 │
 ▼
EC2 :80
```

---

# 🔍 Step 8: Verify Target Health

Open:

```plain text
EC2
 ↓
Target Groups
 ↓
Select Target Group
 ↓
Targets
```

Check the registered instance.

Expected:

```plain text
Status → Healthy
```

If it shows:

```plain text
Unhealthy
```

check:

- Web server is running

- Correct target port

- Correct health-check path

- EC2 Security Group

- Application response

- Network configuration

---

# 🌍 Step 9: Get the ALB DNS Name

AWS provides a DNS name for the load balancer.

It looks similar to:

```plain text
my-alb-123456789.us-east-1.elb.amazonaws.com
```

You normally access the ALB using this DNS name rather than an ALB IP address.

---

# 🧪 Step 10: Test the Load Balancer

Test using:

```bash
curl http://<ALB-DNS-NAME>
```

Or open:

```plain text
http://<ALB-DNS-NAME>
```

in a browser.

If everything is configured correctly:

```plain text
Browser
   │
   ▼
ALB DNS
   │
   ▼
Listener :80
   │
   ▼
Target Group
   │
   ▼
Healthy EC2
   │
   ▼
Web Application ✅
```

---

# 🔐 Understanding Inbound Rules

Inbound rules determine who can initiate traffic to a resource.

For this architecture:

### ALB

```plain text
Internet
   │
   │ Allowed :80
   ▼
ALB Security Group
```

Example:

```plain text
HTTP | TCP | 80 | 0.0.0.0/0
```

### EC2

```plain text
ALB
 │
 │ Allowed :80
 ▼
EC2 Security Group
```

Example:

```plain text
HTTP | TCP | 80 | ALB-Security-Group
```

This creates a controlled traffic path:

```plain text
Internet
   │
   │ Allowed
   ▼
ALB
   │
   │ Allowed
   ▼
EC2
```

---

# 🔄 Complete Request Flow

When a user opens the application:

```plain text
1. User sends HTTP request
           ↓
2. DNS resolves ALB hostname
           ↓
3. ALB Security Group checks traffic
           ↓
4. Listener receives request on :80
           ↓
5. Listener forwards to Target Group
           ↓
6. Target Group selects healthy target
           ↓
7. EC2 Security Group allows ALB traffic
           ↓
8. EC2 web server processes request
           ↓
9. Response returns through ALB
           ↓
10. User receives response
```

---

# ⚠️ Common Issue: Target Shows Unhealthy

If the target becomes:

```plain text
Unhealthy
```

first verify the application:

```bash
curl http://localhost
```

Then check:

```bash
sudo systemctl status httpd
```

or:

```bash
sudo systemctl status nginx
```

Also verify:

```plain text
Target Group Port
        =
Application Port
```

For example:

```plain text
Apache       → 80
Target Group → 80
```

and ensure the EC2 Security Group allows traffic from the ALB Security Group.

---

# 🧠 Load Balancer vs Target Group

These two concepts are easy to confuse.

```plain text
Load Balancer
      │
      │ Receives requests
      ▼
Target Group
      │
      │ Defines backend targets
      ▼
EC2 Instances
```

### Load Balancer

Responsible for:

```plain text
Receiving Traffic
Routing
Listeners
HTTP/HTTPS
```

### Target Group

Responsible for:

```plain text
Backend Targets
Target Ports
Health Checks
Healthy/Unhealthy Status
```

---

# 📈 Why Use a Load Balancer?

Suppose initially we have:

```plain text
ALB
 │
 ▼
EC2-1
```

As traffic increases, additional instances can be registered:

```plain text
ALB
               │
        ┌──────┼──────┐
        ▼      ▼      ▼
      EC2-1  EC2-2  EC2-3
```

The ALB can distribute incoming requests across healthy registered targets.

This helps support:

- Scalability

- Availability

- Health-based routing

- Centralized HTTP/HTTPS entry point

- Integration with Auto Scaling

---

# 🧪 Validation Checklist

- [ ] EC2 instance running

- [ ] Web server/application running

- [ ] Application responds locally

- [ ] Target group created

- [ ] EC2 registered as a target

- [ ] Health check configured

- [ ] ALB Security Group created/configured

- [ ] HTTP 80 allowed to ALB

- [ ] EC2 Security Group allows application traffic from ALB

- [ ] Application Load Balancer created

- [ ] Correct VPC selected

- [ ] Appropriate subnets/AZs selected

- [ ] Listener configured

- [ ] Listener forwards to target group

- [ ] EC2 target shows Healthy

- [ ] ALB DNS name retrieved

- [ ] Application accessible through ALB

---

# 📌 Summary

The four main concepts are connected like this:

```plain text
Internet
                       │
                       │ HTTP :80
                       ▼
              ┌─────────────────┐
              │ Inbound Rule    │
              │ 0.0.0.0/0 :80  │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ Security Group  │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │      ALB        │
              │ Listener :80    │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Target Group   │
              │ Health Checks   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ EC2 Security    │
              │     Group       │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ EC2 Instance    │
              │ Web Server :80  │
              └─────────────────┘
```

The key takeaway is:

> The Application Load Balancer receives requests, its listener forwards them to a Target Group, the Target Group selects healthy EC2 targets, and Security Group inbound rules control which traffic is allowed at each layer.
