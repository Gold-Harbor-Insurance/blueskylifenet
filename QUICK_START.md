# Quick Start - Upload and Go!

## 📦 Download This File
`bluesky-cloudflare-ready.tar.gz` (531KB)

## 🚀 OPTION A: Simple Apache Hosting (Easiest!)

If your server has Apache (most shared hosting does):

### 1. Extract the archive:
```bash
tar -xzf bluesky-cloudflare-ready.tar.gz
```

### 2. Upload the `public/` folder contents to your web root:
- Upload everything from `public/` to `/public_html/` or `/var/www/html/`
- Make sure `index.html` is at the root
- Make sure `assets/` folder is at the root
- The `.htaccess` file handles all routing automatically!

### 3. Done! Your site should work.

**No Node.js needed for this option!** The `.htaccess` file already has all the routing rules.

---

## 🔧 OPTION B: Node.js Backend (If you need the backend)

If you want to run the Node.js backend:

### 1. Extract archive and upload both folders:
```bash
tar -xzf bluesky-cloudflare-ready.tar.gz
```

Upload:
- `public/` folder
- `index.js` file

### 2. Install Node.js 18+ on your server

### 3. Start the backend:
```bash
npm install -g pm2
PORT=5000 NODE_ENV=production pm2 start index.js --name blueskylife
pm2 save
```

### 4. Configure Nginx or Apache to proxy to port 5000
- See `SERVER_SETUP_GUIDE.md` for Nginx config
- See `APACHE_CONFIG.md` for Apache config

---

## ☁️ Cloudflare Setup (Do This Last)

### 1. Add both domains to Cloudflare:
- `blueskylife.net`
- `blueskylife.io`

### 2. Add DNS A records for each domain:
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

### 3. SSL/TLS Settings in Cloudflare:
- Go to SSL/TLS tab
- Choose "Flexible" (if no SSL on server) or "Full" (if you have SSL)
- Enable "Always Use HTTPS"

### 4. Update nameservers at your registrar
- Point to Cloudflare's nameservers (they'll give you these)

### 5. Wait 5-30 minutes for DNS propagation

---

## ✅ Test Your Site

Visit:
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`

Should see:
- ✅ Full design loads
- ✅ Quiz works
- ✅ GTM tracking fires (open browser console, look for "📊 GTM Event")
- ✅ Green padlock (HTTPS)

---

## 🆘 Troubleshooting

### Design broken / files not loading?
- Make sure `assets/` folder is at the web root
- Make sure `index.html` is at the web root
- Check Apache has `mod_rewrite` enabled

### GTM not firing?
- Open browser console (F12)
- Look for GTM event logs
- Make sure no JavaScript errors

### Still stuck?
Check the detailed guides:
- `SERVER_SETUP_GUIDE.md` - Full Nginx setup
- `APACHE_CONFIG.md` - Apache configuration
