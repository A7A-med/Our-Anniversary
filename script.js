const countdownEl = document.getElementById("countdown");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const overlayEl = document.getElementById("overlay");
const containerEl = document.getElementById("container");

const MS_IN_DAY = 1000 * 60 * 60 * 24;

function getNextAnniversary(baseDate) {
  const now = new Date();
  const thisYear = now.getFullYear();
  let target = new Date(baseDate);
  target.setFullYear(thisYear);
  if (now > target) target.setFullYear(thisYear + 1);
  return target;
}

function updateCountdown() {
  const now = new Date();
  const targetDate = getNextAnniversary("2025-07-20T00:00:00");
  const diff = targetDate - now;

  if (diff <= 0 && now - targetDate < MS_IN_DAY) {
    containerEl.classList.add("celebration-mode");
    overlayEl.style.background = "rgba(255, 255, 255, 0.2)";
    titleEl.innerText = "🎉 Happy Anniversary 🎉";
    subtitleEl.innerText = "Every moment with you is a gift";
    countdownEl.style.display = "none";
    if (!document.querySelector(".confetti")) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      document.body.appendChild(confetti);
    }
  } else {
    containerEl.classList.remove("celebration-mode");
    countdownEl.style.display = "flex";
    titleEl.innerText = "Ahmed & Basant";
    subtitleEl.innerText = "A Year Of Love Behind Us, A Forever To Build Together";

    const days = Math.floor(diff / MS_IN_DAY);
    const hours = Math.floor((diff % MS_IN_DAY) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);










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
  
    setTimeout(() => heart.remove(), 500);
  }
  
  let lastHeartTime = 0;
  const heartDelay = 45;
  
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
  

  const vid = document.getElementById('bg-video');
  vid.addEventListener('timeupdate', () => {
    if (vid.duration - vid.currentTime < 0.4) {
      vid.currentTime = 0;
      vid.play();
    }
  });