# Two Independent Websites - Upload Guide

You have **TWO separate website files** for **TWO separate domains**.

---

## 📦 Files to Download

### For blueskylife.net:
- **File:** `blueskylife-net.tar.gz` (529KB)
- **Instructions:** `UPLOAD-blueskylife-net.md`

### For blueskylife.io:
- **File:** `blueskylife-io.tar.gz` (529KB)
- **Instructions:** `UPLOAD-blueskylife-io.md`

---

## 🎯 What Each Site Contains

**Both sites are identical and include:**
- ✅ All 3 audience landing pages (Seniors, Veterans, First Responders)
- ✅ Same quiz flow for all audiences
- ✅ Same design and functionality
- ✅ Independent GTM tracking (each domain has its own GTM container)
- ✅ GA4 Analytics
- ✅ Hotjar tracking
- ✅ Facebook Pixel
- ✅ All testimonials and content

**The sites work independently:**
- blueskylife.net tracks with its own GTM container
- blueskylife.io tracks with its own GTM container
- Each can be hosted on the same server or different servers
- Cloudflare protects each domain separately

---

## 📋 Upload Checklist

### For Your Developer:

**Site 1 - blueskylife.net:**
- [ ] Download `blueskylife-net.tar.gz`
- [ ] Read `UPLOAD-blueskylife-net.md`
- [ ] Log into blueskylife.net cPanel
- [ ] Upload and extract to `public_html`
- [ ] Test all 3 audience pages
- [ ] Verify GTM tracking fires

**Site 2 - blueskylife.io:**
- [ ] Download `blueskylife-io.tar.gz`
- [ ] Read `UPLOAD-blueskylife-io.md`
- [ ] Log into blueskylife.io cPanel
- [ ] Upload and extract to `public_html`
- [ ] Test all 3 audience pages
- [ ] Verify GTM tracking fires

---

## 🔗 All URLs That Should Work

### blueskylife.net:
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/veterans`
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/first-responders`

### blueskylife.io:
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/first-responders`

---

## ✅ Final Setup

After both sites are uploaded:

1. **Cloudflare DNS** - Point both domains to your server (orange cloud ON)
2. **Test Each Domain** - Visit all 6 URLs above
3. **Check GTM** - Press F12, verify tracking fires on each site
4. **Verify Design** - Testimonials touch blue bar, all spacing correct

---

## 💡 Key Points

- ✅ These are TWO independent websites
- ✅ They have the same content, but operate separately
- ✅ Each tracks independently through its own GTM container
- ✅ You can run marketing campaigns to either domain
- ✅ Both protected by Cloudflare

**Send both files to your developer with their respective instruction files!**
