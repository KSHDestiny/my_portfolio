# Day 1: Create a Python Virtual Environment for ML

## 🎯 Objective

Create an isolated Python virtual environment for a Machine Learning project and install the essential ML libraries.

In this task, we will:

- Check the Python version

- Create a virtual environment

- Activate the environment

- Install common ML packages

- Generate a requirements.txt file

- Verify the installed dependencies

---

## 🧠 Concept

A Python virtual environment provides an isolated environment for a Python project.

Instead of installing packages globally:

```plain text
System Python
├── numpy
├── pandas
├── scikit-learn
└── matplotlib
```

we create a project-specific environment:

```plain text
Project
│
├── ml-env/
│   ├── Python
│   └── Packages
│
└── requirements.txt
```

This prevents dependencies from different projects from conflicting with each other.

For example:

```plain text
Project A
└── numpy 1.x

Project B
└── numpy 2.x
```

Each project can maintain its own package versions.

---

## 📂 Step 1: Check Current Directory

Check the current working directory:

```bash
pwd
```

pwd stands for:

```plain text
Print Working Directory
```

Example:

```plain text
/root/code
```

This tells us where the virtual environment will be created.

---

## 🐍 Step 2: Check Python Version

Verify that Python 3 is installed:

```bash
python3 --version
```

Example:

```plain text
Python 3.x.x
```

This confirms that Python is available before creating the environment.

---

## 📦 Step 3: Create the Virtual Environment

Create a virtual environment called:

```plain text
ml-env
```

Run:

```bash
python3 -m venv ml-env
```

### Command Breakdown

```plain text
python3
```

Runs Python 3.

```plain text
-m
```

Runs a Python module as a command.

```plain text
venv
```

Python's built-in virtual environment module.

```plain text
ml-env
```

The directory/name of the new environment.

The structure becomes:

```plain text
/root/code/
│
└── ml-env/
    ├── bin/
    ├── include/
    ├── lib/
    └── pyvenv.cfg
```

---

## 🔍 Step 4: Verify the Environment

List files in the current directory:

```bash
ls -lah
```

You should see:

```plain text
ml-env
```

Then inspect the environment:

```bash
ls ml-env
```

Typical contents:

```plain text
bin
include
lib
lib64
pyvenv.cfg
```

The exact directories can vary slightly depending on the operating system and Python installation.

---

## 🚀 Step 5: Activate the Virtual Environment

Activate the environment:

```bash
source /root/code/ml-env/bin/activate
```

If you're already inside /root/code, you can simply use:

```bash
source ml-env/bin/activate
```

After activation, the terminal usually changes to something like:

```plain text
(ml-env) root@server:/root/code#
```

The (ml-env) prefix indicates that the virtual environment is active.

---

## 🧠 What Activation Does

Before activation:

```plain text
python
  ↓
System Python

pip
  ↓
System packages
```

After activation:

```plain text
python
  ↓
ml-env/bin/python

pip
  ↓
ml-env/bin/pip
```

This means packages installed using pip will belong to this environment rather than the global Python installation.

You can verify this with:

```bash
which python
```

and:

```bash
which pip
```

They should point somewhere under:

```plain text
/root/code/ml-env/bin/
```

---

## 🤖 Step 6: Install ML Libraries

Install the required Machine Learning libraries:

```bash
pip install numpy pandas scikit-learn matplotlib
```

This installs four commonly used Python data science and ML packages.

### NumPy

```plain text
numpy
```

Used for:

- Numerical computing

- Arrays

- Matrices

- Mathematical operations

Example:

```python
import numpy as np
```

---

### Pandas

```plain text
pandas
```

Used for:

- Data manipulation

- Data cleaning

- CSV processing

- Tabular datasets

Example:

```python
import pandas as pd
```

---

### Scikit-learn

```plain text
scikit-learn
```

Used for traditional Machine Learning tasks such as:

- Classification

- Regression

- Clustering

- Data preprocessing

- Model evaluation

Python imports it using:

```python
import sklearn
```

---

### Matplotlib

```plain text
matplotlib
```

Used for:

- Data visualization

- Line charts

- Bar charts

- Scatter plots

- Histograms

Common import:

```python
import matplotlib.pyplot as plt
```

---

## 📦 Step 7: Check Installed Packages

You can inspect the packages installed in the environment:

```bash
pip list
```

You should find packages including:

```plain text
numpy
pandas
scikit-learn
matplotlib
```

Additional dependencies will also appear because these libraries depend on other Python packages.

---

## 📝 Step 8: Generate requirements.txt

Save the installed dependencies:

```bash
pip freeze > requirements.txt
```

### How It Works

```plain text
pip freeze
     │
     │ installed package versions
     ▼
requirements.txt
```

The > operator redirects the output into the file.

Instead of printing:

```plain text
numpy==...
pandas==...
scikit-learn==...
matplotlib==...
```

to the terminal, it saves it to:

```plain text
requirements.txt
```

---

## 🔍 Step 9: Check requirements.txt

Display the contents:

```bash
cat requirements.txt
```

You should see package versions similar to:

```plain text
matplotlib==...
numpy==...
pandas==...
scikit-learn==...
```

There will normally be additional packages because pip freeze records the environment's installed dependencies.

---

## 🔄 Recreate the Environment

One major advantage of requirements.txt is reproducibility.

Another developer can create a virtual environment:

```bash
python3 -m venv ml-env
```

Activate it:

```bash
source ml-env/bin/activate
```

Then install the same dependencies:

```bash
pip install -r requirements.txt
```

The flow becomes:

```plain text
requirements.txt
      │
      │ pip install -r
      ▼
Python Virtual Environment
      │
      ├── numpy
      ├── pandas
      ├── scikit-learn
      └── matplotlib
```

---

## 📴 Deactivate the Environment

When finished working inside the environment:

```bash
deactivate
```

The (ml-env) prefix will disappear from the terminal.

This returns you to the system Python environment.

---

## 🕘 Check Command History

To review previously executed shell commands:

```bash
history
```

This is useful for:

- Reviewing your work

- Finding previously executed commands

- Troubleshooting

- Creating documentation from your terminal workflow

---

## ⚙️ Complete Workflow

```bash
pwd

python3 --version

python3 -m venv ml-env

ls -lah

ls ml-env

source /root/code/ml-env/bin/activate

pip install numpy pandas scikit-learn matplotlib

pip freeze > requirements.txt

cat requirements.txt

history
```

---

## ⚠️ Important Notes

- A virtual environment isolates project dependencies from the system Python installation.

- python3 -m venv ml-env creates the environment.

- source ml-env/bin/activate activates it on Linux/macOS.

- Packages installed after activation are installed inside the virtual environment.

- pip freeze outputs installed packages with their versions.

- requirements.txt makes the environment easier to reproduce.

- pip install -r requirements.txt installs dependencies recorded in the file.

- deactivate exits the virtual environment.

- The ml-env/ directory normally should not be committed to Git.

For Git projects, add it to .gitignore:

```plain text
ml-env/
```

The files you normally keep are:

```plain text
project/
├── .gitignore
├── requirements.txt
└── source code
```

rather than committing the entire virtual environment.

---

## 🧪 Validation Checklist

- [ ] Python 3 installed

- [ ] ml-env created

- [ ] Virtual environment structure verified

- [ ] ml-env activated

- [ ] numpy installed

- [ ] pandas installed

- [ ] scikit-learn installed

- [ ] matplotlib installed

- [ ] requirements.txt generated

- [ ] Package versions verified

- [ ] ml-env/ excluded from Git

---

## 📌 Summary

Create the environment:

```bash
python3 -m venv ml-env
```

Activate it:

```bash
source /root/code/ml-env/bin/activate
```

Install the Machine Learning packages:

```bash
pip install numpy pandas scikit-learn matplotlib
```

Save dependencies:

```bash
pip freeze > requirements.txt
```

The complete concept is:

```plain text
Python Project
      │
      │ python3 -m venv
      ▼
   ml-env
      │
      │ activate
      ▼
Isolated Python Environment
      │
      │ pip install
      ▼
┌─────────────────────┐
│ numpy               │
│ pandas              │
│ scikit-learn        │
│ matplotlib          │
└─────────────────────┘
      │
      │ pip freeze
      ▼
requirements.txt
```

The key takeaway is:

> A Python virtual environment isolates project dependencies, while requirements.txt records those dependencies so the environment can be reproduced consistently.
