# Upload Instructions for blueskylife.io

## ✅ What's Included - blueskylife.io ONLY

**File:** `blueskylife-IO-FINAL.tar.gz` (529KB)

**Tracking codes on this domain:**
- ✅ Stape GTM for blueskylife.io (trk.blueskylife.io) - ONLY
- ✅ GA4: G-28KJ7WJ59B
- ✅ Hotjar ID: 6565368
- ❌ NO Facebook Pixel
- ❌ NO blueskylife.net GTM

---

## 🚀 cPanel Upload

### 1. Log into blueskylife.io cPanel

### 2. File Manager → Navigate to `public_html`

### 3. Upload `blueskylife-IO-FINAL.tar.gz`
- Click "Upload" button
- Select the file
- Wait for 100% completion

### 4. Extract the Archive
- Right-click `blueskylife-IO-FINAL.tar.gz`
- Click "Extract"
- Click "Extract Files"
- Delete the .tar.gz file after extraction

### 5. Verify Files in public_html
```
public_html/
├── index.html          ✅
├── favicon.png         ✅
├── .htaccess          ✅ (handles routing)
└── assets/            ✅
    ├── index-CiECKm5G.js
    ├── index-BbUQWaew.css
    └── BlueSky Life Landscape transparent bg_1762273618192-CJiY-UJy.png
```

---

## ✅ Test All URLs

**All 3 audiences work on blueskylife.io:**

- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/first-responders`

**What to check:**
- ✅ Full design loads
- ✅ Quiz works
- ✅ Testimonials touch blue bar (no space)
- ✅ Press F12 → Console → Look for GTM events
- ✅ Should see: trk.blueskylife.io loading
- ✅ Should see: GA4 (G-28KJ7WJ59B) loading
- ✅ Should see: Hotjar script loading

---

## 🔧 Cloudflare DNS

Make sure Cloudflare has:

```
Type: A
Name: @
IPv4: [Your Server IP]
Proxy: ON (orange cloud) ✅
```

```
Type: A
Name: www
IPv4: [Your Server IP]
Proxy: ON (orange cloud) ✅
```

**SSL/TLS:** Flexible or Full
**Always Use HTTPS:** Enabled

---

## 🎯 Summary

This is a completely independent site for **blueskylife.io ONLY** with:
- Only .io Stape GTM tracking
- Only .io GA4 tracking
- Only .io Hotjar
- All 3 audience landing pages
- Same quiz flow
- Clean, no duplicate tracking codes

---

## 📊 Tracking Script Order

The scripts load in this order (important for server-side tracking):

1. **Stape GTM** (trk.blueskylife.io)
2. **GA4** (G-28KJ7WJ59B) ← Feeds data to Stape server container
3. **Hotjar** (6565368)

The GA4 snippet is critical - without it, your Facebook CAPI server events won't fire!
