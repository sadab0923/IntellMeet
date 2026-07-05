const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (transcript) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Summarize the following meeting.

Transcript:
${transcript}

Return:
1. Meeting Summary
2. Action Items
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  generateSummary,
};