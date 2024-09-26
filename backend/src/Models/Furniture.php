<?php
// backend/src/Models/Furniture.php
namespace App\Models;

use App\Strategies\FurnitureStrategy;

class Furniture extends Product {
    public function __construct($sku, $name, $price, $height, $width, $length) {
        parent::__construct(new FurnitureStrategy());
        $this->setType('Furniture');
        $this->setSku($sku);
        $this->setName($name);
        $this->setPrice($price);
        $this->getStrategy()->setAttributes(['height' => $height, 'width' => $width, 'length' => $length]);
    }

    public function validate() {
        parent::validate();
        $this->getStrategy()->validate();
    }
    public function getSpecificAttribute(): string {
        return $this->getStrategy()->getAttributeString();
    }

}
