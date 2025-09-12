let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false; // ADDED: flag untuk track musik

// ADDED: Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', function() {
  layers = document.querySelectorAll('.layer');
  audio = document.getElementById('bg-music');

  console.log('DOM loaded, found', layers.length, 'layers');

  // Setup start button
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

  // Initialize age + countdown
  updateUmur();
  updateCountdown();
  setInterval(updateUmur, 1000);
  setInterval(updateCountdown, 1000);

  // CHROME FIX: Setup aggressive music autoplay
  setupChromeAutoplay();
});

function startExperience() {
  console.log('Starting experience...');
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.remove('active');
    splash.classList.add('hidden');
  }
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

// FIXED: Lightbox
function openLightbox(img, caption = "") {
  forceMusicPlay();
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightbox) {
    lightbox.style.display = 'flex';
    lightbox.classList.remove('hidden');
    if (lightboxImg && img.src) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = caption || img.alt || "";
  }
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    lightbox.classList.add('hidden');
  }
}

// ===== Hitung Umur Real-Time =====
function updateUmur() {
  const lahir = new Date("2006-10-29T00:00:00");
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

  document.getElementById("umur").textContent =
    `${tahun} tahun, ${bulan} bulan, ${hari} hari, ${jam} jam, ${menit} menit, ${detik} detik`;
}

// ===== Countdown =====
function updateCountdown() {
  const sekarang = new Date();
  let nextBirthday = new Date(sekarang.getFullYear(), 9, 29, 0, 0, 0);
  if (sekarang > nextBirthday) nextBirthday.setFullYear(sekarang.getFullYear() + 1);
  const sisa = nextBirthday - sekarang;
  const hari = Math.floor(sisa / (1000 * 60 * 60 * 24));
  const jam = Math.floor((sisa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const menit = Math.floor((sisa % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((sisa % (1000 * 60)) / 1000);
  document.getElementById("countdown").textContent =
    `${hari} hari, ${jam} jam, ${menit} menit, ${detik} detik`;
}

// ========== CHROME AUTOPLAY FIXES ==========
function setupChromeAutoplay() {
  if (!audio) return;
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
    playPromise.then(() => musicStarted = true)
      .catch(() => {});
  }
}
function forceMusicPlay() {
  if (!audio) return;
  if (!musicStarted) {
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().then(() => musicStarted = true).catch(() => {});
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

// ========= RAIN EFFECT (sekali jalan) =========
function startRain() {
  const container = document.createElement('div');
  container.classList.add('rain-container');
  document.body.appendChild(container);

  const jumlah = 20; // jumlah partikel gambar
  for (let i = 0; i < jumlah; i++) {
    const drop = document.createElement('img');
    drop.src = "asset/rain.png"; // ganti dengan foto PNG lu
    drop.classList.add('raindrop');
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDelay = (Math.random() * 2) + "s";
    drop.style.width = "50px";
    container.appendChild(drop);
  }

  // Hapus container setelah animasi selesai (10 detik misalnya)
  setTimeout(() => {
    container.remove();
  }, 10000);
}