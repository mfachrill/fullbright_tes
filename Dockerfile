FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json components.json ./
RUN npm run build

FROM composer:2 AS dependencies

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

FROM php:8.3-apache-bookworm

WORKDIR /var/www/html

RUN a2enmod rewrite \
    && apt-get update \
    && apt-get install -y --no-install-recommends libonig-dev libpq-dev libzip-dev \
    && docker-php-ext-install mbstring pdo_mysql pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

COPY . .
COPY --from=dependencies /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build
COPY docker/apache-vhost.conf /etc/apache2/sites-available/000-default.conf
COPY docker/start-render.sh /usr/local/bin/start-render

RUN chmod +x /usr/local/bin/start-render \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80
CMD ["start-render"]
