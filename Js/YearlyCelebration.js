window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loader.remove(), 500);
    }

    const video = document.getElementById('bg-video');
    if (video) {
      video.load();
      video.play().catch(() => {
        const tryPlay = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchstart', tryPlay);
          window.removeEventListener('click', tryPlay);
        };
        window.addEventListener('touchstart', tryPlay);
        window.addEventListener('click', tryPlay);
      });
      video.style.display = 'none';
      void video.offsetHeight;
      video.style.display = '';
    }
  });




  const vid = document.getElementById('bg-video');
  const START_OFFSET = 2.2; // ثانية من البداية
  const END_OFFSET = 0;   // ثانية من النهاية
  
  vid.loop = false;
  
  vid.addEventListener('loadedmetadata', () => {
    if (vid.duration > START_OFFSET) {
      vid.currentTime = START_OFFSET;
    }
    vid.play().catch(() => {});
    monitorVideoLoop(); // نبدأ المراقبة اليدوية
  });
  
  function monitorVideoLoop() {
    if (!vid.paused && vid.currentTime >= vid.duration - END_OFFSET) {
      vid.currentTime = START_OFFSET+3;
      vid.play().catch(() => {});
    }
    requestAnimationFrame(monitorVideoLoop); // نراقب باستمرار
  }
  


  
  /*const vid = document.getElementById('bg-video');
  vid?.addEventListener('timeupdate', () => {
    if (vid.duration - vid.currentTime < 0.4) {
      vid.currentTime = 0;
      vid.play();
    }
  }); */


  
  
  


  function createHeart(x, y) {
    const heart = document.createElement('span');
    heart.className = 'heart-trail';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
  
    const size = 20 + Math.random() * 30;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;
  
    document.body.appendChild(heart);
  
    setTimeout(() => heart.remove(), 700);
  }
  
  let lastHeartTime = 0;
  const heartDelay = 30;
  
  function handleMove(x, y) {
    const now = Date.now();
    if (now - lastHeartTime < heartDelay) return;
    lastHeartTime = now;
    createHeart(x, y);
  }
  
  document.addEventListener('mousemove', (e) => {
    handleMove(e.clientX, e.clientY);
  });
  
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  });