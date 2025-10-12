# Facebook Tracking Implementation

## What Was Added

Your landing pages now capture Facebook tracking cookies and send them to Ringba, which passes them to Make, and then to Facebook CAPI. This helps Facebook optimize your ads.

## How It Works (Simple Version)

1. **When someone clicks your Facebook ad:**
   - Facebook drops tracking "cookies" on their browser (fbclid, fbc, fbp)
   
2. **When they land on your website:**
   - The website automatically captures those cookies
   - Stores them for the entire session
   
3. **When they reach the Thank You page:**
   - The website sends those cookies to Ringba
   - Ringba passes them to Make
   - Make sends them to Facebook CAPI
   - Facebook knows which ad brought this person!

## The Tracking Cookies

- **fbclid** - Facebook Click ID from the URL (like `?fbclid=12345`)
- **fbc** - Facebook Browser Cookie (created from fbclid)
- **fbp** - Facebook Browser Pixel ID

## What Happens Behind the Scenes

### Landing Pages (Seniors & Veterans)
```
✅ Automatically capture tracking cookies when page loads
✅ Store them for the entire user session
```

### Thank You Page
```
✅ Retrieve stored tracking data
✅ Send to Ringba using custom tags
✅ Ringba forwards to Make → Make sends to Facebook CAPI
```

## Data Flow

```
Facebook Ad Click
    ↓
Landing Page (captures fbclid, fbc, fbp)
    ↓
Thank You Page (sends to Ringba)
    ↓
Ringba (forwards to Make)
    ↓
Make (sends to Facebook CAPI)
    ↓
Facebook (optimizes ads!)
```

## Important Notes

- This ONLY works for website traffic (not Facebook Lead Ads)
- Facebook Lead Ads don't have these cookies (people never visit your website)
- The cookies are stored in the browser session only
- No personal data is exposed - just tracking IDs

## Testing

To test if it's working:

1. Visit your landing page with `?fbclid=test123` in the URL
2. Open browser console (F12)
3. Type: `sessionStorage.getItem('fb_tracking')`
4. You should see: `{"fbclid":"test123","fbc":"fb.1.xxxxx.test123","fbp":"..."}`

## Files Modified

- `client/src/utils/facebookTracking.ts` - New utility for tracking
- `client/src/pages/SeniorsLanding.tsx` - Captures cookies on page load
- `client/src/pages/VeteransLanding.tsx` - Captures cookies on page load  
- `client/src/pages/ThankYou.tsx` - Sends cookies to Ringba

---

**Bottom Line:** Facebook can now track which ads bring people who fill out your form, so it can show your ads to more people like them!
