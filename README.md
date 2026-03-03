# Laravel & React Multi-Vendor E-Commerce Platform

This is a modern, full-stack, multi-vendor e-commerce application built with some of the latest technologies in the web development ecosystem. The frontend is powered by **React** and **Inertia.js**, served by a robust **Laravel 12** backend. The entire administrative experience is managed through a beautiful and powerful **Filament 5** admin panel.

The platform is designed to allow multiple vendors to sign up, manage their own products, and receive payments through **Stripe Connect**.

---

## ✨ Key Features

### Customer-Facing (Frontend)
- **Modern & Fast UI**: Built with React, TypeScript, and styled with Tailwind CSS.
- **Product Discovery**: Browse products by department and category.
- **Advanced Search**: Full-text search for products.
- **Product Variations**: Support for product options like color and size, with unique images for each variation.
- **Shopping Cart**: Add/update/remove items from the cart.
- **Mini-Cart**: A quick-view dropdown of the cart contents in the navbar.
- **Secure Checkout**: Seamless and secure payment processing powered by Stripe.
- **User Authentication**: Login, registration, and profile management.
- **Order History**: Users can view their past orders and their status.
- **Address Management**: Users can save and manage their shipping addresses.

### Vendor & Admin Features (Backend & Admin Panel)
- **Powerful Admin Panel**: Built with the elegant Filament 5 toolkit.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) for products.
    - **Rich Text Editor**: For detailed product descriptions.
    - **Image Management**: Multi-image uploads per product using Spatie Media Library.
- **Order Management**: View and update order statuses.
- **Multi-Vendor System**:
    - Vendors can register and manage their own store profile.
    - Products are associated with vendors.
    - **Stripe Connect Integration**: Secure onboarding for vendors and automated payouts.
- **Role-Based Access Control**: Differentiating between regular users, vendors, and admins.
- **Email Notifications**: Automated emails for events like completed checkouts.

---

## 🚀 Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React, TypeScript, Inertia.js
- **Admin Panel**: Filament 5
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **Payments**: Stripe & Stripe Connect
- **File Storage**: Spatie Media Library for product images
- **Authentication**: Laravel Breeze (Inertia/React stack)
- **Development Environment**: Vite

---

## ⚙️ Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & NPM
- A database server (e.g., MySQL)

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/laravel-react-ecommerce.git
cd laravel-react-ecommerce
```

### 2. Install Dependencies

```sh
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 3. Environment Configuration

```sh
# Create your .env file
cp .env.example .env
```

Now, open the `.env` file and configure your environment variables. Pay special attention to the following:

```
APP_NAME="SuperStore"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# Your Stripe API Keys
STRIPE_KEY=pk_your_stripe_public_key
STRIPE_SECRET=sk_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_...

# Mail configuration for sending emails
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

### 4. Application Setup

```sh
# Generate a new application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Create a symbolic link for the storage directory
# This is crucial for making uploaded images publicly accessible
php artisan storage:link
```

### 5. Running the Development Servers
This project uses a concurrent script to run the Laravel and Vite servers simultaneously.

```sh
# This will start the Laravel server (usually on port 8000)
# and the Vite development server.
npm run dev
```

You can now access the application at the `APP_URL` you defined (e.g., `http://localhost:8000`).

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/new-amazing-feature`).
3.  Commit your changes (`git commit -am 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/new-amazing-feature`).
5.  Create a new Pull Request.

---

## 📄 License

This project is open-source software licensed under the MIT license.
