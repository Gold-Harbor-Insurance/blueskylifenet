# GitHub Actions CI/CD Setup Guide

This repository uses GitHub Actions for automated builds with **manual approval required** before deployment to production.

## 🔐 Required GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** and add these secrets:

### FTP Credentials
- `FTP_SERVER` - Your cPanel FTP server (e.g., `ftp.blueskylife.net` or IP address)
- `FTP_USERNAME` - Your FTP username
- `FTP_PASSWORD` - Your FTP password
- `FTP_SERVER_DIR` - Your server directory path (e.g., `/public_html/` or `/`)

## 🌍 Setting Up the Production Environment (APPROVAL BUTTON)

This is what enables the **approval button** before deployment!

1. Go to your repository → **Settings** → **Environments**
2. Click **New environment**
3. Name it: `production`
4. Click **Configure environment**
5. Enable **Required reviewers**
6. Add yourself (and any team members) as required reviewers
7. Click **Save protection rules**

### Optional Environment Settings:
- **Wait timer**: Add a delay before deployment (e.g., 5 minutes)
- **Deployment branches**: Restrict to `main` branch only (recommended)

## 📋 How the Pipeline Works

### On Every Push to `main`:

1. **Build Job** (Automatic)
   - ✅ Checks out code
   - ✅ Installs dependencies
   - ✅ Builds the production files
   - ✅ Uploads build artifacts

2. **Deploy Job** (Manual Approval Required)
   - ⏸️ **PAUSES** and waits for approval
   - 🔔 Sends notification to required reviewers
   - ✅ Shows **Review pending deployments** button in GitHub
   - ⚠️ Will NOT proceed until approved

### How to Approve Deployment:

1. Go to **Actions** tab in GitHub
2. Click on the workflow run
3. You'll see a **Review pending deployments** button
4. Click the button
5. Select `production` environment
6. Click **Approve and deploy**
7. Deployment starts automatically

### Manual Trigger:

You can also trigger the workflow manually:
1. Go to **Actions** tab
2. Click **Build and Deploy to cPanel**
3. Click **Run workflow**
4. Select branch (`main`)
5. Click **Run workflow**
6. Approve when prompted

## 🚀 Deployment Process

Once approved, the pipeline:
1. Downloads the built files
2. Connects to your cPanel via FTP
3. Uploads `dist/public/` contents to your server
4. Your site is live at https://blueskylife.net

## 📊 Monitoring Deployments

- **Actions Tab**: See all workflow runs and their status
- **Environments**: View deployment history for production
- **Email Notifications**: GitHub sends emails when approval is needed

## 🔒 Security Best Practices

- ✅ Never commit FTP credentials to the repository
- ✅ Always use GitHub Secrets for sensitive data
- ✅ Require at least one reviewer for production deployments
- ✅ Review changes before approving deployment
- ✅ Use branch protection rules on `main`

## 🛠️ Troubleshooting

### Build fails
- Check the **Build Application** job logs
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

### Deployment fails
- Verify FTP secrets are correct
- Check `FTP_SERVER_DIR` path is correct
- Test FTP connection with FileZilla or similar

### No approval button appears
- Verify `production` environment is set up
- Ensure required reviewers are configured
- Check you're looking at the correct workflow run

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
