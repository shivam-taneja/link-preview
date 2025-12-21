FROM node:22.18-alpine3.22 AS pruner
WORKDIR /app
RUN npm install --global pnpm 
COPY . .
RUN pnpm dlx turbo prune api --docker

FROM node:22.18-alpine3.22 AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
RUN npm install --global pnpm

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install

COPY --from=pruner /app/out/full/ .

# RUN pnpm turbo run generate --filter=api
RUN pnpm turbo run build --filter=api

# prune dev dependencies
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional

FROM node:22.18-alpine3.22 AS runner

# Install dependencies first
RUN apk update && \
  apk add --no-cache openssl && \
  rm -rf /var/cache/apk/*

RUN npm install --global pnpm

# Create the app log directory and give permission to nodejs user
RUN mkdir -p /var/log/app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nodejs && \
  chown -R nodejs:nodejs /var/log/app

USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .

WORKDIR /app/apps/api

ARG PORT=8000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD ["pnpm", "start:prod"]