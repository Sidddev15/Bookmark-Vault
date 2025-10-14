# ---------- Base image ----------
FROM node:20-alpine AS base
WORKDIR /app
# Enable pnpm through Corepack
RUN corepack enable

# ---------- Dependencies (common) ----------
FROM base AS deps
# Copy only dependency manifests first for layer caching
COPY package.json pnpm-lock.yaml ./
# Install all deps (including dev) for reuse in dev/build stages
RUN pnpm install --frozen-lockfile

# ---------- Dev environment ----------
FROM base AS dev
WORKDIR /app
ENV NODE_ENV=development
# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Generate Prisma client (useful for first run)
RUN pnpm prisma generate
EXPOSE 3000
# Start development server with live reload
CMD ["pnpm", "dev"]

# ---------- Build for production ----------
FROM deps AS build
WORKDIR /app
COPY . .
# Generate Prisma client before build (required for dist)
RUN pnpm prisma generate
RUN pnpm build

# ---------- Production runtime ----------
FROM node:20-alpine AS prod
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
# Copy minimal files
COPY package.json pnpm-lock.yaml ./
# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile
# Copy build output and Prisma files
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
EXPOSE 3000
# Start compiled JS server
CMD ["node", "dist/server.js"]
