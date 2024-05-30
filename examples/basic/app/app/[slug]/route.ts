// import { get, list } from "@/lib/pages";
import * as pages from '@/lib/pages';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const url = searchParams.get('url');
    if (action === 'add' && typeof url === 'string') {
        await pages.add(url, { title: searchParams.get('title') });
        revalidateTag('blobs');
        // revalidateTag(`/dynamic/${url}`);
    } else if (action === 'remove' && typeof url === 'string') {
        await pages.remove(url);
        revalidateTag('blobs');
        // revalidateTag(`/dynamic/${url}`);
    } else if (action === 'view' && typeof url === 'string') {
        const page = await pages.get(url)
        return NextResponse.json({ data: page });
    }

    return NextResponse.json({ data: await pages.list() });
    // res.send({ data: await list() });
    // console.log('Retrieving', request.url);
    // // I suspect that fetch is being called inside the blobs API and it is being cached by Next.js
    // // Can we exclude it from caching?
    // const url = new URL(request.url);
    // const pageUrl = url.searchParams.get('page');

    // if (!pageUrl) {
    //     // return NextResponse.json({ message: 'Not found' });
    //     return NextResponse.json({ message: await pages.list() });
    // }
    // const page = await pages.get(pageUrl).catch((err) => {
    //     console.error(err);
    //     return {};
    // });
    // return NextResponse.json({ message: 'Test', page: page });
}