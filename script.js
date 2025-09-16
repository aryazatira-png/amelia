/* ---------------------------
  script.js (FULL REWRITE)
  Include: login, umur, layer, lightbox, autoplay, rain, quotes, memory game, question layer
  Paste replace file lama dengan ini (full file)
--------------------------- */

"use strict";

let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false;

// ====== QUOTES DATA (full list copied as requested) ======
const quotes = [
  "MANEH NU BADMOOD kenapa sekitar yang lu diemin?",
  "Rek kitu wae?",
  "Ulah sok ijut, asbun mah asbun we",
  "Kamu punya kekuatan buat ngelewatin semua hari berat, jangan pernah ngeremehin diri sendiri.",
  "Cantikmu bukan cuma di luar, tapi juga dari cara kamu mikir",
  "Jangan lupa, kamu tuh punya nilai yang nggak bisa digantiin sama siapa pun.",
  "Kamu itu berharga, bahkan di hari-hari ketika kamu ngerasa biasa aja.",
  "mama teacher papah engineer OR mama teacher papah lawyer? 🤪",
  "fakultas boleh red flag tapi sifatku mah green flag",
  "Jangan pernah berhenti percaya sama diri kamu sendiri, karena banyak orang percaya sama kamu.",
  "Kamu cantik dengan caramu sendiri, nggak perlu ngebandingin diri sama siapa pun.",
  "Kamu punya aura yang bikin orang lain betah ada di deketmu.",
  "Jangan lupa istirahat, karena semangatmu penting buat orang-orang yang sayang sama kamu.",
  "Kamu tuh bisa bikin hal sederhana jadi indah, itu salah satu kelebihanmu.",
  "Setiap langkahmu punya arti, bahkan kalau sekarang kamu belum nyadar.",
  "Kamu tuh cantik tanpa harus berusaha keras.",
  "Jangan pernah mikir kamu kurang, karena kamu lebih dari cukup.",
  "Kamu punya hati yang kuat, meski kadang kamu ngerasa rapuh.",
  "Cantikmu nggak cuma soal wajah, tapi juga soal cara kamu ngejalanin hidup.",
  "Kamu itu berharga, jangan biarin siapa pun bikin kamu ragu soal itu.",
  "Kamu pantes bahagia, lebih dari yang kamu bayangin.",
  "Kamu tuh bukti kalau cantik dan sederhana bisa jalan bareng.",
  "Kamu punya semangat yang bisa jadi inspirasi orang lain.",
  "Jangan pernah takut gagal, karena kamu punya potensi lebih besar dari yang kamu kira.",
  "Kamu berharga bukan karena orang lain bilang, tapi karena memang begitu adanya.",
  "Kamu punya otak cerdas dan hati hangat, kombinasi langka yang nggak semua orang punya.",
  "Kamu tuh kayak matahari kecil, selalu ada cahaya bahkan di hari mendung.",
  "Jangan biarin komentar orang bikin kamu lupa betapa berharganya dirimu.",
  "Kamu cantik, tapi juga punya kekuatan buat berdiri sendiri.",
  "Kamu punya cara unik buat bikin orang lain ketawa.",
  "Jangan pernah mikir kamu sendirian, banyak orang yang care sama kamu.",
  "Kamu itu cantik, tapi yang bikin lebih indah adalah hatimu.",
  "Semangatmu adalah sesuatu yang patut dihargai, jangan biarin padam.",
  "Kamu tuh punya daya tarik yang nggak bisa ditiru siapa pun.",
  "Kamu berharga bahkan kalau dunia lagi nggak adil sama kamu.",
  "Cantikmu bukan cuma soal mata yang melihat, tapi hati yang ngerasain.",
  "Kamu punya potensi besar, tinggal nunggu waktu buat bersinar.",
  "Jangan lupa, kamu pantas dapet yang terbaik dalam hidup.",
  "Kamu cantik dengan segala keunikanmu, dan itu nggak bisa diganti.",
  "Kamu tuh kuat, bahkan kalau kamu sendiri nggak sadar.",
  "Kamu punya energi yang bisa bikin orang lain semangat lagi.",
  "Kamu berharga, jangan biarin keraguan nutupin itu.",
  "Kamu itu cantik, dan keindahanmu nggak akan pernah sama dengan orang lain.",
  "Kamu punya kekuatan untuk bikin hari orang lain lebih baik.",
  "Jangan pernah takut bermimpi, karena kamu mampu buat ngejar semuanya.",
  "Kamu berharga, bahkan di detik-detik kamu ngerasa nggak berguna.",
  "Cantikmu abadi karena datang dari ketulusan.",
  "Kamu punya hati yang tulus, itu lebih indah dari segalanya.",
  "Kamu tuh berani, meski kadang nggak nunjukin.",
  "Kamu cantik dan punya kecerdasan yang jalan beriringan.",
  "Jangan lupa, kamu tuh versi terbaik dari dirimu sendiri.",
  "Kamu berharga, cantik, kuat, dan pantas bahagia sepenuhnya.",
  "Kamu gak butuh filter, dunia aja iri sama cantiknya kamu",
  "Kamu berharga bahkan di hari ketika kamu merasa kacau",
  "You're worthy",
  "Kamu salah satu alasan kenapa kata indah itu ada",
  "Cantik iya, berisik apalagi",
  "BACOT maneh mah lewih tibatan radio butut",
  "Apapun yang terjadi inget lu punya mimpi",
  "Sipit tapi bukan cina",
  "Asbun, idiot, banyak bacot",
  "You will be a good mother",
  "Semangat kuliahnya!",
  "Wihh calon GURU🤩",
  "Jangan ancur karena omongan orang!",
  "Amel udah lebih dari cukup",
  "Always jadi diri sendiri💫",
  "Jangan takut buat nerima tantangan baru",
  "Semuanya dimulai dari diri sendiri",
  "Jangan bikin masalalu jadi sebuah alasan",
  "Akan ada orang yang jauh lebih baik datang dihidup amel",
  "Stay positive",
  "Terus jadi random jangan berubah",
  "HAPUS SIFAT AVOIDANT LU ANJAY",
  "Jangan karena orang lain amel ngerubah kebahagiaan sendiri",
  "Maneh kayak iklan Shopee, menarik tapi berisik",
  "Cantik sih, tapi kalau marah ngilang kayak diculik hantu",
  "Kalau marah mendadak sunyi kayak Antartika",
  "Yeee nii orang yang sok kuat itu ya?",
  "Percaya banyak yang masih peduli sama amel!",
  "Moodnya kayak cuaca diakhir tahun, GAK JELAS!",
  "IDIOT, ASBUN, BACOT",
  "Lu asik tapi kadang kayak iklan yt NGESELIN",
  "Kalau ketawa matanya ilang",
  "Moodyan geleuh ciga budak TK",
  "Jangan karena satu orang lu menutup pintu untuk semua orang",
  "Hidup mah emang kayak gitu",
  "Yaudah sih, kan masih ada mie ayam untuk dihakan",
  "Gimana? About you masih jadi your fav song",
  "Ice cream Oreo emng paling gokil",
  "Kalau deket sama cowo tuh satu aja, jangan kayak tempat penampungan🗿",
  "Langkah kecil always better daripada diam",
  "Hari buruk bukan berarti hidupmu buruk",
  "Amelia okta ramadani",
  "Kamu gak perlu jadi matahari buat semua orang",
  "Amel pantas dicintai kok, asal avoidantnya dihilangin dulu🤭",
  "Lu tuh cantik banget, cuman pura pura gak tau",
  "Sia mun asbun sok kurang ajar",
  "Kenapa maneh kurang ajar na ka aing hgkl??",
  "Amel spesial dengan cara Amel sendiri",
  "Gak bakalan ada yang bisa sama kayak diri lu",
  "Semuanya ada alasan!",
  "And i give up forever to touch you",
  "Tuhan terlalu berlebihan naruh mahkluk kayak Amel di dunia yang gila ini",
  "Wkwkw di bantai kuliah ya?",
  "Selalu hargai waktu!",
  "Amel tuh sebenernya pinter, tapi tentu gak lebih pinter daripada ARIA JATIRA",
  "Nilai dirimu gak bisa untuk ditawar",
  "Jangan sampai hancur karena cowok",
  "Hati hati kalau mau cinta cintaan",
  "Cutoff orang orang yang emang gak pantas buat lu anggep seseorang",
  "Jangan karena beberapa cowo, lu nganggep semua cowo sama aja",
  "Ayoo lari, ngapain ngeluh? Amel udah sejauh ini loh",
  "Dengan pura pura kuat itu gak ngehasilin apapun",
  "Lu bakal berharga di mata yang tepat",
  "Siapa lagi ya? Yang bakal ketipu sama penampilan lu, padahal aslinya asbun",
  "You can do this",
  "Ada orang orang yang bakalan selalu ada buat lu",
  "Amel gak pernah berjalan sendirian",
  "Yaa namanya juga usaha, pasti ada gagalnya",
  "Cantik, manis, pinter, jago masak, sayang keluarga, peduli, ramah tapi masih moody duhhh sayang banget ya",
  "Rehan or ilham?",
  "Bakso or mie ayam?",
  "Dimana lagi lu nemu temen segokil, sebaik, SEPINTER AING🤭😎",
  "Mel, percaya semuanya tuh pasti ada alasan",
  "Itu bukan gagal, namanya juga kan belajar",
  "Nya bae we ngaran na g usaha",
  "Kadang emang jelema teh sok lewih lewih batan anjing😭",
  "Bulan vs Amel, cantikan mana ya?",
  "Kamu pantas bahagia, jangan lupa itu",
  "Kamu nggak perlu jadi cahaya terang, cukup jadi lilin kecil yang menghangatkan",
  "Keberanian bukan nggak takut, tapi tetap jalan meski takut",
  "Orang hebat bukan berarti nggak pernah gagal",
  "Yang lebih baik dari diri lu emang banyak, but akan selalu ada perbedaan yg gak bisa orang lain tiru",
  "Moga masa depan lu gak pecah telinganya ngedenger bacotan lu",
  "I will be a COOL UNCLE for your future child 🤙🏽",
  "Sakit ya? Wajar kok namanya juga punya hati",
  "Nangis aja, orang juga gak bakalan peduli",
  "Hidupmu tergantung keputusanmu",
  "FOR A THOUSAND YEARS",
  "Kamu tuh kombinasi langka cantik + pintar + keras kepala + bacot",
  "Kalau dunia ini panggung, kamu adalah pemeran utama",
  "Tetaplah jadi kamu, karena itu udah cukup.",
  "Kamu bukan sekadar ada, kamu bermakna",
  "Kalau dunia ini panggung, kamu adalah pemeran utama",
  "Jangan gampang baper sama orang gak jelas 🤭",
  "Lu gak bakal tau seberapa berartinya diri lu buat orang lain",
  "Dah makan?",
  "Just the way you are",
  "Meskipun banyak yang hina mata lu, but trust me that's the most beautiful part of yourself",
  "Malu ah, dah kejauhan gini masa mau nyerah",
  "Hajar ajaa, gak ada yang tau juga kan? Siapa tau menang"
];

// Helper: safe text set
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Wait DOM
document.addEventListener('DOMContentLoaded', () => {
  layers = Array.from(document.querySelectorAll('.layer'));
  audio = document.getElementById('bg-music');

  // Show login first if exists (assume login layer is first in DOM)
  const loginExists = !!document.getElementById('login') || layers.length && layers[0].id === 'login';
  if (loginExists) {
    showLayer(0);
  } else {
    showLayer(0); // fallback: show first
  }

  // Attach login handler - tolerant of different ids
  const loginBtn = document.getElementById('login-btn') || document.getElementById('loginBtn') || document.getElementById('loginBtnMain');
  const loginName = document.getElementById('login-name') || document.getElementById('username') || document.getElementById('loginName');
  const loginPass = document.getElementById('login-pass') || document.getElementById('password') || document.getElementById('loginPass');

  if (loginBtn && loginName && loginPass) {
    loginBtn.addEventListener('click', () => {
      const nameVal = (loginName.value || '').trim().toLowerCase();
      const passVal = (loginPass.value || '').trim();
      const CORRECT_NAME = 'amelia okta ramadani'; // keep this value as requested (lowercase with spaces)
      const CORRECT_PASS = '111026';

      if (nameVal === CORRECT_NAME && passVal === CORRECT_PASS) {
        // hide login layer and go to splash
        const loginLayerEl = document.getElementById('login') || layers[0];
        if (loginLayerEl) {
          // prefer using showLayer to keep consistent
          // find index of splash (id splash)
          const splashIndex = layers.findIndex(l => l.id === 'splash');
          if (splashIndex >= 0) showLayer(splashIndex);
          else showLayer(1);
        }
      } else {
        // show inline message if available, else alert
        const errEl = document.getElementById('login-error');
        if (errEl) {
          errEl.style.display = 'block';
          // tiny shake
          if (errEl.parentElement) {
            const box = errEl.closest('.login-box') || errEl.parentElement;
            try {
              box.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300, iterations: 1 });
            } catch (e) {}
          }
        } else {
          alert('Nama atau password salah');
        }
      }
    });

    // allow Enter to submit
    [loginName, loginPass].forEach(el => {
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginBtn.click(); });
    });
  }

  // Attach startBtn (on splash)
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // go to the layer after splash: find index of layer1 or umur
      const umurIndex = layers.findIndex(l => l.id === 'layer1' || l.id === 'umur' );
      if (umurIndex >= 0) showLayer(umurIndex);
      else {
        // fallback: go to next
        nextLayer();
      }
      forceMusicPlay();
    });
  }

  // Attach lightbox close clicks (if user clicks outside)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      // close only when clicking on background (not on image/content)
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // update umur
  updateUmur();
  setInterval(updateUmur, 1000);

  // autoplay setup
  setupChromeAutoplay();

  // If question layer present (id question-layer or layer-question), attach behavior
  setupQuestionLayer();
});

// -------------------- LAYER FUNCTIONS --------------------
function showLayer(index) {
  // clamp
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

  // init memory if hitting memory layer (support id 'layer4' or 'memory' index detection)
  const activeId = layers[index] && layers[index].id;
  if (activeId === 'layer4' || activeId === 'memory' || index === 4) {
    initMemoryGame();
  }
}

function nextLayer() {
  forceMusicPlay();
  // prevent next if currently on login (index 0) and login element exists
  if (layers[0] && layers[0].id === 'login' && currentLayer === 0) return;
  const next = Math.min(currentLayer + 1, layers.length - 1);
  showLayer(next);
}

function prevLayer() {
  forceMusicPlay();
  // cannot go back from login
  if (layers[0] && layers[0].id === 'login' && currentLayer === 0) return;
  const prev = Math.max(currentLayer - 1, 0);
  showLayer(prev);
}

// -------------------- LIGHTBOX --------------------
function openLightbox(imgEl, caption = "") {
  if (!imgEl) return;
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  if (!lb) return;
  lb.style.display = 'flex';
  if (lbImg && imgEl.src) lbImg.src = imgEl.src;
  if (lbCaption) lbCaption.textContent = caption || imgEl.alt || '';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.style.display = 'none';
}

// -------------------- UMUR --------------------
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

// -------------------- AUDIO AUTOPLAY (Chrome friendly) --------------------
function setupChromeAutoplay() {
  if (!audio) return;
  audio.loop = true;
  audio.volume = 0.7;
  audio.preload = 'auto';

  const triggers = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
  triggers.forEach(ev => document.addEventListener(ev, tryAutoplay, { once: false }));

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
    if (audio.paused) audio.play().catch(()=>{});
  }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) forceMusicPlay(); });
window.addEventListener('focus', forceMusicPlay);

// -------------------- RAIN EFFECT --------------------
const RAIN_SRC = 'asset/hujan.png';
let rainRunning = false;
function startRain(event) {
  if (rainRunning) return;
  rainRunning = true;
  const btn = event?.target;
  if (btn) btn.disabled = true;

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
  const maxLife = 7000;

  for (let i = 0; i < jumlah; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = RAIN_SRC;
      img.className = 'raindrop';
      img.style.position = 'absolute';
      img.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      img.style.top = '-60px';
      img.style.width = '40px';
      img.style.pointerEvents = 'none';
      img.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(img);

      setTimeout(() => { if (img && img.parentNode) img.remove(); }, maxLife - 1000);
    }, i * 160);
  }

  setTimeout(() => {
    if (container && container.parentNode) container.remove();
    rainRunning = false;
  }, maxLife + jumlah * 200);

  setTimeout(() => { if (btn) btn.disabled = false; }, 3000);
}

// -------------------- RANDOM QUOTE --------------------
function randomQuote() {
  const target = document.getElementById('random-quote') || document.getElementById('random-text');
  if (!target) return;
  const idx = Math.floor(Math.random() * quotes.length);
  target.textContent = quotes[idx];
}

// -------------------- MEMORY GAME --------------------
// This version builds cards dynamically and ensures flip toggles show front face image
let memoryFlipped = [];
let memoryLock = false;

function initMemoryGame() {
  const game = document.getElementById('memory-game');
  if (!game) return;

  // Clear existing content
  game.innerHTML = '';

  // Data for unique cards
  const cardsData = [
    { name: "amel1", src: "asset/amel1.jpeg" },
    { name: "amel2", src: "asset/amel2.jpeg" },
    { name: "amel3", src: "asset/amel3.jpeg" },
    { name: "amel4", src: "asset/amel4.jpeg" }
  ];

  // Duplicate and shuffle
  const deck = [...cardsData, ...cardsData].sort(() => Math.random() - 0.5);

  deck.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.name = cardData.name;

    // Create back and front elements (img tags) - keep order back then front in DOM so back shows initially
    const back = document.createElement('img');
    back.className = 'back-face';
    back.src = 'asset/back.jpeg';
    back.alt = 'back';

    const front = document.createElement('img');
    front.className = 'front-face';
    front.src = cardData.src;
    front.alt = cardData.name;

    // Append: back then front
    card.appendChild(back);
    card.appendChild(front);

    // click handler
    card.addEventListener('click', onMemoryCardClick);
    game.appendChild(card);
  });

  // Reset state variables
  memoryFlipped = [];
  memoryLock = false;
  // Ensure next button hidden
  const nextBtn = document.getElementById('nextBtnLayer4');
  if (nextBtn) nextBtn.style.display = 'none';
}

function onMemoryCardClick(e) {
  const card = e.currentTarget;
  if (!card) return;
  if (memoryLock) return;
  if (card.classList.contains('flip')) return;

  // flip card (CSS must handle .flip to rotate and show front-face)
  card.classList.add('flip');
  memoryFlipped.push(card);

  if (memoryFlipped.length === 2) {
    memoryLock = true;
    setTimeout(() => { checkMemoryMatch(); }, 250);
  }
}

function checkMemoryMatch() {
  const [c1, c2] = memoryFlipped;
  if (!c1 || !c2) {
    memoryFlipped = [];
    memoryLock = false;
    return;
  }

  const isMatch = c1.dataset.name === c2.dataset.name;
  if (isMatch) {
    // keep flipped and remove listener
    c1.removeEventListener('click', onMemoryCardClick);
    c2.removeEventListener('click', onMemoryCardClick);
    memoryFlipped = [];
    memoryLock = false;

    // check if all matched
    const allCards = document.querySelectorAll('.memory-card');
    const flippedCards = Array.from(allCards).filter(c => c.classList.contains('flip'));
    if (flippedCards.length === allCards.length) {
      const nextBtn = document.getElementById('nextBtnLayer4');
      if (nextBtn) nextBtn.style.display = 'inline-block';
    }
  } else {
    // unflip after a short delay to let user see
    setTimeout(() => {
      c1.classList.remove('flip');
      c2.classList.remove('flip');
      memoryFlipped = [];
      memoryLock = false;
    }, 700);
  }
}

// -------------------- QUESTION LAYER (Yes/No) --------------------
function setupQuestionLayer() {
  // If HTML contains question layer with id 'question-layer' or 'layer-question', enable behavior
  const qLayer = document.getElementById('question-layer') || document.getElementById('layer-question') || document.getElementById('layer8');
  if (!qLayer) return;

  // find yes/no buttons (ids tolerant)
  const yesBtn = qLayer.querySelector('.yes-btn') || qLayer.querySelector('#yes-btn');
  const noBtn = qLayer.querySelector('.no-btn') || qLayer.querySelector('#no-btn');

  if (!yesBtn || !noBtn) return;

  // yes -> go next
  yesBtn.addEventListener('click', () => {
    // go to next layer (if any)
    nextLayer();
  });

  // no -> avoid being clicked: on mouseenter or focus move to random position inside layer
  noBtn.addEventListener('mouseenter', () => {
    moveButtonRandomly(noBtn, qLayer);
  });
  // also on click try to move (prevents click on touch screens where hover isn't fired)
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButtonRandomly(noBtn, qLayer);
  });

  // Ensure qLayer has proper style so background video (if present) shows and buttons positioned
  qLayer.style.position = qLayer.style.position || 'relative';
}

function moveButtonRandomly(btn, container) {
  // container bounding
  const rect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  // compute random left/top inside container padding (avoid edges)
  const maxLeft = Math.max(0, rect.width - btnRect.width - 20);
  const maxTop = Math.max(0, rect.height - btnRect.height - 20);

  const left = Math.floor(10 + Math.random() * maxLeft);
  const top = Math.floor(10 + Math.random() * maxTop);

  // position absolute relative to container
  btn.style.position = 'absolute';
  btn.style.left = `${left}px`;
  btn.style.top = `${top}px`;
  btn.style.transition = 'left 140ms ease, top 140ms ease';
}

// -------------------- EXPORT (optional global helpers) --------------------
window.nextLayer = nextLayer;
window.prevLayer = prevLayer;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.randomQuote = randomQuote;
window.startRain = startRain;
window.initMemoryGame = initMemoryGame;

/* End of script.js */