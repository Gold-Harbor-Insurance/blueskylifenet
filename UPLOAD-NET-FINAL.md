# Upload Instructions for blueskylife.net

## ✅ What's Included - blueskylife.net ONLY

**File:** `blueskylife-NET-FINAL.tar.gz` (529KB)

**Tracking codes on this domain:**
- ✅ Stape GTM for blueskylife.net (trk.blueskylife.net) - ONLY
- ✅ GA4: G-BXJ41XNT4H
- ✅ Hotjar ID: 6572091
- ❌ NO Facebook Pixel
- ❌ NO blueskylife.io GTM

---

## 🚀 cPanel Upload

### 1. Log into blueskylife.net cPanel

### 2. File Manager → Navigate to `public_html`

### 3. Upload `blueskylife-NET-FINAL.tar.gz`
- Click "Upload" button
- Select the file
- Wait for 100% completion

### 4. Extract the Archive
- Right-click `blueskylife-NET-FINAL.tar.gz`
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

**All 3 audiences work on blueskylife.net:**

- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/veterans`
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/first-responders`

**What to check:**
- ✅ Full design loads
- ✅ Quiz works
- ✅ Testimonials touch blue bar (no space)
- ✅ Press F12 → Console → Look for GTM events
- ✅ Should see: trk.blueskylife.net loading
- ✅ Should see: GA4 (G-BXJ41XNT4H) loading
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

This is a completely independent site for **blueskylife.net ONLY** with:
- Only .net Stape GTM tracking
- Only .net GA4 tracking
- Only .net Hotjar
- All 3 audience landing pages
- Same quiz flow
- Clean, no duplicate tracking codes

---

## 📊 Tracking Script Order

The scripts load in this order (important for server-side tracking):

1. **Stape GTM** (trk.blueskylife.net)
2. **GA4** (G-BXJ41XNT4H) ← Feeds data to Stape server container
3. **Hotjar** (6572091)

The GA4 snippet is critical - without it, your Facebook CAPI server events won't fire!
