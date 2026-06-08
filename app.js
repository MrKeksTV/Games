const bots = {
  luna: {
    name: "Luna",
    replies: [
      "Oh wow 😍 wirklich interessant!",
      "Das klingt schön 💖",
      "Ich mag deine Energie ✨",
      "Erzähl mir mehr 😊"
    ],
    images: [
      "https://images.unsplash.com/photo-1520975928311-8d8d1f8b1c7c",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    ]
  },

  alex: {
    name: "Alex",
    replies: [
      "Analyse: interessant 🤖",
      "Logisch betrachtet ergibt das Sinn.",
      "System verarbeitet... abgeschlossen.",
      "Daten stimmen teilweise überein."
    ],
    images: [
      "https://images.unsplash.com/photo-1581091870627-3d0f3a3a3c1a",
      "https://images.unsplash.com/photo-1581091215367-59ab6b5c7a9c"
    ]
  },

  mia: {
    name: "Mia",
    replies: [
      "Wow das inspiriert mich 🎨",
      "Ich sehe da richtig viele Ideen ✨",
      "Das fühlt sich kreativ an 😍",
      "Lass uns etwas cooles daraus machen!"
    ],
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
    ]
  }
};

function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const character = document.getElementById("character").value;

  const text = input.value;
  if (!text) return;

  chat.innerHTML += `<div class="msg user">Du: ${text}</div>`;
  input.value = "";

  const bot = bots[character];

  // einfache "Fake Intelligenz"
  let reply = bot.replies[Math.floor(Math.random() * bot.replies.length)];

  // kleine Reaktionen auf Wörter
  if (text.includes("hallo")) reply = "Hey 👋 schön dich zu sehen!";
  if (text.includes("liebe")) reply = "Oh 😳 das ist süß!";
  if (text.includes("cool")) reply = "Ja richtig cool 😎";

  const img = bot.images[Math.floor(Math.random() * bot.images.length)];

  setTimeout(() => {
    chat.innerHTML += `
      <div class="msg ai">
        ${bot.name}: ${reply}
        <img src="${img}">
      </div>
    `;

    // Voice
    const speech = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(speech);

    chat.scrollTop = chat.scrollHeight;
  }, 700);
}
