import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";


const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });  //24 hours


export async function generate(userMessage, threadId) {
  const baseMessages = [
    {
      role: "system",
      content: `You are a smart personal assistant.
      If you know the answer, answer directly.
      If you need to search the web, use the webSearch tool.
        You have access to the following tools:
      1. webSearch({ query }) -> Search the web for information relevant to the query.
      Decide if you need to search the web or not.
      Do not use the webSearch tool unless it is necessary.
      Respond only in the language the user used to ask the question.

      Example:

      User: what is the capital of india?
      Assistant: The capital of India is New Delhi.

      User: what is the current time in india?
      Assistant: 
        webSearch({ query: "current time in india" })

      User: what is weather of varanasi?
      Assistant: 
        webSearch({ query: "weather of varanasi" })

      User: explain binary search
      Assistant: Binary search is a search algorithm that is used to search for a specific value in a sorted array.

      User: tell me the latest IT news
      Assistant: 
        webSearch({ query: "latest IT news" })

Current date and time: ${new Date().toLocaleString()}
`,
    },
  ];

  const messages = cache.get(threadId) ?? baseMessages;

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


    messages.push(completions.choices[0].message);

    const toolCalls = completions.choices[0].message.tool_calls;

    if (!toolCalls) {
      //here we end the chatbot response
      cache.set(threadId, messages);
      console.log(cache);
      return completions.choices[0].message.content;
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