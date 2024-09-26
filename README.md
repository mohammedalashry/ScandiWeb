# Web Developer Assessment Test

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Task Requirements](#task-key-requirements)
4. [Project Structure](#project-structure)
5. [Design Patterns Used](#design-patterns-used)
6. [API Documentation](#api-documentation)
7. [Frontend Components](#frontend-components)
8. [Database Schema](#database-schema)
9. [Setup and Installation](#setup-and-installation)
10. [Usage](#usage)

## Overview

This web application is an implementation of Web Developer Assessment Test from ScandiWeb. It is like a small demo for product management system that allows users to add, view, and delete products. It supports three types of products: DVDs, Books, and Furniture, each with specific attributes.

## Technologies Used

- Backend: PHP 7.0+
- Frontend: React
- Database: MySQL 5.6+
- Additional libraries: React Router, Axios

## Task Key Requirements

1. Two pages: Product list page and Adding a product page
2. OOP principles for handling product types
3. PSR standards compliance
4. Avoid conditional statements for product type differences
5. One general endpoint for product saving
6. PHP 7.0+, no frameworks, OOP approach
7. MySQL 5.6+ required
8. Specific UI elements and functionality for both pages

## Project Structure

The project follows a standard structure separating the backend and frontend code. Here's an overview of the main directories and files:

```
project-root/
├── backend/
│   ├── src/
│   │   ├── Core/
│   │   ├── Models/
│   │   ├── Controllers/
│   │   └── Strategies/
│   |   └── Config/
│   └── public/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── styles/
│       └── services/
│
└── database/
```

- The `backend` directory contains the server-side PHP code.
  - `src/Core` contains the core classes for database connection and routing.
  - `src/Models` defines the product models and their subclasses.
  - `src/Controllers` handles the product-related operations.
  - `src/Strategies` implements the strategy pattern for handling product type-specific attributes.
- The `frontend` directory contains the client-side React code.
  - `src/components` contains the React components for the product list and add product pages.
  - `src/styles` contains the SASS stylesheets for the frontend.
  - `src/services` provides the API service for making requests to the backend.
- The `database` directory contains the SQL schema for the `products` table.

## Design Patterns Used

- **Strategy**: For handling product specific type without using conditional statemens.
- **Singlton**: For handling database setup and connections.
- **Factory Method**: For products creation and creating models for them.

## API Documentation

### Endpoints

- `GET /`: Fetch all products
- `POST /`: Add a new product
- `DELETE /`: Delete multiple products

### Request/Response Examples

#### Fetch All Products

Request:

```
GET /
```

Response:

```json
[
  {
    "id": 1,
    "sku": "DVD123",
    "name": "Inception",
    "price": "14.99",
    "type": "DVD",
    "attributes": "{\"size\":\"700\"}"
  }
  // ... more products
]
```

#### Add a New Product

Request:

```
POST /
Content-Type: application/json

{
  "sku": "BOOK123",
  "name": "To Kill a Mockingbird",
  "price": "9.99",
  "type": "Book",
  "weight": "0.5"
}
```

Response:

```json
{
  "success": true,
  "message": "Product added successfully"
}
```

#### Delete Products

Request:

```
DELETE /
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

Response:

```json
{
  "success": true,
  "message": "Products deleted successfully"
}
```

## Frontend Components

The frontend is built using React and consists of the following main components:

- `ProductList`: Displays the list of products and provides options to add and delete products.
- `AddProduct`: Renders a form for adding a new product with fields for common attributes and type-specific attributes.
- `ProductForm`: Encapsulates the form logic and handles form submission.

The frontend communicates with the backend API using the `api` service defined in `frontend/src/services/api.js`.

## Database Schema

The application uses a MySQL database to store product information. The `products` table has the following schema:

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type ENUM('DVD', 'Book', 'Furniture') NOT NULL,
    attributes JSON NOT NULL
);
```

The `attributes` column stores the type-specific attributes in JSON format.

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/mohammedalashry/ScandiWeb.git
   cd ScandiWeb
   ```

2. Set up the backend:

   ```
   cd backend
   composer install
   ```

3. Set up the database:

   - Create a MySQL database
   - Import the schema from `database/schema.sql`
   - Copy `config/database.example.php` to `config/database.php` and update with your database credentials

4. Set up the frontend:

   ```
   cd frontend
   npm install
   ```

5. Start the development servers:
   - Backend: `php -S localhost:8000 -t public`
   - Frontend: `npm start`

## Usage

- Open the application in your web browser.
- On the product list page, you can view all the products, add a new product, or delete selected products.
- To add a new product, click on the "ADD" button and fill in the required fields in the add product form. Select the appropriate product type to see the type-specific attributes.
- Click the "Save" button to add the product or "Cancel" to discard the changes.
- To delete products, select the checkboxes next to the desired products and click the "MASS DELETE" button.
