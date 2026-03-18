### Why Execution Permission Matters

In Linux, a script file cannot run like a program unless it has execute permission. This is part of the Linux permission system that controls who can read, modify, or run files.

### Add Execute Permission

Use this command to allow the script to run:

```bash
chmod +x script.sh
```

### Run the Script

Run the script from the current directory:

```bash
./script.sh
```

## Summary

Execution permission is required when a script should be run directly as a command.
