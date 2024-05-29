
import { getStore } from "@netlify/blobs";

const fetcher = (input: any, init: any) => {
    return fetch(input, {
        ...init || {},
        next: {
            tags: ['blobs']
        }
    });
};

const OPTIONS: any = {
    siteID: '4b00ab44-d458-42e5-930d-e9e41a638a8f',
    token: 'nfp_RyCp3UTbE3MuF4xcPsPApwXZeobPqk3Ucf8b',
    name: 'pages',
    consistency: 'strong',
    fetch: fetcher,
};

export const list = async () => {
    const pages = getStore(OPTIONS);

    return (await pages.list()).blobs
}

export const add = async (url: string, data: any): Promise<void> => {
    const pages = getStore(OPTIONS);

    await pages.setJSON(url, { url, ...data });
}

export const remove = async (url: string): Promise<void> => {
    const pages = getStore(OPTIONS);

    await pages.delete(url);
}

export const get = async (url: string): Promise<string> => {
    const pages = getStore(OPTIONS);

    return await pages.get(url, { type: 'json'}).catch((err) => {
        return undefined;
    });
}