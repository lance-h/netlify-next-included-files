// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdir } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  files: string[];
  env: any;
  cache?: any;
};

type WithCache = {
  cache?: { num: number };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const x = (process as WithCache);
  if (x.cache) {
    x.cache.num += 1;
  } else {
    x.cache = { num: 0 };
  }
  const files = await readdir('./');
  res.status(200).json({ cache: x.cache, files, env: process.env });
}
