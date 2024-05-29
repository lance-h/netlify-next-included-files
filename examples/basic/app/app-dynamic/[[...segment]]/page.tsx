import { get, list } from "@/lib/pages"
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Page(props: any) {
    const slug = props.params.segment[0];
    // console.log('Dynamic Page', slug);
    console.log('Dynamic Page', slug, new Date());
    const page = await get(slug).catch((err) => {
        console.error(err);
        return undefined;
    });
    // const page = 'static';
    // const url = `http://localhost:3050/app/xy?page=${slug}`;
    // const url = `http://localhost:3050/api/data?action=view&url=${slug}`;
    // console.log('Querying', url);
    // const page = await fetch(url, {
    //     next: {
    //         revalidate: 0, // TODO: Long term
    //         tags: [`page:${slug}`]
    //     }
    // }).then(x => x.json());

    // TODO for Monday:
    // - Find out why revalidate is not working (actually it is, but delayed?) for page router in Netlify
    //   It seems that the new pages are delayed by about a minute
    //   Deleted pages don't work (actually it threw a function error internally and then worked after a minute or two)
    /*
    
    May 24, 05:02:27 PM: 47b80108 ERROR  [NetlifyCacheHandler]: Purging the cache for tag _N_T_/dynamic/two failed TypeError: fetch failed
    May 24, 05:02:27 PM: 47b80108 ERROR      at node:internal/deps/undici/undici:12618:11
    May 24, 05:02:27 PM: 47b80108 ERROR      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    May 24, 05:02:27 PM: 47b80108 ERROR      at async purgeCache (/var/task/examples/basic/.netlify/dist/run/handlers/cache.cjs:76:20) {
    May 24, 05:02:27 PM: 47b80108 ERROR    cause: ConnectTimeoutError: Connect Timeout Error
    May 24, 05:02:27 PM: 47b80108 ERROR        at onConnectTimeout (node:internal/deps/undici/undici:7760:28)
    May 24, 05:02:27 PM: 47b80108 ERROR        at node:internal/deps/undici/undici:7716:50
    May 24, 05:02:27 PM: 47b80108 ERROR        at Immediate._onImmediate (node:internal/deps/undici/undici:7748:13)
    May 24, 05:02:27 PM: 47b80108 ERROR        at process.processImmediate (node:internal/timers:476:21)
    May 24, 05:02:27 PM: 47b80108 ERROR        at process.callbackTrampoline (node:internal/async_hooks:128:17) {
    May 24, 05:02:27 PM: 47b80108 ERROR      code: 'UND_ERR_CONNECT_TIMEOUT'
    May 24, 05:02:27 PM: 47b80108 ERROR    }
    May 24, 05:02:27 PM: 47b80108 ERROR  }
    
    */
    //   https://deploy-preview-4--netlify-next-included-files.netlify.app/dynamic/two
    //   https://deploy-preview-4--netlify-next-included-files.netlify.app/api/data?action=add&url=two
    //   https://deploy-preview-4--netlify-next-included-files.netlify.app/api/data?action=remove&url=two
    // - Find a way to associate this page with a cache key so that we can invalidate by tag

    if (!page) {
        return notFound();
    }

    return <div>Hello World
        {/* NOTE: Do NOT render props directly - it appears that attempting to consume props.searchParams opts the request into SSR */}
        <pre>{JSON.stringify(props.params)}</pre>
        <pre>{JSON.stringify(page)}</pre>
    </div>
}

export async function generateStaticParams() {
    console.log('generateStaticParams');
    const pages = (await list()).map(p => p.key);

    return pages.map(p => ({
        segment: [p]
    }))
}