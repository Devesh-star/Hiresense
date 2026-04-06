// ─── Dashboard Mock Data ────────────────────────────────────────────────────

export const dashboardData = {
  candidateName: "Alex",
  fullName: "Alex Rivera",
  role: "Sr. Architect Role",
  hireabilityScore: 8.5,
  percentile: "top 4%",

  metrics: [
    {
      label: "Technical Depth",
      score: 9.0,
      icon: "Terminal" as const,
      barHeights: [2, 4, 3, 6, 7],
      barOpacities: [20, 40, 60, 80, 100],
    },
    {
      label: "Communication",
      score: 7.2,
      icon: "AudioLines" as const,
      barHeights: [4, 5, 2, 3, 4],
      barOpacities: [20, 40, 60, 80, 40],
    },
    {
      label: "Confidence",
      score: 8.4,
      icon: "Zap" as const,
      barHeights: [2, 3, 6, 5, 8],
      barOpacities: [20, 40, 60, 80, 100],
    },
  ],

  skillBreakdown: [
    { subject: "Architecture", score: 85, fullMark: 100 },
    { subject: "DSA", score: 72, fullMark: 100 },
    { subject: "React", score: 90, fullMark: 100 },
    { subject: "Soft Skills", score: 68, fullMark: 100 },
    { subject: "Security", score: 60, fullMark: 100 },
  ],

  questionBreakdown: {
    currentQuestion: 3,
    totalQuestions: 12,
    questionText: "Explain the Virtual DOM and why React uses it.",
    transcript:
      '"So, <filler>um</filler>, the Virtual DOM is like a copy of the actual DOM. React uses it to, <filler>uh</filler>, optimize rendering. It basically looks for differences between the old and new version, and <filler>um</filler>, only updates what\'s necessary."',
    strengths:
      "Accurately identified the reconciliation process and performance optimization as key benefits.",
    improvements:
      "Could expand on the 'diffing algorithm' and mention the Fibers architecture for extra depth.",
  },

  aiPitch:
    '"The Virtual DOM is an in-memory representation of the Real DOM. React uses it to perform efficient UI updates through a process called Reconciliation. By minimizing direct manipulation of the browser DOM—which is computationally expensive—React ensures 60fps performance even in complex, data-heavy applications using its efficient diffing algorithm."',

  nextSteps: [
    {
      icon: "GraduationCap" as const,
      title: "Refresh System Design Patterns",
      description:
        "Review Micro-frontends and Event-driven architecture for the next round.",
    },
    {
      icon: "Mic" as const,
      title: "Reduce Filler Words",
      description:
        'You used "um" 14 times. Try pausing for 2 seconds when thinking.',
    },
    {
      icon: "Users" as const,
      title: "Prepare Leadership Stories",
      description:
        "Focus on conflict resolution examples for the upcoming culture fit panel.",
    },
  ],

  sidebarNavItems: [
    { label: "Overview", icon: "LayoutDashboard" as const, href: "/dashboard" },
    { label: "Performance", icon: "BarChart3" as const, href: "/dashboard/performance" },
    { label: "Skill Gap", icon: "Brain" as const, href: "/dashboard/skill-gap" },
    { label: "Culture Fit", icon: "Users" as const, href: "/dashboard/culture-fit" },
    { label: "Final Verdict", icon: "BadgeCheck" as const, href: "/dashboard/verdict" },
  ],
};

// ─── Reports Mock Data ──────────────────────────────────────────────────────

export const reportsData = {
  reports: [
    {
      id: "rpt-001",
      title: "Sr. Architect — Final Round",
      date: "Apr 5, 2026",
      score: 8.5,
      status: "completed" as const,
      duration: "42 min",
      questions: 12,
      strengths: ["Architecture", "React", "System Design"],
      role: "Senior Architect",
    },
    {
      id: "rpt-002",
      title: "Full-Stack Engineer — Technical",
      date: "Mar 28, 2026",
      score: 7.8,
      status: "completed" as const,
      duration: "38 min",
      questions: 10,
      strengths: ["Node.js", "REST APIs", "SQL"],
      role: "Full-Stack Engineer",
    },
    {
      id: "rpt-003",
      title: "Frontend Lead — Culture Fit",
      date: "Mar 20, 2026",
      score: 9.1,
      status: "completed" as const,
      duration: "30 min",
      questions: 8,
      strengths: ["Leadership", "Communication", "Team Building"],
      role: "Frontend Lead",
    },
    {
      id: "rpt-004",
      title: "DevOps Engineer — System Design",
      date: "Mar 12, 2026",
      score: 6.9,
      status: "completed" as const,
      duration: "45 min",
      questions: 15,
      strengths: ["Docker", "CI/CD", "AWS"],
      role: "DevOps Engineer",
    },
  ],
  totalInterviews: 12,
  averageScore: 8.1,
  bestCategory: "Technical Depth",
  improvementRate: "+12%",
};

// ─── Candidates Mock Data ───────────────────────────────────────────────────

export const candidatesData = {
  candidates: [
    {
      id: "cand-001",
      name: "Alex Rivera",
      role: "Sr. Architect",
      score: 8.5,
      status: "shortlisted" as const,
      avatar: "AR",
      interviewDate: "Apr 5, 2026",
      topSkills: ["React", "Architecture", "TypeScript"],
    },
    {
      id: "cand-002",
      name: "Priya Sharma",
      role: "Sr. Architect",
      score: 8.2,
      status: "shortlisted" as const,
      avatar: "PS",
      interviewDate: "Apr 4, 2026",
      topSkills: ["Angular", "System Design", "Java"],
    },
    {
      id: "cand-003",
      name: "Marcus Chen",
      role: "Sr. Architect",
      score: 7.6,
      status: "under-review" as const,
      avatar: "MC",
      interviewDate: "Apr 3, 2026",
      topSkills: ["Vue.js", "GraphQL", "Python"],
    },
    {
      id: "cand-004",
      name: "Sophie Laurent",
      role: "Sr. Architect",
      score: 7.1,
      status: "under-review" as const,
      avatar: "SL",
      interviewDate: "Apr 2, 2026",
      topSkills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "cand-005",
      name: "James Okafor",
      role: "Sr. Architect",
      score: 6.4,
      status: "rejected" as const,
      avatar: "JO",
      interviewDate: "Apr 1, 2026",
      topSkills: ["PHP", "Laravel", "MySQL"],
    },
  ],
  openPositions: 2,
  totalApplicants: 47,
};

// ─── Skill Gap Mock Data ────────────────────────────────────────────────────

export const skillGapData = {
  required: [
    { skill: "React / Next.js", required: 90, current: 90, gap: 0 },
    { skill: "System Design", required: 85, current: 72, gap: 13 },
    { skill: "TypeScript", required: 80, current: 88, gap: 0 },
    { skill: "Testing (Jest/RTL)", required: 75, current: 55, gap: 20 },
    { skill: "Security Best Practices", required: 70, current: 60, gap: 10 },
    { skill: "CI/CD & DevOps", required: 65, current: 45, gap: 20 },
    { skill: "Soft Skills / Leadership", required: 80, current: 68, gap: 12 },
  ],
  recommendations: [
    {
      title: "Complete System Design Course",
      provider: "educative.io",
      duration: "20 hours",
      priority: "high" as const,
    },
    {
      title: "Testing JavaScript Applications",
      provider: "TestingJavaScript.com",
      duration: "12 hours",
      priority: "high" as const,
    },
    {
      title: "AWS Solutions Architect Prep",
      provider: "A Cloud Guru",
      duration: "30 hours",
      priority: "medium" as const,
    },
    {
      title: "Leadership Communication Workshop",
      provider: "Coursera",
      duration: "8 hours",
      priority: "medium" as const,
    },
  ],
};

// ─── Culture Fit Mock Data ──────────────────────────────────────────────────

export const cultureFitData = {
  overallScore: 7.8,
  dimensions: [
    { name: "Collaboration", score: 8.5, description: "Works well in cross-functional teams" },
    { name: "Adaptability", score: 7.2, description: "Demonstrates flexibility in changing requirements" },
    { name: "Communication", score: 7.0, description: "Articulates ideas clearly, room for brevity" },
    { name: "Initiative", score: 8.8, description: "Proactively identifies and solves problems" },
    { name: "Alignment", score: 7.5, description: "Values align with company mission and engineering culture" },
  ],
  behavioralHighlights: [
    {
      question: "Describe a time you resolved a conflict within your team.",
      response: "Led a mediation between two senior engineers who disagreed on the API architecture. Organized a design sprint that resulted in a hybrid approach both parties supported.",
      rating: 8,
    },
    {
      question: "How do you handle tight deadlines?",
      response: "I prioritize ruthlessly using an impact/effort matrix and communicate tradeoffs transparently with stakeholders. I once shipped a critical feature 2 days early by negotiating scope.",
      rating: 9,
    },
    {
      question: "Tell me about a failure and what you learned.",
      response: "Deployed a caching layer that caused stale data issues. I learned to implement comprehensive integration tests and now advocate for a 'test the cache' mindset.",
      rating: 7,
    },
  ],
};

// ─── Final Verdict Mock Data ────────────────────────────────────────────────

export const verdictData = {
  recommendation: "Strong Hire" as const,
  confidence: 87,
  summary:
    "Alex Rivera demonstrates exceptional technical depth, particularly in React ecosystem and frontend architecture. Communication can be improved by reducing filler words and structuring answers more concisely. Strong culture fit and leadership potential make this candidate an excellent match for the Sr. Architect role.",
  pros: [
    "Deep understanding of React internals and Virtual DOM",
    "Strong system design thinking for large-scale applications",
    "Proactive problem-solving approach with clear past examples",
    "High confidence and composure during technical questioning",
  ],
  cons: [
    "Excessive use of filler words (\"um\", \"uh\") — 14 occurrences",
    "Could improve structuring of behavioral answers",
    "Limited depth on testing and security topics",
  ],
  compareToPool: {
    rank: 2,
    totalCandidates: 47,
    percentile: 96,
  },
  categoryScores: [
    { category: "Technical", score: 9.0, weight: 0.35 },
    { category: "Communication", score: 7.2, weight: 0.20 },
    { category: "Confidence", score: 8.4, weight: 0.15 },
    { category: "Culture Fit", score: 7.8, weight: 0.15 },
    { category: "Problem Solving", score: 8.6, weight: 0.15 },
  ],
};

// ─── Settings Mock Data ─────────────────────────────────────────────────────

export const settingsData = {
  profile: {
    name: "Alex Rivera",
    email: "alex.rivera@company.com",
    role: "Hiring Manager",
    company: "TechCorp Inc.",
    timezone: "PST (UTC-8)",
  },
  preferences: {
    darkMode: true,
    language: "English (US)",
    emailNotifications: true,
    interviewReminders: true,
    weeklyDigest: false,
    soundEffects: true,
    autoSave: true,
  },
  integrations: [
    { name: "Google Calendar", connected: true, icon: "Calendar" },
    { name: "Slack", connected: true, icon: "MessageSquare" },
    { name: "LinkedIn", connected: false, icon: "ExternalLink" },
    { name: "Greenhouse ATS", connected: false, icon: "Database" },
  ],
};

// ─── Interview Mock Data ────────────────────────────────────────────────────

export const interviewData = {
  sessionTitle: "Frontend Engineering - Medium",
  timer: "00:15:00",
  completionPercent: 20,

  progress: [
    { label: "Introduction", status: "completed" as const },
    { label: "Technical Core", status: "active" as const },
    { label: "Problem Solving", status: "pending" as const },
    { label: "System Design", status: "pending" as const },
    { label: "Closing", status: "pending" as const },
  ],

  questions: [
    {
      topic: "React Fundamentals",
      question: "How would you explain the difference between a virtual DOM and the real DOM in React?",
      highlightedWords: ["virtual DOM", "real DOM"],
    },
    {
      topic: "State Management",
      question: "When would you use Context API instead of passing props down manually?",
      highlightedWords: ["Context API", "props down manually"],
    },
    {
      topic: "Performance",
      question: "What are some common ways to optimize a React application's performance?",
      highlightedWords: ["optimize", "performance"],
    }
  ],

  aiAnalysis: {
    listening: {
      status: "Listening...",
      description:
        "Detecting vocal patterns. Please speak clearly for the most accurate transcription.",
    },
    speechPace: {
      label: "Speech Pace",
      status: "Optimal",
      progress: 70,
      description:
        "Your pace is steady. Maintain this rhythm for better clarity.",
    },
    contentRelevance: {
      label: "Content Relevance",
      tags: ["React", "DOM"],
    },
  },

  aiCoachTip:
    '"Take a deep breath. Focus on explaining the \'Reconciliation\' process if you get stuck."',

  profileImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBELPz57PETebue0LgQG8goE1damEGH5czCBdy7yYgdj7wiry-H0_nnBdSY3rqXspMiaCTCMywE2o0wvCjlikNTnZ6bCU0zswuvdm-eLfUfCbab9BIZJZkmpx3xUQCEeFbQi5bccy8lbVcB_pfE0kGVEZ8oG3o6CUT7tujveWn6MHbbeouv5rE3tTFb02NJ8H51JEfjr06sBFTdn4jK0uuu1qpYvi4IWulXHHYQwv54TwZY_0L69NyChDkY6ScpZcUb09zpDasZg1E",
};

// ─── Shared ────────────────────────────────────────────────────────────────

export const profileImages = {
  recruiter:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAIE_tSuwCPhCCFmDB9DooawrsZFg1rNzlVfyzU8fXTQm6dmA8zuOY-hKyB91giyHdoALR0xelV0ucxZsHaI9VaX0RA_-VecAEBRf_DXx3DXpSMuRFuATu3Jxu70XNBN_oqtXxCjsqSr-iRlkOEB13OyZ3699cGuGf75hQF89cH4WrEvaybkA4wEdTFRydfYaCupP1TvfB9M3D1N4B2fHhQUudJZLyzWFI60FhDXXEZM0VoUyroJUAUZsk9hMfRr9otWuXtCDRvwGc",
  session:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDPjy0FbmqvLkYwjumaf0SoxvHeJ3OtIyXlYo3CBlImMYfC5mtMKsfmdUl9n1TgiCRTbMYSLGwEfUMkDH3IEQNjevvbtLZaeVpORE0N6IYQafbgO1Y8tNwFns9gT3J74LZt5hWfxl6hUyEAlc4bM8nHLrhBuCU3CEw1PGTlFuQ67IWHM3_gH755Nt8umBxVcesO_9-dzuQa90-6n4iAk2MRDE3vmJkPnofpSjajSCfeQW7ZEzi4TVVxtxQkcrmX1XCAnE3wko6a6rE",
};
