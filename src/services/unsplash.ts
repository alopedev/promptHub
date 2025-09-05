/**
 * Professional Unsplash API integration service
 * Handles photo fetching, caching, attribution, and download tracking
 */

export interface UnsplashUser {
  name: string;
  links: { html: string };
}

export interface UnsplashPhoto {
  id: string;
  urls: { 
    raw: string; 
    regular: string; 
    small: string;
    thumb?: string;
  };
  links: { 
    html: string; 
    download_location: string;
  };
  user: UnsplashUser;
  description?: string | null;
  alt_description?: string | null;
}

export interface UnsplashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

// Environment variables
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;

// Cache configuration
const cache = new Map<string, { ts: number; photo: UnsplashPhoto; hits: number }>();
const TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 50;

// Metrics for debugging and optimization
const metrics = {
  apiCalls: 0,
  cacheHits: 0,
  fallbackUses: 0,
  errors: 0
};

/**
 * Fetch with timeout and abort signal support
 */
async function fetchWithTimeout(
  url: string, 
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 4000, signal, ...rest } = options;
  const ctrl = new AbortController();
  
  const onAbort = () => ctrl.abort();
  if (signal) signal.addEventListener("abort", onAbort, { once: true });
  
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  
  try {
    return await fetch(url, { ...rest, signal: ctrl.signal });
  } finally {
    clearTimeout(id);
    if (signal) signal.removeEventListener("abort", onAbort);
  }
}

/**
 * Clean expired cache entries and enforce size limits
 */
function cleanupCache(): void {
  const now = Date.now();
  
  // Remove expired entries
  for (const [key, value] of cache.entries()) {
    if (now - value.ts > TTL_MS) {
      cache.delete(key);
    }
  }
  
  // Enforce max cache size (LRU-like behavior by hits)
  if (cache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(cache.entries()).sort((a, b) => a[1].hits - b[1].hits);
    const toDelete = entries.slice(0, cache.size - MAX_CACHE_SIZE);
    toDelete.forEach(([key]) => cache.delete(key));
  }
}

/**
 * Build optimized Unsplash image URL with compression and sizing
 */
export function buildUnsplashSrc(raw: string, w = 800, h = 500): string {
  const u = new URL(raw);
  u.searchParams.set("w", String(w));
  u.searchParams.set("h", String(h));
  u.searchParams.set("fit", "crop");
  u.searchParams.set("auto", "format");
  u.searchParams.set("q", "80");
  return u.toString();
}

/**
 * Search photos from Unsplash API and return a random result
 */
export async function fetchRandomPhoto(
  query: string, 
  signal?: AbortSignal
): Promise<UnsplashPhoto | null> {
  if (!ACCESS_KEY) {
    if (import.meta.env.DEV) {
      console.warn('[Unsplash] No access key provided');
    }
    return null;
  }

  const key = `search:${query.toLowerCase()}`;
  const now = Date.now();
  
  // Check cache first
  const hit = cache.get(key);
  if (hit && now - hit.ts < TTL_MS) {
    hit.hits++;
    metrics.cacheHits++;
    if (import.meta.env.DEV) {
      console.log(`[Unsplash] ${query}: cache HIT`);
    }
    return hit.photo;
  }

  try {
    // Use search endpoint for better relevance
    const url = 
      `https://api.unsplash.com/search/photos` +
      `?query=${encodeURIComponent(query)}` +
      `&orientation=landscape` +
      `&content_filter=high` +
      `&per_page=30`; // Get more results to select from

    const res = await fetchWithTimeout(url, {
      headers: { 
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1'
      },
      signal,
      timeoutMs: 5000,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const searchResult = (await res.json()) as UnsplashSearchResult;
    
    if (!searchResult?.results?.length) {
      if (import.meta.env.DEV) {
        console.warn(`[Unsplash] No results found for query: ${query}`);
      }
      return null;
    }

    // Select a random photo from results for variety
    const randomIndex = Math.floor(Math.random() * searchResult.results.length);
    const selectedPhoto = searchResult.results[randomIndex];

    if (!selectedPhoto?.urls?.raw) {
      throw new Error('Invalid photo data received');
    }

    // Cache the result
    cleanupCache();
    cache.set(key, { ts: now, photo: selectedPhoto, hits: 1 });
    metrics.apiCalls++;
    
    if (import.meta.env.DEV) {
      console.log(`[Unsplash] ${query}: Search successful, selected ${randomIndex + 1}/${searchResult.results.length}`);
    }
    
    return selectedPhoto;

  } catch (error) {
    metrics.errors++;
    if (import.meta.env.DEV) {
      console.warn(`[Unsplash] ${query}: Search failed`, error);
    }
    return null;
  }
}

/**
 * Track download usage as required by Unsplash API terms
 * Called when user interacts with the image (view, copy, etc.)
 */
export async function trackDownload(downloadLocation: string): Promise<void> {
  if (!ACCESS_KEY || !downloadLocation) return;
  
  try {
    const u = new URL(downloadLocation);
    u.searchParams.set("client_id", ACCESS_KEY);
    
    await fetch(u.toString(), { 
      method: "GET", 
      keepalive: true, 
      cache: "no-store",
      headers: {
        'Accept-Version': 'v1'
      }
    });
    
    if (import.meta.env.DEV) {
      console.log('[Unsplash] Download tracked successfully');
    }
  } catch (error) {
    // Silent failure for robustness - tracking shouldn't break UX
    if (import.meta.env.DEV) {
      console.warn('[Unsplash] Download tracking failed:', error);
    }
  }
}

/**
 * Build attribution URLs with UTM parameters
 */
export function buildAttributionUrls(photo: UnsplashPhoto) {
  const photographerUrl = `${photo.user.links.html}?utm_source=PromptHub&utm_medium=referral`;
  const photoUrl = `${photo.links.html}?utm_source=PromptHub&utm_medium=referral`;
  
  return {
    photographer: photo.user.name,
    photographerUrl,
    photoUrl
  };
}

/**
 * Get current metrics for debugging/monitoring
 */
export function getMetrics() {
  return {
    ...metrics,
    cacheSize: cache.size,
    hitRate: metrics.cacheHits / (metrics.cacheHits + metrics.apiCalls) || 0
  };
}

/**
 * Clear cache and reset metrics (useful for development/testing)
 */
export function clearCache(): void {
  cache.clear();
  Object.keys(metrics).forEach(key => {
    (metrics as any)[key] = 0;
  });
}