# Deployment Process - CI/CD Pipeline

## ✅ What's Protected

### Critical Tracking Files (DO NOT MODIFY):
1. `scripts/partials/gtm-net-head.html` - Stape for blueskylife.net
2. `scripts/partials/gtm-net-body.html`
3. `scripts/partials/gtm-io-head.html` - Stape for blueskylife.io
4. `scripts/partials/gtm-io-body.html`

See `CRITICAL-TRACKING-FILES.md` for details.

---

## 🚀 Automated Deployment (GitHub Actions)

### How It Works:

1. **Push to GitHub** → Triggers build automatically (or manual trigger)
2. **Build Step** → Runs `node scripts/build-both.js`
3. **⚠️ VERIFICATION** → Runs `bash scripts/verify-tracking.sh`
   - **If tracking is broken**: Build fails, deployment blocked ❌
   - **If tracking is correct**: Proceeds to deployment ✅
4. **Deploy .net** → Uploads `builds/net/` to blueskylife.net
5. **Deploy .io** → Uploads `builds/io/` to blueskylife.io

### Required GitHub Secrets:

You need to add these to your GitHub repo settings (`Settings → Secrets and variables → Actions`):

**For blueskylife.net:**
- `FTP_SERVER` (e.g., ftp.blueskylife.net)
- `FTP_USERNAME` (your FTP username)
- `FTP_PASSWORD` (your FTP password)
- `FTP_SERVER_DIR` (e.g., /public_html/)

**For blueskylife.io:**
- `FTP_SERVER_IO` (e.g., ftp.blueskylife.io)
- `FTP_USERNAME_IO` (your FTP username)
- `FTP_PASSWORD_IO` (your FTP password)
- `FTP_SERVER_DIR_IO` (e.g., /public_html/)

### To Deploy:

**Option 1: Automatic** (when CI/CD is set up)
```bash
git add .
git commit -m "Your changes"
git push
```
GitHub Actions will automatically build, verify, and deploy.

**Option 2: Manual Trigger**
Go to GitHub → Actions → "Build and Deploy to cPanel" → Run workflow

---

## 🧪 Manual Deployment (Without CI/CD)

### Step 1: Build Both Sites
```bash
node scripts/build-both.js
```

### Step 2: Verify Tracking
```bash
bash scripts/verify-tracking.sh
```

**You MUST see this message:**
```
✅✅✅ ALL TRACKING VERIFICATION PASSED ✅✅✅
```

**If you see errors, DO NOT DEPLOY!**

### Step 3: Upload via FTP

**For blueskylife.net:**
- Upload everything from `builds/net/` to your server

**For blueskylife.io:**
- Upload everything from `builds/io/` to your server

---

## 🛡️ Safety Guarantees

### 1. Automated Verification
Every build runs `verify-tracking.sh` which checks:
- ✅ Stape domain: `https://trk.blueskylife.net` for .net
- ✅ Stape domain: `https://trk.blueskylife.io` for .io
- ✅ Container IDs: `9xlucidfh` for .net, `ebuxpqzdv` for .io
- ✅ .htaccess files present

**If ANY check fails → Deployment is blocked**

### 2. Locked Tracking Files
- Tracking scripts live in `scripts/partials/` directory
- Build process copies them without modification
- Git history allows instant rollback

### 3. Separate Builds
- `builds/net/` contains ONLY .net Stape tracking
- `builds/io/` contains ONLY .io Stape tracking
- Impossible to accidentally deploy wrong tracking

### 4. Build Artifacts
- GitHub Actions saves builds for 7 days
- Can download and redeploy previous working builds

---

## 🔴 If Deployment Fails

### If Verification Fails:
```bash
# Check what's wrong
bash scripts/verify-tracking.sh

# If tracking files were modified, restore from git
git checkout scripts/partials/gtm-net-head.html
git checkout scripts/partials/gtm-io-head.html

# Rebuild
node scripts/build-both.js

# Verify again
bash scripts/verify-tracking.sh
```

### If Deployment Fails:
1. Check GitHub Actions logs
2. Verify FTP credentials are correct
3. Check server permissions

---

## 📊 What Gets Deployed

Each domain gets its own independent build:

### blueskylife.net
- `index.html` (with Stape: trk.blueskylife.net)
- `.htaccess` (routing rules)
- `htaccess` (visible copy)
- `favicon.png`
- `assets/` (JS & CSS)

### blueskylife.io
- `index.html` (with Stape: trk.blueskylife.io)
- `.htaccess` (routing rules)
- `htaccess` (visible copy)
- `favicon.png`
- `assets/` (JS & CSS)

---

## ✅ Verification Checklist

Before every deployment, confirm:
- [ ] `bash scripts/verify-tracking.sh` shows all green checkmarks
- [ ] No modifications to `scripts/partials/gtm-*.html` files
- [ ] Both builds created: `builds/net/` and `builds/io/`
- [ ] .htaccess files present in both builds

**Only deploy if all checks pass.**
