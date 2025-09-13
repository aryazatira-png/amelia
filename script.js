/* ---------------------------
  script.js (FINAL FULL VERSION)
  Include: umur, layer, lightbox, autoplay, rain, random quotes
--------------------------- */

let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false;

// ====== QUOTES DATA ======
const quotes = [
  "MANEH NU BADMOOD kenapa sekitar yang lu diemin?",
  "Rek kitu wae?",
  "Ulah sok ijut, asbun mah asbun we",
  "Kamu punya kekuatan buat ngelewatin semua hari berat, jangan pernah ngeremehin diri sendiri.",
  "Cantikmu bukan cuma di luar, tapi juga dari cara kamu mikir",
  "Jangan lupa, kamu tuh punya nilai yang nggak bisa digantiin sama siapa pun.",
  "Kamu itu berharga, bahkan di hari-hari ketika kamu ngerasa biasa aja.",
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

// Helper
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  layers = document.querySelectorAll('.layer');
  audio = document.getElementById('bg-music');

  const btn = document.getElementById('startBtn');
  if (btn) {
    btn.addEventListener('click', e => { e.preventDefault(); startExperience(); });
    btn.addEventListener('touchstart', e => { e.preventDefault(); startExperience(); }, { passive: false });
  }

  updateUmur();
  setInterval(updateUmur, 1000);

  setupChromeAutoplay();
});

function startExperience() {
  const splash = document.getElementById('splash');
  if (splash) splash.classList.add('hidden');
  currentLayer = 0; // langsung dari layer 0
  showLayer(currentLayer);
  forceMusicPlay();
}

function showLayer(index) {
  layers.forEach((layer, i) => {
    if (i === index) layer.classList.add('active');
    else layer.classList.remove('active');
  });
}

function nextLayer() {
  forceMusicPlay();
  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  showLayer(currentLayer);
}

function prevLayer() {
  forceMusicPlay();
  currentLayer = Math.max(currentLayer - 0, 0); // fix biar layer 0 gak ilang
  showLayer(currentLayer);
}

// Lightbox
function openLightbox(img, caption = "") {
  forceMusicPlay();
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  if (!lightbox) return;
  lightbox.style.display = 'flex';
  if (lightboxImg && img && img.src) lightboxImg.src = img.src;
  if (lightboxCaption) lightboxCaption.textContent = caption || img.alt || "";
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.style.display = 'none';
}

// Umur
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
    hari += prevMonth.getDate(); bulan--;
  }
  if (bulan < 0) { bulan += 12; tahun--; }

  safeSetText('umur', `${tahun} tahun, ${bulan} bulan, ${hari} hari, ${jam} jam, ${menit} menit, ${detik} detik`);
}

// Music Autoplay Fix
function setupChromeAutoplay() {
  if (!audio) return;
  audio.volume = 0.7;
  audio.preload = 'auto';
  const triggers = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
  triggers.forEach(ev => document.addEventListener(ev, forceMusicPlay, { once: false }));
  tryAutoplay();
}
function tryAutoplay() {
  if (!audio || musicStarted) return;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => { musicStarted = true; }).catch(() => {});
  }
}
function forceMusicPlay() {
  if (!audio) return;
  if (!musicStarted) {
    audio.currentTime = 0; audio.volume = 0.7;
    audio.play().then(() => { musicStarted = true; }).catch(() => {});
  } else {
    if (audio.paused) audio.play().catch(() => {});
  }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) forceMusicPlay(); });
window.addEventListener('focus', forceMusicPlay);

// Rain Effect
const RAIN_SRC = 'asset/hujan.png';
let rainRunning = false;
function startRain() {
  if (rainRunning) return;
  rainRunning = true;
  const container = document.createElement('div');
  container.style.position = 'fixed'; container.style.top = '0'; container.style.left = '0';
  container.style.width = '100%'; container.style.height = '100%';
  container.style.pointerEvents = 'none'; container.style.zIndex = '9999';
  document.body.appendChild(container);

  const jumlah = 20; const maxLife = 7000;
  for (let i = 0; i < jumlah; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = RAIN_SRC; img.className = 'rain-img';
      img.style.left = Math.random() * (window.innerWidth - 40) + 'px';
      img.style.animationDuration = (2 + Math.random() * 3) + 's';
      img.style.opacity = '0.95'; img.style.width = '40px';
      container.appendChild(img);
      setTimeout(() => { if (img && img.parentNode) img.remove(); }, maxLife - 1000);
    }, i * 180);
  }
  setTimeout(() => { if (container && container.parentNode) container.remove(); rainRunning = false; }, maxLife + jumlah * 200);
}

// ====== RANDOM QUOTE ======
function randomQuote() {
  const target = document.getElementById('random-quote');
  if (!target) return;
  const index = Math.floor(Math.random() * quotes.length);
  target.textContent = quotes[index];
}