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
          alert("udah pasti iya suka lahh, wong cowok nya sekeren aing😎");
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
  // NEW: Hentikan semua efek hujan sebelum pindah layer
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


// NEW FUNCTION: Stop the rain effect and clear its timers
function stopRain() {
  // Clear any pending timeouts to stop new raindrops from appearing
  rainTimeouts.forEach(id => clearTimeout(id));
  rainTimeouts = [];

  // Remove all existing raindrops from the page
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

// rain effect
const RAIN_SRC = 'asset/hujan.png';

function startRain() {
  if (rainRunning) return;
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
    // NEW: Simpan ID timeout ke dalam array
    rainTimeouts.push(timeoutId);
  }

  // Set timeout untuk membersihkan container setelah efek selesai
  const cleanupTimeout = setTimeout(() => {
    if (container && container.parentNode) container.remove();
    rainRunning = false;
  }, maxLife + jumlah * 200);
  rainTimeouts.push(cleanupTimeout);
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
      <img class="front-face" src="${cardData.src}" alt="${cardData.name}">
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
