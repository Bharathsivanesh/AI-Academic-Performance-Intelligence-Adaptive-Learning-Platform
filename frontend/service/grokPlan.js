import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: " ", // ⚡️ your API key
});

export const generateStudyPlan = async ({ subject, duration, dailyHours }) => {
  // Create a prompt dynamically
  const subjectMap = { 1: "AI", 2: "DSA", 3: "OS" };
  const selectedSubject = subjectMap[subject] || "AI";

  const prompt = `
  Create a ${duration}-day study plan for the subject "${selectedSubject}".
  Each day should have:
    - day_number
    - topic_name
    - video_links_pdf (a valid YouTube or online lecture PDF link)
    - reference_links_pdf (a valid notes or reference PDF link)

  Structure the output in JSON format exactly like this:
  {
    "subject": ${subject},
    "plan_name": "${selectedSubject} - ${duration} Day Plan",
    "time_horizon_days": ${duration},
    "daily_hours": ${dailyHours},
    "details": [
      {
        "day_number": 1,
        "topic_name": "Topic name here",
        "video_links_pdf": "link",
        "reference_links_pdf": "link"
      },
      ...
    ]
  }
  `;

  const chatCompletion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 1,
    max_completion_tokens: 8192,
    top_p: 1,
  });

  // Parse JSON from the streamed response
  let plan = {};
  for await (const chunk of chatCompletion) {
    const text = chunk.choices[0]?.delta?.content || "";
    try {
      plan = JSON.parse(text); // Try parsing JSON
    } catch (e) {
      // ignore incomplete chunks
    }
  }

  return plan;
};
