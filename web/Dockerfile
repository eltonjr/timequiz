# ---- Base ----
FROM node:lts-alpine AS base

WORKDIR /app

COPY package*.json ./

# ---- Deps ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false
RUN npm install --unsafe-perm

# ---- Build ----
FROM dependencies as build
COPY . .
RUN npm run build

# ---- Release ----
FROM nginx:1.17-alpine AS release
COPY --from=build /app/dist /var/www/webapp
COPY nginx /etc/nginx/conf.d/template.conf
COPY docker-entrypoint.sh /opt
RUN chmod +x /opt/docker-entrypoint.sh

EXPOSE 9090

ENTRYPOINT /opt/docker-entrypoint.sh
