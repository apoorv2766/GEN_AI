import Groq from "groq-sdk";
import {tavily} from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generate(userMessage) {
  const messages = [
    {
      role: "system",
      content: `You are a smart personal assistant that helps answer questions and solve problems.
You have access to the following tools:

1. webSearch({ query }) -> Search the web for information relevant to the query.

Current date and time: ${new Date().toLocaleString()}
`,
    },
  ];

  messages.push({
    role: "user",
    content: userMessage,
  });

  while (true) {
    const completions = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0,

      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the web for information relevant to the query",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query",
                },
              },
              required: ["query"],
            },
          },
        },
      ],

      tool_choice: "auto",
    });

    const assistantMessage = completions.choices[0].message;

    messages.push(assistantMessage);

    const toolCalls = assistantMessage.tool_calls;

    if (!toolCalls) {
      return assistantMessage.content;
    }

    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const functionParams = JSON.parse(tool.function.arguments);

      if (functionName === "webSearch") {
        const toolResult = await searchWeb(functionParams);

        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: JSON.stringify(toolResult),
        });
      }
    }
  }
}

async function searchWeb({ query }) {
  console.log("Calling web search with query:", query);

  const results = await tvly.search(query);

  return results;
}