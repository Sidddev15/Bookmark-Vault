# ---------- Base runtime ----------
FROM node:20-alpine AS base
WORKDIR /app
# Enable corepack so pnpm is available
RUN corepack enable

# ---------- Dev deps layer ----------
FROM base AS deps
# Copy only the lockfile and package manifest for better build caching
COPY package.json pnpm-lock.yaml ./
# Install deps (no optional to keep alpine slim)
RUN pnpm install --frozen-lockfile

# ---------- Dev runtime ----------
FROM base AS dev
ENV NODE_ENV=development
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the source
COPY . .
# Prisma generates client during install by default; if not, uncomment the next line:
# RUN pnpm prisma generate
EXPOSE 3000
# Dev command (assumes "dev" script runs tsx/ts-node-dev/nodemon for TS)
CMD ["pnpm", "dev"]

# ---------- Build for production ----------
FROM deps AS build
WORKDIR /app
COPY . .
# Generate Prisma Client for production
RUN pnpm prisma generate
# Transpile TS -> JS (assumes "build" script creates ./dist)
RUN pnpm build

# ---------- Production runtime ----------
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
RUN corepack enable
# Copy only prod deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
# Copy built app and prisma artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/server.js"]
