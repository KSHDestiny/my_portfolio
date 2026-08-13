## 🎯 Objective

Fix a broken or outdated Python dependency specification and generate a valid, reproducible requirements.txt file using uv.

The main command is:

```bash
uv pip compile requirements.in -o requirements.txt
```

The dependency flow is:

```plain text
requirements.in
      │
      │ uv pip compile
      ▼
Dependency Resolution
      │
      ▼
requirements.txt
```

---

## 🧠 Concept

Python projects often separate their dependencies into two files:

```plain text
requirements.in
requirements.txt
```

They have different purposes.

### requirements.in

Contains the dependencies we directly want:

```plain text
numpy
pandas
scikit-learn
matplotlib
```

It is the input dependency specification.

### requirements.txt

Contains the fully resolved dependency versions:

```plain text
numpy==...
pandas==...
scikit-learn==...
matplotlib==...
...
```

It may also contain indirect dependencies required by those packages.

The idea is:

```plain text
High-Level Dependencies
requirements.in
        ↓
Dependency Resolver
        ↓
Exact Dependencies
requirements.txt
```

---

# ⚡ What Is uv?

uv is a Python package and project management tool that can handle operations such as dependency resolution and package installation.

For this task, we use:

```bash
uv pip compile
```

to resolve the dependency specification.

---

# 🔍 Step 1: Check the Project Files

Check the current directory:

```bash
pwd
```

List files:

```bash
ls -lah
```

Look for:

```plain text
requirements.in
```

Verify its contents:

```bash
cat requirements.in
```

---

# 🐍 Step 2: Inspect the Dependency Specification

The requirements.in file contains the project's required packages.

For example:

```plain text
numpy
pandas
scikit-learn
matplotlib
```

A dependency can also contain a version constraint:

```plain text
numpy>=2.0
pandas>=2.0
```

or a fixed version:

```plain text
numpy==2.3.0
```

If the specification is invalid or conflicting, uv may fail to resolve the dependencies.

---

# 🛠️ Step 3: Fix the Broken Specification

Edit:

```bash
vi requirements.in
```

Correct any invalid dependency names, versions, or incompatible constraints.

For example, a broken specification might request versions that cannot exist together:

```plain text
package-a==1.0
package-b==2.0
```

where package-b requires a different version of package-a.

The goal is to produce a valid input specification:

```plain text
requirements.in
      ↓
Valid package constraints
      ↓
uv can resolve dependencies
```

---

# ⚙️ Step 4: Compile the Requirements

Once the dependency specification is corrected, run:

```bash
uv pip compile requirements.in -o requirements.txt
```

### Command Breakdown

```plain text
uv
```

Runs the uv tool.

```plain text
pip compile
```

Resolves the Python dependency specification.

```plain text
requirements.in
```

The input file.

```plain text
-o requirements.txt
```

Writes the resolved dependencies to:

```plain text
requirements.txt
```

---

# 🔄 How Compilation Works

Suppose:

```plain text
requirements.in
```

contains:

```plain text
pandas
```

Pandas itself requires other packages.

So the dependency tree might look conceptually like:

```plain text
pandas
 │
 ├── numpy
 ├── python-dateutil
 └── pytz
```

Running:

```bash
uv pip compile requirements.in -o requirements.txt
```

resolves the complete dependency graph and writes compatible versions into the output file.

```plain text
requirements.in
       │
       │ Direct Dependencies
       ▼
┌──────────────────┐
│ uv pip compile   │
└────────┬─────────┘
         │
         │ Resolve
         ▼
Dependency Graph
         │
         ▼
requirements.txt
```

---

# 📄 Step 5: Verify requirements.txt

Check that the file was created:

```bash
ls -lah requirements.txt
```

Then inspect it:

```bash
cat requirements.txt
```

You should see resolved package versions.

The exact contents depend on the packages and constraints defined in requirements.in.

---

# 📦 Step 6: Install the Compiled Dependencies

Once the lock-style requirements file is valid, dependencies can be installed using:

```bash
uv pip install -r requirements.txt
```

If using a Python virtual environment, activate it first when appropriate:

```bash
source ml-env/bin/activate
```

Then:

```bash
uv pip install -r requirements.txt
```

The workflow becomes:

```plain text
requirements.in
       │
       │ compile
       ▼
requirements.txt
       │
       │ install
       ▼
Python Environment
```

---

# 🆚 requirements.in vs requirements.txt

Think of it as:

```plain text
Developer Intent
      ↓
requirements.in

      ↓ uv pip compile

Resolved Environment
      ↓
requirements.txt
```

---

# 🆚 pip freeze vs uv pip compile

These commands solve different problems.

### pip freeze

```bash
pip freeze > requirements.txt
```

Records packages that are already installed in the current environment.

```plain text
Existing Environment
       ↓
pip freeze
       ↓
requirements.txt
```

### uv pip compile

```bash
uv pip compile requirements.in -o requirements.txt
```

Starts from a dependency specification and resolves compatible dependencies.

```plain text
requirements.in
       ↓
uv resolver
       ↓
requirements.txt
```

For dependency management, compilation provides a more intentional workflow than simply capturing everything currently installed.

---

# ⚠️ Common Problem: Resolution Failure

If uv pip compile fails, inspect the error carefully.

A common cause is incompatible version requirements.

Conceptually:

```plain text
Package A
  └── requires X < 2

Package B
  └── requires X >= 2

          ↓

Dependency Conflict ❌
```

The solution is to modify the dependency constraints in:

```plain text
requirements.in
```

until a compatible dependency graph can be resolved.

Then run the compile command again.

---

# ⚠️ File Naming

Use consistent filenames:

```plain text
requirements.in
requirements.txt
```

The common naming convention uses requirements with an s.

Therefore, prefer:

```bash
uv pip compile requirements.in -o requirements.txt
```

rather than:

```plain text
requirement.in
requirement.txt
```

unless the task specifically provides those singular filenames.

---

# ⚙️ Complete Workflow

Check the files:

```bash
pwd
ls -lah
```

Inspect:

```bash
cat requirements.in
```

Edit the broken specification:

```bash
vi requirements.in
```

Compile:

```bash
uv pip compile requirements.in -o requirements.txt
```

Verify:

```bash
ls -lah requirements.txt
cat requirements.txt
```

Install if required:

```bash
uv pip install -r requirements.txt
```

---

# 🧪 Validation Checklist

- [ ] uv is available

- [ ] requirements.in exists

- [ ] Dependency specification inspected

- [ ] Invalid dependency/version corrected

- [ ] uv pip compile completes successfully

- [ ] requirements.txt generated

- [ ] Resolved dependencies verified

- [ ] No dependency resolution errors remain

---

# 📌 Summary

The main command is:

```bash
uv pip compile requirements.in -o requirements.txt
```

The complete dependency workflow is:

```plain text
requirements.in
      │
      │ Direct Dependencies
      ▼
uv pip compile
      │
      │ Dependency Resolution
      ▼
requirements.txt
      │
      │ Resolved Dependencies
      ▼
uv pip install -r requirements.txt
      │
      ▼
Python Environment ✅
```

The two important files are:

```plain text
requirements.in
    → What packages the project needs

requirements.txt
    → Exact resolved dependency set
```

> uv pip compile resolves the dependency specification from requirements.in and generates a reproducible requirements.txt containing compatible package versions.
