window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loader.remove(), 500);
    }
  
    const video = document.getElementById('bg-video');
    if (!video) return;
  
    const START_TIME = 2.0;
    const END_THRESHOLD = 0.3;
  
    // إعادة تحميل للفيديو (علاج مشاكل الموبايل)
    video.load();
  
    // تشغيل فوري أو انتظار تفاعل المستخدم
    video.play().catch(() => {
      const tryPlay = () => {
        video.play().catch(() => {});
        window.removeEventListener('touchstart', tryPlay);
        window.removeEventListener('click', tryPlay);
      };
      window.addEventListener('touchstart', tryPlay);
      window.addEventListener('click', tryPlay);
    });
  
    // خدعة Safari
    video.style.display = 'none';
    void video.offsetHeight;
    video.style.display = '';
  
    // أول ما يتحمل الفيديو نبدأ من ثانية 2
    video.addEventListener('loadedmetadata', () => {
      if (video.duration > START_TIME) {
        video.currentTime = START_TIME;
      }
    });
  
    // لوب يدوي ناعم
    video.addEventListener('timeupdate', () => {
      if (video.duration - video.currentTime < END_THRESHOLD) {
        video.currentTime = START_TIME;
        video.play().catch(() => {});
      }
    });
  });
  
  
  
  // ❤️ Heart Trail
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
  