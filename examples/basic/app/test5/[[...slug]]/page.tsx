// Disable additional pages

import { get, list } from "@/lib/pages";
import { notFound } from "next/navigation";

// TODO: Can this be used with ISR?
// export const dynamicParams = false;
// TODO: How long is 404 cached for when dynamicParams=true?

// export const dynamic = false;

export default async function Page(props: any) {
    console.log('Test5', props);
    const slug = props.params.slug[0];
    const page = await get(slug).catch((err) => {
        console.error(err);
        return undefined;
    });

    if (!page) { 
        return notFound();
    }

    return <div>Hello World<pre>{JSON.stringify(page)}</pre><pre>{JSON.stringify(props.params)}</pre></div>
}

export async function generateStaticParams() {
    console.log('Test5:generateStaticParams');

    const pages = (await list()).map(p => p.key);

    return pages.map(p => ({
        slug: [p]
    }))

    // return [{ slug: 'one' }, { slug: 'two' }]
}