-- ============================================================
-- Hiranmai Choppavarapu Portfolio — Supabase Schema
-- Run this in the Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES TABLE
-- Stores admin profile / site owner info
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  title TEXT,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  challenge TEXT,
  solution TEXT,
  architecture TEXT,
  lessons_learned TEXT,
  future_improvements TEXT,
  features JSONB DEFAULT '[]',
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'ml',
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'planned')),
  github_url TEXT,
  demo_url TEXT,
  cover_image TEXT,
  screenshots TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILLS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cybersecurity', 'programming', 'ai-ml', 'tools', 'soft-skills')),
  proficiency INTEGER DEFAULT 75 CHECK (proficiency BETWEEN 0 AND 100),
  icon TEXT,
  description TEXT,
  used_in TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'cybersecurity',
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MESSAGES TABLE (Contact form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE_SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'resume_download', 'project_view', 'blog_view', 'contact_submit')),
  resource_id TEXT,
  resource_slug TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- PROFILES: Owner can update their own profile
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_owner_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- PROJECTS: Public can read, only authenticated admin can write
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "projects_admin_insert" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "projects_admin_update" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "projects_admin_delete" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- SKILLS: Public can read, only authenticated admin can write
CREATE POLICY "skills_public_read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "skills_admin_write" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- BLOGS: Public can read published blogs, admin can read all
CREATE POLICY "blogs_public_read" ON public.blogs FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "blogs_admin_write" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- MESSAGES: Only admin can read, anyone can insert (contact form)
CREATE POLICY "messages_public_insert" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_admin_read" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "messages_admin_update" ON public.messages FOR UPDATE USING (auth.role() = 'authenticated');

-- SITE SETTINGS: Public can read, admin can write
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ANALYTICS: Anyone can insert, admin can read
CREATE POLICY "analytics_public_insert" ON public.analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "analytics_admin_read" ON public.analytics FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(is_read, created_at DESC);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_blogs_updated_at BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Increment project view count
CREATE OR REPLACE FUNCTION public.increment_project_views(project_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.projects SET view_count = view_count + 1 WHERE slug = project_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment blog view count
CREATE OR REPLACE FUNCTION public.increment_blog_views(blog_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.blogs SET view_count = view_count + 1 WHERE slug = blog_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Run these separately in the Supabase Dashboard → Storage
-- or uncomment if using service role:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- ============================================================
-- SEED DATA — Projects
-- ============================================================
INSERT INTO public.projects (slug, title, description, long_description, challenge, solution, architecture, lessons_learned, future_improvements, features, tech_stack, category, status, is_featured, sort_order) VALUES
(
  'faceshield-ai',
  'FaceShield AI',
  'AI-powered identity protection platform that detects face misuse and combats digital identity fraud using computer vision and automation.',
  'Digital identity fraud is one of the fastest-growing threats in the modern internet. Attackers increasingly use stolen or manipulated face images to bypass authentication systems, create fake accounts, and commit financial fraud. FaceShield AI was built to address this gap — a platform that monitors and detects unauthorized use of facial identities using computer vision pipelines.',
  'The core challenge was building a system that could reliably distinguish legitimate identity verification from misuse scenarios, without generating excessive false positives that would harm user experience. Existing solutions were either too expensive, too invasive, or not tailored to the specific threat model of identity fraud.',
  'FaceShield AI uses a multi-stage pipeline: first, a face detection model locates and extracts faces from input images. A feature extraction model then generates face embeddings. These embeddings are compared against a secure reference database using cosine similarity, with configurable thresholds. Anomaly detection logic flags suspicious patterns like rapid re-submission, multiple identity matches, or low-confidence verification attempts.',
  'The system is architected as a Python service exposing a REST API. Face detection uses OpenCV and dlib. Feature extraction uses a pre-trained FaceNet model. The reference database stores encrypted face embeddings. Alerts are generated and logged when policy thresholds are crossed.',
  'Building FaceShield AI reinforced the importance of adversarial thinking — every design decision needs to account for how an attacker might try to defeat it. I also learned that responsible AI systems need clear explainability: when the system flags something, it needs to articulate why.',
  'Future improvements include liveness detection to counter spoofing attacks using printed photos or video loops, integration with identity verification APIs, a dashboard for security teams, and a configurable policy engine that organizations can customize to their risk tolerance.',
  '[{"label": "Face Verification", "description": "Multi-stage face detection and embedding comparison pipeline"}, {"label": "Threat Detection", "description": "Anomaly detection that identifies suspicious identity submission patterns"}, {"label": "Identity Monitoring", "description": "Continuous monitoring of face embeddings against a secure reference store"}, {"label": "AI-Powered Alerts", "description": "Automated alerting with confidence scores and policy-based thresholds"}]',
  ARRAY['Python', 'Computer Vision', 'Machine Learning', 'OpenCV', 'FaceNet', 'REST API'],
  'ai-security',
  'completed',
  true,
  1
),
(
  'ai-resume-analyzer',
  'AI Resume Analyzer',
  'ATS optimization platform that analyzes resumes using NLP and provides targeted recommendations to improve job application success rates.',
  'Most candidates fail the automated screening stage not because they lack the skills — but because their resume is not formatted or worded in a way that ATS systems can parse. This tool bridges that gap by giving candidates actionable, specific feedback rather than a generic score.',
  'Resume analysis requires understanding both structure (sections, formatting, length) and semantics (skills, keywords, relevance to job descriptions). Building an NLP pipeline that handles the diversity of real-world resume formats — from simple text to complex multi-column PDFs — was the primary technical challenge.',
  'The analyzer uses a multi-pass NLP pipeline: text extraction handles diverse input formats. Named entity recognition identifies skills, technologies, and roles. Keyword extraction compares against a target job description. Scoring algorithms evaluate ATS compatibility factors including formatting conventions, section completeness, and keyword density.',
  'Built as a Python application using spaCy for NLP tasks. PDF parsing handled by pdfplumber. The scoring engine uses weighted factors across multiple dimensions. Results are surfaced through a clean report that separates critical issues from recommended improvements.',
  'This project deepened my understanding of how ATS systems actually work — many candidates are surprised to learn that most enterprise ATS tools rank on keyword density, not qualifications. It also taught me to think about user trust: the tool needs to explain its reasoning, not just output a number.',
  'Planned improvements include a job description scraper that auto-populates target keywords, version comparison to track improvements across resume iterations, integration with LinkedIn profiles, and a browser extension that gives instant feedback.',
  '[{"label": "Resume Scoring", "description": "Multi-dimensional scoring across ATS compatibility factors"}, {"label": "Skill Extraction", "description": "NLP-powered identification of technical and soft skills"}, {"label": "Keyword Optimization", "description": "Gap analysis between resume content and target job description"}, {"label": "ATS Compatibility", "description": "Formatting and structure checks against common ATS parsing rules"}]',
  ARRAY['Python', 'NLP', 'spaCy', 'Machine Learning', 'pdfplumber', 'Data Analysis'],
  'ml',
  'completed',
  true,
  2
),
(
  'phishing-website-detection',
  'Phishing Website Detection',
  'Machine learning solution that identifies phishing websites through URL structure analysis and website feature classification.',
  'Phishing remains one of the most effective attack vectors in cybersecurity — it exploits human trust rather than technical vulnerabilities. This project focuses on the machine learning side of phishing defense: building a model that can classify URLs and websites as legitimate or phishing with high accuracy.',
  'The core challenge is that phishing websites are designed to evade detection. Attackers continuously evolve their tactics — using legitimate hosting services, valid TLS certificates, and near-identical visual clones of real websites. A rule-based system would be quickly bypassed. The solution needed to learn patterns from data rather than hardcoded rules.',
  'The detection system extracts features from URLs (length, special characters, subdomain depth, TLD, IP-based URLs) and website content (form actions, script sources, redirect chains, favicon origin). These features feed into a trained classifier (Random Forest and XGBoost evaluated) that outputs a risk score and classification.',
  'Data collection used a combination of PhishTank datasets and Alexa top domains for negative examples. Feature engineering was the most time-intensive phase. The final model was evaluated on precision, recall, and F1 — prioritizing recall to minimize false negatives (missing real phishing sites).',
  'This project taught me how feature engineering quality directly determines model performance. I also learned about the concept of data drift — phishing patterns shift over time, so a model that performs well today may degrade. Continuous re-training pipelines are essential for real-world deployment.',
  'Future work includes building a browser extension for real-time URL classification, adding visual similarity detection to catch pixel-perfect clones, integrating threat intelligence feeds for known malicious domains, and building an explainability layer that shows which features triggered the classification.',
  '[{"label": "URL Analysis", "description": "56-feature extraction from URL structure, domain, and path"}, {"label": "Threat Classification", "description": "Random Forest classifier with XGBoost comparison and ensemble evaluation"}, {"label": "Risk Scoring", "description": "Probability-based risk scores, not just binary classification"}, {"label": "Detection Dashboard", "description": "Results visualization with feature importance breakdown"}]',
  ARRAY['Python', 'Machine Learning', 'scikit-learn', 'XGBoost', 'Data Preprocessing', 'Feature Engineering'],
  'cybersecurity',
  'completed',
  true,
  3
);

-- ============================================================
-- SEED DATA — Skills
-- ============================================================
INSERT INTO public.skills (name, category, proficiency, description, used_in, sort_order) VALUES
-- Cybersecurity
('Network Security', 'cybersecurity', 70, 'Understanding of TCP/IP, firewalls, IDS/IPS, and network traffic analysis', ARRAY['Academic Projects', 'Self-study'], 1),
('Vulnerability Assessment', 'cybersecurity', 65, 'Identifying and evaluating security weaknesses in systems and applications', ARRAY['Academic Projects'], 2),
('Penetration Testing', 'cybersecurity', 60, 'Ethical hacking fundamentals, tools like Nmap, Metasploit, Burp Suite', ARRAY['CTF Practice', 'Self-study'], 3),
('Linux Security', 'cybersecurity', 75, 'Linux administration, hardening, permissions, and security configuration', ARRAY['FaceShield AI', 'Daily Driver'], 4),
('Threat Detection', 'cybersecurity', 65, 'Identifying attack patterns, IOCs, and building detection logic', ARRAY['Phishing Detection', 'FaceShield AI'], 5),
('Identity Protection', 'cybersecurity', 70, 'Digital identity security, authentication systems, and anti-fraud techniques', ARRAY['FaceShield AI'], 6),
('Security Fundamentals', 'cybersecurity', 80, 'CIA triad, cryptography basics, OWASP Top 10, security frameworks', ARRAY['Academic Study'], 7),
-- Programming
('Python', 'programming', 85, 'Primary language for ML projects, scripting, and automation', ARRAY['FaceShield AI', 'AI Resume Analyzer', 'Phishing Detection'], 8),
('C++', 'programming', 65, 'Systems programming fundamentals, data structures, algorithms', ARRAY['Academic Coursework'], 9),
('SQL', 'programming', 70, 'Database design, queries, joins, and Supabase integration', ARRAY['Portfolio', 'Academic Projects'], 10),
('JavaScript', 'programming', 70, 'Frontend development, Next.js, and web application logic', ARRAY['Portfolio', 'Web Projects'], 11),
-- AI & ML
('Machine Learning', 'ai-ml', 75, 'Supervised/unsupervised learning, model evaluation, scikit-learn', ARRAY['Phishing Detection', 'AI Resume Analyzer'], 12),
('Computer Vision', 'ai-ml', 70, 'Image processing, face detection, feature extraction with OpenCV', ARRAY['FaceShield AI'], 13),
('NLP', 'ai-ml', 70, 'Text processing, named entity recognition, keyword extraction with spaCy', ARRAY['AI Resume Analyzer'], 14),
('Data Analysis', 'ai-ml', 75, 'Exploratory data analysis, pandas, NumPy, data visualization', ARRAY['All ML Projects'], 15),
('Data Preprocessing', 'ai-ml', 80, 'Feature engineering, handling missing data, normalization', ARRAY['Phishing Detection', 'AI Resume Analyzer'], 16),
-- Tools
('Linux', 'tools', 80, 'Daily operating system for development and security work', ARRAY['Development', 'Security Practice'], 17),
('Git', 'tools', 80, 'Version control, branching strategy, collaborative development', ARRAY['All Projects'], 18),
('GitHub', 'tools', 80, 'Repository management, project tracking, open source contribution', ARRAY['All Projects'], 19),
('VS Code', 'tools', 90, 'Primary IDE with debugging, extensions, and integrated terminal', ARRAY['All Projects'], 20),
('Postman', 'tools', 70, 'API testing and documentation for REST services', ARRAY['FaceShield AI', 'Portfolio API'], 21),
('Vercel', 'tools', 75, 'Deployment platform for Next.js applications', ARRAY['Portfolio'], 22),
-- Soft Skills
('Leadership', 'soft-skills', 80, 'Led teams and managed operations as Operations Manager at E-Cell', ARRAY['E-Cell Alliance University'], 23),
('Communication', 'soft-skills', 85, 'Coordinated cross-functional teams and presented to industry professionals', ARRAY['E-Cell', 'Academic'], 24),
('Team Management', 'soft-skills', 75, 'Coordinated volunteers and staff for entrepreneurship events', ARRAY['E-Cell Alliance University'], 25),
('Problem Solving', 'soft-skills', 85, 'Systematic approach to technical and operational challenges', ARRAY['All Projects'], 26),
('Project Management', 'soft-skills', 75, 'Planning, execution, and delivery of multi-stakeholder events', ARRAY['E-Cell Alliance University'], 27);

-- ============================================================
-- SEED DATA — Blogs
-- ============================================================
INSERT INTO public.blogs (slug, title, excerpt, content, category, tags, reading_time, is_published, published_at) VALUES
(
  'understanding-phishing-attacks',
  'Understanding Phishing Attacks: How They Work and How to Defend Against Them',
  'Phishing remains the most effective initial access vector in cyberattacks. This post breaks down how phishing works at a technical level, the psychology behind it, and what actually works in defending against it.',
  '# Understanding Phishing Attacks

Phishing is responsible for over 90% of data breaches. Despite being one of the oldest attack techniques in the book, it keeps working — because it exploits human cognition, not software vulnerabilities.

## What Phishing Actually Is

At its core, phishing is social engineering delivered digitally. The attacker crafts a deceptive message that convinces the target to take an action they would not take if they knew the truth — click a link, enter credentials, download a file, or transfer funds.

The word "phishing" is a play on "fishing" — the attacker casts a wide net (or a carefully targeted spear) and waits for someone to bite.

## The Attack Chain

Understanding phishing requires understanding the full attack chain:

**1. Reconnaissance**
Before sending a single email, sophisticated attackers research their targets. LinkedIn reveals org structure and employee roles. Company websites reveal email formats. Public breach data reveals existing passwords. This intelligence makes the eventual attack far more convincing.

**2. Infrastructure Setup**
Attackers register lookalike domains (g00gle.com, paypa1.com), set up phishing pages that pixel-perfect clone legitimate login portals, and configure email servers to pass SPF/DKIM checks where possible.

**3. Delivery**
Email is the most common vector, but SMS phishing (smishing) and voice phishing (vishing) are growing rapidly. Attackers use compromised email accounts, bulletproof hosting, and legitimate services (Google Forms, SharePoint, OneDrive) to deliver phishing content while evading filters.

**4. Exploitation**
The target clicks the link, lands on the phishing page, and enters credentials. Modern phishing kits use reverse proxies (like Evilginx2) to transparently relay traffic to the real site — bypassing even MFA in real time by capturing session tokens.

**5. Post-Exploitation**
Captured credentials are immediately tested against related services (credential stuffing). Session tokens are used directly. Email accounts are compromised to enable BEC (Business Email Compromise) fraud.

## Why It Keeps Working

People often ask: "Why do people still fall for phishing?" The answer is not stupidity — it is cognitive science.

- **Authority bias**: Emails appearing to come from IT, executives, or banks trigger compliance instincts
- **Urgency**: "Your account will be suspended in 24 hours" bypasses deliberate thinking
- **Social proof**: "Your colleague shared this document with you" reduces suspicion
- **Familiarity**: Attackers clone familiar interfaces down to the favicon

Security awareness training helps, but it is not sufficient alone. Humans will always make mistakes under stress and time pressure.

## What Actually Works in Defense

**Technical controls that matter:**
- **DMARC, DKIM, SPF**: Enforce email authentication. DMARC with a `reject` policy blocks domain spoofing.
- **MFA everywhere — but choose the right type**: TOTP and FIDO2 hardware keys resist phishing. SMS-based MFA does not.
- **DNS filtering**: Block known malicious domains at the resolver level.
- **Browser isolation**: Render untrusted web content in a sandboxed environment.
- **Phishing-resistant MFA**: FIDO2/WebAuthn is currently the strongest available option.

**Process controls:**
- Out-of-band verification for wire transfers and sensitive actions
- Clear escalation paths when employees suspect phishing
- Simulated phishing programs that teach rather than punish

## Building the Phishing Detection Project

This is what motivated my Phishing Website Detection project. Rather than relying solely on blacklists (which are reactive), I wanted to build a model that could identify phishing sites based on structural characteristics — URL patterns, domain age, redirect behavior, and page content analysis.

The key insight: phishing sites share detectable patterns even when the domain and content are new. URL entropy, subdomain depth, the ratio of external to internal links, and form action mismatches are all signals that hold up across different phishing campaigns.

## Conclusion

Phishing works because it is cheap, scalable, and targets the most complex system in any organization: humans. Defense requires layers — technical controls, process design, and security culture — because no single control is sufficient.

The best defense combines making attacks technically harder (email authentication, phishing-resistant MFA) with making detection faster (logging, alerting, reporting culture) and impact smaller (least privilege, network segmentation).
',
  'cybersecurity',
  ARRAY['phishing', 'social-engineering', 'email-security', 'defense', 'beginner'],
  12,
  true,
  NOW() - INTERVAL '14 days'
),
(
  'owasp-top-10-explained',
  'OWASP Top 10 Explained: The Web Security Risks Every Developer Should Know',
  'The OWASP Top 10 is the closest thing the security industry has to a universal standard for web application risk. Here is a practical breakdown of each category with real examples and mitigation strategies.',
  '# OWASP Top 10 Explained

The Open Web Application Security Project (OWASP) Top 10 is updated every few years and represents the consensus of the security community on the most critical web application risks. It is the starting point for any developer or security engineer working on web systems.

The 2021 edition reflects a significant shift — several categories were renamed to be more developer-friendly and three new categories were added.

## A01: Broken Access Control

**What it is:** The application does not properly enforce what authenticated users are allowed to do. Users can access resources, functions, or data that should be restricted to others.

**Real example:** A user changes the URL from `/profile/123` to `/profile/124` and sees another user''s private data. The server never checked if user 123 had permission to view profile 124.

**How to prevent it:**
- Deny by default — access must be explicitly granted, not explicitly denied
- Implement access control at the server side, not just the client side
- Log access control failures and alert on suspicious patterns

## A02: Cryptographic Failures

**What it is:** Sensitive data is exposed due to weak or absent cryptographic protections. This was previously called "Sensitive Data Exposure" — renamed to focus on the root cause.

**Real example:** Passwords stored as MD5 hashes (crackable in seconds), credit card numbers transmitted over HTTP, API keys committed to public GitHub repositories.

**How to prevent it:**
- Use bcrypt, scrypt, or Argon2 for password hashing (never MD5, SHA-1, or SHA-256 for passwords)
- Enforce TLS for all data in transit
- Classify data and apply appropriate protections per classification

## A03: Injection

**What it is:** Untrusted data is sent to an interpreter as part of a command or query. SQL injection is the classic example, but this includes NoSQL injection, LDAP injection, and OS command injection.

**Real example:** `SELECT * FROM users WHERE username = '' OR ''1''=''1''` — a classic SQL injection payload that bypasses authentication.

**How to prevent it:**
- Use parameterized queries / prepared statements — never string concatenation for queries
- Validate and sanitize all input
- Use an ORM that handles escaping by default

## A04: Insecure Design

**What it is (new in 2021):** Security flaws introduced at the design phase, not the implementation phase. No amount of secure coding fixes a fundamentally broken architecture.

**Real example:** A password reset flow that uses security questions — the design itself is flawed regardless of implementation quality, because security questions are easily researched or guessed.

**How to prevent it:**
- Threat model during design, not after
- Use established security design patterns
- Define security requirements explicitly before implementation begins

## A05: Security Misconfiguration

**What it is:** Insecure default configurations, incomplete configurations, open cloud storage, verbose error messages, unnecessary features enabled.

**Real example:** An S3 bucket left public. A development debug page accessible in production. Default credentials (admin/admin) never changed.

**How to prevent it:**
- Harden configurations: disable everything not required
- Automated scanning for misconfigurations in CI/CD
- Different configurations per environment (dev/staging/prod)

## A06: Vulnerable and Outdated Components

**What it is:** Using libraries, frameworks, or other software components with known vulnerabilities. Supply chain attacks often exploit this category.

**Real example:** Log4Shell (CVE-2021-44228) — a vulnerability in a widely-used Java logging library that affected millions of systems.

**How to prevent it:**
- Track all dependencies and their versions (Software Bill of Materials)
- Subscribe to security advisories for your dependencies
- Automate dependency updates with tools like Dependabot

## A07: Identification and Authentication Failures

**What it is:** Weaknesses in authentication and session management that allow attackers to compromise passwords, keys, session tokens, or assume other users'' identities.

**Real example:** An application that allows unlimited login attempts (enables brute force), uses predictable session tokens, or stores session data client-side without integrity protection.

**How to prevent it:**
- Implement MFA
- Use secure, server-side session management
- Apply rate limiting and account lockout

## A08: Software and Data Integrity Failures (new in 2021)

**What it is:** Code and infrastructure that does not protect against integrity violations. Includes CI/CD pipeline compromise and insecure deserialization.

**Real example:** The SolarWinds attack — attackers compromised the build pipeline to inject malicious code into a software update.

**How to prevent it:**
- Verify integrity of software packages (checksums, signatures)
- Secure your CI/CD pipeline with least-privilege and audit logging
- Do not deserialize data from untrusted sources without validation

## A09: Security Logging and Monitoring Failures

**What it is:** Insufficient logging, monitoring, and incident response capability. Without visibility, breaches go undetected — the average dwell time for attackers is still measured in months.

**Real example:** An attacker who has been in a network for 6 months before being detected — the logs existed, but no one was monitoring them.

**How to prevent it:**
- Log all authentication events, access control failures, and input validation failures
- Ensure logs cannot be deleted by attackers (centralized, write-only logging)
- Define and test incident response procedures

## A10: Server-Side Request Forgery (new in 2021)

**What it is:** The application fetches a remote resource based on user-supplied input, allowing attackers to coerce the server into making requests to unintended destinations — including internal services.

**Real example:** A URL preview feature that can be pointed at `http://169.254.169.254/latest/meta-data/` — the AWS instance metadata endpoint — exposing cloud credentials.

**How to prevent it:**
- Allowlist permitted URL schemes and destinations
- Do not send raw responses from server-side fetches to clients
- Disable HTTP redirections in server-side HTTP clients

## The Bigger Picture

The OWASP Top 10 is a starting point, not a comprehensive security checklist. Real security programs also address threat modeling, penetration testing, security architecture review, and organizational security culture.

For developers, the most actionable takeaway is this: security is not a checklist you apply after building a feature. It is a set of design constraints and coding practices that need to be applied throughout the development process.
',
  'cybersecurity',
  ARRAY['owasp', 'web-security', 'appsec', 'developer', 'reference'],
  18,
  true,
  NOW() - INTERVAL '7 days'
),
(
  'ai-in-cybersecurity',
  'AI in Cybersecurity: Opportunities, Limitations, and the Double-Edged Sword',
  'AI is transforming both sides of cybersecurity — defenders are using it to detect threats faster, attackers are using it to scale and personalize attacks. Here is an honest look at where AI actually helps and where it falls short.',
  '# AI in Cybersecurity

Artificial intelligence is being applied to cybersecurity with genuine results in some areas and significant hype in others. Understanding the difference matters — both for building effective defenses and for evaluating the marketing claims of security vendors.

## Where AI Actually Helps

### Anomaly Detection at Scale

Network security monitoring generates volumes of data that are impossible for human analysts to review manually. ML models excel at establishing baselines and flagging deviations — unusual authentication times, unexpected lateral movement, data exfiltration patterns that do not match historical behavior.

SIEM platforms increasingly use ML to reduce alert fatigue by correlating events and prioritizing high-confidence detections.

### Malware Classification

Traditional antivirus relies on signatures — known patterns of malicious code. This fails against polymorphic malware that changes its signature on every infection.

ML-based malware classification uses static analysis (PE headers, import tables, entropy) and dynamic analysis (behavioral patterns during execution) to classify files based on characteristics rather than signatures. Models trained on millions of samples can generalize to new malware families.

### Phishing Detection

My own Phishing Website Detection project sits in this category. URL and content analysis using ML outperforms static blacklists because it can identify phishing sites with characteristics consistent with phishing campaigns, even when the specific domain is new.

### Vulnerability Prioritization

Security teams face backlogs of thousands of vulnerabilities. ML models trained on exploit databases, social media mentions, and dark web activity can predict which vulnerabilities are most likely to be exploited in the near term — helping teams prioritize patching more effectively.

## Where AI Falls Short

### Adversarial Attacks

ML models can be deliberately fooled. Adversarial examples — inputs crafted to cause misclassification — are a real attack surface. Malware authors have demonstrated the ability to modify malicious files to evade ML-based antivirus while preserving functionality.

This is an active research area. Defense techniques (adversarial training, input preprocessing, ensemble methods) exist but the arms race continues.

### Explainability

Security decisions often require explainability. When a model flags a transaction as fraudulent and freezes an account, the affected person deserves an explanation. Black-box models (deep neural networks) are difficult to explain, which creates legal, ethical, and practical problems.

This is driving adoption of explainable AI (XAI) techniques, but interpretability often comes at the cost of accuracy.

### Data Requirements

ML models require large, labeled datasets. In security, ground truth is expensive to obtain — labeling malware samples, confirming breaches, and building diverse training sets requires significant expertise and time. Class imbalance (far more benign events than malicious ones) is a constant challenge.

### The Attacker Advantage

Everything defenders can do with AI, attackers can do too — often more easily. Attackers benefit from AI in:
- **Phishing generation**: LLMs produce highly convincing, grammatically correct phishing emails at scale, eliminating the typos that used to be a red flag
- **Vulnerability discovery**: AI-assisted fuzzing and code analysis helps attackers find bugs faster
- **Deepfakes and voice cloning**: Used in business email compromise and social engineering
- **Automated exploitation**: AI can assist in adapting exploits to specific target environments

## The Bigger Picture

AI in security is best understood as a capability multiplier, not a solution. It amplifies what skilled security teams can do, but it does not replace security expertise, threat modeling, or the organizational work of building a security culture.

The most dangerous misconception is that AI can be deployed as a self-managing security system. Real-world deployments require continuous model maintenance, monitoring for drift, adversarial testing, and human oversight.

## My Work in This Space

FaceShield AI sits at the intersection of AI and security — using computer vision to address a real identity fraud problem. Building it taught me that the hardest part of AI security systems is not the model itself but the policy layer: what confidence threshold triggers an alert? How do you handle false positives? How do you maintain the system as patterns evolve?

These questions do not have algorithmic answers. They require security judgment, domain knowledge, and ongoing iteration.

## Conclusion

AI is a genuine force multiplier in cybersecurity. It enables detection at scales and speeds that human analysts cannot match. But it is not magic — it has real limitations, introduces new attack surfaces, and requires ongoing human expertise to operate effectively.

The most effective security posture combines AI-powered detection with strong fundamentals: least privilege, network segmentation, MFA, and a culture where security is everyone''s responsibility.
',
  'ai-security',
  ARRAY['ai', 'machine-learning', 'threat-detection', 'defense', 'advanced'],
  15,
  true,
  NOW() - INTERVAL '3 days'
);

-- ============================================================
-- SEED DATA — Site Settings
-- ============================================================
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', 'Hiranmai Choppavarapu — Cybersecurity Engineer', 'Browser tab title'),
('site_description', 'Cybersecurity engineer and AI security enthusiast building intelligent security systems. Student at Alliance University, Operations Manager at E-Cell.', 'Meta description'),
('resume_download_count', '0', 'Total resume downloads'),
('maintenance_mode', 'false', 'Enable site maintenance mode'),
('analytics_enabled', 'true', 'Enable visitor analytics');
