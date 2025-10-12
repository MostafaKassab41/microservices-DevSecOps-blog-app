# Stage 1: Build React app
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
# Copy the build output
COPY --from=build /app/build /usr/share/nginx/html
# Copy a script to generate config.js
COPY config.template.js /usr/share/nginx/html/config.template.js
# Create an entrypoint script to substitute environment variables
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
