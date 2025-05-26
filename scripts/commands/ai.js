const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0.0",
    permission: 0,
    credits: "ArYAN",
    description: "Ask questions to AI",
    prefix: "awto",
    category: "user",
    usages: "query",
    cooldowns: 5,
    dependencies: {
      axios: ""
    }
  },

  start: async function({ api, event, args, Users }) {
    const uid = event.senderID;
    const userName = await Users.getNameUser(uid);
    const question = args.join(" ");

    if (!question) {
      return api.sendMessage("❌ Please provide a question.", event.threadID, event.messageID);
    }

    try {
      const res = await axios.get("https://xyz-naruto-api.onrender.com/aryan/gemini", {
        params: { ask: `${userName}: ${question}` }
      });

      const rawAnswer = res.data.answer || res.data.message || "No response from AI.";
      const answer = `Hello ${userName}! ${rawAnswer}`;
      
      const msg = `🍒 𝗙𝗔𝗛𝗜𝗠 𝗔𝗜 🍒\n❍━━━━━━━━━━━━━❍\n${answer}\n❍━━━━━━━━━━━━━❍`;

      await api.setMessageReaction("✅", event.messageID, event.threadID, true);
      return api.sendMessage(msg, event.threadID, event.messageID);

    } catch (error) {
      console.error("AI API Error:", error.message);
      return api.sendMessage("❌ Failed to get response from the AI API.", event.threadID, event.messageID);
    }
  }
};
