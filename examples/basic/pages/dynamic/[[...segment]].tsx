import provider from "@/lib/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { FC } from "react";

type Params = { segment: Array<string> };
type Props = { params?: Params; page: any; pages: Array<string> };

const Page: FC<Props> = (props) => {
    const { pages } = props;
    return <div>
        <h1>Using Page Router</h1>
        <pre>{JSON.stringify(props.params)}</pre>
        <pre>{JSON.stringify(props.page)}</pre>
        <h2>All Pages</h2>
        <ul>
            {pages.map((page) => <li key={page}><Link prefetch={false} href={`/dynamic${page}`}>{page}</Link></li>)}
        </ul>
    </div>;
}

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    console.log('getStaticPaths');
    const pages = await provider.list();

    return {
        paths: pages.map((p) => ({ params: { segment: p.substring(1).split('/') } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    console.log('getStaticProps', context.params?.segment);
    const url = ['', ...(context.params?.segment || [])].join('/');
    const page = await provider.get(url);
    const pages = await provider.list();

    if (!page) {
        return {
            notFound: true,
        }
    }

    return {
        props: { 
            params: context.params,
            page,
            pages,
        }
    }
}