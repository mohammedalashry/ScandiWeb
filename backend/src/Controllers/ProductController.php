<?php
// backend/src/Controllers/ProductController.php
namespace App\Controllers;

use App\Models\DVD;
use App\Models\Book;
use App\Models\Furniture;
use App\Models\Product;
use App\Strategies\DVDStrategy;
class ProductController {
    public function index() {
        return json_encode(Product::getAll());
    }

    public function store($data) {
        $product = $this->createProduct($data);
        $product->save();
        return json_encode(['success' => true, 'message' => 'Product added successfully']);
    }

    public function delete($data) {
        Product::delete($data['ids']);
        return json_encode(['success' => true, 'message' => 'Products deleted successfully']);
    }

    private function createProduct($data) {
        switch ($data['type']) {
            case 'DVD':
                return new DVD($data['sku'], $data['name'], $data['price'], $data['size']);
            case 'Book':
                return new Book($data['sku'], $data['name'], $data['price'], $data['weight']);
            case 'Furniture':
                return new Furniture($data['sku'], $data['name'], $data['price'], $data['height'], $data['width'], $data['length']);
            default:
                throw new \InvalidArgumentException('Invalid product type');
        }
    }
}
