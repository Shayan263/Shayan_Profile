# Security Policy

## Security baseline

The website and private analytics dashboard use defense-in-depth controls aligned with OWASP ASVS 5.0 and OWASP Top 10:2025.

Do not commit passwords, API keys, access tokens, private keys, certificates, or other credentials.

## Reporting

Report suspected vulnerabilities privately to the repository owner with reproduction steps, affected component, and potential impact. Do not publish credentials or exploit details.

## Dashboard

The analytics dashboard is intended to remain authenticated. Data authorization must be enforced by the backend/database security policy; client-side hiding is not an authorization boundary.

## Production rule

Authentication, authorization, data-access, privacy, and security-control changes must pass the security audit before production deployment.
