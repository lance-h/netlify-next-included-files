// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as pages from "@/lib/pages";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const { query } = req;
    const { action } = req.query;
    if (action === 'add' && typeof query.url === 'string') {
        const url = query.url;
        await pages.add(url, { title: query.title });
        await res.revalidate(`/dynamic${url}`);
    } else if (action === 'remove' && typeof query.url === 'string') {
        const url = query.url;
        await pages.remove(url);
        await res.revalidate(`/dynamic${url}`);
    } else if (action === 'view' && typeof query.url === 'string') {
        const page = await pages.get(query.url)
        res.send({ data: page });
        return;
    }

    res.send({ data: await pages.list() });
}
