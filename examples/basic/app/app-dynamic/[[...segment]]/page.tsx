import { get, list } from "@/lib/pages"
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Page(props: any) {
    const url = ['', ...(props.params.segment || [])].join('/');
    console.log('Dynamic Page', url, new Date());
    const page = await get(url).catch((err) => {
        console.error('Error during page fetch', err);
        return undefined;
    });

    if (!page) {
        return notFound();
    }

    const pages = (await list());

    return <div>
        <h1>Hello World</h1>
        {/* NOTE: Do NOT render props directly - it appears that attempting to consume props.searchParams opts the request into SSR */}
        <pre>{JSON.stringify(props.params)}</pre>
        <pre>{JSON.stringify(page)}</pre>
        <h2>All Pages</h2>
        <ul>
            {pages.map((page) => <li key={page}><Link prefetch={false} href={`/app-dynamic${page}`}>{page}</Link></li>)}
        </ul>
    </div>
}

export async function generateStaticParams() {
    console.log('generateStaticParams');
    const pages = (await list());

    return pages.map(p => ({
        segment: p.split('/')
    }))
}