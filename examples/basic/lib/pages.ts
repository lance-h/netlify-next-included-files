
import { getStore } from "@netlify/blobs";

const OPTIONS = {
    siteID: '4b00ab44-d458-42e5-930d-e9e41a638a8f',
    token: 'nfp_RyCp3UTbE3MuF4xcPsPApwXZeobPqk3Ucf8b',
    name: 'pages',
};

export const list = async () => {
    const pages = getStore(OPTIONS);

    return (await pages.list()).blobs
}

export const add = async (url: string): Promise<void> => {
    const pages = getStore(OPTIONS);

    await pages.set(url, url);
}

export const remove = async (url: string): Promise<void> => {
    const pages = getStore(OPTIONS);

    await pages.delete(url);
}

export const get = async (url: string): Promise<string> => {
    const pages = getStore(OPTIONS);

    return await pages.get(url);
}