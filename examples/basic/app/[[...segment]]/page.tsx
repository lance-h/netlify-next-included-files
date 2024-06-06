type Params = {
    segment: Array<string>;
}

type Props = {
    params: Params;
}

export default async function Page({ params }: Props) {
    const url = `/${(params.segment || []).join('/')}`;
    const timestamp = new Date();
    console.log('Building Page', { url, date: timestamp });

    return <div id="test">{timestamp.toISOString()}</div>;
}

export async function generateStaticParams() {
    console.log('generateStaticParams');

    const pages = ['one', 'two', 'three'];

    return pages.map((segment) => ({
        segment: [segment]
    }));
}