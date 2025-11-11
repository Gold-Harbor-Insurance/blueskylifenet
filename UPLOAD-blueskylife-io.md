# Upload Instructions for blueskylife.io

## 📦 File to Upload
**`blueskylife-io.tar.gz`** (529KB)

---

## 🚀 cPanel Upload Steps

### 1. Log into blueskylife.io cPanel
- Go to your hosting cPanel login for blueskylife.io

### 2. Open File Manager
- Click **"File Manager"**
- Navigate to **`public_html`** folder

### 3. Upload the File
1. Click **"Upload"** button
2. Select **`blueskylife-io.tar.gz`**
3. Wait for upload to complete (100%)

### 4. Extract the Archive
1. Find `blueskylife-io.tar.gz` in file list
2. **Right-click** → **"Extract"**
3. Click **"Extract Files"**
4. Wait for completion
5. Delete the .tar.gz file (optional - saves space)

### 5. Verify Files

Your `public_html` should have:
```
public_html/
├── index.html
├── favicon.png
├── .htaccess
└── assets/
    ├── index-CiECKm5G.js
    ├── index-BbUQWaew.css
    └── BlueSky Life Landscape transparent bg_1762273618192-CJiY-UJy.png
```

---

## ✅ Test blueskylife.io

Visit these URLs to test all 3 audiences:

**Seniors:**
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/seniors`

**Veterans:**
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`

**First Responders:**
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/first-responders`

All should work with:
- ✅ Full design
- ✅ Quiz functionality
- ✅ GTM tracking for blueskylife.io
- ✅ All 3 audience landing pages

---

## 🔧 Cloudflare DNS for blueskylife.io

Make sure your Cloudflare has these DNS records:

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

SSL/TLS: Set to "Flexible" or "Full"
Always Use HTTPS: Enabled

---

Done! This site is now independent and fully functional on blueskylife.io.
