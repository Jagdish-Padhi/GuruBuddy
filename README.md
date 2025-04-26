![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 GuruBuddy - A Smart Assistant for Teachers

> A modern AI-powered assistant to help teachers manage schedules,automated reminders, track lessons, and solve doubts more efficiently.

---

## 📌 Problem Statement

**Problem Statement 7 – Weave AI magic with Groq**
---

## 🎯 Objective

- Build a creative and interactive multimodal application powered by Groq, leveraging its capabilities
to solve real-world problems with a focus on user experience and innovation.

- In educational institutions, teachers often face a recurring problem: remembering exactly where they left off in previous lectures. This challenge becomes even more complex when they teach the same subject across multiple divisions. The result is confusion, disrupted class flow, and additional stress. Teachers also frequently encounter difficulties in quickly solving student doubts or providing relatable real-world examples during lectures.

**GuruBuddy** is a smart, modern assistant built to solve these challenges. It lightens the daily burden of teachers by:

- Providing timely, automated lecture reminders.
- Tracking and updating last-taught topics automatically.
- Offering instant AI-powered help for expert doubt solving and real-world explanations.

- 🚀 How GuruBuddy Works ?

- **Authentication**:  
  Teachers create an account and securely log in to the platform.

- **Schedule Setup**:  
  Teachers input their institution-assigned lecture schedules once.

- **Automated Lecture Reminder**:  
  Before each class, a popup appears showing:
  - The current subject.
  - The last topic taught.
  
  A voice prompt (available in both Hindi and English) also reinforces the reminder.  
  The popup remains active until acknowledged, ensuring no lecture is missed.

- **Post-Lecture Topic Update**:  
  After each lecture (with a 5-minute grace period), if the teacher hasn't manually updated the "last taught topic," a form automatically appears requesting the input. This ensures continuity for the next class.

- **Dynamic Topic Tracker**:  
  A live table updates and displays the last topics taught across all divisions and subjects, allowing easy tracking and edits.

- **Schedule Flexibility**:  
  Teachers can easily reset or customize their schedules if their institutional timetable changes.

- **AI Chat Assistant**:  
  A general-purpose chatbot powered by Groq AI helps teachers with quick queries, idea generation, and routine support.

- **Expert Doubt Solver**:  
  An groq AI-based expert tool helps teachers quickly resolve doubts and find relevant real-world examples, enriching the teaching experience.

---

## 🧠 Team & Approach


### Solo Participation:  
- Jagdish Padhi 

### Your Approach:  
- **Why we chose this problem**: As a student, I noticed that teachers frequently faced difficulties in tracking the topics taught in multiple divisions. This inspired me to build a solution that could make the teaching process more efficient.
- **Key challenges**: The most significant challenge was ensuring the assistant could dynamically update topics across different classes, offer bilingual reminders, and maintain a simple user interface that teachers could use without technical skills.
- **Brainstorms & breakthroughs**: The use of a pop-up reminder system and bilingual notifications was a breakthrough idea, as it ensured the teachers wouldn't forget their last topic and could continue seamlessly.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- **Frontend**: EJS, HTML5, CSS3, Tailwind CSS
- **Backend**: Node.js, Express.js, JavaScript
- **Database**: MongoDB Atlas
- **APIs**: RESTful APIs, Browser's Speech API (for bilingual voice reminders)
- **Hosting**: Render

### Sponsor Technologies Used (if any):
- ✅ **Groq**: Attempted integration of Groq AI for the **Doubt Solver** and **Smart Helper** features. Due to limitations in the free-tier, full implementation was not possible.


---

## ✨ Key Features

Highlight the most important features of your project:

- ✅ **Automated Lecture Reminders**: Teachers receive pop-up notifications about their current lecture and last taught topic in bilingual voice (English & Hindi).
- ✅ **Post-Lecture Topic Reminder**: After the lecture ends, a reminder pops up within 5 minutes to ensure the teacher records the last topic covered.
- ✅ **Dynamic Data Table**: Teachers can access a dynamically updating table showing the last taught topic for each subject and division.
- ✅ **AI-Powered Doubt Solver**: A Groq-powered chatbot assists teachers by providing real-time examples and explanations for complex topics.
- ✅ **Customizable Schedule**: Teachers can customize their institution’s schedule anytime with ease.

---

## 📽️ Demo & Deliverables

- **Demo Video Link**: https://www.youtube.com/watch?v=zGBj4YpnrgE&ab_channel=AroundTheWorld
- **Deployment link**: https://gurubuddy.onrender.com/ 

---

## ✅ Tasks & Bonus Checklist

- ✅ **All members of the team completed the mandatory task** - Followed at least 2 of our social channels and filled the form (Details in Participant Manual)  
- ✅ **All members of the team completed Bonus Task 1** - Sharing of Badges and filled the form (2 points)  
- ✅ **All members of the team completed Bonus Task 2** - Signing up for Sprint.dev and filled the form (3 points)  

*(Marked with ✅ which completed)*

---

## 🧪 How to Run the Project

### Requirements:
- Node.js (v14+)
- MongoDB Atlas account for database
- `.env` file with your MongoDB URI and other sensitive data

### Local Setup:
```bash
# Clone the repo
git clone https://github.com/Jagdish-Padhi/Gurubuddy

# Install dependencies
cd gurubuddy
npm install

# Start development server
npm run dev
