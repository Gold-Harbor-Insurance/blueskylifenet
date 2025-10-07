# Deployment Configuration for Subdirectory

## Update Required in vite.config.ts

Add this line on **line 7** (right after `export default defineConfig({`):

```typescript
base: "/final-expense/rb-dhF5ke48DSslf/",
```

### Complete Updated Section:
```typescript
export default defineConfig({
  base: "/final-expense/rb-dhF5ke48DSslf/",  // <-- ADD THIS LINE
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // ... rest of config
```

### Full Updated vite.config.ts File:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  base: "/final-expense/rb-dhF5ke48DSslf/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
```

## After Making the Change:

1. Save vite.config.ts
2. Push to GitHub:
   ```bash
   git add vite.config.ts
   git commit -m "Configure base path for subdirectory deployment"
   git push origin main
   ```

3. On your server, build the project:
   ```bash
   npm run build
   ```

4. Upload `dist/public/` contents to:
   `/var/www/goldharborinsurance.com/final-expense/rb-dhF5ke48DSslf/`

5. Create `.htaccess` in that directory:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /final-expense/rb-dhF5ke48DSslf/
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ index.html [L]
   </IfModule>
   ```

Your app will then work correctly at:
https://goldharborinsurance.com/final-expense/rb-dhF5ke48DSslf/
