
import { getStore } from "@netlify/blobs";

const fetcher = (tags: string[]) => (input: any, init: any) => {
    return fetch(input, {
        ...init || {},
        next: {
            tags
        }
    });
};

const OPTIONS: any = {
    siteID: process.env.BLOBS_SITEID,
    token: process.env.BLOBS_TOKEN,
    name: 'pages',
    consistency: 'strong',
    fetch: fetcher(['blobs']),
};

export const list = async () => {
    const pages = getStore(OPTIONS);

    return (await pages.list()).blobs.map(x => `/${decodeURIComponent(x.key)}`);
}

const getStoreForUrl = (url: string) => {
    return getStore({ ...OPTIONS, fetch: fetcher(['blobs', `page:${url}`]) });
}

const prepareUrlKey = (url: string) => {
    if (!url.startsWith('/')) {
        throw new Error('URL must start with a forward-slash');
    }
    return encodeURIComponent(url.substring(1));
}

export const add = async (url: string, data: any): Promise<void> => {
    const pageStore = getStoreForUrl(url);

    await pageStore.setJSON(prepareUrlKey(url), { url, ...data });
}

export const remove = async (url: string): Promise<void> => {
    const pageStore = getStoreForUrl(url);

    await pageStore.delete(prepareUrlKey(url));
}

export const get = async (url: string): Promise<string> => {
    const pageStore = getStoreForUrl(url);

    return await pageStore.get(prepareUrlKey(url), { type: 'json'}).catch((err) => {
        return undefined;
    });
}