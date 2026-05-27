/* ============================================================
   LEARNPRO — GLOBAL JS UTILITIES
   ============================================================ */

// ── SUPABASE CONFIG ──────────────────────────────────────────
const SUPABASE_URL = 'https://gmoykjzzdderealljape.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtb3lranp6ZGRlcmVhbGxqYXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTE4ODUsImV4cCI6MjA5NTM2Nzg4NX0.EO-Z1ACX9KWJnM6X2i41M4E15aHDTeJEJiQGy7Wz8KU';

// ── GEMINI CONFIG ────────────────────────────────────────────
const GEMINI_API_KEY = 'AIzaSyDh-EZnypHxLNHIIA0jXn3xLxzymrBp0bA';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ── INVIDIOUS CONFIG (YouTube - No Key Needed) ───────────────
const INVIDIOUS_BASE = 'https://inv.nadeko.net';

// ── NAV SCROLL ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE SIDEBAR TOGGLE ────────────────────────────────────
window.toggleSidebar = () => {
  document.querySelector('.sidebar')?.classList.toggle('open');
};

// ── TABS ─────────────────────────────────────────────────────
window.initTabs = (containerSel) => {
  const container = document.querySelector(containerSel);
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`#${target}`)?.classList.add('active');
    });
  });
};

// ── TOAST ────────────────────────────────────────────────────
window.showToast = (message, type = 'success') => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '•'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
};

// ── MODAL ────────────────────────────────────────────────────
window.openModal = (id) => document.getElementById(id)?.classList.add('open');
window.closeModal = (id) => document.getElementById(id)?.classList.remove('open');
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── GEMINI AI CALL ───────────────────────────────────────────
window.askGemini = async (prompt, systemContext = '') => {
  const fullPrompt = systemContext ? `${systemContext}\n\nUser: ${prompt}` : prompt;
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 }
    })
  });
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not respond right now.';
};

// ── CHATBOT ──────────────────────────────────────────────────
window.initChatbot = () => {
  const fab = document.querySelector('.chatbot-fab');
  const panel = document.querySelector('.chatbot-panel');
  const sendBtn = document.querySelector('.chatbot-send');
  const input = document.querySelector('.chatbot-input');
  const messages = document.querySelector('.chatbot-messages');
  if (!fab || !panel) return;

  fab.addEventListener('click', () => panel.classList.toggle('open'));

  const addMsg = (text, isUser = false) => {
    const msg = document.createElement('div');
    msg.className = `msg ${isUser ? 'msg-user' : 'msg-bot'}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  };

  const sendMessage = async () => {
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, true);
    input.value = '';
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot'; typing.textContent = '…'; typing.id = 'typing';
    messages.appendChild(typing); messages.scrollTop = messages.scrollHeight;

    try {
      const reply = await askGemini(text,
        'You are LearnBot, a friendly AI assistant on LearnPro — a career guidance and ed-tech platform. Help learners with doubts, career advice, skill roadmaps, and motivation. Keep responses concise and encouraging.'
      );
      typing.remove();
      addMsg(reply);
    } catch {
      typing.remove();
      addMsg('Something went wrong. Please try again!');
    }
  };

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
};

// ── SUPABASE AUTH HELPERS ────────────────────────────────────
window.supabaseAuth = {
  signInWithGoogle: async () => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${window.location.origin}/pages/dashboard.html`, {
      headers: { 'apikey': SUPABASE_ANON_KEY }
    });
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${window.location.origin}/pages/dashboard.html`;
  },
  signInWithGitHub: async () => {
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=github&redirect_to=${window.location.origin}/pages/dashboard.html`;
  },
  signUp: async (email, password) => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  signIn: async (email, password) => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  getUser: async (accessToken) => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${accessToken}` }
    });
    return res.json();
  },
  sendOTP: async (email) => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email })
    });
    return res.json();
  },
  verifyOTP: async (email, token) => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, token, type: 'email' })
    });
    return res.json();
  }
};

// ── YOUTUBE VIA INVIDIOUS (No API Key) ───────────────────────
window.searchYouTube = async (query) => {
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.io.lol',
    'https://yt.artemislena.eu'
  ];
  for (const base of instances) {
    try {
      const res = await fetch(`${base}/api/v1/search?q=${encodeURIComponent(query)}&type=video&fields=title,videoId,author,lengthSeconds`);
      if (res.ok) {
        const data = await res.json();
        return data.slice(0, 6).map(v => ({
          title: v.title,
          ytId: v.videoId,
          author: v.author,
          duration: Math.floor(v.lengthSeconds / 60) + ' min',
          url: `https://youtube.com/watch?v=${v.videoId}`,
          source: 'youtube',
          cost: 'free',
          diff: 'beginner',
          topic: 'search',
          thumb: '▶️'
        }));
      }
    } catch { continue; }
  }
  return [];
};

// ── INTERSECTION OBSERVER (animate on scroll) ────────────────
window.initScrollAnim = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
};

// ── PROGRESS RING ────────────────────────────────────────────
window.setProgressRing = (svgId, pct) => {
  const circle = document.querySelector(`#${svgId} .ring-fill`);
  if (!circle) return;
  const r = circle.r.baseVal.value;
  const c = 2 * Math.PI * r;
  circle.style.strokeDasharray = `${c}`;
  circle.style.strokeDashoffset = `${c - (c * pct / 100)}`;
};

// ── ACTIVE NAV LINK ──────────────────────────────────────────
window.setActiveNav = () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .sidebar-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path || a.getAttribute('href') === './' + path);
  });
};

// ── SMOOTH COUNTER ───────────────────────────────────────────
window.animateCounter = (el, target, suffix = '', duration = 1800) => {
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// ── LOCAL STORAGE HELPERS ────────────────────────────────────
window.LP = {
  get: (key) => { try { return JSON.parse(localStorage.getItem('lp_' + key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem('lp_' + key, JSON.stringify(val)),
  clear: (key) => localStorage.removeItem('lp_' + key),
  user: () => LP.get('user'),
  isLoggedIn: () => !!LP.get('user'),
  logout: () => { LP.clear('user'); window.location.href = '../index.html'; }
};

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initScrollAnim();
  initChatbot();
});
