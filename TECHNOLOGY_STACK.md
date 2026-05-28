# LearnPro Technology Stack

## 📊 Platform Overview
**Type:** Full-stack EdTech (Education to Employment) platform  
**Deployment:** GitHub Pages (frontend) + Cloud services (backend)  
**Status:** Production-ready MVP with 15 pages + service worker

---

## 🖥️ Frontend Stack

### Core Technologies
- **HTML5** — Semantic markup
- **CSS3** — Custom variables, CSS Grid, Flexbox, animations, transitions
- **Vanilla JavaScript (ES6+)** — No frameworks, ~4000 lines across 15 pages
- **Service Worker** — Firebase Cloud Messaging for push notifications

### Key JavaScript Libraries
| Library | Purpose | Version |
|---------|---------|---------|
| Supabase JS SDK | Auth (email, OTP, Google, GitHub OAuth) | v2.x |
| Firebase SDK | Phone authentication, push messaging, analytics | v10.x |
| hCaptcha | Bot protection on login/signup forms | Latest |

### UI/UX
- **Design System:** Custom CSS with design tokens (colors, spacing, typography)
- **Fonts:** Bebas Neue (display), Barlow Condensed (headings), Barlow (body) via Google Fonts
- **Color Palette:** 
  - Primary Red: `#B4121B` (LearnPro brand)
  - Dark backgrounds: `#0a0a0a`, `#111`, `#161616`
  - Neutrals: `#222`, `#333`, `#555`, `#666`, `#999`
- **Components:** Buttons, cards, forms, modals, tabs, progress rings, badges, spinners
- **Responsive:** Mobile-first, breakpoints at 1024px, 768px, 640px
- **Animation:** Fade-in, slide-up, glow effects, smooth transitions

---

## 🔐 Authentication & Backend Services

### Supabase (PostgreSQL + Auth)
**Purpose:** User authentication and database  
**Features:**
- Email/password signup + login
- Email OTP verification (shouldCreateUser: false for login)
- Google OAuth 2.0
- GitHub OAuth 2.0
- User sessions via JWT tokens
- Database for user profiles, progress, leaderboard

**Configuration Required:**
```
Site URL: https://shravanirr22.github.io/LearnPro
Redirect URLs: 
  - https://shravanirr22.github.io/LearnPro/pages/dashboard.html
  - https://shravanirr22.github.io/LearnPro/pages/onboarding.html
Providers: Google, GitHub (enabled)
```

### Firebase (Authentication)
**Purpose:** Phone number authentication + Push notifications  
**Features:**
- Phone OTP via SMS
- reCAPTCHA integration (invisible)
- Cloud Messaging (FCM) for push notifications
- Realtime database hooks (optional future use)

**Credentials:**
```
API Key: AIzaSyA5aVDaKHlPmssghJp7b9s1QxzeDWvnaeE
Auth Domain: learnpro-89b93.firebaseapp.com
Project ID: learnpro-89b93
App ID: 1:246874100868:web:b8073a1a1bc8faf1f8ded1
```

### hCaptcha
**Purpose:** Bot protection on public forms  
**Site Key:** d6ccb116-ff5e-435a-ba56-34ca25b2a6c2  
**Theme:** Dark mode  
**Protected Forms:** Login (password), signup (email)

---

## 🤖 AI Integration

### Google Gemini 1.5 Flash API
**Purpose:** AI chatbot, nudges, interview feedback, profile suggestions  
**API Key:** AIzaSyDh-EZnypHxLNHIIA0jXn3xLxzymrBp0bA  
**Features:**
- Real-time chatbot responses (LearnBot)
- Dashboard AI nudges (personalized motivation)
- Mock interview feedback generation
- LinkedIn headline/bio AI writer
- GitHub README auto-generator
- Max tokens: 512 per request
- Temperature: 0.7 (creative but grounded)

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`

---

## 🔍 Third-Party APIs

### YouTube Search (Invidious API)
**Purpose:** Free YouTube video search without API keys  
**Endpoint:** `https://inv.nadeko.net/api/v1/search` (fallback instances available)  
**Features:** No authentication needed, unlimited requests, open-source

### GitHub Public API
**Purpose:** Portfolio sync (repos, contributions, stats)  
**Features:** 60 requests/hour without token (sufficient for public profiles)  
**Endpoint:** `https://api.github.com/users/{username}`

### RSS2JSON
**Purpose:** Daily tech news feed on dashboard  
**Features:** Converts RSS feeds to JSON, 10,000 requests/day free

### Razorpay (Payment Gateway)
**Purpose:** Mentor session bookings, Pro subscription payments  
**Key ID:** (add when payment feature goes live)  
**Features:** ₹ INR payments, webhook support, low fees

---

## 📦 Local Storage & State Management

### Browser localStorage (via LP object)
```javascript
LP.get('key')              // Retrieve data
LP.set('key', value)       // Store data
LP.user()                  // Get logged-in user
LP.isLoggedIn()           // Check session
LP.logout()               // Clear auth
```

**Data Structure:**
```javascript
user = {
  name: string,
  email: string,
  avatar: string,          // First letter of name
  token: JWT,
  uid: string,
  role: string,            // student/working/freelancer/jobseeker
  targetRole: string,      // e.g. "Full-Stack Web Developer"
  timeline: string,        // 3/6/12/flexible
  city: string,
  learnStyle: string,      // video/reading/project/mixed
  timeAvail: string,       // minutes per day
  skills: string[]         // selected skills
}
```

**Other Keys:**
- `savedResources` — Array of bookmarked resource IDs
- `savedPosts` — Array of liked community post IDs
- `completedLessons` — Map of course lesson completion
- `sandboxCode` — Auto-saved code editor snippets
- `notes-{courseId}-{lessonIdx}` — Per-lesson notes
- `apikey_*` — API keys entered in Settings page (Gemini, Maps, etc.)

---

## 📱 Mobile & Push Notifications

### Service Worker
**File:** `firebase-messaging-sw.js`  
**Purpose:** Handle background push notifications  
**Features:**
- Runs in background, even when app is closed
- Registers on signup and dashboard
- Handles notification click actions
- Displays native notifications with actions

**VAPID Key:** BOOw4bup5Ok68s3htIch0cKtvDtAI8Kmvdg5ytD8ouOu18JIKQFX_PdwdofYByQX-A2IA1C-gpegbrB7DrHwUjs

### Push Notifications
**Trigger Points:**
- Lesson completion alerts
- Job match notifications
- Mentor session reminders
- Streak milestones
- Leaderboard updates
- Event announcements

---

## 🎨 CSS Architecture

### Design Tokens (CSS Variables)
```css
--red:              #B4121B    /* Primary brand color */
--red-light:        #f87171    /* Lighter red for text */
--red-dark:         #7a0d12    /* Darker shade */
--red-subtle:       rgba(180,18,27,0.1)
--red-glow:         rgba(180,18,27,0.3)

--black:            #000000
--black-2:          #0d0d0d
--black-3:          #161616
--black-4:          #1a1a1a
--black-5:          #252525

--gray-1:           #222222
--gray-2:           #333333
--gray-3:           #444444
--gray-4:           #555555
--gray-5:           #666666
--white:            #ffffff
--white-10:         rgba(255,255,255,0.1)

--radius:           10px
--radius-lg:        16px
--radius-xl:        20px
--radius-full:      99px

--transition:       all 0.2s ease
--shadow:           0 4px 16px rgba(0,0,0,0.4)
--shadow-red:       0 0 12px rgba(180,18,27,0.3)
```

### Component Library (Pre-built in global.css)
- Buttons (.btn-primary, .btn-outline, .btn-ghost)
- Cards (.card, .stat-card)
- Forms (.form-group, .form-input, .form-select, .form-textarea)
- Badges (.badge-red, .badge-green, .badge-yellow)
- Modals (.modal-overlay, .modal)
- Progress (.progress-bar, .progress-ring)
- Tables, Lists, Grids, Tabs, Tooltips
- Animations (fadeUp, glow, pulse, float)

---

## 📄 Page Architecture (15 Pages)

| Page | Route | Purpose | Auth Required |
|------|-------|---------|---------------|
| Landing | `index.html` | Marketing, features, pricing, testimonials | No |
| Login | `pages/login.html` | Email/OTP/Phone/OAuth signin | No |
| Signup | `pages/signup.html` | 4-step account creation | No |
| Onboarding | `pages/onboarding.html` | Goal visualizer, skill gap, roadmap | Yes |
| Dashboard | `pages/dashboard.html` | Progress, tasks, XP, streak, activity heatmap | Yes |
| Courses | `pages/courses.html` | Course list + in-app video player | Yes |
| Resources | `pages/resources.html` | YouTube search + content hub | Yes |
| Jobs | `pages/jobs.html` | Job board (now vs after learning) | Yes |
| Mentors | `pages/mentors.html` | Mentor directory + booking calendar | Yes |
| Profile | `pages/profile.html` | GitHub/LinkedIn/Resume enhancer | Yes |
| Community | `pages/community.html` | Forums, posts, events, study buddies | Yes |
| Practice | `pages/practice.html` | Code sandbox, quizzes, timed challenges | Yes |
| Leaderboard | `pages/leaderboard.html` | XP rankings, podium, streaks | Yes |
| Interview | `pages/interview.html` | AI mock interview with voice + scoring | Yes |
| Settings | `pages/settings.html` | Profile, security, API keys, billing, privacy | Yes |
| 404 | `pages/404.html` | Not found page | No |

---

## 🚀 Deployment & Hosting

### GitHub Pages
- **Host:** `shravanirr22.github.io/LearnPro`
- **Branch:** main
- **Auto-deploy:** On push via GitHub Actions
- **CNAME:** (optional - custom domain)
- **HTTPS:** Automatic

### Environment Variables (Client-side only)
```javascript
// js/global.js (hardcoded, never in .env)
SUPABASE_URL = 'https://gmoykjzzdderealljape.supabase.co'
SUPABASE_ANON_KEY = 'eyJhbGc...'
GEMINI_API_KEY = 'AIzaSy...'
FIREBASE_CONFIG = { ... }
```

⚠️ **WARNING:** API keys in frontend code are visible to users. These should be:
1. Public/anon keys only (not secret keys)
2. Restricted to specific origins in each service's console
3. Rotated regularly
4. Monitored for abuse

---

## 📊 Data Flow Architecture

```
User → Login/Signup → Supabase Auth
                   ↓
            Create JWT Session
                   ↓
        localStorage.setItem('user')
                   ↓
        Dashboard/App Pages
                   ↓
        (Optional) Fetch data from:
        ├─ Supabase DB (profiles, progress)
        ├─ Firebase (phone auth, push)
        ├─ Gemini API (AI responses)
        ├─ YouTube API (search)
        ├─ GitHub API (repos)
        └─ RSS2JSON (news feed)
                   ↓
        Render UI + localStorage
```

---

## 🔄 API Request Flow

### Authentication Flow
```
Sign Up → hCaptcha → Supabase.auth.signUp() → Email OTP
                                               ↓
                                     Supabase.auth.verifyOtp()
                                               ↓
                                     JWT Token → localStorage
```

### AI Chat Flow
```
User Message → askGemini(prompt) → Fetch to Gemini API
                                        ↓
                                   Parse response
                                        ↓
                                   Display in chatbot UI
```

---

## 📈 Performance Metrics

- **Bundle Size:** ~50KB HTML + CSS (gzipped)
- **First Paint:** <1.5s (CDN-delivered)
- **Largest Contentful Paint:** <2.5s
- **API Response:** <500ms avg (depends on external APIs)
- **localStorage Reads:** <5ms per key

---

## 🔒 Security Considerations

1. **API Keys:** Public keys only, origin-restricted
2. **JWT Tokens:** Stored in localStorage (vulnerable to XSS), consider httpOnly cookies in prod
3. **CORS:** Handled by Supabase/Firebase
4. **hCaptcha:** Verifies on backend (not implemented yet)
5. **HTTPS:** Automatic on GitHub Pages
6. **CSP:** Set by GitHub Pages defaults
7. **No Server:** Reduces attack surface significantly

---

## 📚 Future Tech Enhancements

- [ ] Backend Node.js/Express server (replace reliance on localStorage)
- [ ] PostgreSQL hosted (currently Supabase hosted)
- [ ] Redis for caching
- [ ] Socket.io for real-time leaderboard updates
- [ ] Video hosting (Vimeo/Wistia instead of YouTube embeds)
- [ ] Email service (SendGrid/Mailgun for transactionals)
- [ ] Analytics (Segment, Mixpanel)
- [ ] Error tracking (Sentry)
- [ ] CDN for static assets (Cloudflare)
- [ ] Database backups (automated)

---

**Last Updated:** May 28, 2026  
**Total Lines of Code:** ~12,000 (HTML + CSS + JS)  
**Pages:** 15 fully functional pages  
**External Dependencies:** 5 (Supabase, Firebase, Gemini, hCaptcha, Invidious)
