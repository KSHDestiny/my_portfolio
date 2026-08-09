# Day 23: Data Migration Between S3 Buckets Using AWS CLI

## 🎯 Objective

Learn how to use the AWS CLI to migrate data from one Amazon S3 bucket to another.

In this example, we will:

- Explore common aws s3 commands

- Create a new S3 bucket

- List available S3 buckets

- Synchronize data between two S3 buckets

- Verify the migrated files

- Check the total number and size of migrated objects

👉 Using the AWS CLI makes S3 data migration faster and repeatable without manually downloading and uploading files.

---

## 🧠 Concept

The AWS CLI provides high-level commands for interacting with Amazon S3.

The basic syntax is:

```bash
aws s3 <command>
```

Common operations include:

```plain text
Create bucket
List files
Copy files
Move files
Delete files
Synchronize buckets
```

For bucket-to-bucket migration, the most useful command is:

```bash
aws s3 sync
```

The sync command compares the source and destination and copies new or updated objects to the destination.

---

## 🧰 Common AWS S3 Commands

AWS CLI provides several high-level S3 commands:

You can view the available commands using:

```bash
aws s3 help
```

---

## ⚙️ Migration Flow

The migration process in this example is:

```plain text
Source S3 Bucket
devops-s3-867
        │
        │ aws s3 sync
        ▼
Destination S3 Bucket
devops-sync-18571
```

The AWS CLI reads objects from the source bucket and transfers them to the destination bucket.

---

## 🪣 Step 1: Create the Destination Bucket

Create a new S3 bucket:

```bash
aws s3 mb s3://devops-sync-18571 --region us-east-1
```

### Command Breakdown

```plain text
aws s3 mb
```

mb means make bucket.

```plain text
s3://devops-sync-18571
```

Specifies the bucket name.

```plain text
--region us-east-1
```

Creates the bucket in the us-east-1 AWS region.

---

## 🔍 Step 2: List S3 Buckets

Verify that the bucket was created:

```bash
aws s3 ls
```

This lists the S3 buckets accessible using the current AWS credentials.

Example:

```plain text
2026-08-09 10:20:30 devops-s3-867
2026-08-09 10:25:42 devops-sync-18571
```

---

## 📂 Step 3: Check the Source Bucket

Before migrating data, check the contents of the source bucket:

```bash
aws s3 ls s3://devops-s3-867
```

To inspect all objects, including objects inside prefixes/directories:

```bash
aws s3 ls s3://devops-s3-867 --recursive
```

This helps verify what data should be migrated.

---

## 🔄 Step 4: Sync Data Between Buckets

Synchronize the source bucket with the destination bucket:

```bash
aws s3 sync s3://devops-s3-867 s3://devops-sync-18571
```

### Source

```plain text
s3://devops-s3-867
```

### Destination

```plain text
s3://devops-sync-18571
```

The flow is:

```plain text
devops-s3-867
      │
      │ aws s3 sync
      ▼
devops-sync-18571
```

AWS CLI compares the source and destination and transfers objects that need to be synchronized.

---

## 🧠 sync vs cp

Both cp and sync can transfer S3 objects, but they serve different purposes.

### Copy

```bash
aws s3 cp s3://source-bucket/file.txt s3://destination-bucket/file.txt
```

Best when copying:

- A specific file

- A known object

- Files without synchronization logic

For recursive copying:

```bash
aws s3 cp s3://source-bucket s3://destination-bucket --recursive
```

### Sync

```bash
aws s3 sync s3://source-bucket s3://destination-bucket
```

Best when:

- Migrating many objects

- Synchronizing two buckets

- Re-running a migration

- Only transferring objects that require synchronization

For bucket migration, sync is usually more convenient.

---

## 🔍 Step 5: Verify the Source Bucket

Check the original bucket:

```bash
aws s3 ls s3://devops-s3-867
```

For a complete recursive listing:

```bash
aws s3 ls s3://devops-s3-867 --recursive
```

---

## 🔍 Step 6: Verify the Destination Bucket

Check the migrated bucket:

```bash
aws s3 ls s3://devops-sync-18571
```

You should see the synchronized objects.

For example:

```plain text
2026-08-09 10:30:21    12543 image.jpg
2026-08-09 10:30:22     4231 config.json
2026-08-09 10:30:23   182392 backup.sql
```

---

## 📊 Step 7: Check All Migrated Objects

Use --recursive to list every object:

```bash
aws s3 ls s3://devops-sync-18571 --recursive
```

This is useful when the bucket contains nested prefixes such as:

```plain text
images/
documents/
backups/
logs/
```

---

## 📈 Step 8: Check Migration Summary

Use:

```bash
aws s3 ls s3://devops-sync-18571 --recursive --summarize
```

At the bottom of the output, AWS CLI displays a summary similar to:

```plain text
Total Objects: 125
Total Size: 524288000
```

This helps verify:

- Total migrated objects

- Total data size

You can run the same command against the source:

```bash
aws s3 ls s3://devops-s3-867 --recursive --summarize
```

Then compare the source and destination.

```plain text
Source Bucket                Destination Bucket
      │                              │
      ▼                              ▼
Total Objects: 125            Total Objects: 125
Total Size: 524288000         Total Size: 524288000
```

Matching totals provide a useful basic verification that the expected data was transferred.

---

## 🗑️ Optional: Make Destination Match Source

By default:

```bash
aws s3 sync s3://source-bucket s3://destination-bucket
```

does not necessarily remove extra objects already present in the destination.

To make the destination more closely mirror the source:

```bash
aws s3 sync \
  s3://devops-s3-867 \
  s3://devops-sync-18571 \
  --delete
```

⚠️ Be careful with --delete.

Objects existing in the destination but not in the source can be deleted.

Always verify the source and destination before using it.

---

## 🔐 Required Permissions

The AWS credentials running the migration need appropriate permissions.

Typical permissions include:

```plain text
s3:ListBucket
s3:GetObject
s3:PutObject
```

Depending on the operation, additional permissions may be required.

Conceptually:

```plain text
Source Bucket
    │
    │ GetObject
    ▼
AWS CLI
    │
    │ PutObject
    ▼
Destination Bucket
```

If permissions are missing, you may encounter errors such as:

```plain text
AccessDenied
```

---

## ⚠️ Important Notes

- S3 bucket names must be globally unique within the relevant AWS partition.

- Make sure AWS CLI is configured with the correct account and credentials.

- The source bucket requires read access.

- The destination bucket requires write access.

- aws s3 sync can safely be re-run to synchronize changes.

- -recursive --summarize is useful for basic migration verification.

- Be careful when using -delete.

- Large migrations can incur S3 request, transfer, retrieval, or storage costs depending on bucket regions and storage classes.

- For production migrations, object count and total size alone may not be enough for full integrity verification.

---

## 🧪 Validation Checklist

- [ ] AWS CLI configured

- [ ] Source bucket accessible

- [ ] Destination bucket created

- [ ] Destination bucket appears in aws s3 ls

- [ ] Source objects verified

- [ ] aws s3 sync completed successfully

- [ ] Destination objects verified

- [ ] Recursive object listing checked

- [ ] Source and destination object counts compared

- [ ] Source and destination total sizes compared

- [ ] Required S3 permissions confirmed

---

## 🔗 Reference

AWS CLI S3 Command Reference:

https://docs.aws.amazon.com/cli/latest/reference/s3/

Useful commands:

```plain text
aws s3 cp
aws s3 ls
aws s3 mb
aws s3 mv
aws s3 presign
aws s3 rb
aws s3 rm
aws s3 sync
aws s3 website
```

---

## 📌 Summary

AWS CLI provides a simple way to migrate data directly between S3 buckets.

Instead of:

```plain text
S3 Source
    ↓
Download files locally
    ↓
Upload files manually
    ↓
S3 Destination
```

we can use:

```plain text
Source Bucket
devops-s3-867
      │
      │ aws s3 sync
      ▼
Destination Bucket
devops-sync-18571
```

The core migration command is:

```bash
aws s3 sync s3://devops-s3-867 s3://devops-sync-18571
```

Then verify the result using:

```bash
aws s3 ls s3://devops-sync-18571 --recursive --summarize
```

This provides a simple, repeatable, and CLI-based approach to S3 bucket data migration.
