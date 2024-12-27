import fs from 'fs/promises';
import { CharacterTextSplitter } from "langchain/text_splitter";

// LangChain text splitter
async function splitDocument() {
  try {
    const text = await fs.readFile('podcasts.txt', 'utf8');
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 150,
      chunkOverlap: 0,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);
    //console.log(text);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

splitDocument();