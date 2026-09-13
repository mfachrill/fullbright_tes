#!/bin/sh

set -eu

# Render provides the port at runtime. Apache defaults to port 80.
APP_PORT="${PORT:-10000}"
sed -i "s/^Listen 80$/Listen ${APP_PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${APP_PORT}>/" /etc/apache2/sites-available/000-default.conf

# Render Blueprint secrets are base64-encoded; Laravel expects the prefix.
case "${APP_KEY:-}" in
    base64:*) ;;
    *) export APP_KEY="base64:${APP_KEY}" ;;
esac

# Keep database schema current on each deployment. This is safe when no new
# migrations exist and avoids a separate paid job service.
php artisan migrate --force

exec apache2-foreground
