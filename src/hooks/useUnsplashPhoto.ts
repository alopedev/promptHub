/**
 * Custom hook for Unsplash photo integration
 * Handles fetching, caching, fallbacks, and download tracking
 */

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { 
  buildUnsplashSrc, 
  fetchRandomPhoto, 
  trackDownload, 
  buildAttributionUrls,
  type UnsplashPhoto 
} from "../services/unsplash";

/**
 * Debounce hook to prevent excessive API calls
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export interface UseUnsplashPhotoResult {
  photo: UnsplashPhoto | null;
  src: string | null;
  loading: boolean;
  error: string | null;
  attribution: {
    photographer: string;
    photographerUrl: string;
    photoUrl: string;
  } | null;
  triggerDownloadOnce: () => Promise<void>;
  refetch: () => void;
  elementRef: React.RefObject<HTMLElement>;
}

/**
 * Hook to manage Unsplash photo loading and interaction tracking
 */
export function useUnsplashPhoto(
  query: string,
  immediate = true
): UseUnsplashPhotoResult {
  const [photo, setPhoto] = useState<UnsplashPhoto | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Debounce query to prevent excessive API calls
  const debouncedQuery = useDebounce(query, 300);

  // AbortController ref for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Element ref for Intersection Observer
  const elementRef = useRef<HTMLElement>(null);

  const fetchPhoto = useCallback(async (queryToFetch: string) => {
    // Don't fetch if query is empty
    if (!queryToFetch.trim()) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const ctrl = new AbortController();
    abortControllerRef.current = ctrl;

    setLoading(true);
    setError(null);
    // Don't reset photo/src immediately to avoid flickering
    // setPhoto(null);
    // setSrc(null);

    try {
      const fetchedPhoto = await fetchRandomPhoto(queryToFetch, ctrl.signal);
      
      // Check if request was aborted
      if (ctrl.signal.aborted) return;
      
      if (fetchedPhoto) {
        setPhoto(fetchedPhoto);
        setSrc(buildUnsplashSrc(fetchedPhoto.urls.raw, 800, 500));
        setError(null);
      } else {
        setError("unsplash_fetch_error");
      }
    } catch (err) {
      if (!ctrl.signal.aborted) {
        setError("unsplash_network_error");
        if (import.meta.env.DEV) {
          console.error('[useUnsplashPhoto] Fetch error:', err);
        }
      }
    } finally {
      if (!ctrl.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true); // Fallback for SSR or unsupported browsers
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        root: null,
        rootMargin: '100px', // Start loading 100px before element comes into view
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  // Auto-fetch when visible and query is available
  useEffect(() => {
    if (immediate && debouncedQuery && isVisible) {
      fetchPhoto(debouncedQuery);
    }

    // Cleanup on unmount or query change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [debouncedQuery, immediate, fetchPhoto, isVisible]);

  // Manual refetch function
  const refetch = useCallback(() => {
    fetchPhoto(debouncedQuery);
  }, [fetchPhoto, debouncedQuery]);

  // Build attribution URLs
  const attribution = useMemo(() => {
    if (!photo) return null;
    return buildAttributionUrls(photo);
  }, [photo]);

  // Download tracking with session deduplication
  const tracked = useRef<Set<string>>(new Set());
  
  const triggerDownloadOnce = useCallback(async () => {
    if (!photo) return;
    
    const photoId = photo.id;
    const sessionKey = `unsplash_dl_${photoId}`;
    
    // Check if already tracked in this session (memory + sessionStorage)
    const alreadyTrackedInMemory = tracked.current.has(photoId);
    const alreadyTrackedInSession = typeof window !== "undefined" && 
      window.sessionStorage.getItem(sessionKey) === "1";
    
    if (alreadyTrackedInMemory || alreadyTrackedInSession) {
      if (import.meta.env.DEV) {
        console.log(`[useUnsplashPhoto] Download already tracked for photo ${photoId}`);
      }
      return;
    }
    
    // Mark as tracked in memory
    tracked.current.add(photoId);
    
    try {
      await trackDownload(photo.links.download_location);
      
      // Mark as tracked in session storage
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(sessionKey, "1");
      }
      
      if (import.meta.env.DEV) {
        console.log(`[useUnsplashPhoto] Download tracked for photo ${photoId}`);
      }
    } catch (error) {
      // Remove from memory tracking if the API call failed
      tracked.current.delete(photoId);
      
      if (import.meta.env.DEV) {
        console.warn(`[useUnsplashPhoto] Download tracking failed for photo ${photoId}:`, error);
      }
    }
  }, [photo]);

  return {
    photo,
    src,
    loading,
    error,
    attribution,
    triggerDownloadOnce,
    refetch,
    elementRef
  };
}