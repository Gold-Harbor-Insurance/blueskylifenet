# CI/CD Pipeline - Safeguards Against Breaking Stape Tracking

## What Was Wrong Before

The previous GitHub Actions workflow was deploying `dist/public/` to **both** domains, which meant:
- Both sites got the same GTM tracking code
- No verification before deployment
- Easy to break Stape tracking without noticing

## What's Fixed Now

### ✅ 1. Separate Domain-Specific Builds

**Before:** One build → deployed to both sites  
**Now:** Two builds → each with correct Stape tracking

- `builds/net/` → blueskylife.net (Stape: trk.blueskylife.net)
- `builds/io/` → blueskylife.io (Stape: trk.blueskylife.io)

### ✅ 2. Automated Verification (Hard Blocker)

Every deployment now runs `scripts/verify-tracking.sh` which checks:

```bash
✅ Stape domain: https://trk.blueskylife.net
✅ Container ID: 9xlucidfh
✅ Stape domain: https://trk.blueskylife.io  
✅ Container ID: ebuxpqzdv
✅ .htaccess files present
```

**If ANY check fails → GitHub Actions build fails → Deployment blocked**

This runs BEFORE deployment, so broken tracking never reaches production.

### ✅ 3. Protected Tracking Files

Created `CRITICAL-TRACKING-FILES.md` that marks these as DO NOT MODIFY:
- `scripts/partials/gtm-net-head.html`
- `scripts/partials/gtm-net-body.html`
- `scripts/partials/gtm-io-head.html`
- `scripts/partials/gtm-io-body.html`

The build script copies these without modification - it cannot accidentally break them.

### ✅ 4. Updated GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**What it does:**
1. Builds both sites: `node scripts/build-both.js`
2. **VERIFICATION STEP** (new): `bash scripts/verify-tracking.sh`
3. If verification passes → Deploy .net build to blueskylife.net
4. If verification passes → Deploy .io build to blueskylife.io

Each deployment confirms which Stape domain was deployed.

### ✅ 5. Git Rollback Safety

- All tracking files are in git
- Can instantly rollback: `git checkout scripts/partials/gtm-net-head.html`
- Build artifacts saved for 7 days in GitHub Actions

---

## How This Prevents Breaking Stape Again

### Scenario: Someone modifies tracking files

1. Developer changes `gtm-net-head.html`
2. Pushes to GitHub
3. GitHub Actions runs build
4. **Verification script runs** → Detects wrong Stape domain
5. **Build fails** → Deployment blocked
6. Developer sees error, fixes tracking
7. Only correct tracking reaches production

### Scenario: Build script breaks

1. Build script has a bug
2. Generates wrong `builds/net/index.html`
3. **Verification script runs** → Detects missing Stape domain
4. **Build fails** → Deployment blocked
5. Bug must be fixed before deployment

### Scenario: Want to deploy manually

1. Run: `node scripts/build-both.js`
2. Run: `bash scripts/verify-tracking.sh`
3. **If verification fails** → See red error messages
4. **Cannot proceed** until tracking is fixed
5. Only deploy when you see: ✅✅✅ ALL TRACKING VERIFICATION PASSED

---

## Concrete Guarantees

| What Could Go Wrong | How It's Prevented |
|---------------------|-------------------|
| Wrong Stape domain deployed | Verification script checks exact domains before deployment |
| Wrong container ID | Verification script checks exact container IDs |
| Both sites get same tracking | Separate builds from `builds/net/` and `builds/io/` |
| Tracking files accidentally modified | Protected with documentation + git rollback |
| Broken build reaches production | GitHub Actions fails before FTP deployment |
| No way to verify before deploying | Run `bash scripts/verify-tracking.sh` anytime |

---

## How to Deploy Now

### Automated (Recommended):
```bash
git push
```
GitHub Actions will build, verify, and deploy automatically.  
**Deployment only succeeds if all verification passes.**

### Manual:
```bash
# Build
node scripts/build-both.js

# Verify (REQUIRED)
bash scripts/verify-tracking.sh

# Only deploy if you see: ✅✅✅ ALL TRACKING VERIFICATION PASSED
```

---

## What You Can Trust

1. **Verification runs before every deployment** - Not optional, hardcoded into CI/CD
2. **Exact Stape domains are checked** - Script fails if wrong domain appears
3. **Separate builds** - Impossible to deploy .io tracking to .net site
4. **Git history** - Can rollback to any previous working version
5. **Build artifacts** - Can redeploy last working build from GitHub Actions

**Bottom line:** Stape tracking cannot break without the build failing first.
