## Objective

Study how to design role-based access control systems that stay maintainable as products grow across modules, teams, and business rules.

---

## Why This Matters

Access control looks simple at first, but it becomes complex when permissions vary by action, module, department, country, or workflow state.

In products like HRMS, ATS, payroll, and expense systems, incorrect authorization design can lead to security risks, data leaks, or operational mistakes.

---

## Common Design Questions

### Role-Based vs Permission-Based Access

Roles are easier to understand and assign.

Permissions are more flexible, but can become hard to manage when too many rules are attached directly to users.

Many systems combine both:

- roles for common access bundles
- permissions for fine-grained control
- groups for reusable admin patterns

### Static vs Contextual Authorization

Some permissions are static, such as "can create expense claims."

Others depend on context:

- can approve only for a specific department
- can view only employees under the same organization
- can edit only before a workflow reaches a locked state

This means authorization often belongs in domain logic, not only middleware.

---

## Good Practices

- Keep permission names explicit and business-readable
- Centralize policy evaluation where possible
- Avoid scattering authorization checks across many unrelated services
- Model ownership, reporting lines, and scope boundaries clearly
- Treat permission changes as product design, not just technical wiring

---

## Project Relevance

This topic is directly useful for features like Permission Group, payroll access, recruiter workflows, and approval-heavy business systems where the wrong access rule can break trust quickly.

---

## Practical Rule

Design authorization around real business boundaries and workflow responsibilities, not just around routes or controllers.
