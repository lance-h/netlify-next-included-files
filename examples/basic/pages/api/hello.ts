// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cache from "@/lib/cache";
import { readdir } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  files: string[];
  env: any;
  cache?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  cache.timestamp += 1;
  const files = await readdir('./');
  res.status(200).json({ cache, files, env: process.env });
}
