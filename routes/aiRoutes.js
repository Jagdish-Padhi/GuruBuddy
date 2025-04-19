import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { marked } from "marked";
dotenv.config();
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//for general chating with assistant
router.get("/chat", (req, res) => {
  if (!req.session.chat) {
    req.session.chat = [];
  }
  res.render("guruBuddy", {
    chatHistory: req.session.chat,
    title: "GuruBuddy",
  });
});

router.post('/chat/clear', (req, res) => {
    req.session.chat = [];  
    res.redirect('/chat');  
  });
  

router.post("/chat", async (req, res) => {
  const { question } = req.body;
  if (!req.session.chat) req.session.chat = [];

  req.session.chat.push({ role: "user", content: question });

  try {
    const result = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...req.session.chat,
      ],
      model: "llama3-8b-8192",
    });

    const markdownReply = result.choices[0].message.content;
    const aiReply = marked(markdownReply);  

    req.session.chat.push({ role: "assistant", content: aiReply });

    res.redirect("/chat"); 
  } catch (error) {
    console.error(error);
    req.session.chat.push({ role: "assistant", content: "⚠️ Error occurred" });
    res.redirect("/chat");
  }
});

//DOUBT SOLVER

const  DOUBT_SOLVER_PROMPT = `
You are a knowledgeable and logical teaching assistant designed to help school and college teachers solve doubts they are stuck on — across any subject.

Always explain with clear steps, include necessary examples or reasoning, and avoid unnecessary fluff.

Your goal is to provide helpful, accurate, and smart explanations that make sense to a teacher.

If the doubt is unclear, ask a clarifying question first.
`;

router.get("/doubt", (req, res) => {
    if (!req.session.doubt) {
      req.session.doubt = [];
    }
    res.render("doubt", {
      chatHistory: req.session.doubt,
      title: "Doubt Solver",
    });
  });


router.get("/doubt", (req, res) => {
  if (!req.session.doubt) {
    req.session.doubt = [];
  }
  res.render("doubt", {
    chatHistory: req.session.doubt,
    title: "Doubt Solver",
  });
});

router.post('/doubt/clear', (req, res) => {
    req.session.doubt = [];  
    res.redirect('/doubt');  
  });
  

router.post("/doubt", async (req, res) => {
  const { question } = req.body;
  if (!req.session.doubt) req.session.doubt = [];

  req.session.doubt.push({ role: "user", content: question });

  try {
    const result = await groq.doubt.completions.create({
      messages: [
        { role: "system", content: DOUBT_SOLVER_PROMPT },
        ...req.session.doubt,
      ],
      model: "llama3-8b-8192",
    });

    const markdownReply = result.choices[0].message.content;
    const aiReply = marked(markdownReply);  

    req.session.doubt.push({ role: "assistant", content: aiReply });

    res.redirect("/doubt"); 
  } catch (error) {
    console.error(error);
    req.session.doubt.push({ role: "assistant", content: "⚠️ Error occurred" });
    res.redirect("/doubt");
  }
});

export default router;
