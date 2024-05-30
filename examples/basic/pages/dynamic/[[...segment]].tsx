import { get, list } from "@/lib/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";

type Params = { segment: Array<string> };
type Props = { params?: Params };

const Page: FC<Props> = (props) => {
    return <><pre>{JSON.stringify(props)}</pre></>;
}

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    console.log('getStaticPaths');
    const pages = await list();

    return {
        // paths: ['/one', '/two']
        // paths: [
        //     { params: { segment: ['one'] } },
        //     { params: { segment: ['two'] } }
        // ],
        paths: pages.map((p) => ({ params: { segment: p.split('/') } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    console.log('getStaticProps', context.params?.segment);
    const url = ['', ...(context.params?.segment || [])].join('/');
    const page = await get(url);

    if (!page) {
        return {
            notFound: true,
        }
    }

    return {
        props: { params: context.params }
    }
}