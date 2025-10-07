# Stage 1: Build stage
FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Stage 2: Runtime stage (smaller image)
FROM node:18-alpine

WORKDIR /app

# Copy node_modules & code from build stage
COPY --from=build /app /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose service port
EXPOSE 4000

# Start the service
CMD ["npm", "start"]
