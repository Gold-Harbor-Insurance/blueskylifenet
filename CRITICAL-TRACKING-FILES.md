# ⚠️ CRITICAL TRACKING FILES - DO NOT MODIFY

## These files contain Stape GTM tracking scripts
## Modifying these will break server-side tracking and Facebook CAPI

### Protected Files:

1. **scripts/partials/gtm-net-head.html**
   - Stape domain: https://trk.blueskylife.net
   - Container: 9xlucidfh
   - Used by: blueskylife.net

2. **scripts/partials/gtm-net-body.html**
   - Stape body script for blueskylife.net

3. **scripts/partials/gtm-io-head.html**
   - Stape domain: https://trk.blueskylife.io
   - Container: ebuxpqzdv
   - Used by: blueskylife.io

4. **scripts/partials/gtm-io-body.html**
   - Stape body script for blueskylife.io

---

## ⛔ RULES:

1. **NEVER** edit these 4 files unless you have the exact replacement script from Stape dashboard
2. **NEVER** minify, beautify, or reformat these scripts
3. **ALWAYS** verify builds contain correct tracking before deployment
4. If tracking breaks, restore from git history immediately

---

## Verification Before Deployment:

Run this before deploying:
```bash
# Verify .net Stape domain
grep -q "https://trk.blueskylife.net" builds/net/index.html && echo "✅ .net Stape OK" || echo "❌ .net BROKEN"

# Verify .io Stape domain  
grep -q "https://trk.blueskylife.io" builds/io/index.html && echo "✅ .io Stape OK" || echo "❌ .io BROKEN"
```

Both must show ✅ before uploading to production.
