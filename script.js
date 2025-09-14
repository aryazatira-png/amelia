/* ---------------------------
  script.js (FINAL FIXED)
  Include: umur, layer, lightbox, autoplay, rain, random quotes, memory game
--------------------------- */

let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false;

// ====== QUOTES DATA ======
const quotes = [ /* ... quotes lu yang panjang itu tetep gua biarin ... */ ];

// Helper to safely set text
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function() {
  layers = Array.from(document.querySelectorAll('.layer'));
  audio = document.getElementById('bg-music');

  showLayer(0); // splash aktif duluan

  const btn = document.getElementById('startBtn');
  if (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); startExperience(); });
    btn.addEventListener('touchstart', function (e) { e.preventDefault(); startExperience(); }, { passive: false });
  }

  updateUmur();
  setInterval(updateUmur, 1000);

  setupChromeAutoplay();
});

// start experience
function startExperience() {
  currentLayer = 1;
  showLayer(currentLayer);
  forceMusicPlay();
}

// show layer
function showLayer(index) {
  index = Math.max(0, Math.min(index, layers.length - 1));
  currentLayer = index;

  layers.forEach((layer, i) => {
    if (i === index) {
      layer.classList.add('active');
      layer.classList.remove('hidden');
    } else {
      layer.classList.remove('active');
      layer.classList.add('hidden');
    }
  });

  window.scrollTo(0, 0);

  // kalau masuk layer 4, mulai memory game
  if (index === 4) initMemoryGame();
}

function nextLayer() {
  forceMusicPlay();
  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  showLayer(currentLayer);
}

function prevLayer() {
  forceMusicPlay();
  currentLayer = Math.max(currentLayer - 1, 0);
  showLayer(currentLayer);
}

// lightbox
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

// umur
function updateUmur() {
  const lahir = new Date("2006-10-11T00:00:00");
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

// audio autoplay
function setupChromeAutoplay() {
  if (!audio) return;
  audio.loop = true;
  audio.volume = 0.7;
  audio.preload = 'auto';

  const triggers = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
  triggers.forEach(ev => document.addEventListener(ev, forceMusicPlay, { once: false }));

  tryAutoplay();
}

function tryAutoplay() {
  if (!audio || musicStarted) return;
  const p = audio.play();
  if (p && typeof p.then === 'function') {
    p.then(() => { musicStarted = true; })
     .catch(() => {});
  }
}

function forceMusicPlay() {
  if (!audio) return;
  if (!musicStarted) {
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().then(() => { musicStarted = true; }).catch(() => {});
  } else {
    if (audio.paused) audio.play().catch(() => {});
  }
}

document.addEventListener('visibilitychange', () => { if (!document.hidden) forceMusicPlay(); });
window.addEventListener('focus', forceMusicPlay);

// rain effect
const RAIN_SRC = 'asset/hujan.png';
let rainRunning = false;

function startRain(event) {
  if (rainRunning) return;
  rainRunning = true;

  const btn = event?.target;
  if (btn) btn.disabled = true;

  const container = document.createElement('div');
  container.className = 'rain-container';
  document.body.appendChild(container);

  const jumlah = 20;
  const maxLife = 7000;

  for (let i = 0; i < jumlah; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = RAIN_SRC;
      img.className = 'raindrop';
      img.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      img.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(img);

      setTimeout(() => { if (img && img.parentNode) img.remove(); }, maxLife - 1000);
    }, i * 160);
  }

  setTimeout(() => {
    if (container && container.parentNode) container.remove();
    rainRunning = false;
  }, maxLife + jumlah * 200);

  // tombol bisa diklik lagi setelah 3 detik
  setTimeout(() => { if (btn) btn.disabled = false; }, 3000);
}

// random quote
function randomQuote() {
  const target = document.getElementById('random-quote') || document.getElementById('random-text');
  if (!target) return;
  const idx = Math.floor(Math.random() * quotes.length);
  target.textContent = quotes[idx];
}

// ========== MEMORY GAME (Layer 4) ==========
let memoryFlipped = [];
let memoryLock = false;

function initMemoryGame() {
  const game = document.getElementById('memory-game');
  if (!game) return;

  game.innerHTML = '';
  const cards = [];
  const totalPairs = 4;

  for (let i = 1; i <= totalPairs; i++) {
    cards.push(`asset/amel${i}.jpeg`);
    cards.push(`asset/amel${i}.jpeg`);
  }

  // shuffle
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(src => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.image = src;
    card.innerHTML = `
      <div class="front"></div>
      <div class="back"><img src="${src}" alt=""></div>
    `;
    card.addEventListener('click', onMemoryCardClick);
    game.appendChild(card);
  });
}

function onMemoryCardClick(e) {
  const card = e.currentTarget;
  if (memoryLock || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  memoryFlipped.push(card);

  if (memoryFlipped.length === 2) {
    checkMemoryMatch();
  }
}

function checkMemoryMatch() {
  const [c1, c2] = memoryFlipped;
  const match = c1.dataset.image === c2.dataset.image;

  if (match) {
    memoryFlipped = [];
  } else {
    memoryLock = true;
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      memoryFlipped = [];
      memoryLock = false;
    }, 1000);
  }
}