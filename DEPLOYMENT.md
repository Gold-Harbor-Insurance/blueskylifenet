# BlueSky Life - Deployment Guide

## Overview
This project generates **two separate production builds** with domain-specific Google Tag Manager (GTM) tracking:

- **blueskylife.net** - GTM Container: `GTM-W4CS9TZ4` on `https://trk.blueskylife.net`
- **blueskylife.io** - GTM Container: `GTM-W9243JWT` on `https://trk.blueskylife.io`

## Building for Production

### Quick Build
Run the build script to generate both domain-specific builds:

```bash
node scripts/build-both.js
```

This will:
1. Build the application once using Vite
2. Copy the build to `builds/net/` with blueskylife.net GTM tracking
3. Copy the build to `builds/io/` with blueskylife.io GTM tracking

### Build Output

After running the script, you'll have two deployment-ready directories:

```
builds/
├── net/                    # Deploy to blueskylife.net
│   ├── index.html         # Contains GTM-W4CS9TZ4
│   ├── favicon.png
│   ├── .htaccess
│   └── assets/
│       ├── index-[hash].js
│       ├── index-[hash].css
│       └── BlueSky Life Landscape transparent bg_*.png
│
└── io/                     # Deploy to blueskylife.io
    ├── index.html         # Contains GTM-W9243JWT
    ├── favicon.png
    ├── .htaccess
    └── assets/
        ├── index-[hash].js
        ├── index-[hash].css
        └── BlueSky Life Landscape transparent bg_*.png
```

## Deployment Instructions

### FTP Deployment

1. **For blueskylife.net:**
   - Connect to blueskylife.net FTP server
   - Upload all files from `builds/net/` to the web root
   - Ensure `.htaccess` is uploaded for proper routing

2. **For blueskylife.io:**
   - Connect to blueskylife.io FTP server
   - Upload all files from `builds/io/` to the web root
   - Ensure `.htaccess` is uploaded for proper routing

### Verification

After deployment, verify the correct GTM tracking is loaded:

1. Open browser developer tools
2. Navigate to each domain
3. Check the Network tab for GTM requests:
   - blueskylife.net should load from `https://trk.blueskylife.net`
   - blueskylife.io should load from `https://trk.blueskylife.io`

## GTM Configuration

### How GTM Scripts are Injected

The build system uses a placeholder-based injection system:

1. **Source Template**: `client/index.html` contains placeholders:
   ```html
   <!-- GTM_HEAD_PLACEHOLDER -->
   <!-- GTM_BODY_PLACEHOLDER -->
   ```

2. **GTM Partials**: Domain-specific GTM scripts are stored in:
   - `scripts/partials/gtm-net-head.html`
   - `scripts/partials/gtm-net-body.html`
   - `scripts/partials/gtm-io-head.html`
   - `scripts/partials/gtm-io-body.html`

3. **Build Process**: `scripts/build-both.js` replaces placeholders with the correct GTM scripts

### Updating GTM Scripts

If you need to update the GTM tracking scripts:

1. Edit the appropriate partial file in `scripts/partials/`
2. Run the build script: `node scripts/build-both.js`
3. Redeploy the updated build(s)

**Do not** modify `client/index.html` directly - use the partial files to maintain consistency.

## External ID Implementation

Both builds include the latest External ID tracking implementation:

- **External IDs** are generated on form submission (not relying solely on cookies)
- **Raw ID** (`external_id`) sent to Ringba and Make.com webhook
- **Hashed ID** (`external_id_hashed`) sent to Facebook via GTM
- **Cookie fallback** for GTM/Facebook tracking if generation fails

### Data Flow
```
Form Submission
    ↓
Generate External IDs (try/catch with fallback)
    ↓
webhookData { external_id, external_id_hashed }
    ↓
    ├─→ Ringba API (both IDs)
    ├─→ Make.com Webhook (both IDs)
    └─→ GTM/Facebook (hashed ID only)
```

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Verify GTM partial files exist in `scripts/partials/`
- Check that `client/index.html` contains the placeholder comments

### GTM Not Loading
- Verify correct build was deployed to correct domain
- Check browser console for errors
- Confirm GTM container ID matches domain:
  - `.net` → GTM-W4CS9TZ4
  - `.io` → GTM-W9243JWT

### External IDs Missing
- Check browser console for warnings about External ID generation
- Verify both Ringba and webhook logs show external_id values
- External IDs should be populated even if cookies are blocked

## Support

For issues or questions about deployment:
1. Check this guide first
2. Review console logs for errors
3. Verify build output matches expected structure
4. Contact development team if issues persist
