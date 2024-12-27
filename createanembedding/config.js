import 'dotenv/config';
import OpenAI from 'openai';

/** Ensure the OpenAI API key is available and correctly configured */
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing or invalid.");
}

/** OpenAI config */
const openaiApiKey = process.env.OPENAI_API_KEY;

export default new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true
});

