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
// 2. LOGIKA MUSIK & LAYAR PEMBUKA
// =========================================
function initMusicAndWelcome() {
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const musicSource = document.getElementById('musicSource');
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const btnStart = document.getElementById('btnStart');
  
  if (musicToggle && bgMusic && musicSource && welcomeScreen && btnStart) {
    musicSource.src = 'forbubu.mp3'; // File musikmu
    bgMusic.load();
    
    btnStart.addEventListener('click', () => {
      bgMusic.play();
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
}

// =========================================
// 3. LOGIKA VIDEO
// =========================================
function initVideo() {
  const video = document.getElementById('introVideo');
  const choiceContainer = document.getElementById('choiceContainer');

  if (video && choiceContainer) {
    video.addEventListener('ended', () => {
      choiceContainer.classList.remove('hidden');
      setTimeout(() => {
        choiceContainer.classList.add('show');
      }, 10);
    });
  }
}

// =========================================
// 4. LOGIKA TOMBOL PILIHAN (YES & NO LUCU)
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
  
  // Nomor WA ditaruh di atas agar bisa dipakai oleh tombol Yes maupun No
  const nomorWA = "6285780176128"; 

  if (btnNo && btnYes) {
    // =========================================
    // JIKA TOMBOL "NO" DIKLIK
    // =========================================
    btnNo.addEventListener('click', () => {
      noClickCount++; // Tambah hitungan

      // CEK: Jika dia sudah menekan "No" tepat 3 kali, langsung buka WA!
      if (noClickCount === 3) {
        const pesanTolak = "no po, i think we just can be friends only :)";
        const urlWATolak = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTolak)}`;
        window.open(urlWATolak, "_blank");
        return; // Hentikan kode di sini agar tombol tidak membesar lagi
      }

      // Jika belum 3 kali, jalankan trik tombol membesar seperti biasa
      btnNo.textContent = messages[messageIndex];
      messageIndex = (messageIndex + 1) % messages.length;
      
      const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
      btnYes.style.fontSize = `${currentSize * 1.5}px`;
      
      const currentPadding = parseFloat(window.getComputedStyle(btnYes).paddingTop);
      btnYes.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2.4}px`;
    });

    // =========================================
    // JIKA TOMBOL "YES" DIKLIK
    // =========================================
    btnYes.addEventListener('click', () => {
      // Pesan utama yang manis
      const pesanTerima = "YAYYYY! I said YES Bebe! Love you too! 💖";
      
      const urlWATerima = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTerima)}`;
      window.open(urlWATerima, "_blank");
    });
  }
}
// =========================================
// 5. JALANKAN SEMUA SAAT HALAMAN DIMUAT
// =========================================
// Semua dipanggil di dalam satu tempat ini agar rapi dan tidak bentrok
document.addEventListener('DOMContentLoaded', () => {
  createFloating();
  initMusicAndWelcome();
  initVideo();
  initInteractiveButtons(); // Memanggil fungsi tombol lucunya
});