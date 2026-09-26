// 1. Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyCmceoAJeThpx5EA3L8HIlPs0hgq2ufADg",
  authDomain: "bharat-roots-app.firebaseapp.com",
  projectId: "bharat-roots-app",
  storageBucket: "bharat-roots-app.firebasestorage.app",
  messagingSenderId: "316351733052",
  appId: "1:316351733052:web:1445e02173265ebae75239"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
let currentUser = null;

// Auth Modal Mode State
let isSignInMode = true;

// Typewriter Quote Strings
const quotes = {
  signin: "Revisit ancient architectures and living traditions.",
  signup: "Create an account. A new chapter of Indian exploration awaits."
};

// 2. Auth State Observer (Controls Header Pill & Access)
auth.onAuthStateChanged((user) => {
  currentUser = user;
  const openAuthBtn = document.getElementById("open-auth-btn");
  const userPill = document.getElementById("user-pill");
  const userEmailSpan = document.getElementById("user-display-email");

  if (user) {
    if (openAuthBtn) openAuthBtn.style.display = "none";
    if (userPill) userPill.style.display = "flex";
    if (userEmailSpan) {
      userEmailSpan.textContent = user.displayName || user.email.split("@")[0];
    }
    closeAuthModal();
  } else {
    if (openAuthBtn) openAuthBtn.style.display = "inline-block";
    if (userPill) userPill.style.display = "none";
  }
});

// Modal Dialog Controls
function openAuthModal() {
  const modal = document.getElementById("auth-modal");
  const backdrop = document.getElementById("auth-modal-backdrop");
  if (modal && backdrop) {
    modal.classList.add("active");
    backdrop.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    startTypewriter(isSignInMode ? quotes.signin : quotes.signup);
  }
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  const backdrop = document.getElementById("auth-modal-backdrop");
  if (modal && backdrop) {
    modal.classList.remove("active");
    backdrop.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

// Typewriter Text Effect Logic
let typewriterTimeout = null;
function startTypewriter(text) {
  const target = document.getElementById("auth-typewriter-target");
  if (!target) return;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  target.textContent = "";
  let idx = 0;
  function step() {
    if (idx < text.length) {
      target.textContent += text[idx];
      idx++;
      typewriterTimeout = setTimeout(step, 45);
    }
  }
  step();
}

// 3. Event Listeners Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Floating AI Chat FAB Button triggers existing Gemini Cultural Sage Drawer
  document.getElementById("floating-ai-trigger")?.addEventListener("click", () => {
    if (typeof openGeminiDrawer === "function") {
      openGeminiDrawer();
    }
  });

  // Modal Open & Close Event Triggers
  document.getElementById("open-auth-btn")?.addEventListener("click", openAuthModal);
  document.getElementById("auth-close-btn")?.addEventListener("click", closeAuthModal);
  document.getElementById("auth-modal-backdrop")?.addEventListener("click", closeAuthModal);

  // Password visibility eye toggle
  const pwdInput = document.getElementById("auth-password");
  const pwdToggle = document.getElementById("toggle-pwd-btn");
  pwdToggle?.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      pwdToggle.textContent = "🙈";
    } else {
      pwdInput.type = "password";
      pwdToggle.textContent = "👁️";
    }
  });

  // Switch between Sign In / Sign Up Views
  const switchBtn = document.getElementById("auth-switch-btn");
  const switchLabel = document.getElementById("auth-switch-label");
  const authTitle = document.getElementById("auth-title");
  const authSubtitle = document.getElementById("auth-subtitle");
  const authSubmit = document.getElementById("auth-submit-btn");
  const nameGroup = document.getElementById("signup-name-group");

  switchBtn?.addEventListener("click", () => {
    isSignInMode = !isSignInMode;
    if (isSignInMode) {
      authTitle.textContent = "Sign in to your account";
      authSubtitle.textContent = "Enter your email below to access your heritage trails";
      authSubmit.textContent = "Sign In";
      switchLabel.textContent = "Don't have an account?";
      switchBtn.textContent = "Sign up";
      if (nameGroup) nameGroup.style.display = "none";
      startTypewriter(quotes.signin);
    } else {
      authTitle.textContent = "Create an account";
      authSubtitle.textContent = "Enter your details below to begin your trail";
      authSubmit.textContent = "Sign Up";
      switchLabel.textContent = "Already have an account?";
      switchBtn.textContent = "Sign in";
      if (nameGroup) nameGroup.style.display = "flex";
      startTypewriter(quotes.signup);
    }
  });

  // Form Submit: Firebase Email/Password Auth
  document.getElementById("auth-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const pass = document.getElementById("auth-password").value.trim();
    const name = document.getElementById("auth-name")?.value.trim();

    if (!email || !pass) return alert("Email aur Password dono bhariye.");

    try {
      if (isSignInMode) {
        await auth.signInWithEmailAndPassword(email, pass);
      } else {
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        if (name && cred.user) {
          await cred.user.updateProfile({ displayName: name });
        }
        await db.collection("users").doc(cred.user.uid).set({
          name: name || "Heritage Explorer",
          email: email,
          joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    } catch (err) {
      alert("Auth Error: " + err.message);
    }
  });

  // Google Popup Authentication
  document.getElementById("google-auth-btn")?.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const res = await auth.signInWithPopup(provider);
      if (res.user) {
        await db.collection("users").doc(res.user.uid).set({
          name: res.user.displayName || "Heritage Explorer",
          email: res.user.email,
          lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    } catch (err) {
      alert("Google Sign-In Error: " + err.message);
    }
  });

  // Logout Trigger
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    auth.signOut();
  });
});