let userName = "";
let musicStarted = false;
let typingSpeed = 120; 
let pauseAfterDot = 800;

/* ================= POPUP ================= */
function showPopup(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closePopup(id) {
  document.getElementById(id).classList.add("hidden");
}

/* ================= TYPING EFFECT ================= */
function startTyping(id) {
  return new Promise(resolve => {
    const el = document.getElementById(id);
    let text = el.dataset.text.replace(/{nama}/g, userName);
    el.textContent = "";
    let i = 0;

    function getDelay(char, index) {
      let delay = typingSpeed;
      if (index < 5) delay += 80;
      if (char === " ") delay -= 40;
      if (char === ",") delay += 200;
      if (".!?".includes(char)) delay += 600;
      if (char === "…") delay += 900;
      delay += Math.random() * 60;
      return delay;
    }

    function type() {
      if (i < text.length) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.className = "char";
        el.appendChild(span);
        const delay = getDelay(text[i], i);
        i++;
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }

    type();
  });
}

/* ================= SLEEP ================= */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ================= SAVE NAME ================= */
function saveName() {
  const input = document.getElementById("nameInput").value.trim();
  if (!input) {
    alert("Namanya diisi dulu yaa 😊");
    return;
  }

  userName = input;
  closePopup("popup0");
  showPopup("popup1");
  startTyping("typing-text");
}

/* ================= VALIDASI INPUT NAMA ================= */
const nameInput = document.getElementById("nameInput");
nameInput.addEventListener("input", () => {
  let val = nameInput.value;
  const filtered = val.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.💖😂😍🤣😊😎🤍❤️🥺👉👈]/g, '');
  if (val !== filtered) nameInput.value = filtered;
});

/* ================= MUSIC ================= */
function playMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const music = document.getElementById("background-music");
  music.volume = 0;
  music.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.03;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 300);
}

/* ================= START STORY ================= */
function startStory() {
  const btn = document.getElementById("show-popup-btn");
  const loading = document.getElementById("loading");

  btn.style.opacity = "0";
  btn.style.pointerEvents = "none";

  loading.classList.remove("hidden");

  playMusic();

  setTimeout(() => {
    loading.classList.add("hidden");
    showPopup("popup0");
  }, 8000);
}

/* ================= BUTTON BELUM SIAP ================= */
let noClickCount = 0;
let noUnlocked = false;

function handleNoClick() {
  const btn = document.getElementById("btnNo");

  if (!noUnlocked) {
    noClickCount++;
    btn.textContent = `Aku belum siap (${noClickCount}/10)`;

    const x = Math.random() * 120 - 60;
    const y = Math.random() * 80 - 40;
    btn.style.transform = `translate(${x}px, ${y}px)`;

    if (noClickCount >= 10) {
      noUnlocked = true;
      btn.textContent = "Ya sudah aku menyerah 😔";
      btn.style.transform = "translate(0,0)";
      btn.style.background = "#ff6f91";
      btn.style.color = "white";
    }
    return;
  }

  closePopup("popup3");
  showPopup("popup6");
  startTyping("typing-text-8");
}

/* ================= WHATSAPP OTOMATIS ================= */
function openWhatsApp() {
  const phoneNumber = "6283824063521"; // ganti nomor
  const websiteLink = "https://contohwebsite.com"; 

  const message = `Aku menerima kamu, dan aku mau kita serius. 
Bukan cuma sekadar animasi di website ini ❤️

Link kenangan kita:
${websiteLink}`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(waUrl, "_blank");
}

/* ================= SHOW NEXT POPUP ================= */
async function showNextPopup(current, next, ...typingIds) {
  closePopup(current);
  showPopup(next);

  for (const id of typingIds) {
    await startTyping(id);
    await sleep(700);
  }
}

/* ================= WHATSAPP RAHASIA ================= */
function openWhatsAppCode() {
  const phoneNumber = "6283824063521";
  const secretCode = "1&99u";
  const websiteLink = "https://contohwebsite.com";
  
  const message = `Kode Rahasia: ${secretCode}
Terima kasih sudah membuka website ini 🤍
Kalau mau dibuatkan website seperti ini, chat no 083824063521 yaa 😉

Link:
${websiteLink}`;
  
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(waUrl, "_blank");
}