## 🎯 Objective

Set up a central Git repository on a storage server so developers can:

- push code

- pull updates

- collaborate safely

---

## 🧠 Key Concepts

### 🔹 What is Git?

Git is a version control system used to:

- track code changes

- manage versions

- collaborate across teams

---

### 🔹 What is a Bare Repository?

A bare repository:

- has no working directory

- is used as a central remote repo

- developers cannot edit files directly inside it

📌 Example path:

```plain text
/opt/official.git
```

---

## ⚙️ Step-by-Step Setup

---

### 🧩 1. Install Git

```plain text
sudo yum install-ygit
```

✅ Verify:

```plain text
git--version
```

---

### 🧩 2. Configure Git (Global)

```plain text
git config--global user.name"Admin"
git config--global user.email"admin@example.com"
```

✅ Check config:

```plain text
git config--global--list
```

---

### 🧩 3. Create Bare Repository (Central Repo)

```plain text
sudogit init--bare /opt/official.git
```

📌 This acts as your remote repository

---

### 🧩 4. Clone Repository to Working Directory

```plain text
cd /usr/src/kodekloudrepos
sudogit clone /opt/official.git official
```

```plain text
cd official
```

---

### 🧩 5. Create Project File

```plain text
echo"This is official project repository" > readme.md
```

---

### 🧩 6. Add & Commit

```plain text
git add readme.md
git commit -m "add readme file"
```

---

### 🧩 7. Push to Remote Repository

```plain text
git push origin master
```

---

## 🧪 Verification Commands

### 🔹 Check Branch

```plain text
git branch
```

### 🔹 Check Commit History

```plain text
git log --oneline
```

### 🔹 Check Remote

```plain text
git remote -v
```

Expected:

```plain text
origin  /opt/official.git (fetch)
origin  /opt/official.git (push)
```

---

## 🧠 Workflow Summary

```plain text
Developer → Clone Repo → Make Changes → Commit → Push → Central Repo (/opt/official.git)
```

---

## 🚀 Real-World Insight

In production:

- /opt/*.git → used as central repo (like GitHub)

- Developers → clone into their own directories

- Never work directly inside bare repo

---

## ✅ Final Result

You now have:

- ✅ Git installed

- ✅ Central bare repository created

- ✅ Working repo cloned

- ✅ Code committed & pushed
