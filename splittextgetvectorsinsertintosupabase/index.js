import { openai, supabase } from './config.js';
import fs from 'fs/promises';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/*
  Challenge: Text Splitters, Embeddings, and Vector Databases!
    1. Use LangChain to split the content in movies.txt into smaller chunks.
    2. Use OpenAI's Embedding model to create an embedding for each chunk.
    3. Insert all text chunks and their corresponding embedding
       into a Supabase database table.
 */

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */

async function splitDocument(document) {
  try {
    const text = await fs.readFile(document, 'utf8');
        // Check if fetch request was successful
        // if (!text.ok) {
        //   throw new Error('Network response was not ok.');
        // }
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 250,
      chunkOverlap: 15,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);
    return output;
  } catch (err) {
    console.error('There was an issue with splitting text');
    throw err;
  }
}
/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
async function createAndStoreEmbeddings() {
  try {
    const chunkData = await splitDocument( "movies.txt");
    const data = await Promise.all(
      chunkData.map(async (chunk) => {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk.pageContent
        });
        return { 
          content: chunk.pageContent, 
          embedding: embeddingResponse.data[0].embedding 
        }
      })
    );
    const { error } = await supabase.from('movies').insert(data);
    if (error) {
      throw new Error('Issue inserting data into the database.');
    }
    console.log('SUCCESS!');
  } catch (err) {
    console.error('ERROR: ' + err.message);
  }
}
createAndStoreEmbeddings()





