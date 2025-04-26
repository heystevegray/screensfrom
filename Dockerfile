# Use the official Node.js image as a base
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --chown=node:node --from=builder /app/.output ./.output

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", ".output/server/index.mjs"]