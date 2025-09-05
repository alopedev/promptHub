import '@testing-library/jest-dom'

// Mock environment variables for tests
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_UNSPLASH_ACCESS_KEY: 'test-access-key',
    DEV: true
  },
  writable: true
})

// Mock fetch globally
global.fetch = vi.fn()

// Mock AbortController
global.AbortController = class AbortController {
  constructor() {
    this.signal = {
      aborted: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }
  }
  abort() {
    this.signal.aborted = true
  }
}

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})