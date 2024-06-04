import blobs from './providers/blobs';
import contentful from './providers/contentful';

export type PageProvider = {
    list: () => Promise<Array<string>>;
    get: (url: string) => Promise<any>;
    add: (url: string, data: any) => Promise<void>;
    remove: (url: string) => Promise<void>;
}

export default contentful;
