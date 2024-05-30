import * as pages from '@/lib/pages';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const url = searchParams.get('url');
    if (action === 'revalidateall') {
        revalidateTag('blobs');
    } else if (action === 'add' && typeof url === 'string') {
        await pages.add(url, { title: searchParams.get('title') });
        revalidateTag(`page:${url}`);
    } else if (action === 'remove' && typeof url === 'string') {
        await pages.remove(url);
        revalidateTag(`page:${url}`);
    } else if (action === 'view' && typeof url === 'string') {
        const page = await pages.get(url)
        return NextResponse.json({ data: page });
    }

    return NextResponse.json({ data: await pages.list() });
}