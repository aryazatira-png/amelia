let currentLayer = 0;
const layers = document.querySelectorAll('.layer');
const audio = document.getElementById('bg-music');

function startExperience() {
  document.getElementById('splash').classList.remove('active');
  document.getElementById('splash').classList.add('hidden');
  
  // Update currentLayer to 1 to correctly show the first layer
  currentLayer = 1; 
  layers[currentLayer].classList.add('active');
  audio.play();
}

const btn = document.getElementById('startBtn');
btn.addEventListener('touchstart', function(e) {
  e.preventDefault();
  startExperience();
}, {passive: false});

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
function updateAge() {
    const birthDate = new Date('2006-10-11T00:00:00');
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const ageString = `${years} tahun, ${months} bulan, ${days} hari`;
    document.getElementById('countdown').textContent = ageString;
}

setInterval(updateAge, 1000);
updateAge();

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

  music.play().catch(() => {
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
  });
});
