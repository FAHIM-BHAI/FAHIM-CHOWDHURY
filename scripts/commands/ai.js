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

  start: async function({ aryan, events, args, Users, ARYAN }) {
    const uid = events.senderID;
    const userName = await Users.getNameUser(uid);
    const question = args.join(" ");

    if (!question) {
      return ARYAN.reply("❌ Please provide a question.");
    }

    try {
      const res = await axios.get("https://xyz-naruto-api.onrender.com/aryan/gemini", {
        params: { ask: `${userName}: ${question}` }
      });

      const rawAnswer = res.data.answer || res.data.message || "No response from AI.";
      const answer = `Hello ${userName}! ${rawAnswer}`;
      
      const msg = `🍒 𝗙𝗔𝗛𝗜𝗠 𝗔𝗜 🍒\n❍━━━━━━━━━━━━━❍\n${answer}\n❍━━━━━━━━━━━━━❍`;

      await ARYAN.react("✅");
      return ARYAN.reply(msg);

    } catch (error) {
      console.error("AI API Error:", error.message);
      return ARYAN.reply("❌ Failed to get response from the AI API.");
    }
  }
};
