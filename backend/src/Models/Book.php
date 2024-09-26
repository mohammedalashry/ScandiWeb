<?php
// backend/src/Models/Book.php
namespace App\Models;

use App\Strategies\BookStrategy;

class Book extends Product {
    public function __construct($sku, $name, $price, $weight) {
        parent::__construct(new BookStrategy());
        $this->setType('Book');
        $this->setSku($sku);
        $this->setName($name);
        $this->setPrice($price);
        $this->getStrategy()->setAttributes(['weight' => $weight]);
    }
    public function getSpecificAttribute(): string {
        return $this->getStrategy()->getAttributeString();
    }

    public function validate() {
        parent::validate();
        $this->getStrategy()->validate();
    }
}
