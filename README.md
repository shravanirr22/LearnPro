# LearnPro Platform — Complete Website

**Theme:** Red (#B4121B) + Black (#000000)  
**Stack:** Pure HTML, CSS, JavaScript — zero frameworks, zero build tools  
**Open `index.html` directly in your browser to run.**

---

## 📁 File Structure

```
learnpro/
├── index.html                  ← Landing / Home page
├── css/
│   └── global.css              ← All styles, theme variables, components
├── js/
│   └── global.js               ← Utilities, chatbot, navbar, localStorage helpers
└── pages/
    ├── login.html              ← Login (Email + OTP + OAuth + Cloudflare Turnstile)
    ├── signup.html             ← 4-Step Signup with email verification + survey
    ├── onboarding.html         ← Goal visualiser, roadmap, skill gap map
    ├── dashboard.html          ← Personal dashboard (progress, tasks, XP, streak)
    ├── courses.html            ← Courses list + in-page video player
    ├── resources.html          ← Resources hub (YouTube, blogs, Reddit, GitHub)
    ├── jobs.html               ← Jobs board (Now vs After Learning + salary intel)
    ├── mentors.html            ← Mentor directory + booking calendar + Stripe
    ├── profile.html            ← Profile enhancer (GitHub, LinkedIn, resume, Instagram)
    ├── community.html          ← Community forums, posts, events, study buddies
    ├── practice.html           ← Code sandbox + MCQ quiz + timed challenge + leaderboard
    ├── leaderboard.html        ← Weekly XP leaderboard with podium
    ├── interview.html          ← AI mock interview (voice + text + scoring)
    ├── settings.html           ← All settings (profile, security, API keys, billing)
    └── 404.html                ← 404 page
```

---

## 🔑 API Keys — Where to Add Each One

### 1. Claude / Anthropic API Key (AI Chatbot + Interview Feedback)
**File:** `js/global.js` — Line ~45
```js
'x-api-key': 'YOUR_CLAUDE_API_KEY',
```
**Get key:** https://console.anthropic.com  
**Used for:** AI chatbot, mock interview feedback, profile suggestions

---

### 2. Cloudflare Turnstile (CAPTCHA)
**Files:** `pages/login.html` and `pages/signup.html`
```html
<div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="dark"></div>
```
**Get key:** https://dash.cloudflare.com → Turnstile  
**Also add secret key to your backend for server-side verification**

---

### 3. Google OAuth Client ID (Sign in with Google)
**File:** `pages/login.html` — inside `handleGoogleLogin()` function
```js
google.accounts.id.initialize({ client_id: 'YOUR_GOOGLE_CLIENT_ID', callback: handleGoogleCredential });
```
**Get key:** https://console.cloud.google.com → APIs & Services → Credentials  
**Enable:** Google+ API, Google OAuth 2.0

---

### 4. GitHub OAuth Client ID (Sign in with GitHub)
**File:** `pages/login.html` — inside `handleGitHubLogin()` function
```js
window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&scope=user:email';
```
**Get key:** https://github.com/settings/developers → New OAuth App  
**Callback URL:** `http://localhost/pages/dashboard.html` (or your domain)

---

### 5. YouTube Data API v3 (Live video search)
**File:** `pages/resources.html` — inside `fetchYouTube()` function
```js
const res = await fetch(`https://www.googleapis.com/youtube/v3/search?...&key=YOUR_YOUTUBE_API_KEY`);
```
**Get key:** https://console.cloud.google.com → Enable YouTube Data API v3

---

### 6. GitHub Personal Access Token (Profile sync)
**File:** `pages/profile.html` — inside `fetchGitHub()` function
```js
headers: { 'Authorization': 'token YOUR_GITHUB_TOKEN' }
```
**Get token:** https://github.com/settings/tokens → Generate classic token  
**Scopes needed:** `public_repo`, `read:user`

---

### 7. Stripe Publishable Key (Payments)
**File:** `pages/mentors.html` — inside `confirmBooking()` function  
**File:** `pages/settings.html` — inside `upgradePro()` function
```js
const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
stripe.redirectToCheckout({ sessionId: 'cs_live_...' });
```
**Get key:** https://dashboard.stripe.com → Developers → API Keys

---

### 8. Twilio Account SID + Auth Token (SMS OTP)
**File:** Handle on your backend (Node.js) — don't expose in frontend
```
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```
**Get credentials:** https://console.twilio.com

---

### 9. Firebase (OTP + Push Notifications)
**File:** Add Firebase SDK script to `pages/login.html` and `pages/signup.html`
```html
<script src="https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js"></script>
```
```js
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id"
};
```
**Get config:** https://console.firebase.google.com

---

### 10. Google Maps API Key (Events near you)
**File:** Any page where you add the map widget
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_MAPS_API_KEY"></script>
```
**Get key:** https://console.cloud.google.com → Maps JavaScript API

---

### 11. News API (Daily Brief)
**File:** `pages/dashboard.html` — add fetch call
```js
fetch(`https://newsapi.org/v2/top-headlines?q=technology&apiKey=YOUR_NEWS_API_KEY`)
```
**Get key:** https://newsapi.org

---

### 12. LinkedIn API (Profile import + Jobs)
OAuth 2.0 app required. Configure at: https://developer.linkedin.com/apps  
Scopes: `r_liteprofile`, `r_emailaddress`, `w_member_social`

---

### 13. Instagram Graph API (Portfolio posts)
**File:** `pages/profile.html` — `connectInstagram()` function
```js
window.location.href = `https://api.instagram.com/oauth/authorize?client_id=YOUR_INSTAGRAM_APP_ID&redirect_uri=...`;
```
**Get credentials:** https://developers.facebook.com → Create App → Instagram Basic Display

---

## 🚀 Quick Start (No API Keys Needed)

1. Download the `learnpro/` folder
2. Open `index.html` in any browser
3. All pages work in demo mode without API keys
4. Add keys one by one using the guide above to enable live features

---

## 📄 Page Guide

| Page | Route | What it does |
|------|-------|-------------|
| Home | `index.html` | Landing page with hero, features, pricing, testimonials |
| Login | `pages/login.html` | Email + OTP + Google/GitHub/LinkedIn OAuth + Cloudflare Turnstile |
| Sign Up | `pages/signup.html` | 4-step signup with email verification and onboarding survey |
| Onboarding | `pages/onboarding.html` | Goal visualiser, skill gap map, roadmap, job preview |
| Dashboard | `pages/dashboard.html` | Daily tasks, progress ring, streaks, XP, AI nudge |
| Courses | `pages/courses.html` | Course list + built-in YouTube video player + notes |
| Resources | `pages/resources.html` | YouTube search + blog/Reddit/GitHub content hub |
| Jobs | `pages/jobs.html` | Jobs now vs after learning + salary intelligence chart |
| Mentors | `pages/mentors.html` | Mentor directory + calendar booking + Stripe payment |
| Profile | `pages/profile.html` | GitHub/LinkedIn/Instagram enhancer + resume builder |
| Community | `pages/community.html` | Post feed + events + study buddies + leaderboard |
| Practice | `pages/practice.html` | Live code sandbox + MCQ quiz + timed challenge |
| Leaderboard | `pages/leaderboard.html` | Weekly XP rankings with podium |
| Interview | `pages/interview.html` | AI mock interview with voice + text + scoring |
| Settings | `pages/settings.html` | Profile, security, API keys, notifications, billing |

---

## 🔧 Local Storage Keys Used

| Key | Content |
|-----|---------|
| `lp_user` | Logged-in user object (name, email, avatar, targetRole, skills) |
| `lp_savedResources` | Array of saved resource IDs |
| `lp_savedPosts` | Array of saved community post IDs |
| `lp_completedLessons` | Map of completed course lessons |
| `lp_sandboxCode` | Saved code sandbox code |
| `lp_notes-[courseId]-[lessonIdx]` | Per-lesson notes |
| `lp_apikey_*` | API keys entered in Settings |

---

## 🏗️ Production Deployment Checklist

- [ ] Move all API keys to backend environment variables
- [ ] Set up a Node.js/Express backend for auth (OTP, OAuth, JWT)
- [ ] Replace `localStorage` user auth with httpOnly cookie JWT
- [ ] Set up MongoDB Atlas for user profiles, progress, posts
- [ ] Deploy frontend to Vercel: `vercel --prod`
- [ ] Deploy backend to Railway or Render
- [ ] Set up Cloudflare in front of your domain
- [ ] Enable HTTPS (auto via Vercel/Cloudflare)
- [ ] Add Google Analytics or Mixpanel for event tracking
- [ ] Set up Sentry for error monitoring

---

Built with ❤️ for LearnPro · India's #1 Career Launch Platform
