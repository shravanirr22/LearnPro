/* ============================================================
   LEARNPRO — GLOBAL JS UTILITIES
   ============================================================ */

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
    // typing indicator
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot'; typing.textContent = '…'; typing.id = 'typing';
    messages.appendChild(typing); messages.scrollTop = messages.scrollHeight;

    // ── REPLACE WITH YOUR CLAUDE API KEY ──
    // Anthropic API key: replace 'YOUR_CLAUDE_API_KEY' below
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_CLAUDE_API_KEY',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-opus-4-5',
          max_tokens: 512,
          system: 'You are LearnBot, a friendly AI assistant on LearnPro — a career guidance and ed-tech platform. Help learners with doubts, career advice, skill roadmaps, and motivation. Keep responses concise and encouraging.',
          messages: [{ role: 'user', content: text }]
        })
      });
      const data = await res.json();
      typing.remove();
      addMsg(data?.content?.[0]?.text || 'Sorry, I could not respond right now.');
    } catch {
      typing.remove();
      addMsg('Please add your API key in js/global.js to enable AI chat.');
    }
  };

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
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
