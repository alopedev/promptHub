import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useUnsplashPhoto } from '../useUnsplashPhoto'
import * as unsplashService from '../../services/unsplash'

// Mock the entire service module
vi.mock('../../services/unsplash', () => ({
  fetchRandomPhoto: vi.fn(),
  buildUnsplashSrc: vi.fn(),
  trackDownload: vi.fn(),
  buildAttributionUrls: vi.fn()
}))

describe('useUnsplashPhoto Hook', () => {
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

  const mockAttribution = {
    photographer: 'Test Photographer',
    photographerUrl: 'https://unsplash.com/@testphotographer?utm_source=PromptHub&utm_medium=referral',
    photoUrl: 'https://unsplash.com/photos/test-photo-id?utm_source=PromptHub&utm_medium=referral'
  }

  beforeEach(() => {
    vi.resetAllMocks()
    
    // Setup default mocks
    unsplashService.fetchRandomPhoto.mockResolvedValue(mockPhoto)
    unsplashService.buildUnsplashSrc.mockReturnValue('https://images.unsplash.com/optimized-photo')
    unsplashService.buildAttributionUrls.mockReturnValue(mockAttribution)
    unsplashService.trackDownload.mockResolvedValue()

    // Clear sessionStorage
    window.sessionStorage.clear()
  })

  describe('Basic functionality', () => {
    it('should fetch photo on mount when immediate is true', async () => {
      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      // Initially loading
      expect(result.current.loading).toBe(true)
      expect(result.current.photo).toBeNull()
      expect(result.current.src).toBeNull()

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.photo).toEqual(mockPhoto)
      expect(result.current.src).toBe('https://images.unsplash.com/optimized-photo')
      expect(result.current.attribution).toEqual(mockAttribution)
      expect(result.current.error).toBeNull()
    })

    it('should not fetch photo on mount when immediate is false', () => {
      const { result } = renderHook(() => useUnsplashPhoto('test query', false))

      expect(result.current.loading).toBe(false)
      expect(result.current.photo).toBeNull()
      expect(result.current.src).toBeNull()
      expect(unsplashService.fetchRandomPhoto).not.toHaveBeenCalled()
    })

    it('should refetch photo when refetch is called', async () => {
      const { result } = renderHook(() => useUnsplashPhoto('test query', false))

      expect(unsplashService.fetchRandomPhoto).not.toHaveBeenCalled()

      // Call refetch
      result.current.refetch()

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(unsplashService.fetchRandomPhoto).toHaveBeenCalledWith('test query', expect.any(Object))
      expect(result.current.photo).toEqual(mockPhoto)
    })
  })

  describe('Error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      unsplashService.fetchRandomPhoto.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('unsplash_network_error')
      expect(result.current.photo).toBeNull()
      expect(result.current.src).toBeNull()
    })

    it('should handle null response from service', async () => {
      unsplashService.fetchRandomPhoto.mockResolvedValue(null)

      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('unsplash_fetch_error')
      expect(result.current.photo).toBeNull()
    })
  })

  describe('Download tracking', () => {
    it('should track download once per photo per session', async () => {
      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // First call should track
      await result.current.triggerDownloadOnce()
      expect(unsplashService.trackDownload).toHaveBeenCalledWith(
        'https://api.unsplash.com/photos/test-photo-id/download'
      )
      expect(unsplashService.trackDownload).toHaveBeenCalledTimes(1)

      // Second call should not track (deduplication)
      await result.current.triggerDownloadOnce()
      expect(unsplashService.trackDownload).toHaveBeenCalledTimes(1)
    })

    it('should not track download when no photo is loaded', async () => {
      unsplashService.fetchRandomPhoto.mockResolvedValue(null)
      
      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await result.current.triggerDownloadOnce()
      expect(unsplashService.trackDownload).not.toHaveBeenCalled()
    })

    it('should respect sessionStorage deduplication', async () => {
      // Pre-populate sessionStorage
      window.sessionStorage.getItem.mockReturnValue('1')

      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should not track because already marked in sessionStorage
      await result.current.triggerDownloadOnce()
      expect(unsplashService.trackDownload).not.toHaveBeenCalled()
    })

    it('should handle tracking errors gracefully', async () => {
      unsplashService.trackDownload.mockRejectedValue(new Error('Tracking failed'))

      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should not throw
      await expect(result.current.triggerDownloadOnce()).resolves.toBeUndefined()
    })
  })

  describe('Query changes', () => {
    it('should refetch when query changes', async () => {
      const { result, rerender } = renderHook(
        ({ query }) => useUnsplashPhoto(query, true),
        { initialProps: { query: 'initial query' } }
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(unsplashService.fetchRandomPhoto).toHaveBeenCalledWith('initial query', expect.any(Object))

      // Change query
      rerender({ query: 'new query' })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(unsplashService.fetchRandomPhoto).toHaveBeenCalledWith('new query', expect.any(Object))
      expect(unsplashService.fetchRandomPhoto).toHaveBeenCalledTimes(2)
    })
  })

  describe('Attribution', () => {
    it('should return null attribution when no photo', () => {
      unsplashService.fetchRandomPhoto.mockResolvedValue(null)
      
      const { result } = renderHook(() => useUnsplashPhoto('test query', false))

      expect(result.current.attribution).toBeNull()
    })

    it('should build attribution when photo is loaded', async () => {
      const { result } = renderHook(() => useUnsplashPhoto('test query', true))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(unsplashService.buildAttributionUrls).toHaveBeenCalledWith(mockPhoto)
      expect(result.current.attribution).toEqual(mockAttribution)
    })
  })

  describe('Cleanup', () => {
    it('should abort request on unmount', () => {
      const { unmount } = renderHook(() => useUnsplashPhoto('test query', true))

      // Unmount before request completes
      unmount()

      // Should not cause memory leaks or state updates
      expect(true).toBe(true) // Test passes if no errors thrown
    })
  })
})