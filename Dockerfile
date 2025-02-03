# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:20-alpine AS release

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production --verbose

# Set the user to a non-root user for security
USER node

# Expose the application port
EXPOSE 3000

# Start the application
ENTRYPOINT ["node", "dist/main.js"]