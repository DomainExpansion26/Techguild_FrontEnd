# ==============================================================================
# Stage 1: Build Frontend Application
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions and helper scripts needed by npm lifecycle hooks
COPY package*.json ./
COPY scripts ./scripts

# Install dependencies cleanly from lockfile (skip host Docker rebuild inside build container)
RUN DOCKER_BUILD=1 npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Optional build arguments for custom API base URL
ARG VITE_API_BASE_URL
ARG VITE_API_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_URL=${VITE_API_URL}

# Build optimized production bundle
RUN npm run build

# ==============================================================================
# Stage 2: Serve with Lightweight Production Nginx
# ==============================================================================
FROM nginx:alpine AS runner

# Copy custom Nginx configuration with SPA fallback & compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check (use 127.0.0.1 to avoid IPv6 localhost resolution issues in Alpine)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
