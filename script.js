let currentLayer = 0;
const layers = document.querySelectorAll('.layer');
const audio = document.getElementById('bg-music');

function startExperience() {
  layers[currentLayer].classList.remove('active');
  currentLayer = 1;
  layers[currentLayer].classList.add('active');
  audio.play();
}

function nextLayer() {
  layers[currentLayer].classList.remove('active');
  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  layers[currentLayer].classList.add('active');
}

function prevLayer() {
  layers[currentLayer].classList.remove('active');
  currentLayer = Math.max(currentLayer - 1, 0);
  layers[currentLayer].classList.add('active');
}

function openLightbox(img) {
  document.getElementById('lightbox').classList.remove('hidden');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').innerText = img.alt;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// Countdown + umur
let countdownEl = document.getElementById("countdown");
let umurEl = document.getElementById("umur");

let startDate = new Date("October 11, 2006 00:00:00").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let distance = targetDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  countdownEl.innerHTML = days + " umur acmelia okta ramadani";

  let umurMs = now - startDate;
  let umurYears = umurMs / (1000 * 60 * 60 * 24 * 365.25);
  umurEl.innerHTML = "Umur: " + umurYears.toFixed(8) + " tahun";
}, 1000);

// Autoplay musik setelah halaman terbuka
window.addEventListener('load', () => {
  const music = document.getElementById('bg-music');
  const playMusic = () => {
    music.play().catch(() => {
      console.log("Autoplay diblokir, tunggu interaksi user");
    });
    document.removeEventListener('click', playMusic);
    document.removeEventListener('touchstart', playMusic);
  };

  // coba play langsung
  music.play().catch(() => {
    // kalau gagal, paksa jalan setelah user klik layar
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
  });
});
