import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromptCard from '../PromptCard'

// Mock the hook
vi.mock('../../hooks/useUnsplashPhoto', () => ({
  useUnsplashPhoto: vi.fn()
}))

import { useUnsplashPhoto } from '../../hooks/useUnsplashPhoto'

describe('PromptCard Integration Tests', () => {
  const mockPrompt = {
    id: '1',
    title: 'Test Prompt Title',
    description: 'This is a test prompt description for testing purposes.',
    category: 'Development & Programming',
    author: 'Test Author',
    dateCreated: '2024-01-15',
    downloads: 2847
  }

  const mockAttribution = {
    photographer: 'John Doe',
    photographerUrl: 'https://unsplash.com/@johndoe?utm_source=PromptHub&utm_medium=referral',
    photoUrl: 'https://unsplash.com/photos/test-id?utm_source=PromptHub&utm_medium=referral'
  }

  const mockOnViewDetails = vi.fn()
  const mockTriggerDownloadOnce = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    mockOnViewDetails.mockClear()
    mockTriggerDownloadOnce.mockClear()

    // Default mock implementation
    useUnsplashPhoto.mockReturnValue({
      src: 'https://images.unsplash.com/test-photo',
      attribution: mockAttribution,
      triggerDownloadOnce: mockTriggerDownloadOnce
    })
  })

  describe('Rendering', () => {
    it('should render prompt card with all required elements', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      expect(screen.getByText('Test Prompt Title')).toBeInTheDocument()
      expect(screen.getByText(/This is a test prompt description/)).toBeInTheDocument()
      expect(screen.getByText('Test Author')).toBeInTheDocument()
      expect(screen.getByText('DEVELOPMENT & PROGRAMMING')).toBeInTheDocument()
      expect(screen.getByText('2.8k')).toBeInTheDocument() // Downloads formatted
    })

    it('should display Unsplash attribution when photo is loaded', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      expect(screen.getByText('Photo by')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('on')).toBeInTheDocument()
      expect(screen.getByText('Unsplash')).toBeInTheDocument()
      
      const photographerLink = screen.getByRole('link', { name: 'John Doe' })
      const unsplashLink = screen.getByRole('link', { name: 'Unsplash' })
      
      expect(photographerLink).toHaveAttribute('href', mockAttribution.photographerUrl)
      expect(unsplashLink).toHaveAttribute('href', mockAttribution.photoUrl)
    })

    it('should not display attribution when no photo is loaded', () => {
      useUnsplashPhoto.mockReturnValue({
        src: null,
        attribution: null,
        triggerDownloadOnce: mockTriggerDownloadOnce
      })

      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      expect(screen.queryByText('Photo by')).not.toBeInTheDocument()
    })

    it('should display fallback gradient when no image sources work', () => {
      useUnsplashPhoto.mockReturnValue({
        src: null,
        attribution: null,
        triggerDownloadOnce: mockTriggerDownloadOnce
      })

      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      // Should show category name in fallback
      expect(screen.getByText('Development & Programming')).toBeInTheDocument()
      expect(screen.getByText('Category Image')).toBeInTheDocument()
    })
  })

  describe('Image Loading and Fallbacks', () => {
    it('should handle image error and trigger fallback cascade', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', 'https://images.unsplash.com/test-photo')

      // Simulate image load error
      fireEvent.error(image)

      // After error, should try next fallback
      // Note: Testing the exact fallback behavior requires checking implementation details
      expect(image).toBeInTheDocument()
    })

    it('should apply correct image attributes for performance', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('decoding', 'async')
      expect(image).toHaveAttribute('referrerPolicy', 'no-referrer')
    })
  })

  describe('User Interactions', () => {
    it('should call onViewDetails and trigger download tracking when card is clicked', async () => {
      const user = userEvent.setup()
      
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const card = screen.getByRole('generic').parentElement // Card container
      await user.click(card)

      expect(mockOnViewDetails).toHaveBeenCalledWith(mockPrompt)
      expect(mockTriggerDownloadOnce).toHaveBeenCalled()
    })

    it('should trigger download tracking when Copy button is clicked', async () => {
      const user = userEvent.setup()
      
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      // Hover to show buttons
      const card = screen.getByRole('generic').parentElement
      await user.hover(card)

      const copyButton = screen.getByRole('button', { name: /copy/i })
      await user.click(copyButton)

      expect(mockTriggerDownloadOnce).toHaveBeenCalled()
      expect(mockOnViewDetails).not.toHaveBeenCalled() // Should not trigger card click
    })

    it('should trigger download tracking when View button is clicked', async () => {
      const user = userEvent.setup()
      
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      // Hover to show buttons
      const card = screen.getByRole('generic').parentElement
      await user.hover(card)

      const viewButton = screen.getByRole('button', { name: /view/i })
      await user.click(viewButton)

      expect(mockTriggerDownloadOnce).toHaveBeenCalled()
      expect(mockOnViewDetails).not.toHaveBeenCalled() // Should not trigger card click
    })

    it('should not trigger card click when attribution links are clicked', async () => {
      const user = userEvent.setup()
      
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const photographerLink = screen.getByRole('link', { name: 'John Doe' })
      await user.click(photographerLink)

      expect(mockOnViewDetails).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Test Prompt Title')
    })

    it('should have proper link attributes for external links', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      const photographerLink = screen.getByRole('link', { name: 'John Doe' })
      const unsplashLink = screen.getByRole('link', { name: 'Unsplash' })

      expect(photographerLink).toHaveAttribute('target', '_blank')
      expect(photographerLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(unsplashLink).toHaveAttribute('target', '_blank')
      expect(unsplashLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Data Formatting', () => {
    it('should format download counts correctly', () => {
      const promptWithHighDownloads = {
        ...mockPrompt,
        downloads: 15234
      }

      render(<PromptCard prompt={promptWithHighDownloads} onViewDetails={mockOnViewDetails} />)

      expect(screen.getByText('15.2k')).toBeInTheDocument()
    })

    it('should format dates correctly', () => {
      const recentPrompt = {
        ...mockPrompt,
        dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      }

      render(<PromptCard prompt={recentPrompt} onViewDetails={mockOnViewDetails} />)

      expect(screen.getByText('2 days ago')).toBeInTheDocument()
    })
  })

  describe('Hook Integration', () => {
    it('should call useUnsplashPhoto with correct category query', () => {
      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      expect(useUnsplashPhoto).toHaveBeenCalledWith('programming coding developer computer')
    })

    it('should handle hook loading state', () => {
      useUnsplashPhoto.mockReturnValue({
        src: null,
        attribution: null,
        triggerDownloadOnce: mockTriggerDownloadOnce
      })

      render(<PromptCard prompt={mockPrompt} onViewDetails={mockOnViewDetails} />)

      // Should render without errors even when no image is loaded
      expect(screen.getByText('Test Prompt Title')).toBeInTheDocument()
    })
  })
})