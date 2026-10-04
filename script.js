/* ---------------------------
  script.js (FINAL FIXED with Login)
  Include: login, umur, layer, lightbox, autoplay, rain, random quotes, memory game, dan tombol yes/no
--------------------------- */

let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false;

// NEW: Array untuk menyimpan ID timeout hujan
let rainTimeouts = [];
let rainRunning = false;


// ====== QUOTES DATA (semua kata-kata lo) ======
const quotes = [
"1.Kapan terakhir kali, amel ngerasa jadi diri sendiri dan ngerasa benar-benar bahagia?" , "2.Hal apa yang sampe saat ini belum bisa amel maafkan? Entah itu berupa perlakuan dari orang lain atau diri sendiri", "3.Dalam pandangan amel, bentuk kasih sayang yang paling benar dan yang paling bisa bikin amel seolah ngerasa pulang, itu yang seperti apa?", "4.Jika 20 tahun ini diibaratkan sebuah buku, amel bakal re-read/baca ulang bagian yang mana dan kenapa?" , "5.Hal-hal apa yang suka bikin amel ngerasa bahwa diri amel tuh kurang?", "6.Adakah seseorang yang tanpa ia sadari, dia udah ngerubah hidup amel secara sepenuhnya? Jika ada siapa dan mengapa?", "7.Hal apa yang amel harapkan orang-orang itu mengerti tentang diri amel?" , "8.Apa arti bahagia, sedih, rendah diri, kasih dan juga kecewa dalam pandangan amel?" , "9.Jika 5 Tahun lagi amel baca ulang semua jawaban hari ini, apa yang bakal amel ucapin ke diri amel yang ada hari ini", "10.Adakah hal ataupun ucapan yang masih terpendam dan tidak pernah tersampaikan kepada seseorang, jika ada ke siapa dan apa?" , "11.Apa hal yang selama ini amel takutkan?", "12.Jika dituntut untuk jujur apakah didalam benak paling dalam amel menyimpan dendam ataupun rasa sakit terhadap seseorang? Jika ada siapa dan kenapa?", "13.Jika Tuhan tidak ada dan seluruh keluarga tidak bersisa, siapa orang yang amel kenal dari perjalanan 20 tahun ini yang akan amel hubungi pertama jika amel jatuh ke dalam sebuah masalah dan perlu bantuan seseorang? Dan kenapa orang itu" , "14.Saat di momen marah atau sedih, hal apa yang bisa ngerubah momen itu? Dan cara seperti apa yang amel harapkan orang lakukan untuk bikin amel lebih baik di momen demikian", " 15.Hal ataupun kata paling manis apa yang pernah orang lain lakukan ataupun ucapkan kediri amel?" , "16.Apa definisi hidup bahagia dalam pandangan amel?", "17.Kesalahpahaman apa yg ingin amel rubah dari cara pandang orang-orang tentang diri amel?", "18.Jika amel disuguhkan antara dua pilihan memilih suatu hal yang pasti namun belum tentu membuatmu bahagia tapi pasti tidak akan membuatmu sedih, atau memilih berjudi mencari kebahagiaan namun dengan perjudian sebuah sendu yang akan mencipta derita. Lalu atas alasan apa amel memilih hal tersebut" , "19.Bagaimana pengaruh pengalaman masa kecil hingga kini, dalam menciptakan diri amel yang hari ini", " 20.Last question, you can skip this question, tapi apakah ada hal yang ingin amel sampaikan ke orang yg sudah membuat semua ini? Jika ada masa ketika amel punya kesempatan menyampaikan hal tersebut secara penuh kejujuran lantas hal apa yang akan amel sampaikan ke orang yang sudah menciptakan hal ini?"  
];

// Helper to safely set text
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function() {
  layers = Array.from(document.querySelectorAll('.layer'));
  audio = document.getElementById('bg-music');

  showLayer(0);

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  updateUmur();
  setInterval(updateUmur, 1000);

  setupChromeAutoplay();

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  if (yesBtn) {
      yesBtn.addEventListener("click", function() {
          alert("Iya deh iya, kamu keren gak sedih bahagia gara-gara semua hal inj");
      });
  }

  if (noBtn) {
      function moveNoButton() {
          const container = noBtn.parentElement;
          const containerRect = container.getBoundingClientRect();
          const btnRect = noBtn.getBoundingClientRect();

          const maxX = window.innerWidth - btnRect.width;
          const maxY = window.innerHeight - btnRect.height;

          const randomX = Math.floor(Math.random() * maxX);
          const randomY = Math.floor(Math.random() * maxY);

          noBtn.style.position = 'fixed'; 
          noBtn.style.left = `${randomX}px`;
          noBtn.style.top = `${randomY}px`;
      }

      noBtn.addEventListener("mouseover", moveNoButton);
      noBtn.addEventListener("touchstart", moveNoButton);
  }
});

function handleLogin() {
  const usernameInput = document.getElementById("username").value.toLowerCase();
  const passwordInput = document.getElementById("password").value;
  const loginLayer = document.getElementById("login");

  if (usernameInput === "amelia okta ramadani" && passwordInput === "111026") {
    loginLayer.style.display = 'none'; 
    showLayer(1); 
  } else {
    alert("Username atau password salah!");
  }
}

function startExperience() {
  showLayer(2);
  forceMusicPlay();
}

function showLayer(index) {
  stopRain();

  index = Math.max(0, Math.min(index, layers.length - 1));
  currentLayer = index;

  layers.forEach((layer, i) => {
    if (i === index) {
      layer.style.display = 'flex';
      layer.classList.add('active');
    } else {
      layer.style.display = 'none';
      layer.classList.remove('active');
    }
  });

  window.scrollTo(0, 0);

  if (index === 4) initMemoryGame();
}

function nextLayer() {
  forceMusicPlay();
  if (currentLayer === 0) return;

  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  showLayer(currentLayer);
}

function prevLayer() {
  forceMusicPlay();
  if (currentLayer === 0) return;

  currentLayer = Math.max(currentLayer - 1, 0);
  showLayer(currentLayer);
}

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


function stopRain() {
  rainTimeouts.forEach(id => clearTimeout(id));
  rainTimeouts = [];

  const rainImages = document.querySelectorAll('.raindrop');
  rainImages.forEach(img => {
    img.remove();
  });
  const rainContainer = document.querySelector('.rain-container');
  if (rainContainer) {
    rainContainer.remove();
  }
  rainRunning = false;
}

const RAIN_SRC = 'asset/hujan.png';

function startRain() {
  if (rainRunning) {
    return;
  }
  rainRunning = true;

  const container = document.createElement('div');
  container.className = 'rain-container';
  document.body.appendChild(container);

  const jumlah = 20;
  const maxLife = 7000;

  for (let i = 0; i < jumlah; i++) {
    const timeoutId = setTimeout(() => {
      const img = document.createElement('img');
      img.src = RAIN_SRC;
      img.className = 'raindrop';
      img.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      img.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(img);
    }, i * 160);
    rainTimeouts.push(timeoutId);
  }

  const cleanupTimeout = setTimeout(() => {
    if (container && container.parentNode) {
      container.remove();
    }
    rainRunning = false;
  }, maxLife + jumlah * 200);
  rainTimeouts.push(cleanupTimeout);
}

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

  const cardsData = [
    { name: "amel1", src: "asset/amel1.jpeg" },
    { name: "amel2", src: "asset/amel2.jpeg" },
    { name: "amel3", src: "asset/amel3.jpeg" },
    { name: "amel4", src: "asset/amel4.jpeg" }
  ];

  const cards = [...cardsData, ...cardsData];

  cards.sort(() => Math.random() - 0.5);

  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.name = cardData.name;
    card.innerHTML = `
      <img class="front-face" src="asset/${cardData.name}.jpeg" alt="${cardData.name}">
      <img class="back-face" src="asset/back.jpeg" alt="back">
    `;
    card.addEventListener('click', onMemoryCardClick);
    game.appendChild(card);
  });
}

function onMemoryCardClick(e) {
  const card = e.currentTarget;
  if (memoryLock || card.classList.contains('flip')) return;

  card.classList.add('flip');
  memoryFlipped.push(card);

  if (memoryFlipped.length === 2) {
    checkMemoryMatch();
  }
}

function checkMemoryMatch() {
  const [c1, c2] = memoryFlipped;
  const match = c1.dataset.name === c2.dataset.name;

  if (match) {
    c1.removeEventListener('click', onMemoryCardClick);
    c2.removeEventListener('click', onMemoryCardClick);
    memoryFlipped = [];

    const flippedCards = document.querySelectorAll('.memory-card.flip');
    if (flippedCards.length === document.querySelectorAll('.memory-card').length) {
      document.getElementById("nextBtnLayer4").style.display = "inline-block";
    }
  } else {
    memoryLock = true;
    setTimeout(() => {
      c1.classList.remove('flip');
      c2.classList.remove('flip');
      memoryFlipped = [];
      memoryLock = false;
    }, 1000);
  }
}