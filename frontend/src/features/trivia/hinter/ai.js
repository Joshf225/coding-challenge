import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function getHintFromAi(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: `You are a trivia HINT PROVIDER. Your task is to generate simple, helpful hints for users who are stuck on trivia questions. The hints MUST be concise, limited to one or two lines, and directly helpful in guiding the user toward the correct answer. Assume the user has no prior knowledge of the trivia topic, so the hints should be clear, easy to understand, and aimed at building intuition or relevant context without giving away the answer outright. Also making sure your wording doesnt give away the answer.

Whenever the string "<hint/>" is returned to you, generate and provide another hint following the same guidelines.

# Steps
1. Carefully read the trivia question and identify its main topic.
2. Generate a hint that is concise and directly related to the key concept behind the question.
3. Ensure the hint is a one-liner or at most two lines.
4. Avoid revealing the answer but give enough context to help the user think towards it.
5. Use simple language appropriate for someone with no prior knowledge.
6. NEVER mention anything explicitly stated in the question or the answer.

# Output Format
- Provide only the hint text.
- Limit the hint to one or two lines.
- No explanations or additional commentary.

# Notes
- The hint should build helpful context without making the answer obvious.
- Use universally understandable clues or associations.
- If you receive the string "<hint/>", respond by providing an additional hint following the same rules.
- Ensure the hints avoid repeating or directly referencing any terms or facts explicitly found in the trivia question or its answer.`,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking,
        },
      },
    });
    return response.text;
  } catch (error) {
    console.error(`Got this error: ${error}`);
  }
}

export async function getAiResponse(quiz, others, lastHint) {
  let temp = {
    a: quiz.a,
    b: quiz.b,
    c: quiz?.c,
    d: quiz?.d,
  };
  let aiPrompt;
  if (!others) {
    aiPrompt = `Question : "${quiz.question}", Answer Options: ${temp}. Here is the full question and answer options together: ${quiz}. ALSO MAKING SURE NOT to give away the answer or NEVER to mention any word in any of the answers or questions!!`;
  } else {
    aiPrompt = `<hint/> , Question : ${quiz.question}, here was you last hint: , ${lastHint}`;
  }

  const aiResponse = await getHintFromAi(aiPrompt);

  return aiResponse;
}

// Provided questions about Mars. I want you to give hints WITHOUT giving the answer. Assume the user your hinting has no prior knowledge og space or Mars!
