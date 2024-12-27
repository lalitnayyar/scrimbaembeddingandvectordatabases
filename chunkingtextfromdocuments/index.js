import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// LangChain text splitter
async function splitDocument() {
  try {
    const text = await fs.readFile('podcasts.txt', 'utf8');
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 150,
      chunkOverlap: 15,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);
    //console.log(text);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

splitDocument();