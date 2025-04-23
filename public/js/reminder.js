console.log("📢 Script loaded successfully");

// startVoiceLoop("Yes I am Speaking!")

async function checkLecTime() {
  const res = await fetch("/getReminder");
  const data = await res.json();

  if (data.showRemainder) {
    showReminderPopUp(data.message);
    startVoiceLoop(data.message);
  }
}

//to show popup

function showReminderPopUp(message) {
  const popUp = document.createElement("div");

  popUp.innerHTML = `
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-bold">${message}</p>
        <button onclick="stopVoiceLoop()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(popUp);
}

//to start voice

let interval;

async function startVoiceLoop(text) {

  const texts = [text, "कृपया ध्यान दें: " + text];
  let i = 0;

  interval = setInterval(() => {
    speak(texts[i % 2]);
    i++;
  }, 3000);
}

//speak browser
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = window.speechSynthesis.getVoices();

  // Try to pick an attractive-sounding female voice
  const preferredVoices = voices.filter(voice =>
    voice.name.includes("Google") &&
    (voice.name.toLowerCase().includes("female") ||
     voice.name.toLowerCase().includes("woman") ||
     voice.name.toLowerCase().includes("english")) &&
    voice.lang.startsWith("en")
  );

  // Fallback to first Google voice if specific match not found
  utterance.voice = preferredVoices[0] || voices.find(v => v.name.includes("Google")) || null;

  // Voice tone adjustments
  utterance.pitch = 1.2;  // higher = more expressive
  utterance.rate = 0.95;  // slight slow for clarity
  utterance.volume = 1;   // full volume

  window.speechSynthesis.speak(utterance);
}



//stop voice loop

function stopVoiceLoop() {
  clearInterval(interval);
  document.querySelector(".z-50").remove();
}

// FOR 5 MINUTES OF AFTER LECTURE
async function checkAfterLec() {
  const res = await fetch("/checkAfterLec");
  const data = await res.json();

  if (data.showPopup) {
    showTopicFormPopup(data.subject, data.scheduleId);

    startVoiceLoop(
      "Please update the last topic you taught. / कृपया आपने जो टॉपिक पढ़ाया है उसे अपडेट करें।"
    );
  }
}

function showTopicFormPopup(subject, scheduleId) {
  const popUp = document.createElement("div");

  popUp.innerHTML = `
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
  <div class="bg-white p-6 rounded shadow-lg text-center space-y-4">
    <h2 class="text-lg font-bold mb-4">📝 ${subject} Lecture</h2>

    <form id="topicForm" action="/lastTopic" method="POST" class="space-y-4">
      <!-- This value should be dynamically injected with JS -->
      <input type="hidden" name="scheduleId" value="${scheduleId}" />

      <div class="flex flex-col w-full">
        <label class="text-sm text-gray-700 mb-1">Enter last taught topic</label>
        <input type="text" name="topic" class="p-2 rounded border border-blue-300" required>
      </div>

      <div class="text-center">
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-900 text-white px-6 py-2 rounded shadow">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
  `;
  document.body.appendChild(popUp);

  const form = document.getElementById("topicForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const scheduleId = formData.get("scheduleId");

    const topic = formData.get("topic");

    await fetch("/lastTopic", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ scheduleId, topic }),
    });

    stopVoiceLoop();

    document.querySelector(".z-50").remove();
  });
}
checkLecTime();
checkAfterLec();
setInterval(checkLecTime, 60000);
setInterval(checkAfterLec, 60000);
