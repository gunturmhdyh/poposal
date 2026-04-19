// =========================================
// 1. LOGIKA EMOJI MELAYANG
// =========================================
const emojis = ['❤️','💖','💗','💓','🧸'];

function createFloating() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'float';
    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(el);
  }
}

// =========================================
// 2. LOGIKA MUSIK & WELCOME
// =========================================
function initMusicAndWelcome() {
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const musicSource = document.getElementById('musicSource');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const btnStart = document.getElementById('btnStart');

  if (!musicToggle || !bgMusic || !welcomeScreen || !btnStart || !musicSource) {
    console.warn("Element welcome/music ada yang ga ketemu");
    return;
  }

  musicSource.src = 'forbubu.mp3';
  bgMusic.load();

  btnStart.addEventListener('click', () => {
    bgMusic.play().catch(() => {}); // handle autoplay restriction
    musicToggle.textContent = '🔇 Stop Music';
    welcomeScreen.classList.add('fade-out');
  });

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = '🔇 Stop Music';
    } else {
      bgMusic.pause();
      musicToggle.textContent = '🎵 Play Music';
    }
  });
}

// =========================================
// 3. LOGIKA VIDEO (FIX UTAMA DI SINI)
// =========================================
function initVideoEndHandler() {
  const video = document.getElementById('introVideo');
  const choiceContainer = document.getElementById('choiceContainer');

  if (!video) {
    console.error("Video ga ketemu (id='introVideo')");
    return;
  }

  if (!choiceContainer) {
    console.error("choiceContainer ga ketemu");
    return;
  }

  video.addEventListener('ended', () => {
    console.log("VIDEO SELESAI");
    choiceContainer.classList.remove('hidden');
    setTimeout(() => choiceContainer.classList.add('show'), 50);
  });
}

// =========================================
// 4. LOGIKA TOMBOL
// =========================================
const messages = [
  "Yooo Bubu Really????",
  "Oh c'mon pls pls??",
  "Bubu please...",
  "Think Againnn!!!",
  "If u click this, i will be sad...",
  "Now I'm sad :(( ",
  "I'm very very very sadddd...",
  "Okay im give up...",
  "Just kidding, Bubu c'mon pwissssss! ❤️"
];

let messageIndex = 0;
let noClickCount = 0;

function initInteractiveButtons() {
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const nomorWA = "6285780176128";

  if (!btnNo || !btnYes) {
    console.warn("Button ga ketemu");
    return;
  }

  btnNo.addEventListener('click', () => {
    noClickCount++;

    if (noClickCount === 3) {
      const pesanTolak = "no po, i think we just can be friends only :)";
      const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTolak)}`;
      window.open(url, "_blank");
      return;
    }

    btnNo.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(getComputedStyle(btnYes).fontSize);
    btnYes.style.fontSize = `${currentSize * 1.5}px`;

    const currentPadding = parseFloat(getComputedStyle(btnYes).paddingTop);
    btnYes.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2.4}px`;
  });

  btnYes.addEventListener('click', () => {
    const pesan = "YAYYYY! I said YES Bebe! Love you too! 💖";
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  });
}

// =========================================
// 5. INIT
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  createFloating();
  initMusicAndWelcome();
  initVideoEndHandler(); // <-- DIPISAH, bukan di dalam klik
  initInteractiveButtons();
});