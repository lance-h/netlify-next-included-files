// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { add, get, list, remove } from "@/lib/pages";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.query.action === 'add' && typeof req.query.url === 'string') {
        const url = req.query.url;
        await add(url, { title: req.query.title });
        await res.revalidate(`/dynamic${url}`);
    } else if (req.query.action === 'remove' && typeof req.query.url === 'string') {
        const url = req.query.url;
        await remove(req.query.url);
        await res.revalidate(`/dynamic${url}`);
    } else if (req.query.action === 'view') {
        const page = await get(req.query.url as string)
        res.send({ data: page });
        return;
    }

    res.send({ data: await list() });
}
