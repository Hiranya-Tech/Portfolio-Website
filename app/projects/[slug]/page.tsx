import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/sections/ProjectDetail'

const PROJECTS_DATA = {
  'faceshield-ai': {
    slug: 'faceshield-ai',
    title: 'FaceShield AI',
    category: 'AI Security',
    status: 'Completed' as const,
    description: 'AI-powered identity protection platform that detects face misuse and combats digital identity fraud using computer vision and automation.',
    problem: `Digital identity fraud is one of the fastest-growing threats on the modern internet. Attackers increasingly use stolen or manipulated face images to bypass authentication systems, create fake accounts, and commit financial fraud. Existing solutions were either too expensive, too invasive, or not tailored to the specific threat model of identity fraud.

The question I started with: can a computer vision pipeline reliably distinguish legitimate identity verification from misuse — without generating enough false positives to make the system unusable?`,
    research: `I studied existing identity verification systems and their documented failure modes. The key insight from the research phase was that most commercial systems rely entirely on template matching — comparing a submitted face to a stored reference image. This works for simple impersonation but fails against:

- Morphing attacks (blending two faces to create a hybrid that matches both)
- Presentation attacks (holding a printed photo or playing a video in front of a camera)  
- Feature extraction attacks (submitting images manipulated to fool embedding models)

This shaped the architecture: the system needed multiple detection layers, not just template matching.`,
    architecture: `The system is architected as a Python service exposing a REST API:

1. **Input Layer**: Accepts image files or base64-encoded images via API
2. **Detection Layer**: OpenCV + dlib for face localization and landmark detection
3. **Embedding Layer**: Pre-trained FaceNet model generates 128-dimensional face embeddings
4. **Comparison Layer**: Cosine similarity against encrypted reference embeddings in a vector store
5. **Policy Layer**: Configurable thresholds trigger different alert levels (low/medium/high risk)
6. **Anomaly Detection**: Pattern analysis flags suspicious submission behaviors (rapid retries, multiple identity matches)`,
    challenges: `**False positive management** was the hardest problem. Too sensitive and legitimate users get blocked. Too lenient and attackers get through. Finding the right threshold required evaluating precision-recall tradeoffs across diverse face datasets.

**Embedding model selection** involved comparing FaceNet, DeepFace, and ArcFace. FaceNet offered the best balance of accuracy and inference speed for a lightweight deployment target.

**Adversarial robustness**: The current version does not yet include liveness detection, which means a sufficiently high-quality printed photo could potentially fool the detection layer. This is documented as a known limitation.`,
    lessons: `Building FaceShield AI reinforced adversarial thinking as a design discipline. Every architectural decision requires asking: "How would an attacker defeat this?" Security systems designed without this lens have gaps that adversaries will find.

The project also taught me that responsible AI systems need explainability. When the system flags something, it needs to communicate *why* — not just output a risk score. This matters for operator trust and for understanding failure modes.`,
    future: `Planned next steps include:
- **Liveness detection** using texture analysis and reflection patterns to resist presentation attacks
- **Configurable policy engine** that organizations can tune to their specific risk tolerance  
- **Security team dashboard** for monitoring alerts and reviewing flagged submissions
- **Audit logging** for compliance and forensic investigation capability`,
    tech: ['Python', 'OpenCV', 'FaceNet', 'dlib', 'REST API', 'NumPy'],
    features: [
      { label: 'Face Verification', desc: 'Multi-stage detection and embedding comparison pipeline' },
      { label: 'Threat Detection', desc: 'Anomaly detection for suspicious identity submission patterns' },
      { label: 'Identity Monitoring', desc: 'Continuous comparison against secure reference embeddings' },
      { label: 'Risk Scoring', desc: 'Probability-based risk levels, not just binary classification' },
    ],
  },
  'ai-resume-analyzer': {
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    category: 'ML · NLP',
    status: 'Completed' as const,
    description: 'ATS optimization platform that analyzes resumes using NLP and provides targeted recommendations to improve job application success rates.',
    problem: `Most candidates fail the automated screening stage not because they lack the qualifications — but because their resume is not formatted or worded in a way that ATS systems can parse correctly.

The problem is structural: ATS software varies wildly in its parsing capabilities, but certain patterns (skill keyword matching, section detection, formatting conventions) are consistent enough to model. Candidates get rejected before any human reads their application.

I wanted to build a tool that gives candidates *actionable* feedback — not a generic "your resume score is 67" but specific, prioritized recommendations.`,
    research: `Research involved two areas: understanding how ATS systems actually work, and understanding what makes NLP-based resume parsing difficult.

Most enterprise ATS tools (Workday, Greenhouse, Taleo) prioritize keyword density and section detection over sophisticated semantic understanding. This means a resume that describes Python experience without using the word "Python" will score lower than one that does — even if the underlying experience is equivalent.

Resume parsing is complicated by the diversity of formats. Two-column layouts, tables, and creative formatting often cause parsing failures even in sophisticated systems.`,
    architecture: `Multi-pass NLP pipeline:

1. **Text Extraction**: pdfplumber handles diverse PDF layouts; fallback to plain text input
2. **Section Detection**: Rule-based detection of standard resume sections (experience, education, skills, summary)
3. **Entity Extraction**: spaCy NER identifies roles, technologies, companies, and dates
4. **Keyword Analysis**: Extracts target keywords from job description and measures gap against resume content
5. **Scoring Engine**: Weighted scoring across ATS compatibility factors (keyword density, section completeness, formatting signals, action verb usage)
6. **Report Generation**: Prioritized recommendations separated into critical issues vs. improvements`,
    challenges: `**Format diversity** was the primary technical challenge. Resumes exist in hundreds of visual formats, and PDF text extraction does not preserve spatial layout. A two-column resume parsed linearly produces garbled text that breaks section detection.

**Semantic vs. keyword gap**: The tool currently relies on keyword matching, which means it may flag a mismatch even when the candidate has equivalent experience described differently. Semantic similarity (embeddings-based matching) is planned for a future iteration.

**Scoring validity**: Building a scoring system that actually correlates with real ATS outcomes is difficult without ground truth data. The current scoring model is based on documented ATS behavior patterns, not empirical validation against specific ATS outputs.`,
    lessons: `This project taught me how product decisions interact with technical ones. The scoring system needed to be explainable — if candidates do not understand *why* a score is what it is, they cannot act on it. Black-box scores erode trust.

I also learned about the limits of rule-based systems. The section detection logic required many edge cases to handle real-world resume diversity. ML-based approaches would generalize better but require labeled training data.`,
    future: `- Semantic similarity matching using sentence embeddings (not just keyword frequency)  
- Job description scraper that auto-populates target keywords from a URL  
- Version comparison to track improvement across resume iterations  
- Browser extension for real-time feedback as candidates write`,
    tech: ['Python', 'spaCy', 'pdfplumber', 'scikit-learn', 'NLP', 'pandas'],
    features: [
      { label: 'Resume Scoring', desc: 'Multi-dimensional scoring across ATS compatibility factors' },
      { label: 'Skill Extraction', desc: 'NLP-powered identification of technical and soft skills' },
      { label: 'Keyword Gap Analysis', desc: 'Comparison between resume content and target job description' },
      { label: 'ATS Compatibility', desc: 'Formatting and structure checks against common ATS parsing rules' },
    ],
  },
  'phishing-website-detection': {
    slug: 'phishing-website-detection',
    title: 'Phishing Website Detection',
    category: 'Cybersecurity · ML',
    status: 'Completed' as const,
    description: 'Machine learning solution that identifies phishing websites through URL structure analysis and website feature classification with 56-feature extraction pipeline.',
    problem: `Phishing remains one of the most effective attack vectors because it targets humans, not software. Blacklist-based defenses are reactive — by the time a domain is listed, it may have already attacked thousands of users.

I wanted to build a proactive defense: a classifier that can identify phishing sites based on structural characteristics, without relying on whether the specific domain is on any known list. The hypothesis was that phishing sites share detectable structural patterns even when the domain and content are entirely new.`,
    research: `Research started with the PhishTank dataset (known phishing URLs) and the Alexa top-1M list (benign domains). Feature engineering was informed by published research on URL-based phishing detection.

Key insight: phishing sites are designed to deceive humans, not machines. The structural shortcuts attackers take to quickly deploy convincing phishing sites leave detectable signatures — subdomain depth, URL entropy, use of IP addresses instead of domains, redirect chains, and form action mismatches.`,
    architecture: `**Feature Extraction Pipeline (56 features):**

URL features: length, special character counts, subdomain depth, TLD classification, use of @ symbol, IP-based URL detection, URL entropy, HTTPS presence, redirect count

Domain features: domain age (via WHOIS), registration length, domain entropy

Content features: ratio of external to internal links, form action mismatches (form submits to different domain), presence of iframes, favicon origin, script source domains

**Model Pipeline:**
1. Feature extraction from raw URL + optional page content fetch
2. Feature normalization
3. Random Forest classifier (primary) with XGBoost comparison
4. Ensemble evaluation and threshold selection optimized for recall (minimize false negatives)`,
    challenges: `**Data imbalance**: Benign sites vastly outnumber phishing sites in the real world. Training on imbalanced data without correction produced models with high accuracy but poor recall on phishing examples. SMOTE and class weighting were both evaluated.

**Feature availability**: Some features require fetching page content, which is slower and may not always be possible. Building a fast URL-only mode alongside a comprehensive mode required separate feature sets and model variants.

**Data drift**: Phishing patterns shift over time. A model trained on 2024 phishing data may degrade against 2025 phishing campaigns. This is a fundamental challenge for deployed ML security systems.`,
    lessons: `Feature engineering quality directly determines model performance — far more than model architecture selection. The difference between a 78% and 94% accurate classifier in this project came from feature engineering iterations, not from switching algorithms.

The data drift problem reinforced why security ML systems require continuous retraining pipelines. A model is not a finished artifact — it is a system that requires ongoing maintenance.`,
    future: `- Browser extension for real-time URL classification before page load  
- Visual similarity detection to identify pixel-perfect clones of legitimate sites  
- Integration with threat intelligence feeds for known malicious domains  
- Explainability layer showing which features triggered the classification decision`,
    tech: ['Python', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'Feature Engineering'],
    features: [
      { label: 'URL Analysis', desc: '56-feature extraction from URL structure, domain, and page content' },
      { label: 'ML Classification', desc: 'Random Forest with XGBoost comparison and ensemble evaluation' },
      { label: 'Risk Scoring', desc: 'Probability-based risk scores, not just binary classification' },
      { label: 'Feature Importance', desc: 'Explainability via feature importance breakdown' },
    ],
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS_DATA[slug as keyof typeof PROJECTS_DATA]
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = PROJECTS_DATA[slug as keyof typeof PROJECTS_DATA]
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
