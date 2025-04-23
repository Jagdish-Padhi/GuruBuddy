console.log("📢 Script loaded successfully");

async function checkLecTime() {
  const res = await fetch("/getReminder");
  const data = await res.json();

  if (data.showRemainder) {
    showRemainderPopUp(data.message);
    startVoiceLoop(data.message);
  }
}

//to show popup

function showRemainderPopUp(message) {
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

  interval = setInterval(async () => {
    try {
      const res = await fetch("/playvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texts[i % 2] }),
      });

      const data = res.json();

      if (data.success && data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audio.play();
      }
    } catch (err) {
      console.error("voice error:", err);
    }

    i++;
  }, 5000);
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
    showTopicFormPopup(data.subject);

    startVoiceLoop(
      "Please update the last topic you taught. / कृपया आपने जो टॉपिक पढ़ाया है उसे अपडेट करें।"
    );
  }
}

function showTopicFormPopup(subject) {
  const popUp = document.createElement("div");

  popUp.innerHTML = `
      <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div class="bg-white p-6 rounded shadow-lg text-center space-y-4">
          <h2 class="text-lg font-bold mb-4">Submit Lastly Taught Topic</h2>
  
          <form action="/lastTopic" method="POST" id="topicForm" class="mt-10 mb-10 bg-indigo-100 p-6 rounded-lg shadow space-y-4">
            <div class="flex flex-col w-full">
              <label class="text-sm text-gray-700 mb-1">Select Subject</label>
              <select name="subject" class="p-2 rounded border border-blue-300" required>
                ${subject.map(sub => `<option value="${sub}">${sub}</option>`).join('')}
              </select>
            </div> 
            <br>
            <div class="flex flex-col w-full">
              <label class="text-sm text-gray-700 mb-1">Last Explained Topic</label>
              <input type="text" name="topic" class="p-2 rounded border border-blue-300" required>
            </div>
            <div class="text-center">
              <button class="bg-indigo-700 hover:bg-indigo-900 text-white px-6 py-2 rounded shadow">
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

    const subject = formData.get("subject");

    const topic = formData.get("topic");

    await fetch("/lastTopic", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ subject, topic }),
    });

    stopVoiceLoop();

    document.querySelector(".z-50").remove();
  });
}
checkLecTime();
checkAfterLec();
setInterval(checkLecTime, 60000);
setInterval(checkAfterLec, 60000);
