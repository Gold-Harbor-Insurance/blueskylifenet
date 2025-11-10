#!/bin/bash

# BlueSky Life - Server Setup Verification Script
# Run this on your server to verify everything is configured correctly

echo "🔍 BlueSky Life Setup Verification"
echo "=================================="
echo ""

# Check if running as root/sudo
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Note: Some checks may require sudo privileges"
    echo ""
fi

# 1. Check Node.js
echo "1️⃣  Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js installed: $NODE_VERSION"
    if [[ "$NODE_VERSION" < "v18" ]]; then
        echo "   ⚠️  Warning: Node.js 18+ recommended"
    fi
else
    echo "   ❌ Node.js not installed (only needed for backend option)"
fi
echo ""

# 2. Check if app is running
echo "2️⃣  Checking if app is running on port 5000..."
if curl -s http://localhost:5000 > /dev/null 2>&1; then
    echo "   ✅ App is running on port 5000"
else
    echo "   ❌ App not responding on port 5000"
    echo "      Run: pm2 start index.js --name blueskylife"
fi
echo ""

# 3. Check Nginx
echo "3️⃣  Checking Nginx..."
if command -v nginx &> /dev/null; then
    echo "   ✅ Nginx installed"
    if systemctl is-active --quiet nginx; then
        echo "   ✅ Nginx is running"
    else
        echo "   ❌ Nginx is not running"
    fi
else
    echo "   ℹ️  Nginx not installed (checking Apache...)"
fi
echo ""

# 4. Check Apache
echo "4️⃣  Checking Apache..."
if command -v apache2 &> /dev/null || command -v httpd &> /dev/null; then
    echo "   ✅ Apache installed"
    if systemctl is-active --quiet apache2 || systemctl is-active --quiet httpd; then
        echo "   ✅ Apache is running"
    else
        echo "   ❌ Apache is not running"
    fi
    
    # Check mod_rewrite
    if apache2ctl -M 2>/dev/null | grep -q rewrite; then
        echo "   ✅ mod_rewrite enabled"
    else
        echo "   ⚠️  mod_rewrite not enabled (needed for routing)"
        echo "      Run: sudo a2enmod rewrite"
    fi
else
    echo "   ℹ️  Apache not installed"
fi
echo ""

# 5. Check if files exist
echo "5️⃣  Checking file structure..."
if [ -f "public/index.html" ]; then
    echo "   ✅ public/index.html found"
else
    echo "   ❌ public/index.html not found"
fi

if [ -d "public/assets" ]; then
    echo "   ✅ public/assets/ folder found"
    ASSET_COUNT=$(find public/assets -type f | wc -l)
    echo "      Found $ASSET_COUNT files in assets/"
else
    echo "   ❌ public/assets/ folder not found"
fi

if [ -f "public/.htaccess" ]; then
    echo "   ✅ .htaccess file found (for Apache routing)"
else
    echo "   ℹ️  .htaccess not found (only needed for Apache)"
fi

if [ -f "index.js" ]; then
    echo "   ✅ index.js backend found"
else
    echo "   ℹ️  index.js not found (only needed for backend option)"
fi
echo ""

# 6. Test website response
echo "6️⃣  Testing website..."
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    if [ "$HTTP_CODE" = "200" ]; then
        echo "   ✅ Website responds with HTTP 200"
    else
        echo "   ⚠️  Website returns HTTP $HTTP_CODE"
    fi
else
    echo "   ℹ️  curl not installed, skipping HTTP test"
fi
echo ""

# Summary
echo "=================================="
echo "📋 Summary"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Make sure all ✅ checks pass"
echo "2. Fix any ❌ errors"
echo "3. Set up Cloudflare DNS (see QUICK_START.md)"
echo "4. Test your domains:"
echo "   - https://blueskylife.net/final-expense/rb-f3q8n1z7rp0x/seniors"
echo "   - https://blueskylife.io/final-expense/rb-f3q8n1z7rp0x/veterans"
echo ""
echo "For detailed setup help, see:"
echo "- QUICK_START.md"
echo "- SERVER_SETUP_GUIDE.md"
echo "- APACHE_CONFIG.md"
echo ""
