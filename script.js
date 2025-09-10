// Variabel global
let currentLayer = 0;
let layers = [];
let audio = null;

// Inisialisasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  initializeWebsite();
});

function initializeWebsite() {
  // Inisialisasi layers dan audio setelah DOM ready
  layers = document.querySelectorAll('.layer');
  audio = document.getElementById('bg-music');
  
  console.log('Found layers:', layers.length);
  console.log('Audio element:', audio ? 'found' : 'not found');
  
  // Setup start button dengan multiple event listeners
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    // Click event untuk desktop
    startBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Start button clicked (click event)');
      startExperience();
    });
    
    // Touch event untuk mobile
    startBtn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      console.log('Start button touched (touchstart event)');
      startExperience();
    }, {passive: false});
    
    // Backup dengan touchend
    startBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('Start button touched (touchend event)');
      startExperience();
    }, {passive: false});
  } else {
    console.error('Start button not found!');
  }
  
  // Initialize age counter
  updateAge();
  setInterval(updateAge, 1000);
  
  // Setup musik autoplay
  setupMusicAutoplay();
}

function startExperience() {
  console.log('Starting experience...');
  
  try {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.remove('active');
      splash.classList.add('hidden');
      
      // Delay sedikit untuk transisi
      setTimeout(() => {
        // Set currentLayer ke 1 (layer1) bukan 0 (splash)
        currentLayer = 1;
        
        if (layers[currentLayer]) {
          layers[currentLayer].classList.add('active');
          layers[currentLayer].classList.remove('hidden');
          console.log('Showing layer:', currentLayer);
        } else {
          console.error('Layer not found at index:', currentLayer);
        }
        
        // Play musik
        playMusic();
      }, 300);
    }
  } catch (error) {
    console.error('Error in startExperience:', error);
  }
}

function nextLayer() {
  console.log('Next layer called, current:', currentLayer);
  
  try {
    if (layers[currentLayer]) {
      layers[currentLayer].classList.remove('active');
      layers[currentLayer].classList.add('hidden');
    }
    
    // Increment layer tapi jangan melebihi batas
    const maxLayer = layers.length - 1;
    currentLayer = Math.min(currentLayer + 1, maxLayer);
    
    console.log('Moving to layer:', currentLayer);
    
    if (layers[currentLayer]) {
      layers[currentLayer].classList.add('active');
      layers[currentLayer].classList.remove('hidden');
    } else {
      console.error('Target layer not found:', currentLayer);
    }
  } catch (error) {
    console.error('Error in nextLayer:', error);
  }
}

function prevLayer() {
  console.log('Previous layer called, current:', currentLayer);
  
  try {
    if (layers[currentLayer]) {
      layers[currentLayer].classList.remove('active');
      layers[currentLayer].classList.add('hidden');
    }
    
    // Decrement layer tapi jangan kurang dari 0 (splash)
    currentLayer = Math.max(currentLayer - 1, 0);
    
    console.log('Moving to layer:', currentLayer);
    
    if (layers[currentLayer]) {
      layers[currentLayer].classList.add('active');
      layers[currentLayer].classList.remove('hidden');
    } else {
      console.error('Target layer not found:', currentLayer);
    }
  } catch (error) {
    console.error('Error in prevLayer:', error);
  }
}

function openLightbox(element) {
  console.log('Opening lightbox');
  
  try {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox) {
      lightbox.style.display = 'flex';
      lightbox.classList.remove('hidden');
      
      // Jika element adalah img tag
      if (element && element.tagName === 'IMG') {
        if (lightboxImg) lightboxImg.src = element.src;
        if (lightboxCaption) lightboxCaption.textContent = element.alt || 'Foto Kenangan';
      } 
      // Jika element adalah div (placeholder)
      else if (element) {
        if (lightboxCaption) lightboxCaption.textContent = element.textContent || 'Foto Kenangan';
      }
    } else {
      console.error('Lightbox element not found');
    }
  } catch (error) {
    console.error('Error in openLightbox:', error);
  }
}

function closeLightbox() {
  console.log('Closing lightbox');
  
  try {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.style.display = 'none';
      lightbox.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error in closeLightbox:', error);
  }
}

// Fungsi update umur yang lebih robust
function updateAge() {
  try {
    const birthDate = new Date('2006-10-11T00:00:00');
    const now = new Date();

    // Validasi tanggal lahir
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid birth date');
      return;
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    // Koreksi jika hari negatif
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Koreksi jika bulan negatif
    if (months < 0) {
      years--;
      months += 12;
    }

    const ageString = `${years} tahun, ${months} bulan, ${days} hari`;
    
    const countdownElement = document.getElementById('countdown');
    const umurElement = document.getElementById('umur');
    
    if (countdownElement) {
      countdownElement.textContent = ageString;
    }
    
    if (umurElement) {
      umurElement.textContent = `🎂 Umur: ${years} tahun 🎂`;
    }
    
    console.log('Age updated:', ageString);
  } catch (error) {
    console.error('Error in updateAge:', error);
  }
}

// Fungsi musik yang lebih robust
function setupMusicAutoplay() {
  try {
    if (!audio) {
      console.log('Audio element not found, skipping music setup');
      return;
    }
    
    const playMusic = () => {
      audio.play().catch((error) => {
        console.log("Autoplay diblokir, tunggu interaksi user:", error);
      });
      
      // Remove event listeners setelah musik diputar
      document.removeEventListener('click', playMusic);
      document.removeEventListener('touchstart', playMusic);
      document.removeEventListener('keydown', playMusic);
    };

    // Coba autoplay langsung
    audio.play().catch((error) => {
      console.log("Initial autoplay failed, adding event listeners:", error);
      
      // Jika gagal, tunggu user interaction
      document.addEventListener('click', playMusic);
      document.addEventListener('touchstart', playMusic);
      document.addEventListener('keydown', playMusic);
    });
  } catch (error) {
    console.error('Error in setupMusicAutoplay:', error);
  }
}

function playMusic() {
  try {
    if (audio) {
      audio.play().catch((error) => {
        console.log("Music play failed:", error);
      });
    }
  } catch (error) {
    console.error('Error in playMusic:', error);
  }
}

// Fungsi restart untuk kembali ke awal
function restartExperience() {
  console.log('Restarting experience');
  
  try {
    // Sembunyikan semua layer
    layers.forEach((layer, index) => {
      layer.classList.remove('active');
      if (index !== 0) { // Jangan hidden splash screen
        layer.classList.add('hidden');
      }
    });
    
    // Tampilkan splash screen
    currentLayer = 0;
    layers[0].classList.add('active');
    layers[0].classList.remove('hidden');
  } catch (error) {
    console.error('Error in restartExperience:', error);
  }
}

// Error handler global
window.addEventListener('error', function(e) {
  console.error('Global JavaScript Error:', e.error);
  console.error('Error details:', e.filename, e.lineno, e.colno);
});

// Debug: Log semua klik untuk troubleshooting
document.addEventListener('click', function(e) {
  console.log('Clicked:', e.target.tagName, e.target.id || e.target.className, e.target.textContent?.slice(0, 50));
});

// Debug: Log semua touch events
document.addEventListener('touchstart', function(e) {
  console.log('Touched:', e.target.tagName, e.target.id || e.target.className);
});

// Pastikan semua fungsi tersedia di window scope untuk onclick
window.startExperience = startExperience;
window.nextLayer = nextLayer;
window.prevLayer = prevLayer;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.restartExperience = restartExperience;