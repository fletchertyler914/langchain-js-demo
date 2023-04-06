import { PineconeClient } from '@pinecone-database/pinecone';

if (!process.env['PINECONE_ENVIRONMENT'] || !process.env['PINECONE_API_KEY']) {
  throw new Error('Pinecone environment or api key vars missing');
}

/*
 * CONFIG
 */
export const PINECONE_INDEX_NAME = 'langchain-js-demo';
// optional namespace for your vectors
// export const PINECONE_NAME_SPACE = 'pdf-test';

/*
 * INIT PINECONE CLIENT
 */
async function getPineconeClient() {
  try {
    const pinecone = new PineconeClient();

    // initialize pinecone client
    await pinecone.init({
      environment: process.env['PINECONE_ENVIRONMENT'] ?? '', //this is in the dashboard
      apiKey: process.env['PINECONE_API_KEY'] ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

// Pinecone client singlteton
export const pineconeClient = await getPineconeClient();
