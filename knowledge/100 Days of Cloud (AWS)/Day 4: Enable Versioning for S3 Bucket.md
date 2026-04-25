### 🎯 Objective

Enable versioning for an Amazon S3 bucket to protect data from accidental deletion or modification.

Versioning allows S3 to store multiple versions of an object in the same bucket.

### 🔐 What is S3 Versioning?

S3 Versioning keeps a history of every object stored in the bucket.

Benefits

- Recover accidentally deleted files

- Restore previous versions of objects

- Protect data from overwrites

- Improve data durability

Example

file.txt (version 1)

file.txt (version 2)

file.txt (version 3)

### 🛠️ Enable Versioning (AWS Console)

1. Sign in to the AWS Management Console: https://console.aws.amazon.com/

1. Open Amazon S3
  - Click Services

  - Search for S3

  - Open Amazon S3

1. Open the bucket: nautilus-s3-RAN

1. Enable versioning
  1. Go to the Properties tab

  1. Scroll to Bucket Versioning

  1. Click Edit

  1. Select Enable

  1. Click Save changes

### 🔍 Verify

Confirm the bucket shows: Bucket Versioning: Enabled

### ⚠️ Important notes

- Versioning cannot be completely disabled, only suspended.

- Multiple object versions increase storage usage and cost.

- Use Lifecycle rules to clean up old versions.
