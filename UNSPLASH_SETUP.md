# Unsplash API Integration Setup

## Overview

PromptHub now features professional image integration using the Unsplash API with a robust fallback system and full compliance with Unsplash's Terms of Service.

## Features

✅ **Professional API Integration**
- High-quality category-specific images from Unsplash
- Optimized image delivery with compression and sizing
- 5-minute memory caching for performance
- Proper download tracking as required by Unsplash ToS

✅ **Robust Fallback System**
1. Unsplash API (primary)
2. Unsplash Source API (2 attempts with different signatures)
3. Picsum placeholder service
4. CSS gradient fallback (always works)

✅ **Compliance & Attribution**
- Visible photographer attribution with UTM tracking
- Download tracking on user interactions
- Session-based deduplication to avoid duplicate tracking
- Proper referrer and security policies

✅ **Performance Optimized**
- DNS prefetching and preconnect headers
- Lazy loading with low priority
- Abort controller for cleanup
- Memory and session storage caching

## Setup Instructions

### 1. Get Unsplash API Access

1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Register a new application
3. Copy your **Access Key** (NOT the Secret Key - keep that server-side only)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Unsplash Access Key:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
   ```

### 3. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and verify:
   - Images load from Unsplash API
   - Attribution appears at the bottom of cards
   - Fallbacks work if you disconnect internet
   - Download tracking works in browser DevTools Network tab

### 4. Production Deployment

**IMPORTANT**: Never expose your Secret Key in frontend code. The current implementation only uses the Access Key which is safe for client-side use.

For production:
1. Set `VITE_UNSPLASH_ACCESS_KEY` in your deployment environment
2. Consider upgrading to Unsplash+ for higher rate limits
3. Monitor usage in your Unsplash dashboard

## Rate Limits

- **Demo Apps**: 50 requests per hour
- **Production Apps**: 5,000 requests per hour
- Current implementation uses caching to minimize API calls

## Technical Implementation

### Service Layer (`src/services/unsplash.ts`)
- API client with timeout and abort controller
- Memory caching with TTL and size limits
- Download tracking with proper client_id
- Metrics collection for monitoring

### Hook Layer (`src/hooks/useUnsplashPhoto.ts`)
- React hook for component integration
- Automatic cleanup and abort handling
- Attribution URL building
- Session-based download deduplication

### Component Integration (`src/components/PromptCard.jsx`)
- Seamless fallback cascade
- Proper attribution display
- Download tracking on user interactions
- Lazy loading and performance optimization

## Troubleshooting

### Images Not Loading
1. Check your `.env` file has the correct Access Key
2. Verify CSP headers allow Unsplash domains
3. Check browser DevTools for network errors
4. Ensure rate limits haven't been exceeded

### Attribution Not Showing
- Attribution only shows for successfully loaded Unsplash API images
- Fallback images (Unsplash Source, Picsum, gradients) don't show attribution

### Performance Issues
- Check cache hit rate in DevTools console (DEV mode)
- Consider adjusting TTL_MS in `unsplash.ts`
- Monitor network waterfall for preconnect effectiveness

## Development Commands

```bash
# Start development with verbose Unsplash logging
VITE_DEBUG_UNSPLASH=true npm run dev

# Build for production
npm run build

# Test fallback system (disconnect internet after initial load)
npm run dev
```

## License Compliance

This implementation complies with:
- ✅ Unsplash API Guidelines
- ✅ Attribution requirements
- ✅ Download tracking requirements
- ✅ Rate limiting best practices
- ✅ Security best practices (no Secret Key exposure)

## Next Steps

Consider implementing:
- [ ] Backend proxy for Secret Key operations
- [ ] Advanced caching with Redis
- [ ] Image placeholder while loading
- [ ] A/B testing for different image styles
- [ ] Analytics integration