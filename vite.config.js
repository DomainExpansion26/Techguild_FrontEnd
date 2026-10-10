// [TechGuild Update: 30-09-2026] Single upfront CSS bundle (cssCodeSplit:false) so post-login navigation never refetches styles (no visual change).
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Universal SPA fallback plugin: generates 404.html and static route entrypoints from index.html on build
// Enables client-side routing on any static host (AWS S3, CloudFront, GitHub Pages, Netlify, Render, Vercel)
// without returning 404 NoSuchKey on direct navigation or provider redirects.
const universalSpaFallbackPlugin = () => ({
  name: 'universal-spa-fallback',
  closeBundle() {
    const distDir = path.resolve(__dirname, 'dist')
    const indexPath = path.join(distDir, 'index.html')
    const fallbackPath = path.join(distDir, '404.html')
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, fallbackPath)

      const spaRoutes = [
        'login',
        'signup',
        'forgot-password',
        'account-type',
        'verify-2fa',
        'oauth/callback',
        'oauth/google/callback',
        'oauth/github/callback',
      ]

      for (const route of spaRoutes) {
        const routeDir = path.join(distDir, ...route.split('/'))
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }
        fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'))
      }
    }
  },
})

const BACKEND_TARGET = 'https://techguild-backend.onrender.com'

const createProxyRoute = () => ({
  target: BACKEND_TARGET,
  changeOrigin: true,
  secure: false,
  bypass: (req) => {
    // If the browser is requesting an HTML page (SPA navigation), bypass proxy and serve index.html
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return '/index.html';
    }
  },
  headers: {
    origin: BACKEND_TARGET,
    referer: BACKEND_TARGET,
  },
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('origin', BACKEND_TARGET);
      proxyReq.setHeader('referer', BACKEND_TARGET);
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), universalSpaFallbackPlugin()],
  resolve: {
    alias: [
      { find: '@/services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@/Services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@/components', replacement: path.resolve(__dirname, './src/Components') },
      { find: '@/Components', replacement: path.resolve(__dirname, './src/Components') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    proxy: {
      '/auth': createProxyRoute(),
      '/v1': createProxyRoute(),
      '/contracts': createProxyRoute(),
      '/milestones': createProxyRoute(),
      '/oauth': createProxyRoute(),
    },
  },
  build: {
    // Single CSS bundle: every lazy route currently ships its own CSS chunk,
    // so navigating after sign-in flashes unstyled HTML until that chunk
    // arrives. One upfront stylesheet removes the per-page CSS waterfall.
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
})
