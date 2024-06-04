
import { PageProvider } from "../pages";

const SPACE = process.env.CONTENTFUL_SPACE;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT;
const ACCESSTOKEN=process.env.CONTENTFUL_ACCESSTOKEN;
const PREVIEWACCESSTOKEN=process.env.CONTENTFUL_PREVIEWACCESSTOKEN;

const blobsProvider: PageProvider = {
    list: async () => {
        const search = new URLSearchParams({
            content_type: 'pageBasic',
            limit: '1000',
            include: '0',
            select: 'sys,fields.url'
        });
        const fetchUrl = `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENVIRONMENT}/entries?${search}`
        const entries = await fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${ACCESSTOKEN}`,
            },
            next: {
                tags: ['contentfulall', 'contentfullist']
            }
        });

        return (await entries.json()).items.map((item: any) => item.fields.url);
    },
    add: async (url: string, data: any): Promise<void> => {
        throw new Error('Not implemented');
    },
    remove: async (url: string): Promise<void> => {
        throw new Error('Not implemented');
    },
    get: async (url: string): Promise<string> => {
        const search = new URLSearchParams({
            content_type: 'pageBasic',
            limit: '1',
            include: '0',
            'fields.url': url,
            select: 'sys,fields.url,fields.title',
        });
        const fetchUrl = `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENVIRONMENT}/entries?${search}`
        const entries = await fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${ACCESSTOKEN}`,
            },
            next: {
                tags: ['contentfulall', `page:${url}`]
            }
        });

        return (await entries.json()).items?.[0].fields;
    }
}

export default blobsProvider;