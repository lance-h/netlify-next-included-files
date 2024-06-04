// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import provider from "@/lib/pages";
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
        await provider.add(url, { title: query.title });
        await res.revalidate(`/dynamic${url}`);
    } else if (action === 'remove' && typeof query.url === 'string') {
        const url = query.url;
        await provider.remove(url);
        await res.revalidate(`/dynamic${url}`);
    } else if (action === 'view' && typeof query.url === 'string') {
        const page = await provider.get(query.url)
        res.send({ data: page });
        return;
    }

    res.send({ data: await provider.list() });
}
