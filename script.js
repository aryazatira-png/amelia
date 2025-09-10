let currentLayer = 0;
let layers = [];
let audio = null;
let musicStarted = false; // ADDED: flag untuk track musik

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

  // Update currentLayer to 1 to correctly show the first layer
  currentLayer = 1; 
  if (layers[currentLayer]) {
    layers[currentLayer].classList.add('active');
    layers[currentLayer].classList.remove('hidden');
  }
  
  // CHROME FIX: Force play musik saat user click start
  forceMusicPlay();
}

function nextLayer() {
  console.log('Next layer clicked, current:', currentLayer);
  
  // CHROME FIX: Coba play musik setiap user interaction
  forceMusicPlay();
  
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
  
  // CHROME FIX: Coba play musik setiap user interaction
  forceMusicPlay();
  
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
  
  // CHROME FIX: Coba play musik setiap user interaction
  forceMusicPlay();
  
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

// CHROME AUTOPLAY FIXES
function setupChromeAutoplay() {
  if (!audio) {
    console.log('Audio element not found');
    return;
  }
  
  console.log('Setting up Chrome autoplay workaround...');
  
  // Set audio properties for better autoplay compatibility
  audio.volume = 0.7; // Set volume
  audio.preload = 'auto'; // Preload audio
  
  // Multiple event listeners untuk trigger musik
  const musicTriggers = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
  
  musicTriggers.forEach(event => {
    document.addEventListener(event, forceMusicPlay, { once: false });
  });
  
  // Coba autoplay langsung (mungkin berhasil di beberapa situasi)
  tryAutoplay();
}

function tryAutoplay() {
  if (!audio || musicStarted) return;
  
  console.log('Attempting autoplay...');
  
  // Reset audio to beginning
  audio.currentTime = 0;
  
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.log('✅ Autoplay SUCCESS!');
      musicStarted = true;
    }).catch(error => {
      console.log('❌ Autoplay blocked:', error.message);
      // Tidak berhasil, tunggu user interaction
    });
  }
}

function forceMusicPlay() {
  if (!audio) return;
  
  if (!musicStarted) {
    console.log('🎵 Force playing music...');
    
    // Reset ke awal jika belum mulai
    audio.currentTime = 0;
    audio.volume = 0.7;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('✅ Music started successfully!');
        musicStarted = true;
      }).catch(error => {
        console.log('❌ Music play failed:', error.message);
      });
    }
  } else {
    // Musik sudah jalan, pastikan tidak di-pause
    if (audio.paused) {
      console.log('🎵 Resuming paused music...');
      audio.play().catch(e => console.log('Resume failed:', e));
    }
  }
}

// CHROME FIX: Coba play musik saat page visibility berubah
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && audio && !audio.paused) {
    // Page kembali visible, pastikan musik masih jalan
    forceMusicPlay();
  }
});

// CHROME FIX: Coba play musik saat window focus
window.addEventListener('focus', function() {
  forceMusicPlay();
});

// CHROME FIX: Handle audio events
if (typeof audio !== 'undefined' && audio) {
  audio.addEventListener('canplaythrough', function() {
    console.log('Audio can play through');
    if (!musicStarted) {
      tryAutoplay();
    }
  });
  
  audio.addEventListener('loadeddata', function() {
    console.log('Audio data loaded');
    if (!musicStarted) {
      tryAutoplay();
    }
  });
  
  audio.addEventListener('play', function() {
    console.log('🎵 Audio started playing');
    musicStarted = true;
  });
  
  audio.addEventListener('pause', function() {
    console.log('⏸️ Audio paused');
  });
}