# cPanel Upload Instructions

## 📦 Download This File
**`blueskylife-cpanel.tar.gz`** (529KB)

---

## 🚀 Upload to cPanel (Both Domains)

### Step 1: Log into cPanel
- Go to your hosting provider's cPanel login
- Enter your username and password

### Step 2: Open File Manager
- Find and click **"File Manager"** in cPanel
- Navigate to **`public_html`** folder (or the folder for your domain)

### Step 3: Upload the Archive
1. Click the **"Upload"** button at the top
2. Click **"Select File"** 
3. Choose **`blueskylife-cpanel.tar.gz`**
4. Wait for upload to complete (shows 100%)
5. Click **"Go Back to..."** to return to File Manager

### Step 4: Extract the Archive
1. Find **`blueskylife-cpanel.tar.gz`** in the file list
2. **Right-click** on it → Select **"Extract"**
3. Click **"Extract Files"** button
4. Wait for extraction to complete
5. Click **"Close"**

### Step 5: Delete the Archive (Optional)
- Right-click `blueskylife-cpanel.tar.gz` → **Delete**
- This saves space, you don't need it anymore

### Step 6: Verify Files Are Correct

Your `public_html` folder should now look like this:

```
public_html/
├── index.html          ✅
├── favicon.png         ✅
├── .htaccess          ✅
└── assets/            ✅
    ├── index-CiECKm5G.js
    ├── index-BbUQWaew.css
    └── BlueSky Life Landscape transparent bg_1762273618192-CJiY-UJy.png
```

**IMPORTANT:** If you see a folder structure like this:
```
public_html/
└── public/           ❌ WRONG!
    └── index.html
```

Then the extraction put files in wrong place. You need to:
1. Move all files from `public/` folder UP to `public_html/`
2. Delete the empty `public/` folder

---

## 📋 For BOTH Domains

**If blueskylife.net and blueskylife.io are on the same server:**
- Upload to ONE `public_html` folder
- Both domains point to same files

**If blueskylife.net and blueskylife.io are on different servers:**
1. Upload to blueskylife.net cPanel → Extract
2. Upload to blueskylife.io cPanel → Extract
(Same files on both servers)

---

## ✅ Test Your Sites

After uploading, visit:
- `https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors`
- `https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans`

**You should see:**
- ✅ Full design loads correctly
- ✅ Quiz pages work
- ✅ No broken images or styles
- ✅ GTM tracking fires (check browser console - press F12)

---

## 🆘 Troubleshooting

### Design is broken / CSS not loading?

**Check file locations:**
1. In File Manager, click on `public_html`
2. You should see `index.html` directly in this folder
3. You should see `assets` folder directly in this folder
4. If not, files are in the wrong place - move them up

**Enable mod_rewrite (if needed):**
- Contact your hosting support
- Ask them to enable "mod_rewrite" for your account
- Or enable it in cPanel → Software → Select PHP Version → Extensions → Check "rewrite"

### Quiz pages show 404 errors?

The `.htaccess` file is missing or not working:
1. In File Manager, click the "Settings" button (top right)
2. Check "Show Hidden Files (dotfiles)" 
3. Click "Save"
4. Look for `.htaccess` file - it should be there
5. If missing, the extraction didn't work properly

### GTM not firing?

1. Press F12 to open browser console
2. Look for errors
3. Make sure JavaScript files loaded (check Network tab)
4. Should see GTM event logs in console

---

## 💡 Need Help?

If your developer still has issues:
1. Send them a screenshot of the File Manager showing the file structure
2. Check if `.htaccess` file is visible (enable "Show Hidden Files")
3. Make sure files are directly in `public_html`, not in a subfolder

The most common issue is files being in the wrong location. They must be at the root of `public_html`.
