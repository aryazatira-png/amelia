/* ---------------------------
  script.js (replace file lama)
  Perbaikan safety + rain effect
--------------------------- */

let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false;

// helper: set text safely (jika elemen ada)
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  layers = document.querySelectorAll('.layer');
  audio = document.getElementById('bg-music');

  console.log('DOM loaded, layers:', layers.length);

  // start button (desktop & touch)
  const btn = document.getElementById('startBtn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      startExperience();
    });
    btn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      startExperience();
    }, {passive: false});
  }

  // Init umur + countdown (safe)
  updateUmur();
  updateCountdown();
  setInterval(updateUmur, 1000);
  setInterval(updateCountdown, 1000);

  // setup autoplay helpers
  setupChromeAutoplay();
});

function startExperience() {
  console.log('Starting experience...');
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.remove('active');
    splash.classList.add('hidden');
  }

  // show layer 1 (jika ada)
  currentLayer = 1;
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }

  forceMusicPlay();
}

function nextLayer() {
  forceMusicPlay();
  if (layers[currentLayer]) {
    layers[currentLayer].classList.remove('active');
    layers[currentLayer].classList.add('hidden');
  }
  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
}

function prevLayer() {
  forceMusicPlay();
  if (layers[currentLayer]) {
    layers[currentLayer].classList.remove('active');
    layers[currentLayer].classList.add('hidden');
  }
  currentLayer = Math.max(currentLayer - 1, 0);
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
}

// Lightbox with caption support
function openLightbox(img, caption = "") {
  forceMusicPlay();
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox) return;
  lightbox.style.display = 'flex';
  lightbox.classList.remove('hidden');

  if (lightboxImg && img && img.src) lightboxImg.src = img.src;
  if (lightboxCaption) lightboxCaption.textContent = caption || (img && img.alt) || "";
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.style.display = 'none';
  lightbox.classList.add('hidden');
}

// ===== Hitung Umur Real-Time =====
function updateUmur() {
  const lahir = new Date("2006-10-29T00:00:00"); // kalau mau ganti, ubah di sini
  const sekarang = new Date();

  let tahun = sekarang.getFullYear() - lahir.getFullYear();
  let bulan = sekarang.getMonth() - lahir.getMonth();
  let hari = sekarang.getDate() - lahir.getDate();
  let jam = sekarang.getHours() - lahir.getHours();
  let menit = sekarang.getMinutes() - lahir.getMinutes();
  let detik = sekarang.getSeconds() - lahir.getSeconds();

  if (detik < 0) { detik += 60; menit--; }
  if (menit < 0) { menit += 60; jam--; }
  if (jam < 0) { jam += 24; hari--; }
  if (hari < 0) {
    const prevMonth = new Date(sekarang.getFullYear(), sekarang.getMonth(), 0);
    hari += prevMonth.getDate();
    bulan--;
  }
  if (bulan < 0) { bulan += 12; tahun--; }

  safeSetText('umur', `${tahun} tahun, ${bulan} bulan, ${hari} hari, ${jam} jam, ${menit} menit, ${detik} detik`);
}

// ===== Countdown (safe) =====
function updateCountdown() {
  const sekarang = new Date();
  let nextBirthday = new Date(sekarang.getFullYear(), 9, 29, 0, 0, 0); // 29 Okt
  if (sekarang > nextBirthday) nextBirthday.setFullYear(sekarang.getFullYear() + 1);

  const sisa = nextBirthday - sekarang;
  const hari = Math.floor(sisa / (1000 * 60 * 60 * 24));
  const jam = Math.floor((sisa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const menit = Math.floor((sisa % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((sisa % (1000 * 60)) / 1000);

  safeSetText('countdown', `${hari} hari, ${jam} jam, ${menit} menit, ${detik} detik`);
}

// ========== CHROME AUTOPLAY FIXES ==========
function setupChromeAutoplay() {
  if (!audio) {
    console.log('Audio element not found, skip autoplay setup');
    return;
  }
  audio.volume = 0.7;
  audio.preload = 'auto';

  const musicTriggers = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
  musicTriggers.forEach(event => {
    document.addEventListener(event, forceMusicPlay, { once: false });
  });

  tryAutoplay();
}

function tryAutoplay() {
  if (!audio || musicStarted) return;
  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => { musicStarted = true; })
      .catch(() => { /* autoplay blocked */ });
  }
}

function forceMusicPlay() {
  if (!audio) return;
  if (!musicStarted) {
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().then(() => { musicStarted = true; })
      .catch(() => { /* blocked */ });
  } else {
    if (audio.paused) audio.play().catch(() => {});
  }
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) forceMusicPlay();
});
window.addEventListener('focus', function() {
  forceMusicPlay();
});

// ========= RAIN EFFECT (safe, re-trigger after finish) =========
/*
  NOTE:
  - Upload file: asset/hujan.png
  - If you named it differently, replace RAIN_SRC below.
*/
const RAIN_SRC = 'asset/hujan.png';
let rainRunning = false;

function startRain() {
  if (rainRunning) {
    console.log('Rain already running - wait until finished');
    return;
  }
  rainRunning = true;
  console.log('🌧 startRain triggered');

  const container = document.createElement('div');
  container.className = 'rain-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const jumlah = 20;
  const maxLife = 7000; // ms, waktu sebelum container dihapus

  for (let i = 0; i < jumlah; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = RAIN_SRC; // ubah jika perlu
      img.className = 'rain-img'; // cocokkan dgn CSS
      img.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      img.style.animationDuration = (2 + Math.random() * 3) + 's';
      img.style.opacity = '0.95';
      img.style.width = '40px';
      container.appendChild(img);

      // pastikan elemen hilang setelah animasi
      setTimeout(() => {
        if (img && img.parentNode) img.remove();
      }, maxLife - 1000);
    }, i * 180);
  }

  // remove container and allow re-trigger setelah animasi selesai
  setTimeout(() => {
    if (container && container.parentNode) container.remove();
    rainRunning = false;
    console.log('🌧 rain finished, can trigger again');
  }, maxLife + jumlah * 200);
}