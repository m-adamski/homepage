FROM node:25.1-alpine AS base

# Define PNPM home directory
ENV PNPM_HOME="/home/node/.pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# To add the missing shared libraries to your image,
# adding the libc6-compat package in your Dockerfile is recommended: apk add --no-cache libc6-compat
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# Install PNPM
RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /home/node/app

# Install node packages
# https://mannes.tech/production-install/
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base AS build

ENV ASTRO_TELEMETRY_DISABLED=1

WORKDIR /home/node/app

# Bring over the installed dependencies and the rest of the source code to build
COPY --from=dependencies /home/node/app/node_modules ./node_modules

# It's very important to have .dockerignore file while copying everything like below
# Sounds like you have no .dockerignore file so when you COPY . . you are pulling over the node_modules folder
# from your local machine and trying to run it in Docker (Alpine Linux)"
COPY . .

# Build project
RUN pnpm run build

FROM base AS runtime

EXPOSE 4321

ENV PORT=4321
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# Create group and user
RUN addgroup --system --gid 1001 astro && \
    adduser --system --uid 1001 astro

WORKDIR /home/node/app

COPY --from=dependencies --chown=astro:astro /home/node/app/node_modules ./node_modules
COPY --from=build --chown=astro:astro /home/node/app/dist ./dist

## Copy base files from BuildImage
#COPY --from=build --chown=astro:astro /home/node/app/public ./public
#
## Set the correct permission for prerender cache
#RUN mkdir .astro && \
#    chown astro:astro .astro
#
## Automatically leverage output traces to reduce image size
## https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=build --chown=nextjs:nextjs /home/node/app/.next/standalone ./
#COPY --from=build --chown=nextjs:nextjs /home/node/app/.next/static ./.next/static

USER astro

CMD ["node", "/home/node/app/dist/server/entry.mjs"]
