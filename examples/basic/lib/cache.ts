export type WithCache = {
    cache: { timestamp: number };
};

// Data not shared between ISR and API in local
// const processWithCache: WithCache = {
//     cache: { timestamp: 0 },
// };
// Data IS shared between ISR and API in local
const processWithCache = process as unknown as WithCache;

if (!processWithCache.cache) {
  processWithCache.cache = { timestamp: 0 };
}

export default processWithCache.cache;
  