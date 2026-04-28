## 🎯 Objective

Clone a Git repository on the storage server to start working with project code locally.

---

## 🧠 Concept

- Git Clone → Creates a local copy of a remote repository

- Includes:
  - Source code

  - Branches

  - Commit history

👉 Used for:

- Development

- Debugging

- Collaboration

---

## ⚙️ Step-by-Step Implementation

### 1️⃣ Navigate to Target Directory

```plain text
cd /usr/src/kodekloudrepos
```

---

### 2️⃣ Clone the Repository

```plain text
git clone <repository_url>
```

---

## 📌 Example

```plain text
git clone https://<git-server>/<user>/<repo>.git
```

---

### 3️⃣ Move into Repository

```plain text
cd <repo_name>
```

---

### 4️⃣ Verify Clone

```plain text
ls -lah
```

---

## 🔍 Verify Git Status

```plain text
git status
```

✅ Expected:

```plain text
On branch <default_branch>
nothing to commit, working tree clean
```

---

## ⚠️ Edge Cases

### ❌ Directory Already Exists

```plain text
rm -rf <repo_name>
git clone <repository_url>
```

---

### ❌ Authentication Issues

- Use SSH or correct credentials

- Check access permissions

---

### ❌ Wrong Branch Needed

```plain text
git clone -b <branch_name> <repository_url>
```

---

## 🧪 Validation Checklist

- [ ] Repository cloned successfully

- [ ] Files visible in directory

- [ ] git status shows clean working tree

- [ ] Correct branch checked out
