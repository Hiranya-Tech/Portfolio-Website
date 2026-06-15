export const BLOG_POSTS = [
  {
    slug: 'understanding-phishing-attacks',
    title: 'Understanding Phishing Attacks: How They Work and How to Defend Against Them',
    excerpt: 'Phishing remains the most effective initial access vector in cyberattacks. This post breaks down how phishing works at a technical level, the psychology behind it, and what actually works in defending against it.',
    category: 'Cybersecurity',
    tags: ['phishing', 'social-engineering', 'email-security', 'defense'],
    readingTime: 12,
    publishedAt: '2026-06-01',
    content: `Phishing is responsible for over 90% of data breaches. Despite being one of the oldest attack techniques in the book, it keeps working — because it exploits human cognition, not software vulnerabilities.

## What Phishing Actually Is

At its core, phishing is social engineering delivered digitally. The attacker crafts a deceptive message that convinces the target to take an action they would not take if they knew the truth — click a link, enter credentials, download a file, or transfer funds.

## The Attack Chain

Understanding phishing requires understanding the full attack chain:

**1. Reconnaissance**
Before sending a single email, sophisticated attackers research their targets. LinkedIn reveals org structure and employee roles. Company websites reveal email formats. Public breach data reveals existing passwords.

**2. Infrastructure Setup**
Attackers register lookalike domains (g00gle.com, paypa1.com), set up phishing pages that pixel-perfect clone legitimate login portals, and configure email servers to pass SPF/DKIM checks where possible.

**3. Delivery**
Email is the most common vector, but SMS phishing (smishing) and voice phishing (vishing) are growing rapidly. Attackers use compromised email accounts, bulletproof hosting, and legitimate services to deliver phishing content while evading filters.

**4. Exploitation**
The target clicks the link, lands on the phishing page, and enters credentials. Modern phishing kits use reverse proxies (like Evilginx2) to transparently relay traffic to the real site — bypassing even MFA in real time by capturing session tokens.

**5. Post-Exploitation**
Captured credentials are immediately tested against related services (credential stuffing). Session tokens are used directly. Email accounts are compromised to enable BEC fraud.

## Why It Keeps Working

People often ask: "Why do people still fall for phishing?" The answer is not stupidity — it is cognitive science.

- **Authority bias**: Emails appearing to come from IT, executives, or banks trigger compliance instincts
- **Urgency**: "Your account will be suspended in 24 hours" bypasses deliberate thinking
- **Familiarity**: Attackers clone familiar interfaces down to the favicon

## What Actually Works in Defense

**Technical controls that matter:**
- **DMARC, DKIM, SPF**: Enforce email authentication. DMARC with a reject policy blocks domain spoofing.
- **MFA everywhere — but choose the right type**: TOTP and FIDO2 hardware keys resist phishing. SMS-based MFA does not.
- **DNS filtering**: Block known malicious domains at the resolver level.
- **Phishing-resistant MFA**: FIDO2/WebAuthn is currently the strongest available option.

## Conclusion

Phishing works because it is cheap, scalable, and targets the most complex system in any organization: humans. Defense requires layers — technical controls, process design, and security culture — because no single control is sufficient.`,
  },
  {
    slug: 'owasp-top-10-explained',
    title: 'OWASP Top 10 Explained: The Web Security Risks Every Developer Should Know',
    excerpt: 'The OWASP Top 10 is the closest thing the security industry has to a universal standard for web application risk. A practical breakdown of each category with real examples and mitigations.',
    category: 'Cybersecurity',
    tags: ['owasp', 'web-security', 'appsec', 'developer'],
    readingTime: 18,
    publishedAt: '2026-06-08',
    content: `The Open Web Application Security Project (OWASP) Top 10 is updated every few years and represents the consensus of the security community on the most critical web application risks.

## A01: Broken Access Control

The application does not properly enforce what authenticated users are allowed to do. Users can access resources or data that should be restricted to others.

**Real example:** A user changes the URL from /profile/123 to /profile/124 and sees another user's private data. The server never checked if user 123 had permission to view profile 124.

**Prevention:** Deny by default — access must be explicitly granted. Implement access control server-side, not just client-side.

## A02: Cryptographic Failures

Sensitive data is exposed due to weak or absent cryptographic protections.

**Real example:** Passwords stored as MD5 hashes (crackable in seconds), credit card numbers transmitted over HTTP, API keys committed to public GitHub repositories.

**Prevention:** Use bcrypt, scrypt, or Argon2 for password hashing. Enforce TLS for all data in transit.

## A03: Injection

Untrusted data is sent to an interpreter as part of a command or query.

**Real example:** SELECT * FROM users WHERE username = '' OR '1'='1' — a classic SQL injection payload that bypasses authentication.

**Prevention:** Use parameterized queries / prepared statements — never string concatenation for queries.

## A04: Insecure Design

Security flaws introduced at the design phase, not the implementation phase.

**Real example:** A password reset flow that uses security questions — the design itself is flawed regardless of implementation quality.

**Prevention:** Threat model during design, not after. Use established security design patterns.

## A05: Security Misconfiguration

Insecure default configurations, open cloud storage, verbose error messages, unnecessary features enabled.

**Real example:** An S3 bucket left public. Default credentials (admin/admin) never changed.

**Prevention:** Harden configurations — disable everything not required. Automate misconfiguration scanning in CI/CD.

## A06: Vulnerable and Outdated Components

Using libraries, frameworks, or software components with known vulnerabilities.

**Real example:** Log4Shell (CVE-2021-44228) — a vulnerability in a widely-used Java logging library that affected millions of systems.

**Prevention:** Track all dependencies and their versions (Software Bill of Materials). Automate dependency updates.

## A07: Identification and Authentication Failures

Weaknesses in authentication and session management.

**Real example:** An application that allows unlimited login attempts (enables brute force), or uses predictable session tokens.

**Prevention:** Implement MFA. Use secure, server-side session management. Apply rate limiting.

## A08: Software and Data Integrity Failures

Code and infrastructure that does not protect against integrity violations.

**Real example:** The SolarWinds attack — attackers compromised the build pipeline to inject malicious code into a software update.

**Prevention:** Verify integrity of software packages. Secure your CI/CD pipeline with least-privilege and audit logging.

## A09: Security Logging and Monitoring Failures

Insufficient logging, monitoring, and incident response capability.

**Real example:** An attacker who has been in a network for 6 months before being detected — the logs existed, but no one was monitoring them.

**Prevention:** Log all authentication events. Ensure logs cannot be deleted by attackers (centralized, write-only logging).

## A10: Server-Side Request Forgery

The application fetches a remote resource based on user-supplied input.

**Real example:** A URL preview feature that can be pointed at the AWS instance metadata endpoint, exposing cloud credentials.

**Prevention:** Allowlist permitted URL schemes and destinations. Do not send raw server-side fetch responses to clients.`,
  },
  {
    slug: 'ai-in-cybersecurity',
    title: 'AI in Cybersecurity: Opportunities, Limitations, and the Double-Edged Sword',
    excerpt: 'AI is transforming both sides of cybersecurity. An honest look at where AI actually helps defenders, where it falls short, and how attackers are using it.',
    category: 'AI Security',
    tags: ['ai', 'machine-learning', 'threat-detection', 'defense'],
    readingTime: 15,
    publishedAt: '2026-06-12',
    content: `Artificial intelligence is being applied to cybersecurity with genuine results in some areas and significant hype in others. Understanding the difference matters — both for building effective defenses and for evaluating vendor marketing claims.

## Where AI Actually Helps

### Anomaly Detection at Scale

Network security monitoring generates volumes of data that are impossible for human analysts to review manually. ML models excel at establishing baselines and flagging deviations — unusual authentication times, unexpected lateral movement, data exfiltration patterns.

### Malware Classification

Traditional antivirus relies on signatures — known patterns of malicious code. This fails against polymorphic malware. ML-based malware classification uses static analysis (PE headers, import tables, entropy) and dynamic analysis (behavioral patterns during execution) to classify files based on characteristics rather than signatures.

### Phishing Detection

URL and content analysis using ML outperforms static blacklists because it can identify phishing sites with characteristics consistent with phishing campaigns, even when the specific domain is new. This is the core idea behind my Phishing Website Detection project.

### Vulnerability Prioritization

ML models trained on exploit databases and social media activity can predict which vulnerabilities are most likely to be exploited in the near term — helping teams prioritize patching more effectively.

## Where AI Falls Short

### Adversarial Attacks

ML models can be deliberately fooled. Adversarial examples — inputs crafted to cause misclassification — are a real attack surface. Malware authors have demonstrated the ability to modify malicious files to evade ML-based antivirus while preserving functionality.

### Explainability

Security decisions often require explainability. When a model flags a transaction as fraudulent, the affected person deserves an explanation. Black-box models are difficult to explain, creating legal, ethical, and practical problems.

### Data Requirements

ML models require large, labeled datasets. In security, ground truth is expensive to obtain. Class imbalance (far more benign events than malicious ones) is a constant challenge.

### The Attacker Advantage

Everything defenders can do with AI, attackers can do too:
- **Phishing generation**: LLMs produce highly convincing, grammatically correct phishing emails at scale
- **Vulnerability discovery**: AI-assisted fuzzing helps attackers find bugs faster
- **Deepfakes**: Used in business email compromise and social engineering
- **Automated exploitation**: AI assists in adapting exploits to specific target environments

## The Bigger Picture

AI in security is best understood as a capability multiplier, not a solution. It amplifies what skilled security teams can do, but it does not replace security expertise, threat modeling, or the organizational work of building a security culture.

The most dangerous misconception is that AI can be deployed as a self-managing security system. Real-world deployments require continuous deployment, monitoring for drift, adversarial testing, and human oversight.

## Conclusion

AI is a genuine force multiplier in cybersecurity. But it is not magic — it has real limitations, introduces new attack surfaces, and requires ongoing human expertise to operate effectively.

The most effective security posture combines AI-powered detection with strong fundamentals: least privilege, network segmentation, MFA, and a culture where security is everyone's responsibility.`,
  },
]
