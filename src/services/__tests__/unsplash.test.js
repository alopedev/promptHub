import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  fetchRandomPhoto, 
  buildUnsplashSrc, 
  trackDownload,
  buildAttributionUrls,
  getMetrics,
  clearCache
} from '../unsplash'

describe('Unsplash Service', () => {
  beforeEach(() => {
    // Reset fetch mock and cache before each test
    vi.resetAllMocks()
    clearCache()
    global.fetch.mockClear()
  })

  describe('buildUnsplashSrc', () => {
    it('should build correct Unsplash image URL with default parameters', () => {
      const rawUrl = 'https://images.unsplash.com/photo-123456789'
      const result = buildUnsplashSrc(rawUrl)
      
      expect(result).toContain('w=800')
      expect(result).toContain('h=500')
      expect(result).toContain('fit=crop')
      expect(result).toContain('auto=format')
      expect(result).toContain('q=80')
    })

    it('should build correct Unsplash image URL with custom parameters', () => {
      const rawUrl = 'https://images.unsplash.com/photo-123456789'
      const result = buildUnsplashSrc(rawUrl, 400, 300)
      
      expect(result).toContain('w=400')
      expect(result).toContain('h=300')
    })
  })

  describe('fetchRandomPhoto', () => {
    it('should return null when no access key is provided', async () => {
      // Mock the import.meta.env to not have access key
      const originalFetch = global.fetch
      global.fetch = vi.fn()
      
      // Temporarily set env without access key
      Object.defineProperty(import.meta, 'env', {
        value: { DEV: true },
        configurable: true
      })
      
      const result = await fetchRandomPhoto('test query')
      expect(result).toBeNull()
      
      // Restore
      Object.defineProperty(import.meta, 'env', {
        value: { VITE_UNSPLASH_ACCESS_KEY: 'test-access-key', DEV: true },
        configurable: true
      })
      global.fetch = originalFetch
    })

    it('should fetch photo successfully with valid response', async () => {
      const mockPhoto = {
        id: 'test-photo-id',
        urls: {
          raw: 'https://images.unsplash.com/photo-123456789',
          regular: 'https://images.unsplash.com/photo-123456789?w=1080',
          small: 'https://images.unsplash.com/photo-123456789?w=400'
        },
        links: {
          html: 'https://unsplash.com/photos/test-photo-id',
          download_location: 'https://api.unsplash.com/photos/test-photo-id/download'
        },
        user: {
          name: 'Test Photographer',
          links: { html: 'https://unsplash.com/@testphotographer' }
        }
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPhoto)
      })

      const result = await fetchRandomPhoto('test query')
      
      expect(result).toEqual(mockPhoto)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.unsplash.com/photos/random'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Client-ID test-access-key'
          })
        })
      )
    })

    it('should return null when API returns error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      const result = await fetchRandomPhoto('test query')
      expect(result).toBeNull()
    })

    it('should return null when photo data is invalid', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' })
      })

      const result = await fetchRandomPhoto('test query')
      expect(result).toBeNull()
    })

    it('should use cache for subsequent requests', async () => {
      const mockPhoto = {
        id: 'test-photo-id',
        urls: { raw: 'https://images.unsplash.com/photo-123456789' },
        links: { html: 'test', download_location: 'test' },
        user: { name: 'Test', links: { html: 'test' } }
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPhoto)
      })

      // First request
      await fetchRandomPhoto('test query')
      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Second request should use cache
      const cachedResult = await fetchRandomPhoto('test query')
      expect(global.fetch).toHaveBeenCalledTimes(1) // No additional call
      expect(cachedResult).toEqual(mockPhoto)
    })
  })

  describe('trackDownload', () => {
    it('should track download with correct URL', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true })
      
      const downloadUrl = 'https://api.unsplash.com/photos/test-id/download'
      await trackDownload(downloadUrl)
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('client_id=test-access-key'),
        expect.objectContaining({
          method: 'GET',
          keepalive: true,
          cache: 'no-store'
        })
      )
    })

    it('should handle tracking errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))
      
      // Should not throw
      await expect(trackDownload('invalid-url')).resolves.toBeUndefined()
    })

    it('should not track when no access key or URL provided', async () => {
      await trackDownload('')
      await trackDownload(null)
      
      expect(global.fetch).not.toHaveBeenCalled()
    })
  })

  describe('buildAttributionUrls', () => {
    it('should build correct attribution URLs with UTM parameters', () => {
      const mockPhoto = {
        user: {
          name: 'Test Photographer',
          links: { html: 'https://unsplash.com/@testphotographer' }
        },
        links: {
          html: 'https://unsplash.com/photos/test-photo-id'
        }
      }

      const attribution = buildAttributionUrls(mockPhoto)
      
      expect(attribution.photographer).toBe('Test Photographer')
      expect(attribution.photographerUrl).toContain('utm_source=PromptHub')
      expect(attribution.photographerUrl).toContain('utm_medium=referral')
      expect(attribution.photoUrl).toContain('utm_source=PromptHub')
      expect(attribution.photoUrl).toContain('utm_medium=referral')
    })
  })

  describe('getMetrics', () => {
    it('should return initial metrics', () => {
      const metrics = getMetrics()
      
      expect(metrics).toHaveProperty('apiCalls', 0)
      expect(metrics).toHaveProperty('cacheHits', 0)
      expect(metrics).toHaveProperty('fallbackUses', 0)
      expect(metrics).toHaveProperty('errors', 0)
      expect(metrics).toHaveProperty('cacheSize', 0)
      expect(metrics).toHaveProperty('hitRate', 0)
    })
  })
})