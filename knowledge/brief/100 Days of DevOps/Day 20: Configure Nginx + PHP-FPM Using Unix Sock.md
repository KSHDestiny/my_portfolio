### Key Idea

Configure Nginx to execute PHP applications using PHP-FPM via a Unix socket, which is faster than using TCP ports because communication happens locally through a file.

### What Matters

- 🎯 Objective
- 📜 What is PHP-FPM?
- 1️⃣ Install Nginx and PHP-FPM
- Ubuntu / Debian
- RHEL / CentOS / Amazon Linux

### Quick Summary

PHP-FPM (FastCGI Process Manager) manages PHP worker processes and allows web servers like Nginx to execute PHP scripts efficiently. Flow:
