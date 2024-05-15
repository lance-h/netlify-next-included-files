// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdir } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  files: string[];
  env: any,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const files = await readdir('./');
  res.status(200).json({ files, env: process.env });
}
