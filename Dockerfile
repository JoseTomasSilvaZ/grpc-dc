# Use an appropriate Node.js base image
# FROM node:20-buster as builder

# # Create and change to the app directory.
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure both package.json AND package-lock.json are copied.
# COPY package*.json ./

# # Install production dependencies.
# RUN npm install

# # Copy prisma schema file
# COPY prisma ./prisma/

# # Install Prisma CLI
# RUN npm install prisma --save-dev

# # Generate Prisma Client
# RUN npx prisma generate

# # Copy local code to the container image.
# COPY . .

# # Use the official Node.js 14 image for the runtime.
# FROM node:20-buster-slim
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app .
# CMD ["node", "src/index.js"]
