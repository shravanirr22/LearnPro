# LearnPro Platform — India's #1 Career Launch Platform 🚀

LearnPro is a under development website for career guidance and ed-tech platform built to take learners from zero to job-ready status in their target domains. The platform features personalized AI-driven roadmaps, curated high-quality resources, an interactive code practice sandbox, automated portfolio enhancement for GitHub and LinkedIn, and a simulated voice-powered mock interview module. 

Engineered entirely with pure vanilla web technologies, LearnPro operates flawlessly without requiring any external frontend frameworks, libraries, heavy node dependencies, or complex build tools. This architecture ensures high-performance rendering, near-instant load times, and an easily maintainable code structure that can be previewed directly inside any modern web browser.

---

## ✨ Core Features

* **AI Goal Mapping & Onboarding:** Captures background data through a smart survey to build a dynamic skill-gap visualization and visual timeline matching learners to industry targets.
* **Curated Resources Hub:** Collects and organizes localized streaming materials (YouTube, technical blogs, Reddit threads, and GitHub repositories) sorted by difficulty and matched to the user's roadmap.
* **Dual-State Jobs Board:** Displays a predictive marketplace showing positions qualified for today alongside higher-paying roles unlocked once the current learning track is finished.
* **Integrated Practice Arena:** Features a real-time web code sandbox supporting simulated languages alongside time-boxed quiz loops and a weekly ranking leaderboard.
* **AI Mock Interviews:** Conducts voice-synthesized, live technical or behavioural evaluation rounds powered by large language model prompt engineering with granular score generation.
* **Social & Expert Networks:** Facilitates study buddy pairing, peer-to-peer discussions, upcoming community events, and single-click appointment scheduling with verified professional industry mentors.

---

## 🛠️ Tech Stack
## 🛠️ Operational Tech Stack

| Operational Layer | Technology Implemented | Selection Rationale |
| :--- | :--- | :--- |
| **Frontend Architecture** | Next.js 14 (App Router) | Handles SSR/SSG compilation loops, optimizes Core Web Vitals (LCP), and delivers robust structural SEO tracking. |
| **Interface Styling** | Tailwind CSS + shadcn/ui | Promotes utility-first rapid component interface layout mapping with accessible WCAG-compliant design patterns. |
| **Client State Management** | Zustand + React Query | Delivers a lightweight atomic global layout store coupled with automatic server state tracking and micro-caching. |
| **Backend API Engine** | Node.js + Express.js | Standardized scalable server environment exposing structured, versioned RESTful routes (`/api/v1/`). |
| **Primary Data Layer** | MongoDB Atlas | Distributed cloud document store providing high schema flexibility for changing user metrics and historical performance maps. |
| **Realtime Middleware / Auth** | Firebase (Firestore + Auth + FCM) | Manages instant mobile phone OTP validations, active learner presence, and push notification distribution. |
| **Cloud Asset Repository** | Cloudflare R2 / AWS S3 | Slices media latency and controls network bandwidth load for course lecture videos, profile graphics, and PDF assets. |
| **Telemetry & Monitoring** | Sentry + Vercel Analytics | Monolith error collection engine mapping syntax breakages alongside ongoing production Core Web Vitals checks. |

---

## 📂 Project Structure
learnpro/
├── index.html                  ← High-conversion Landing Engine with real-time counters
├── css/
│   └── global.css              ← Central style repository: custom theme tokens and UI components
├── js/
│   └── global.js               ← Global utility middleware: state handlers and core AI orchestrators
└── pages/
├── login.html              ← Sign-in panel supporting OAuth2, Email, and Phone OTP modes
├── signup.html             ← 4-step survey registration track capturing career intent
├── onboarding.html         ← Interactive visual roadmaps and asset gap mapping views
├── dashboard.html          ← Central platform view tracking study streaks, tasks, and user XP
├── courses.html            ← Curriculum list page complete with an in-frame video lecture module
├── resources.html          ← Filterable tech matrix querying multiple external community web feeds
├── jobs.html               ← Interactive market tracking comparison tools showing current vs target positions
├── mentors.html            ← Grid directory showing mentor profiles and scheduling calendar matrices
├── profile.html            ← Integrated resume constructor and profile enhancement view
├── community.html          ← Thread boards showcasing peer discussions, trends, and study partners
├── practice.html           ← Active browser programming workspace and timed testing grounds
├── leaderboard.html        ← Global experience point (XP) tracking ranking podium views
├── interview.html          ← Speech-to-text behavioral and technical round simulation grids
├── settings.html           ← Environment variable manager handling billing maps and verification keys
└── 404.html                ← Custom visual error fallback view


---

## 🚀 Get Started

Because LearnPro contains zero dependencies, installing package configurations or triggering node compiler services is entirely unnecessary.

1. **Clone the project repository tree locally:**
```bash
   git clone [https://github.com/shravanirr22/learnpro.git](https://github.com/shravanirr22/learnpro.git)
   cd learnpro
Launch the code directly inside your browser environment:

Option A (Simplest): Double-click the index.html file in your system file explorer to open it natively in your browser.

Option B (Local Web Server): Serve the repository from a local application server using tools like VS Code's Live Server extension, or quickly instantiate one using Python:

Bash
     python -m http.server 8000
     ```
     Then, navigate to `http://localhost:8000` in your web browser.

---

## 🗺️ Product Roadmap

* **Phase 1: Dynamic Client Setup & State Persistence (Current)** — Implement local configuration maps via browser storage targets (`lp_user`, `lp_completedLessons`), setup native layout elements, and structure multi-step onboarding pipelines.
* **Phase 2: Live Cloud Database Migration** — Wire internal Supabase project configuration variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) to persist live user state maps directly on external databases.
* **Phase 3: Automated Micro-Services Scaling** — Deploy live API access calls via server-side code hooks to replace fallback simulated scripts inside the code execution blocks (e.g., active Stripe keys, full Google Maps arrays, and live Claude AI responses).

---

## 💡 Why LearnPro?

LearnPro provides an all-in-one approach to career transitions by connecting skill development directly to real-time market placement. Rather than isolating tutorial videos from practice, the architecture weaves user progress metrics through code playgrounds, interview simulators, and real developer portfolios. Because it avoids code-heavy modern build structures, it offers a lightweight and blazing-fast canvas optimized specifically for entry-level developers learning code assembly patterns across India.

---

## 📄 License

This project is licensed under the MIT License.

***

⭐ *If you found this project helpful, please give it a star!*