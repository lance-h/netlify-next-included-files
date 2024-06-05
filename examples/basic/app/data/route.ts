import provider from '@/lib/pages';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const url = searchParams.get('url');
    if (action === 'nuke') {
        const tag = searchParams.get('tag') || ''
        console.log('Revalidating', tag);
        revalidatePath('/app-dynamic/[[...segment]]', 'page');
    } else if (action === 'revalidatepath') {
        const path = searchParams.get('path') || ''
        console.log('Revalidating', path);
        revalidatePath(path);
    } else if (action === 'revalidate') {
        const tag = searchParams.get('tag') || ''
        console.log('Revalidating', tag);
        revalidateTag(tag);
    } else if (action === 'revalidateall') {
        console.log('Revalidating all');
        revalidateTag('blobs');
        revalidateTag('contentfulall');
    } else if (action === 'add' && typeof url === 'string') {
        await provider.add(url, { title: searchParams.get('title') });
        revalidateTag(`page:${url}`);
    } else if (action === 'remove' && typeof url === 'string') {
        await provider.remove(url);
        revalidateTag(`page:${url}`);
    } else if (action === 'view' && typeof url === 'string') {
        const page = await provider.get(url)
        return NextResponse.json({ data: page });
    }

    return NextResponse.json({ data: await provider.list() });
}