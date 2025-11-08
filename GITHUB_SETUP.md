# GitHub Actions CI/CD Setup Guide

This repository uses GitHub Actions for **manual deployment** to production. The workflow only runs when you manually trigger it - no automatic deployments on push.

## 🔐 Required GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** and add these secrets:

### FTP Credentials for blueskylife.net
- `FTP_SERVER` - Your cPanel FTP server for .net domain (e.g., `ftp.blueskylife.net` or IP address)
- `FTP_USERNAME` - Your FTP username for .net
- `FTP_PASSWORD` - Your FTP password for .net
- `FTP_SERVER_DIR` - Your server directory path for .net (e.g., `/public_html/` or `/`)

### FTP Credentials for blueskylife.io
- `FTP_SERVER_IO` - Your cPanel FTP server for .io domain (e.g., `ftp.blueskylife.io` or IP address)
- `FTP_USERNAME_IO` - Your FTP username for .io
- `FTP_PASSWORD_IO` - Your FTP password for .io
- `FTP_SERVER_DIR_IO` - Your server directory path for .io (e.g., `/public_html/` or `/`)

## ✅ No Additional Setup Required

The workflow is configured for manual triggering only - no environment configuration needed!

## 📋 How the Pipeline Works

### Manual Deployment Only:

The workflow **only runs when you manually trigger it**. No automatic deployments happen on commits to `main`.

**To Deploy:**
1. Go to **Actions** tab in GitHub
2. Click **Build and Deploy to cPanel** workflow
3. Click **Run workflow** button (top-right)
4. Select branch: `main`
5. Click **Run workflow**

**What Happens:**
1. **Build Job** (Automatic)
   - ✅ Checks out code
   - ✅ Installs dependencies
   - ✅ Builds the production files
   - ✅ Uploads build artifacts

2. **Deploy to blueskylife.net** (Runs in parallel after build)
   - ✅ Downloads built files
   - ✅ Connects to .net cPanel via FTP
   - ✅ Deploys to blueskylife.net
   - ✅ No approval required!

3. **Deploy to blueskylife.io** (Runs in parallel after build)
   - ✅ Downloads built files
   - ✅ Connects to .io cPanel via FTP
   - ✅ Deploys to blueskylife.io
   - ✅ No approval required!

## 🚀 Deployment Process

Once you click "Run workflow", the pipeline:
1. Builds your production files (once)
2. Downloads the built files (twice - one for each domain)
3. Connects to both cPanel servers via FTP (in parallel)
4. Uploads `dist/public/` contents to both servers simultaneously
5. Your sites are live at:
   - https://blueskylife.net
   - https://blueskylife.io

## 📊 Monitoring Deployments

- **Actions Tab**: See all workflow runs and their status
- **Workflow Logs**: Click on any run to see detailed build and deployment logs
- **Email Notifications**: GitHub sends emails on workflow success/failure

## 🔒 Security Best Practices

- ✅ Never commit FTP credentials to the repository
- ✅ Always use GitHub Secrets for sensitive data
- ✅ Only trigger deployments when you're ready to go live
- ✅ Review code changes before running deployment workflow
- ✅ Use branch protection rules on `main` (optional)

## 🛠️ Troubleshooting

### Build fails
- Check the **Build Application** job logs
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

### Deployment fails
- Verify FTP secrets are correct
- Check `FTP_SERVER_DIR` path is correct
- Test FTP connection with FileZilla or similar
- Review deployment job logs in GitHub Actions

### Workflow doesn't start
- Make sure you clicked "Run workflow" in the Actions tab
- Verify you selected the `main` branch
- Check that the workflow file exists in `.github/workflows/deploy.yml`

## 📁 What Gets Deployed

Only the contents of `dist/public/` are deployed:
- `index.html`
- `favicon.png`
- `.htaccess` (routing configuration)
- `assets/` folder (CSS, JavaScript, images)

## 🎯 Landing Page URLs

After deployment, these URLs will be live:

**Streamlined Flow:**
- `/final-expense/rb-f3q8n1z7rp0x/seniors`
- `/final-expense/rb-f3q8n1z7rp0x/veterans`
- `/final-expense/rb-f3q8n1z7rp0x/firstresponders`

**NewsBreak Flow:**
- `/final-expense/nsbrk/seniors`
- `/final-expense/nsbrk/veterans`
- `/final-expense/nsbrk/firstresponders`

---

## 🆘 Need Help?

If you encounter issues:
1. Check the Actions tab for detailed error logs
2. Verify all secrets are set correctly
3. Ensure the production environment is configured
4. Test FTP credentials manually
