### Install Java First

Tomcat depends on Java, so Java must be installed before Tomcat can run:

```bash
sudo yum install java-11-openjdk -y
```

### Download and Prepare Tomcat

Tomcat is usually downloaded, extracted, and placed in a directory such as `/opt/tomcat`:

```bash
cd /opt
wget https://downloads.apache.org/tomcat/tomcat-9/v9.0.x/bin/apache-tomcat-9.0.x.tar.gz
tar -xvzf apache-tomcat-9.0.x.tar.gz
mv apache-tomcat-9.0.x tomcat
```

### Start the Tomcat Server

After installation, Tomcat can be started so it begins serving applications:

```bash
/opt/tomcat/bin/startup.sh
```

### Access Tomcat in Browser

Tomcat usually runs on port `8080`, so it can be accessed like this:

```text
http://SERVER_IP:8080
```

### Check Tomcat Status

Use this command to confirm the Tomcat process is running:

```bash
ps -ef | grep tomcat
```

## Summary

The main flow is installing Java, setting up Tomcat, starting the service, and confirming it is reachable on port `8080`.
