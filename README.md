# Document Tracing

A web-based application built with the [Laravel](https://laravel.com/)-[Inertia](https://inertiajs.com/)-[React](https://react.dev) tech stack for tracing project documents at PT. Angkasa Pura Supports Banjarmasin. This project is a product of internship program.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP**: 8.2 - 8.4
- **Composer**: >= 2
- **Node.js**: >= 16
- **npm**: (Node Package Manager)
- **MySQL**: >= 8

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/febry05/documenttracing-pkl.git
   ```
2. **Navigate into the project directory**:
   ```bash
   cd documenttracing-pkl
   ```
3. **Install PHP dependencies**:
   ```bash
   composer install
   ```
4. **Copy the environment file**:
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables in the `.env` file, including database settings and application key.
5. **Generate the application key**:
   ```bash
   php artisan key:generate
   ```
6. **Run database migrations**:
   ```bash
   php artisan migrate
   ```
7. **Seed the database** (optional):
   ```bash
   php artisan db:seed
   ```
8. **Install frontend dependencies**:
   ```bash
   npm install
   ```

## Usage

To start the application, follow these steps:

1. **Start the back-end server**:
   ```bash
   php artisan serve
   ```
   The application will be served at `http://localhost:8000` by default.

2. **Start the front-end server**:
   - In **development mode**:
     ```bash
     npm run dev
     ```
   - In **production mode**:
     ```bash
     npm run production
     ```

3. **Run the scheduler** for automatic document version generation:
   ```bash
   php artisan schedule:work
   ```
