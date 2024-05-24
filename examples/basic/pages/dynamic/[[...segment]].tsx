import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";

type Params = { segment: Array<string> };
type Props = { params?: Params };

const Page: FC<Props> = (props) => {
    return <><pre>{JSON.stringify(props)}</pre></>;
}

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = () => {
    return {
        // paths: ['/one', '/two']
        paths: [
            { params: { segment: ['one'] } },
            { params: { segment: ['two'] } }
        ],
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
    return {
        props: { params: context.params }
    }
}