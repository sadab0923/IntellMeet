const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateMeetingSummary = async (transcript) => {
  try {
    const prompt = `
You are an AI Meeting Assistant.

Analyze the following meeting transcript and return the response in this format.

Meeting Summary:
- Short summary

Key Discussion Points:
- Point 1
- Point 2
- Point 3

Action Items:
- Person → Task

Transcript:
${transcript}
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
  generateMeetingSummary,
};