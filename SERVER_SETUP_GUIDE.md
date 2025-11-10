# BlueSky Life - Server Setup Guide with Cloudflare

## What You're Uploading

The file `bluesky-complete-fixed.tar.gz` contains everything you need:
- `public/` folder with all your website files
- `index.js` - Your backend server (Node.js)

## Step 1: Upload Files to Your Server

### Extract the archive:
```bash
tar -xzf bluesky-complete-fixed.tar.gz
```

### Your server should look like this:
```
/var/www/html/  (or your web root)
├── index.js
├── public/
│   ├── index.html
│   ├── favicon.png
│   └── assets/
│       ├── index-CiECKm5G.js
│       ├── index-BbUQWaew.css
│       └── BlueSky Life Landscape transparent bg_1762273618192-CJiY-UJy.png
```

## Step 2: Install Node.js on Your Server

Your server needs Node.js 18 or higher.

**Check if installed:**
```bash
node --version
```

**If not installed (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 3: Run Your Application

### Install PM2 (keeps your app running):
```bash
sudo npm install -g pm2
```

### Start your app:
```bash
cd /var/www/html
PORT=5000 NODE_ENV=production pm2 start index.js --name blueskylife
pm2 save
pm2 startup
```

Your app now runs on port 5000.

## Step 4: Configure Nginx as Reverse Proxy

Create nginx config at `/etc/nginx/sites-available/blueskylife`:

```nginx
server {
    listen 80;
    server_name blueskylife.net www.blueskylife.net blueskylife.io www.blueskylife.io;

    # Let Cloudflare handle SSL, but support HTTPS redirects
    if ($http_x_forwarded_proto = "http") {
        return 301 https://$server_name$request_uri;
    }

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/blueskylife /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: Cloudflare Setup

### 1. Add Your Domains to Cloudflare
- Go to Cloudflare dashboard
- Click "Add a Site"
- Add `blueskylife.net`
- Add `blueskylife.io`

### 2. Point Domains to Your Server
Add these DNS records for EACH domain:

**A Record:**
```
Type: A
Name: @
IPv4 address: [YOUR SERVER IP]
Proxy status: Proxied (orange cloud)
TTL: Auto
```

**A Record for www:**
```
Type: A
Name: www
IPv4 address: [YOUR SERVER IP]
Proxy status: Proxied (orange cloud)
TTL: Auto
```

### 3. Cloudflare SSL/TLS Settings
- Go to SSL/TLS tab
- Set to **"Flexible"** or **"Full"** mode
- Enable "Always Use HTTPS"

### 4. Update Nameservers
- At your domain registrar (GoDaddy, Namecheap, etc.)
- Change nameservers to Cloudflare's (they'll provide these)
- Wait 5-30 minutes for propagation

## Step 6: Verify Everything Works

Visit your domains:
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`

Check for:
- ✅ Page loads with full design
- ✅ GTM tracking fires (check browser console)
- ✅ Quiz flows work
- ✅ Green padlock (HTTPS)

## Troubleshooting

### CSS/JS Not Loading?
Make sure nginx is proxying to port 5000 where your Node app runs.

### GTM Not Firing?
Check browser console for errors. Should see GTM events.

### App Won't Start?
```bash
pm2 logs blueskylife
```

### Check if App is Running:
```bash
pm2 status
curl http://localhost:5000
```

## Benefits You Get:

✅ Cloudflare DDoS protection
✅ Cloudflare CDN (faster page loads)
✅ Cloudflare firewall rules
✅ Free Cloudflare SSL certificate
✅ Your own dedicated IP
✅ Full control over server
