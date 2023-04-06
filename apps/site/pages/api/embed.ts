/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next';
import { VectorDBQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAI } from 'langchain';

export default async function importHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  const model = new OpenAI({
    openAIApiKey: 'yourkey',
    temperature: 0.6,
  });

  const parsedBody = JSON.parse(body);

  switch (method) {
    case 'POST':
      const tempcsvFile = parsedBody.csv;
      const prompt = parsedBody.prompt;
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
      });
      const docs = await textSplitter.createDocuments([tempcsvFile]);
      const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({
          openAIApiKey: 'yourkey',
        })
      );
      const chain = VectorDBQAChain.fromLLM(model, vectorStore);
      const chainRes = await chain?.call({
        input_documents: docs,
        query: prompt,
      });
      console.log(chainRes);
      res.status(200).json({ answer: { ...chainRes } });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
