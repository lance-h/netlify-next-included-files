// Disable additional pages
// TODO: Can this be used with ISR?
export const dynamicParams = false;
// TODO: How long is 404 cached for when dynamicParams=true?

// export const dynamic = false;

export default async function Page(props: any) {
    console.log('Test2', props);

    return <div>Hello World</div>
}

export async function generateStaticParams() {
    console.log('Test2:generateStaticParams');

    return [{ slug: 'one' }, { slug: 'two' }]
}