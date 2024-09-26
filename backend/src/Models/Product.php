<?php
// backend/src/Models/Product.php
namespace App\Models;
use PDO;
use App\Core\Database;
use App\Strategies\ProductStrategy;

abstract class Product {
    protected $id;
    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $strategy;

    public function __construct(ProductStrategy $strategy) {
        $this->strategy = $strategy;
    }

    // Getters
    public function getId() {
        return $this->id;
    }

    public function getSku() {
        return $this->sku;
    }

    public function getName() {
        return $this->name;
    }

    public function getPrice() {
        return $this->price;
    }

    public function getType() {
        return $this->type;
    }

    public function getStrategy() {
        return $this->strategy;
    }

    // Setters
    public function setSku($sku) {
        $this->sku = $sku;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function save() {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("INSERT INTO products (sku, name, price, type, attributes) VALUES (?, ?, ?, ?, ?)");
        $attributes = json_encode($this->strategy->getAttributeString());
        $stmt->execute([$this->getSku(), $this->getName(), $this->getPrice(), $this->getType(), $attributes]);
        $this->id = $db->lastInsertId();
    }

    public static function getAll() {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function delete($ids) {
        $db = Database::getInstance()->getConnection();
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $db->prepare("DELETE FROM products WHERE id IN ($placeholders)");
        $stmt->execute($ids);
    }

    abstract public function getSpecificAttribute(): string;

    public function validate() {
        if (empty($this->getSku()) || empty($this->getName()) || empty($this->getPrice()) || empty($this->getType())) {
            throw new \InvalidArgumentException("All fields are required");
        }
        if (!is_numeric($this->getPrice()) || $this->getPrice() <= 0) {
            throw new \InvalidArgumentException("Price must be a positive number");
        }
    }
}