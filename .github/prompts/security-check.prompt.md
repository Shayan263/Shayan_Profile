---
name: security-check
description: Run a security and privacy review of the portfolio repository.
---

Run a security review of the repository and website. Check for exposed secrets, credentials, unsafe external resources, suspicious or unnecessary dependencies, insecure client-side patterns, visitor-tracking/privacy concerns, and accidental production-risk behavior. Never reveal any discovered secret value. If a potential secret is found, identify only the file/location and stop the affected change. Do not modify main.
