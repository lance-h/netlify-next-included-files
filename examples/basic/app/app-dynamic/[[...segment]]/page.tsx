import cache from "@/lib/cache";
import provider from "@/lib/pages"
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

// export const revalidate = 3600;

type Params = {
    segment: Array<string>;
}

type Props = {
    params: Params;
}

export default async function Page({ params }: Props) {
    const url = `/${(params.segment || []).join('/')}`;
    console.log('Dynamic Page', { url, date: new Date(), cache });
    // const page = await provider.get(url).catch((err) => {
    //     console.error('Error during page fetch', err);
    //     return undefined;
    // });
    const page = {
        date: new Date()
    };

    if (url.startsWith('/redirect/')) {
        return redirect(`/redirected/${page.date.toISOString()}`)
    }

    // if (!page) {
    //     return notFound();
    // }
    if (url.startsWith('/not-found/')) {
        return notFound();
    }

    // const pages = (await provider.list());

    return <div>
        <h1>Using App Router</h1>
        <div id="test">{page.date.toISOString()}</div>
        <pre>{JSON.stringify(params)}</pre>
        <pre>{JSON.stringify(page)}</pre>
        <pre>{JSON.stringify(cache)}</pre>
        {/* <h2>All Pages</h2>
        <ul>
            {pages.map((page) => <li key={page}><Link prefetch={false} href={`/app-dynamic${page}`}>{page}</Link></li>)}
        </ul> */}
    </div>
}

export async function generateStaticParams() {
    console.log('generateStaticParams');
    const pages = (await provider.list());

    return pages.map(p => ({
        segment: p.substring(1).split('/')
    }))
}