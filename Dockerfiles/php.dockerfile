FROM php:8.5-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libicu-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN docker-php-ext-install -j$(nproc) mbstring
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) exif
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) bcmath

RUN docker-php-ext-configure intl
RUN docker-php-ext-install -j$(nproc) intl

# Install Composer
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www/html/

# Set ownership and permissions for the /var/www/html directory to www-data
RUN chown -R www-data:www-data /var/www/html/

#USER www-data

EXPOSE 9000

CMD ["php-fpm"]
