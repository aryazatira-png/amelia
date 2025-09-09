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
function updateAge() {
    const birthDate = new Date('2006-10-11T00:00:00');
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        // Dapatkan jumlah hari di bulan sebelumnya
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Format tampilannya
    const ageString = `${years} tahun, ${months} bulan, ${days} hari`;

    // Ganti #countdown dengan id/elemen yang dipakai untuk menampilkan umur
    document.getElementById('countdown').textContent = ageString;
}

// Update setiap detik
setInterval(updateAge, 1000);
// Jalankan saat pertama kali
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

  // coba play langsung
  music.play().catch(() => {
    // kalau gagal, paksa jalan setelah user klik layar
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
  });
});
