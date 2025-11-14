#!/bin/bash

# Verification script to ensure Stape tracking is intact before deployment
# Run this before every deployment: bash scripts/verify-tracking.sh

set -e  # Exit on any error

echo ""
echo "🔍 Verifying Stape GTM Tracking Configuration..."
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

FAILED=0

# Function to check tracking
check_tracking() {
  local site=$1
  local domain=$2
  local container=$3
  local file=$4
  
  echo "Checking $site..."
  
  # Check Stape domain
  if grep -q "$domain" "$file"; then
    echo -e "${GREEN}✅${NC} Stape domain correct: $domain"
  else
    echo -e "${RED}❌ ERROR${NC}: Stape domain missing or wrong in $file"
    FAILED=1
  fi
  
  # Check container ID
  if grep -q "$container" "$file"; then
    echo -e "${GREEN}✅${NC} Container ID correct: $container"
  else
    echo -e "${RED}❌ ERROR${NC}: Container ID missing or wrong in $file"
    FAILED=1
  fi
  
  echo ""
}

# Verify builds exist
if [ ! -f "builds/net/index.html" ]; then
  echo -e "${RED}❌ ERROR${NC}: builds/net/index.html not found!"
  echo "Run: node scripts/build-both.js"
  exit 1
fi

if [ ! -f "builds/io/index.html" ]; then
  echo -e "${RED}❌ ERROR${NC}: builds/io/index.html not found!"
  echo "Run: node scripts/build-both.js"
  exit 1
fi

# Check blueskylife.net
check_tracking "blueskylife.net" "https://trk.blueskylife.net" "9xlucidfh" "builds/net/index.html"

# Check blueskylife.io
check_tracking "blueskylife.io" "https://trk.blueskylife.io" "ebuxpqzdv" "builds/io/index.html"

# Verify .htaccess files
echo "Checking .htaccess files..."
if [ -f "builds/net/.htaccess" ] && [ -f "builds/io/.htaccess" ]; then
  echo -e "${GREEN}✅${NC} .htaccess files present"
else
  echo -e "${RED}❌ ERROR${NC}: .htaccess files missing!"
  FAILED=1
fi
echo ""

# Final result
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}✅✅✅ ALL TRACKING VERIFICATION PASSED ✅✅✅${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo "Safe to deploy!"
  echo ""
  exit 0
else
  echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${RED}❌❌❌ TRACKING VERIFICATION FAILED ❌❌❌${NC}"
  echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo "DO NOT DEPLOY - Fix tracking issues first!"
  echo ""
  exit 1
fi
