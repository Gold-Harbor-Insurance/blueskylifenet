# ✅ FINAL - Two Independent Sites Ready for Upload

## 📦 Files to Download

### Site 1: blueskylife.net
- **File:** `blueskylife-NET-FINAL.tar.gz` (529KB)
- **Instructions:** `UPLOAD-NET-FINAL.md`
- **Tracking:**
  - Stape GTM: trk.blueskylife.net ONLY
  - GA4: G-BXJ41XNT4H
  - Hotjar ID: 6572091
  - NO Facebook Pixel

### Site 2: blueskylife.io
- **File:** `blueskylife-IO-FINAL.tar.gz` (529KB)
- **Instructions:** `UPLOAD-IO-FINAL.md`
- **Tracking:**
  - Stape GTM: trk.blueskylife.io ONLY
  - GA4: G-28KJ7WJ59B
  - Hotjar ID: 6565368
  - NO Facebook Pixel

---

## ✅ Verified Clean Builds

Both sites have been verified to contain:
- ✅ ONLY their respective Stape GTM container (EXACT snippets - unmodified)
- ✅ Their respective GA4 tracking code
- ✅ ONLY their respective Hotjar pixel
- ✅ NO Facebook Pixel
- ✅ NO duplicate tracking codes
- ✅ All 3 audience landing pages (Seniors, Veterans, First Responders)
- ✅ Same quiz flow
- ✅ Testimonials touching blue bar perfectly
- ✅ All spacing and design fixes applied

---

## 🎯 What Each Site Has

**Both sites are identical in content and functionality:**
- All 3 audience landing pages
- Same quiz flow
- Same design
- Same user experience

**But they track independently:**
- blueskylife.net → Sends data to trk.blueskylife.net GTM + GA4 (G-BXJ41XNT4H) + Hotjar 6572091
- blueskylife.io → Sends data to trk.blueskylife.io GTM + GA4 (G-28KJ7WJ59B) + Hotjar 6565368

---

## 📝 Tracking Script Order (in each site's HTML)

1. **Stape GTM** (server-side tracking - feeds Facebook CAPI)
2. **GA4** (Google Analytics 4 - standard tracking)
3. **Hotjar** (heatmaps and session recordings)

The GA4 snippet is critical for server-side tracking to work - it sends data to your Stape server container, which then forwards events to Facebook CAPI.

---

## 📋 Upload Checklist for Your Developer

**For blueskylife.net:**
- [ ] Download `blueskylife-NET-FINAL.tar.gz`
- [ ] Read `UPLOAD-NET-FINAL.md`
- [ ] Upload to blueskylife.net cPanel
- [ ] Extract to public_html
- [ ] Test all 3 audience URLs
- [ ] Verify GTM fires (F12 console)
- [ ] Verify GA4 fires (F12 console)

**For blueskylife.io:**
- [ ] Download `blueskylife-IO-FINAL.tar.gz`
- [ ] Read `UPLOAD-IO-FINAL.md`
- [ ] Upload to blueskylife.io cPanel
- [ ] Extract to public_html
- [ ] Test all 3 audience URLs
- [ ] Verify GTM fires (F12 console)
- [ ] Verify GA4 fires (F12 console)

---

## 🔗 All 6 URLs That Should Work

### blueskylife.net:
1. `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
2. `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/veterans`
3. `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/first-responders`

### blueskylife.io:
4. `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/seniors`
5. `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`
6. `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/first-responders`

---

## 🛡️ Cloudflare Protection

Both domains protected by Cloudflare:
- DDoS protection
- CDN (faster loads worldwide)
- Firewall rules
- SSL/TLS certificates
- IP masking (your server IP is hidden)

---

## 🎉 You're All Set!

Send these files to your developer:
1. `blueskylife-NET-FINAL.tar.gz` + `UPLOAD-NET-FINAL.md`
2. `blueskylife-IO-FINAL.tar.gz` + `UPLOAD-IO-FINAL.md`

Each site takes ~5 minutes to upload and extract.

**No Node.js required** - The .htaccess file handles all routing automatically.

---

## 🔄 Server-Side Tracking Flow

With GA4 now included, your tracking flow works like this:

**User visits site** →  
**GA4 snippet fires** (browser) →  
**Sends data to Stape server container** →  
**Facebook CAPI tag processes it** →  
**Events appear in Facebook Events Manager**

Without the GA4 snippet, server-side tracking won't work!
