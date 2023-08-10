FROM node:20.3-alpine as DependenciesImage

# To add the missing shared libraries to your image,
# adding the libc6-compat package in your Dockerfile is recommended: apk add --no-cache libc6-compat
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# Added this packages becouse of the problem with installation module argon2-cli
RUN apk add --no-cache python3 make g++

WORKDIR /home/node/app

# Install node packages
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.3-alpine as BuildImage

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /home/node/app

# Bring over the installed dependencies and the rest of the source code to build
COPY --from=DependenciesImage /home/node/app/node_modules ./node_modules

# It's very important to have .dockerignore file while copying everything like below
# Sounds like you have no .dockerignore file so when you COPY . . you are pulling over the node_modules folder
# from your local machine and trying to run it in Docker (Alpine Linux)"
COPY . .

# Build project
RUN npm run build

FROM node:20.3-alpine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create group and user
RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

# Switch user & workdir to project directory
USER nextjs
WORKDIR /home/nextjs/application

# Copy base files from BuildImage
COPY --from=BuildImage --chown=nextjs:nextjs /home/node/app/.env ./.env
COPY --from=BuildImage --chown=nextjs:nextjs /home/node/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=BuildImage --chown=nextjs:nextjs /home/node/app/.next/standalone ./
COPY --from=BuildImage --chown=nextjs:nextjs /home/node/app/.next/static ./.next/static

# Copy entrypoint script & add permission to execute
COPY --chown=nextjs:nextjs ./.docker/docker-entrypoint.sh ./entrypoint.sh
RUN chmod +x /home/nextjs/application/entrypoint.sh

ENTRYPOINT ["/home/nextjs/application/entrypoint.sh"]
CMD ["node", "server.js"]
