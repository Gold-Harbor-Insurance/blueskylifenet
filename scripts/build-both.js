#!/usr/bin/env node

/**
 * Build script for creating separate production builds for blueskylife.net and blueskylife.io
 * Each build has domain-specific GTM tracking scripts injected via placeholders
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏗️  Building production bundles for both domains...\n');

// Step 1: Verify GTM partials exist
console.log('✓ Verifying GTM partial files...');
const partialsDir = path.join(__dirname, 'partials');
const requiredPartials = [
  'gtm-net-head.html',
  'gtm-net-body.html',
  'gtm-io-head.html',
  'gtm-io-body.html'
];

for (const partial of requiredPartials) {
  const partialPath = path.join(partialsDir, partial);
  if (!fs.existsSync(partialPath)) {
    console.error(`❌ Missing required partial file: ${partial}`);
    process.exit(1);
  }
}

// Load GTM partials
const gtmNetHead = fs.readFileSync(path.join(partialsDir, 'gtm-net-head.html'), 'utf-8').trim();
const gtmNetBody = fs.readFileSync(path.join(partialsDir, 'gtm-net-body.html'), 'utf-8').trim();
const gtmIoHead = fs.readFileSync(path.join(partialsDir, 'gtm-io-head.html'), 'utf-8').trim();
const gtmIoBody = fs.readFileSync(path.join(partialsDir, 'gtm-io-body.html'), 'utf-8').trim();

console.log('✓ All GTM partials loaded\n');

// Step 2: Build the project
console.log('📦 Building project with Vite...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// Helper function to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Step 3: Copy to builds/net/
console.log('\n📋 Creating blueskylife.net build...');
const netDir = path.join(__dirname, '..', 'builds', 'net');
const sourceDir = path.join(__dirname, '..', 'dist', 'public');

// Clean and copy
if (fs.existsSync(netDir)) {
  fs.rmSync(netDir, { recursive: true });
}
copyDir(sourceDir, netDir);

// Inject GTM scripts for .net
const netIndexPath = path.join(netDir, 'index.html');
let netHtml = fs.readFileSync(netIndexPath, 'utf-8');

// Verify placeholders exist
if (!netHtml.includes('<!-- GTM_HEAD_PLACEHOLDER -->')) {
  console.error('❌ Missing <!-- GTM_HEAD_PLACEHOLDER --> in index.html');
  process.exit(1);
}
if (!netHtml.includes('<!-- GTM_BODY_PLACEHOLDER -->')) {
  console.error('❌ Missing <!-- GTM_BODY_PLACEHOLDER --> in index.html');
  process.exit(1);
}

// Replace placeholders with actual GTM scripts
netHtml = netHtml.replace('<!-- GTM_HEAD_PLACEHOLDER -->', gtmNetHead);
netHtml = netHtml.replace('<!-- GTM_BODY_PLACEHOLDER -->', gtmNetBody);

fs.writeFileSync(netIndexPath, netHtml);
console.log('   ✅ blueskylife.net build ready at: builds/net/');

// Step 4: Copy to builds/io/
console.log('\n📋 Creating blueskylife.io build...');
const ioDir = path.join(__dirname, '..', 'builds', 'io');

// Clean and copy
if (fs.existsSync(ioDir)) {
  fs.rmSync(ioDir, { recursive: true });
}
copyDir(sourceDir, ioDir);

// Inject GTM scripts for .io
const ioIndexPath = path.join(ioDir, 'index.html');
let ioHtml = fs.readFileSync(ioIndexPath, 'utf-8');

// Replace placeholders with actual GTM scripts
ioHtml = ioHtml.replace('<!-- GTM_HEAD_PLACEHOLDER -->', gtmIoHead);
ioHtml = ioHtml.replace('<!-- GTM_BODY_PLACEHOLDER -->', gtmIoBody);

fs.writeFileSync(ioIndexPath, ioHtml);
console.log('   ✅ blueskylife.io build ready at: builds/io/');

// Step 5: Display summary
console.log('\n✨ Build Summary:\n');
console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Domain: blueskylife.net                                     │');
console.log('│ Location: builds/net/                                       │');
console.log('│ GTM Container: GTM-W4CS9TZ4                                 │');
console.log('│ GTM Domain: https://trk.blueskylife.net                     │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');
console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Domain: blueskylife.io                                      │');
console.log('│ Location: builds/io/                                        │');
console.log('│ GTM Container: GTM-W9243JWT                                 │');
console.log('│ GTM Domain: https://trk.blueskylife.io                      │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

// Display file counts
const netFiles = execSync(`find builds/net -type f | wc -l`).toString().trim();
const ioFiles = execSync(`find builds/io -type f | wc -l`).toString().trim();

console.log(`📊 Files generated:`);
console.log(`   - blueskylife.net: ${netFiles} files`);
console.log(`   - blueskylife.io: ${ioFiles} files`);
console.log('');
console.log('🚀 Both builds are ready for deployment!');
console.log('');
console.log('📂 Deployment paths:');
console.log('   - Upload builds/net/* to blueskylife.net via FTP');
console.log('   - Upload builds/io/* to blueskylife.io via FTP');
console.log('');
