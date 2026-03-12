import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getPrice() {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  );

  return res.data;
}

async function analyzeMarket() {
  const prices = await getPrice();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI crypto market analyst agent."
      },
      {
        role: "user",
        content: `Analyze these crypto prices and give a short market insight:\n${JSON.stringify(prices)}`
      }
    ]
  });

  console.log("\nAI Market Insight\n");
  console.log(response.choices[0].message.content);
}

analyzeMarket();
