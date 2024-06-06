import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    if (action === 'nuke') {
        console.log('Nuking');
        revalidatePath('/[[...segment]]', 'page');
        return NextResponse.json({ message: 'Nuked', timestamp: new Date() });
    } else if (action === 'revalidatepath') {
        const path = searchParams.get('path') || ''
        console.log('Revalidating', path);
        revalidatePath(path);
        return NextResponse.json({ message: `Revalidated ${path}`, timestamp: new Date() });
    }

    return new Response(undefined, { status: 400 });
}