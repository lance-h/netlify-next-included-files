export type WithCache = {
    cache: { timestamp: number };
};

const processWithCache: WithCache = {
    cache: { timestamp: 0 },
};

export default processWithCache.cache;
  