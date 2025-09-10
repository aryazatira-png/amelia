let currentLayer = 0;
let layers = [];
let audio = null;

// ADDED: Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', function() {
  // Initialize after DOM is ready
  layers = document.querySelectorAll('.layer');
  audio = document.getElementById('bg-music');
  
  console.log('DOM loaded, found', layers.length, 'layers');
  
  // Setup start button
  const btn = document.getElementById('startBtn');
  if (btn) {
    // Click event for desktop
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      startExperience();
    });
    
    // Touch event for mobile
    btn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      startExperience();
    }, {passive: false});
  }
  
  // Initialize age counter
  updateAge();
  setInterval(updateAge, 1000);
  
  // Setup music autoplay
  setupMusicAutoplay();
});

function startExperience() {
  console.log('Starting experience...');
  
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.remove('active');
    splash.classList.add('hidden');
  }

  // Update currentLayer to 1 to correctly show the first layer
  currentLayer = 1; 
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
  
  // Play music
  if (audio) {
    audio.play().catch(e => console.log('Music autoplay blocked:', e));
  }
}

function nextLayer() {
  console.log('Next layer clicked, current:', currentLayer);
  
  // Hide current layer
  if (layers[currentLayer]) {
    layers[currentLayer].classList.remove('active');
    layers[currentLayer].classList.add('hidden');
  }
  
  // Move to next layer
  currentLayer = Math.min(currentLayer + 1, layers.length - 1);
  
  // Show new layer
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
}

function prevLayer() {
  console.log('Previous layer clicked, current:', currentLayer);
  
  // Hide current layer
  if (layers[currentLayer]) {
    layers[currentLayer].classList.remove('active');
    layers[currentLayer].classList.add('hidden');
  }
  
  // Move to previous layer
  currentLayer = Math.max(currentLayer - 1, 0);
  
  // Show new layer
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
}

function openLightbox(img) {
  console.log('Opening lightbox');
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  if (lightbox) {
    lightbox.style.display = 'flex';
    lightbox.classList.remove('hidden');
    
    if (lightboxImg && img.src) {
      lightboxImg.src = img.src;
    }
    if (lightboxCaption && img.alt) {
      lightboxCaption.textContent = img.alt;
    }
  }
}

function closeLightbox() {
  console.log('Closing lightbox');
  
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    lightbox.classList.add('hidden');
  }
}

// Countdown + umur (original function)
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
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        countdownEl.textContent = ageString;
    }
}

// ADDED: Music autoplay function
function setupMusicAutoplay() {
  if (!audio) return;
  
  const playMusic = () => {
    audio.play().catch(() => {
      console.log("Autoplay diblokir, tunggu interaksi user");
    });
    document.removeEventListener('click', playMusic);
    document.removeEventListener('touchstart', playMusic);
  };

  audio.play().catch(() => {
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
  });
}