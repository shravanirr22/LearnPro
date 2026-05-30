# Nemo Skills - Complete Rebuild Prompt

## 🎯 PROJECT OVERVIEW

**Project Name:** Nemo Skills (Learn-to-Employment EdTech Platform)  
**Status:** New Build from Scratch  
**Base:** LearnPro Architecture (adapted)  
**Framework:** Vanilla HTML5, CSS3, JavaScript (ES6+)  
**Backend:** Firebase only (Authentication + Realtime Database + Storage)  
**Bot Protection:** Google reCAPTCHA v3 only  
**Color Theme:** White (#FFFFFF) & Lavender (#E6E6FA, #D8BFD8, #DDA0DD)  
**Target Launch:** Production Ready  

---

## 📋 DETAILED REQUIREMENTS

### 1. PROJECT STRUCTURE

```
nemo-skills/
├── index.html                    # Landing page
├── pages/
│   ├── login.html               # Login (email, phone, Google OAuth)
│   ├── signup.html              # Signup (4-step wizard)
│   ├── dashboard.html           # Main dashboard
│   ├── onboarding.html          # Goal visualization
│   ├── courses.html             # Courses + video player
│   ├── resources.html           # Resource hub
│   ├── jobs.html                # Job board
│   ├── mentors.html             # Mentor connect
│   ├── profile.html             # User profile
│   ├── community.html           # Community forum
│   ├── practice.html            # Practice arena
│   ├── leaderboard.html         # XP rankings
│   ├── interview.html           # Mock interviews
│   ├── settings.html            # Settings/config
│   └── 404.html                 # Error page
├── css/
│   └── global.css               # Design system (white + lavender theme)
├── js/
│   ├── global.js                # Firebase config + helpers
│   ├── auth.js                  # Authentication logic
│   ├── firestore-db.js          # Firestore database operations
│   ├── recaptcha.js             # reCAPTCHA v3 integration
│   └── utils.js                 # Utility functions
├── firebase-config.js           # Firebase initialization
├── service-worker.js            # Push notifications (Firebase FCM)
├── manifest.json                # PWA manifest
├── .gitignore                   # Git ignore
├── README.md                    # Setup guide
├── ARCHITECTURE.md              # Tech stack documentation
└── SETUP_GUIDE.md              # Implementation steps
```

---

## 🎨 COLOR THEME: WHITE & LAVENDER

Replace all dark theme colors with white/lavender scheme:

### Primary Colors
```css
--primary-lavender:    #DDA0DD    /* Primary lavender (orchid) */
--primary-light:       #E6E6FA    /* Very light lavender */
--primary-dark:        #8B008B    /* Dark purple/violet */
--accent-purple:       #9370DB    /* Medium purple */
--accent-light:        #F0E6FF    /* Almost white lavender */

--white:               #FFFFFF    /* Pure white */
--off-white:           #F8F8F8    /* Off-white background */
--light-gray:          #F5F5F5    /* Light gray background */
--medium-gray:         #D3D3D3    /* Medium gray */
--dark-gray:           #808080    /* Dark gray */
--text-dark:           #333333    /* Dark text */
--text-light:          #666666    /* Light text */
```

### Component Styling
- **Buttons:** White background → Lavender background
- **Cards:** Dark background (#111) → White/off-white background
- **Inputs:** Dark backgrounds → White with lavender border
- **Navbar:** Black background → White with light lavender border
- **Accents:** Red (#B4121B) → Lavender (#DDA0DD)
- **Hover States:** Dark red → Light purple (#F0E6FF)
- **Text:** White text → Dark text (#333333)
- **Shadows:** Dark shadows → Soft lavender shadows

---

## 🔐 FIREBASE SETUP REQUIREMENTS

### Firebase Services Required
1. **Firebase Authentication**
   - Email/Password signup & login
   - Email verification
   - Password reset
   - Google OAuth 2.0
   - Phone authentication (optional)

2. **Cloud Firestore (Database)**
   - User profiles collection
   - Course enrollment collection
   - Progress tracking collection
   - Leaderboard collection
   - Community posts collection
   - Mentor bookings collection
   - Notes/bookmarks collection

3. **Firebase Storage**
   - User profile pictures
   - Resume documents
   - Certificate images
   - Course materials

4. **Firebase Cloud Messaging (FCM)**
   - Push notifications
   - Service Worker integration
   - Background message handling

5. **Firebase Security Rules**
   - User-specific data access
   - Public read access (leaderboard, courses)
   - Admin dashboard protection

### Firebase Configuration File
```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const messaging = firebase.messaging();
```

---

## 🤖 GOOGLE reCAPTCHA v3 INTEGRATION

### Implementation Details
- **Site Key:** [User to provide]
- **Secret Key:** [Server-side only, for verification]
- **Integration Points:**
  - Login form (password login)
  - Signup form (email/password signup)
  - Phone OTP request (optional)
  - Contact/feedback form

### Client-Side (JavaScript)
```javascript
// Load reCAPTCHA v3 script
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

// Execute on form submission
grecaptcha.ready(function() {
  grecaptcha.execute('YOUR_SITE_KEY', {action: 'LOGIN'}).then(function(token) {
    // Send token with form data to backend
    document.getElementById('recaptcha_token').value = token;
  });
});
```

### Server-Side Verification (Backend)
```javascript
// Node.js example (Future Backend)
const axios = require('axios');

async function verifyRecaptcha(token, action) {
  const response = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token
      }
    }
  );
  
  const { success, score } = response.data;
  // Score: 1.0 = likely human, 0.0 = likely bot
  return success && score > 0.5;
}
```

---

## 📄 PAGE SPECIFICATIONS

### 1. Landing Page (index.html)
- **Hero Section:** "Learn. Grow. Succeed." with white BG + lavender accents
- **Features Grid:** 6 key features (grid layout)
- **How It Works:** 5-step process with lavender backgrounds
- **Testimonials:** 3 user testimonials
- **Pricing:** Free / Pro ₹499 / Teams ₹299
- **CTA Footer:** Email capture with lavender buttons
- **Navbar:** White background, lavender text/accents

### 2. Login Page (pages/login.html)
**3 Tabs:**
- **Email/Password:** 
  - Email input + password input
  - Show/hide password toggle
  - reCAPTCHA v3 (invisible)
  - "Forgot Password?" link
  - Google OAuth button
  - Error/success messages

- **Email OTP:**
  - Email input
  - Send OTP button
  - 6-digit OTP input boxes
  - Auto-advance on digit entry
  - Countdown timer (10:00)
  - Resend link

- **Phone OTP:**
  - Country dial code selector
  - Phone number input
  - Send OTP button
  - 6-digit OTP input
  - Countdown timer
  - Firebase phone authentication

**Firebase Functions Needed:**
```javascript
// Sign in with email/password
firebase.auth().signInWithEmailAndPassword(email, password)

// Send email OTP
firebase.auth().signInWithEmailLink(email, url)

// Sign in with phone
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)

// Sign in with Google
firebase.auth().signInWithPopup(googleProvider)
```

### 3. Signup Page (pages/signup.html)
**4-Step Wizard:**

**Step 1: Account Creation**
- First Name + Last Name inputs
- Email input
- Password input + strength meter
- Confirm password input
- Terms checkbox
- reCAPTCHA v3 (invisible)
- OAuth buttons (Google, GitHub)

**Step 2: Email Verification**
- Send OTP to registered email
- 6-digit OTP input
- Countdown timer
- Resend OTP link

**Step 3: Profile Setup**
- Current status (Student/Working/Freelancer/Job Seeker)
- Target role dropdown (50+ roles)
- Current skills multi-select
- Daily time available (dropdown)

**Step 4: Goal Setting**
- Timeline (3/6/12 months or Flexible)
- Learning style (Video/Reading/Project/Mixed)
- City/Location input
- "Launch My Roadmap" button

**Firebase Functions:**
```javascript
// Create user account
firebase.auth().createUserWithEmailAndPassword(email, password)

// Send verification email
firebase.auth().currentUser.sendEmailVerification()

// Update user profile
firebase.auth().currentUser.updateProfile({
  displayName: fullName,
  photoURL: avatarURL
})

// Create user document in Firestore
db.collection('users').doc(uid).set({
  name: fullName,
  email: email,
  role: selectedRole,
  targetRole: targetRole,
  timeline: timeline,
  // ... other fields
})
```

### 4. Dashboard (pages/dashboard.html)
- **Welcome Card:** "Welcome back, [Name]"
- **AI Nudge:** Daily motivation (Firestore-driven, static for now)
- **Progress Ring:** Job-readiness % (animated SVG)
- **Daily Tasks:** 5 tasks with XP rewards
- **Streak Counter:** Days without break
- **Skill Progress Bars:** 5 skills with progress
- **Activity Heatmap:** Last 12 weeks activity
- **Active Courses:** Currently enrolled courses
- **Sidebar Navigation:** 15 links to all pages
- **Mobile Menu:** Hamburger menu

**Firebase Collections:**
```javascript
// Get user data
db.collection('users').doc(uid).get()

// Get user's courses
db.collection('users').doc(uid).collection('courses').get()

// Get daily tasks
db.collection('users').doc(uid).collection('tasks').where('date', '==', today).get()

// Update streak
db.collection('users').doc(uid).update({
  streakCount: increment(1),
  lastActiveDate: today
})
```

### 5. Courses (pages/courses.html)
- **Course Grid:** 12+ courses in responsive grid
- **Course Card:** Title, instructor, rating, enrolled count
- **Course Detail Panel:** 
  - Video player (YouTube embed or custom)
  - Lesson list (sidebar)
  - Quiz section
  - Notes input (localStorage)
  - Mark Lesson Done (+30 XP)
  - Progress tracking

**Firebase:**
```javascript
// Fetch courses
db.collection('courses').get()

// Enroll in course
db.collection('users').doc(uid).collection('courses').doc(courseId).set({
  enrolledDate: today,
  progress: 0,
  completedLessons: []
})

// Save notes (Firestore)
db.collection('users').doc(uid).collection('notes').doc(noteId).set({
  courseId: courseId,
  lessonId: lessonId,
  content: noteContent,
  createdAt: timestamp
})
```

### 6. Resources (pages/resources.html)
- **Search Bar:** Search resources by keyword
- **Filter Tabs:** YouTube, Articles, Docs, Podcasts
- **Resource Grid:** Responsive grid of resource cards
- **Bookmark System:** Save/unsave resources (Firestore)
- **Resource Card:** Thumbnail, title, source, duration, rating

**Firebase:**
```javascript
// Save bookmarks to Firestore
db.collection('users').doc(uid).collection('savedResources').doc(resourceId).set({
  resourceId: resourceId,
  title: title,
  url: url,
  savedDate: timestamp
})

// Fetch user's bookmarks
db.collection('users').doc(uid).collection('savedResources').get()
```

### 7. Jobs (pages/jobs.html)
- **Dual Tabs:** "NOW" vs "AFTER LEARNING"
- **Job Grid:** Job cards with salary, company, location
- **Salary Chart:** Bar chart showing salary ranges
- **Skill Match Meter:** Red/Yellow/Green indicator
- **Job Detail Panel:** Full job description, apply button
- **Filter Options:** Role, location, salary range

**Firebase:**
```javascript
// Fetch job listings
db.collection('jobs').where('status', '==', 'active').get()

// Save job match preference
db.collection('users').doc(uid).update({
  savedJobs: arrayUnion(jobId)
})
```

### 8. Mentors (pages/mentors.html)
- **Mentor Cards:** 8+ mentors with photo, name, expertise
- **Rating Display:** Star rating (1-5)
- **Expertise Badges:** Skills/languages (React, Python, etc.)
- **Booking Modal:** 3-step calendar (date → time → confirm)
- **Availability Calendar:** Green = available, Gray = booked
- **Book Session Button:** Opens booking modal

**Firebase:**
```javascript
// Fetch mentors
db.collection('mentors').get()

// Create booking
db.collection('bookings').add({
  userId: uid,
  mentorId: mentorId,
  date: selectedDate,
  time: selectedTime,
  status: 'pending',
  createdAt: timestamp
})

// Get mentor availability
db.collection('mentors').doc(mentorId).collection('availability').get()
```

### 9. Profile (pages/profile.html)
- **Profile Header:** Avatar, name, email, title
- **GitHub Sync:** "Connect GitHub" button → Display repos
- **LinkedIn AI Features:**
  - AI Headline Generator button (static for now)
  - AI About Section writer (static)
- **Resume Builder:** Form to create ATS-optimized resume
- **Download Resume:** PDF export button

**Firebase:**
```javascript
// Update user profile
db.collection('users').doc(uid).update({
  name: name,
  title: title,
  bio: bio,
  avatar: avatarURL
})

// Save resume to Firestore
db.collection('users').doc(uid).collection('documents').doc('resume').set({
  content: resumeContent,
  format: 'pdf',
  createdAt: timestamp
})
```

### 10. Community (pages/community.html)
- **Post Feed:** User posts with likes/comments
- **Write Post Modal:** Create new post
- **Channel Chips:** Filter by channel (Questions, Resources, Events)
- **Trending Tags:** Popular tags section
- **Study Buddies:** Online users list
- **Upcoming Events:** Event cards

**Firebase:**
```javascript
// Create post
db.collection('posts').add({
  userId: uid,
  content: postContent,
  channel: selectedChannel,
  likes: [],
  comments: [],
  createdAt: timestamp
})

// Like post
db.collection('posts').doc(postId).update({
  likes: arrayUnion(uid)
})

// Add comment
db.collection('posts').doc(postId).collection('comments').add({
  userId: uid,
  content: commentContent,
  createdAt: timestamp
})
```

### 11. Practice Arena (pages/practice.html)
- **Code Editor:** HTML/CSS/JavaScript input
- **Live Preview:** Real-time iframe preview
- **MCQ Quiz:** 10 questions per practice session
- **XP Rewards:** Points for correct answers
- **Timed Challenge:** 5-minute challenges
- **Code Snippets:** Library of saved code (localStorage)

**Firebase:**
```javascript
// Save code snippet
db.collection('users').doc(uid).collection('snippets').add({
  title: snippetTitle,
  code: codeContent,
  language: language,
  createdAt: timestamp
})

// Submit quiz response
db.collection('users').doc(uid).collection('quizzes').add({
  quizId: quizId,
  answers: answersArray,
  score: calculatedScore,
  completedAt: timestamp
})
```

### 12. Leaderboard (pages/leaderboard.html)
- **Podium:** Top 3 users (🥇🥈🥉)
- **XP Table:** Ranking table with XP scores
- **Track Filter:** Weekly/Monthly/All-time dropdown
- **User Position:** Highlight current user's rank
- **Gap Indicator:** Points to Top 20

**Firebase:**
```javascript
// Fetch top 10 leaderboard
db.collection('leaderboard').orderBy('xp', 'desc').limit(10).get()

// Update user XP
db.collection('users').doc(uid).update({
  xp: increment(xpEarned),
  level: calculateLevel(newXP)
})
```

### 13. Mock Interview (pages/interview.html)
- **Mode Selection:** HR / Technical
- **Voice Input:** Web Speech API (recording questions)
- **Live Transcript:** Real-time speech-to-text display
- **Question Generator:** Static questions for MVP
- **Feedback Display:** Interview summary & feedback
- **Scoring:** 4 metrics (0-25 points each)

**Firebase:**
```javascript
// Save interview attempt
db.collection('users').doc(uid).collection('interviews').add({
  mode: interviewMode,
  questions: questionsAsked,
  answers: userAnswers,
  scores: {
    technicalKnowledge: score1,
    communication: score2,
    confidence: score3,
    problemSolving: score4
  },
  completedAt: timestamp
})
```

### 14. Settings (pages/settings.html)
**8 Sections:**
1. **Profile** — Name, email, avatar, location
2. **Account & Security** — Password change, 2FA
3. **Notifications** — Email/push/SMS toggles
4. **API Keys** — View Firebase config status
5. **Learning Preferences** — Pace, difficulty, interests
6. **Appearance** — Theme (light/dark), font size
7. **Billing** — Subscription status
8. **Privacy & Data** — GDPR export, delete account

**Firebase:**
```javascript
// Update user preferences
db.collection('users').doc(uid).update({
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    language: 'en'
  }
})

// Download user data (GDPR)
const userData = await db.collection('users').doc(uid).get()
const allData = { user: userData.data(), /* ... other collections */ }
// Export as JSON
```

### 15. 404 Page (pages/404.html)
- Animated 404 design (lavender accents)
- Funny copy about page not found
- "Home" button CTA
- Responsive design

---

## 🔐 AUTHENTICATION IMPLEMENTATION

### Email/Password Authentication
```javascript
// Sign Up
async function signUp(email, password, fullName) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    
    // Send email verification
    await userCredential.user.sendEmailVerification();
    
    // Create user document in Firestore
    await db.collection('users').doc(uid).set({
      email: email,
      fullName: fullName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      avatar: generateAvatar(fullName[0]),
      xp: 0,
      streak: 0
    });
    
    return { success: true, message: 'Account created. Please verify email.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Sign In
async function signIn(email, password, recaptchaToken) {
  try {
    // Verify reCAPTCHA (in real app, verify on backend)
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

### Email OTP
```javascript
// Send OTP (Email Link Sign-in)
async function sendEmailOTP(email) {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/pages/dashboard.html`,
      handleCodeInApp: true
    };
    
    await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    return { success: true, message: 'OTP sent to email' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Verify OTP Link
async function verifyEmailOTPLink() {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    try {
      const userCredential = await firebase.auth().signInWithEmailLink(email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
```

### Phone OTP
```javascript
// Initialize phone authentication
let confirmationResult;

async function sendPhoneOTP(phoneNumber) {
  try {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
    return { success: true, message: 'OTP sent to phone' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Verify phone OTP
async function verifyPhoneOTP(code) {
  try {
    const userCredential = await confirmationResult.confirm(code);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: 'Invalid OTP' };
  }
}
```

### Google OAuth
```javascript
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    
    // Create user document if new user
    const userDoc = await db.collection('users').doc(userCredential.user.uid).get();
    if (!userDoc.exists) {
      await db.collection('users').doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        fullName: userCredential.user.displayName,
        avatar: userCredential.user.photoURL,
        googleId: userCredential.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        xp: 0,
        streak: 0
      });
    }
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

---

## 💾 FIRESTORE DATABASE SCHEMA

### Collections Structure

```javascript
// users/
{
  uid: "string",
  email: "string",
  fullName: "string",
  avatar: "string (URL)",
  bio: "string",
  location: "string",
  role: "student|working|freelancer|jobseeker",
  targetRole: "string",
  timeline: "3|6|12|flexible",
  xp: "number",
  level: "number",
  streak: "number",
  createdAt: "timestamp",
  updatedAt: "timestamp",
  preferences: {
    emailNotifications: "boolean",
    pushNotifications: "boolean",
    theme: "light|dark",
    language: "en"
  }
}

// users/{uid}/courses/
{
  courseId: "string",
  enrolledDate: "timestamp",
  progress: "number (0-100)",
  completedLessons: ["lesson1", "lesson2"]
}

// users/{uid}/notes/
{
  courseId: "string",
  lessonId: "string",
  content: "string",
  createdAt: "timestamp"
}

// users/{uid}/savedResources/
{
  resourceId: "string",
  title: "string",
  url: "string",
  savedDate: "timestamp"
}

// users/{uid}/interviews/
{
  mode: "hr|technical",
  questions: ["q1", "q2"],
  answers: ["a1", "a2"],
  scores: {
    technicalKnowledge: "number",
    communication: "number",
    confidence: "number",
    problemSolving: "number"
  },
  totalScore: "number",
  completedAt: "timestamp"
}

// courses/
{
  courseId: "string",
  title: "string",
  instructor: "string",
  description: "string",
  level: "beginner|intermediate|advanced",
  duration: "number (hours)",
  rating: "number (0-5)",
  enrolled: "number",
  lessons: ["lesson1", "lesson2"],
  thumbnail: "string (URL)"
}

// jobs/
{
  jobId: "string",
  title: "string",
  company: "string",
  location: "string",
  salary: { min: "number", max: "number" },
  description: "string",
  requiredSkills: ["skill1", "skill2"],
  postedDate: "timestamp",
  status: "active|closed"
}

// mentors/
{
  mentorId: "string",
  name: "string",
  expertise: ["skill1", "skill2"],
  rating: "number (0-5)",
  bio: "string",
  avatar: "string (URL)"
}

// posts/
{
  postId: "string",
  userId: "string",
  content: "string",
  channel: "questions|resources|events",
  likes: ["uid1", "uid2"],
  createdAt: "timestamp"
}

// leaderboard/
{
  userId: "string",
  name: "string",
  xp: "number",
  level: "number",
  avatar: "string (URL)",
  rank: "number"
}
```

---

## 🎨 CSS THEME IMPLEMENTATION

### White & Lavender Design System

```css
/* Root Variables - White & Lavender Theme */
:root {
  /* Primary Colors */
  --primary-lavender: #DDA0DD;      /* Orchid/Primary */
  --primary-light: #E6E6FA;         /* Very Light Lavender */
  --primary-dark: #8B008B;          /* Dark Purple */
  --accent-purple: #9370DB;         /* Medium Purple */
  --accent-light: #F0E6FF;          /* Almost white lavender */
  
  /* Backgrounds */
  --white: #FFFFFF;
  --off-white: #F8F8F8;
  --light-gray: #F5F5F5;
  --bg-subtle: #FAF8FC;             /* Very subtle lavender tint */
  
  /* Grays */
  --medium-gray: #D3D3D3;
  --dark-gray: #808080;
  --border-gray: #E0E0E0;
  
  /* Text */
  --text-dark: #333333;
  --text-light: #666666;
  --text-lighter: #999999;
  
  /* Functional Colors */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(221, 160, 221, 0.1);
  --shadow-md: 0 4px 8px rgba(221, 160, 221, 0.15);
  --shadow-lg: 0 8px 16px rgba(221, 160, 221, 0.2);
  --shadow-xl: 0 12px 24px rgba(221, 160, 221, 0.25);
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 99px;
  
  /* Typography */
  --font-display: 'Bebas Neue', sans-serif;
  --font-heading: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;
  
  /* Transitions */
  --transition: all 0.2s ease;
  --transition-slow: all 0.3s ease;
}

/* Body & Global */
body {
  background: var(--white);
  color: var(--text-dark);
  font-family: var(--font-body);
  line-height: 1.6;
}

/* Buttons */
.btn {
  background: var(--primary-lavender);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}

.btn:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--primary-lavender);
  border: 2px solid var(--primary-lavender);
}

.btn-outline:hover {
  background: var(--accent-light);
  border-color: var(--primary-dark);
}

/* Cards */
.card {
  background: var(--white);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-lavender);
}

/* Inputs */
.input {
  background: var(--off-white);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  font-family: var(--font-body);
  color: var(--text-dark);
  transition: var(--transition);
}

.input:focus {
  outline: none;
  border-color: var(--primary-lavender);
  box-shadow: 0 0 0 3px var(--accent-light);
  background: var(--white);
}

/* Navbar */
.navbar {
  background: var(--white);
  border-bottom: 1px solid var(--border-gray);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
}

.navbar-brand {
  color: var(--primary-dark);
  font-family: var(--font-display);
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: 700;
}

.navbar-brand span {
  color: var(--primary-lavender);
}

/* Badge */
.badge {
  background: var(--accent-light);
  color: var(--primary-dark);
  border-radius: var(--radius-full);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.8rem;
  font-weight: 700;
}

.badge-lavender {
  background: var(--primary-lavender);
  color: var(--white);
}

/* Progress Bar */
.progress {
  background: var(--light-gray);
  border-radius: var(--radius-full);
  height: 8px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, var(--primary-lavender), var(--accent-purple));
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

/* Modal */
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-xl);
}

/* Forms */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-sm);
  display: block;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--accent-light);
  }
  50% {
    box-shadow: 0 0 0 10px transparent;
  }
}

/* Utility Classes */
.text-lavender { color: var(--primary-lavender); }
.text-dark { color: var(--text-dark); }
.text-light { color: var(--text-light); }
.bg-light { background: var(--off-white); }
.bg-subtle { background: var(--accent-light); }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.rounded { border-radius: var(--radius-md); }
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
/* Default: Mobile (<640px) */

/* Tablet */
@media (min-width: 640px) {
  /* 640px and up */
}

@media (min-width: 768px) {
  /* 768px and up */
}

@media (min-width: 1024px) {
  /* 1024px and up (Desktop) */
}

@media (min-width: 1280px) {
  /* 1280px and up (Large Desktop) */
}
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### Phase 1: Setup (Week 1)
- [ ] Create Firebase project (nemo-skills)
- [ ] Enable Firebase Authentication (Email, Phone, Google OAuth)
- [ ] Create Firestore database with collections
- [ ] Set up Firebase Storage bucket
- [ ] Configure Firebase Security Rules
- [ ] Register reCAPTCHA v3 keys
- [ ] Initialize GitHub repository
- [ ] Create project structure

### Phase 2: Authentication (Week 2)
- [ ] Implement email/password signup & login
- [ ] Implement email OTP flow
- [ ] Implement phone OTP flow
- [ ] Integrate Google OAuth
- [ ] Integrate reCAPTCHA v3 on forms
- [ ] Password reset functionality
- [ ] Session management (localStorage + JWT)
- [ ] Auto-redirect based on auth state

### Phase 3: Core Pages (Week 3-4)
- [ ] Landing page
- [ ] Dashboard
- [ ] Courses page
- [ ] Resources page
- [ ] Jobs page
- [ ] Mentors page
- [ ] Profile page
- [ ] Settings page

### Phase 4: Advanced Pages (Week 5)
- [ ] Community page
- [ ] Practice Arena
- [ ] Leaderboard
- [ ] Mock Interview
- [ ] Onboarding page
- [ ] 404 page

### Phase 5: Database Integration (Week 6)
- [ ] Connect all pages to Firestore
- [ ] Implement CRUD operations
- [ ] Real-time data updates
- [ ] User progress tracking
- [ ] Leaderboard calculations

### Phase 6: Styling & Polish (Week 7)
- [ ] Apply white & lavender theme
- [ ] Responsive design testing
- [ ] Animation polishing
- [ ] Cross-browser testing
- [ ] Performance optimization

### Phase 7: Deployment (Week 8)
- [ ] Firebase Hosting setup
- [ ] Domain configuration
- [ ] SSL/HTTPS verification
- [ ] Production Firebase config
- [ ] Monitoring & analytics setup
- [ ] Launch!

---

## 📚 TECHNOLOGY STACK

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Auth** | Firebase Authentication |
| **Database** | Cloud Firestore |
| **Storage** | Firebase Storage |
| **Notifications** | Firebase Cloud Messaging |
| **Bot Protection** | Google reCAPTCHA v3 |
| **Hosting** | Firebase Hosting |
| **Version Control** | Git + GitHub |
| **Build Tool** | None (Static files) |
| **Package Manager** | None (CDN imports) |

---

## 🔗 EXTERNAL CDN LINKS

```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"></script>

<!-- reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700&family=Bebas+Neue&display=swap" rel="stylesheet">
```

---

## 📋 KEY DIFFERENCES FROM LEARNPRO

| Feature | LearnPro (Old) | Nemo Skills (New) |
|---------|---|---|
| **Theme** | Black & Red | White & Lavender |
| **Name** | LearnPro | Nemo Skills |
| **Auth** | Supabase | Firebase only |
| **Database** | Supabase | Cloud Firestore |
| **Bot Protection** | hCaptcha | reCAPTCHA v3 only |
| **AI** | Gemini API | (To be added) |
| **Payments** | Razorpay | (Future) |
| **Framework** | Vanilla JS | Vanilla JS ✓ |

---

## 🎯 SUCCESS CRITERIA

- ✅ All 15 pages fully functional
- ✅ Authentication working (4 methods: email, OTP, phone, Google)
- ✅ Firebase Firestore CRUD operations working
- ✅ White & Lavender theme applied throughout
- ✅ reCAPTCHA v3 integrated on forms
- ✅ Mobile responsive (works on all devices)
- ✅ Push notifications (Firebase FCM) working
- ✅ Production-ready code quality
- ✅ Deployed on Firebase Hosting
- ✅ All documentation complete

---

**This prompt is ready for development. Start with Phase 1 setup and follow the checklist sequentially.**
