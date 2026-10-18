# =============================================================================
# vidara Frontend — React (CRA) → nginx
# Tag convention: ghcr.io/onebyjorah/vidara-frontend:latest
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy source and build
COPY . .
RUN npm run build

# ── Production stage ────────────────────────────────────────────────────────
FROM nginx:alpine

# Copy built files (CRA outputs to /app/build)
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup --system --gid 1001 vidara && \
    adduser --system --uid 1001 --ingroup vidara --no-create-home vidara && \
    chown -R vidara:vidara /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 755 /usr/share/nginx/html

# non-root nginx: default pid path lives under root-owned /run
RUN sed -i 's|pid .*nginx.pid;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf

USER vidara

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
    CMD wget --spider -q http://127.0.0.1/ || exit 1

LABEL org.opencontainers.image.title="vidara Frontend" \
      org.opencontainers.image.description="React frontend for vidara RTSP NVR" \
      org.opencontainers.image.vendor="JorahOne" \
      org.opencontainers.image.version="2.1.0"

CMD ["nginx", "-g", "daemon off;"]
