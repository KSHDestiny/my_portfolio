### What PostgreSQL Is Used For

PostgreSQL is an open-source relational database system used to store and manage structured application data. It is known for reliability, strong SQL support, and production-ready features.

### Install PostgreSQL

Use this command to install PostgreSQL on the server:

```bash
sudo yum install postgresql-server postgresql-contrib -y
```

### Start PostgreSQL Service

Use this command to start PostgreSQL:

```bash
sudo systemctl start postgresql
```

### Open PostgreSQL Shell

Use this command to enter the PostgreSQL shell:

```bash
sudo -u postgres psql
```

## Summary

PostgreSQL is a common choice when an application needs dependable relational data storage, and installation is the first step before configuration and use.
