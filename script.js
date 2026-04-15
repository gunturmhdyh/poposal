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

function initInteractiveButtons() {
  // Mengambil elemen tombol berdasarkan ID dari HTML kamu sebelumnya
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');

  if (btnNo && btnYes) {
    // Saat tombol "No" diklik
    btnNo.addEventListener('click', () => {
      // 1. Ganti teks tombol No
      btnNo.textContent = messages[messageIndex];
      messageIndex = (messageIndex + 1) % messages.length;
      
      // 2. Buat tombol Yes membesar
      const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
      // Membesarkan font 1.5x lipat setiap kali diklik
      btnYes.style.fontSize = `${currentSize * 1.5}px`;
      
      // (Opsional) Membesarkan padding agar tombol makin raksasa secara proporsional
      const currentPadding = parseFloat(window.getComputedStyle(btnYes).paddingTop);
      btnYes.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2.4}px`;
    });

    // Saat tombol "Yes" diklik
    btnYes.addEventListener('click', () => {
      // 1. Ganti dengan nomor WhatsApp kamu (Wajib gunakan format internasional tanpa tanda '+')
      // Contoh: Jika nomormu 08123456789, tulis 628123456789
      const nomorWA = "6285780176128"; 
      
      // 2. Tulis pesan otomatis yang akan masuk ke draft WA-nya
      const pesan = "YAYYYY! I said YES Bebe! Love you too! 💖";
      
      // 3. Menggabungkan nomor dan pesan menjadi tautan WhatsApp yang valid
      // encodeURIComponent berfungsi mengubah spasi dan emoji agar bisa terbaca oleh link internet
      const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
      
      // 4. Membuka WhatsApp di tab baru
      window.open(urlWA, "_blank");
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