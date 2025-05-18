FROM php:8.3-cli

WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libzip-dev libonig-dev libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install intl pdo pdo_mysql zip opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy app files
COPY . .

# Set Symfony dev env
ENV APP_ENV=dev

# Install dependencies
RUN composer install

# Expose HTTP port
EXPOSE 80

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:80", "-t", "public"]