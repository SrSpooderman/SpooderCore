FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.30-alpine AS runtime
ENV PORT=8080
ENV METRICS_INTERNAL_URL=http://127.0.0.1:9
ENV NGINX_ENVSUBST_FILTER=^(PORT|METRICS_INTERNAL_URL)$
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY deploy/healthcheck.sh /usr/local/bin/healthcheck
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod +x /usr/local/bin/healthcheck && mkdir -p /run && chown -R nginx:nginx /run /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["/usr/local/bin/healthcheck"]
EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]
