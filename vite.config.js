import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BACKEND_TARGET = 'https://techguild-backend.onrender.com'

const createProxyRoute = () => ({
  target: BACKEND_TARGET,
  changeOrigin: true,
  secure: false,
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
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/services': path.resolve(__dirname, './src/Services'),
      '@/Services': path.resolve(__dirname, './src/Services'),
      '@/components': path.resolve(__dirname, './src/Components'),
      '@/Components': path.resolve(__dirname, './src/Components'),
    },
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
})
