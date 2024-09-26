<?php
// backend/src/Models/DVDProduct.php
namespace App\Models;

use App\Strategies\DVDStrategy;

class DVD extends Product {
    public function __construct($sku, $name, $price, $size) {
        parent::__construct(new DVDStrategy());
        $this->setType('DVD');
        $this->setSku($sku);
        $this->setName($name);
        $this->setPrice($price);
        $this->getStrategy()->setAttributes(['size' => $size]);
    }

    public function getSpecificAttribute(): string {
        return $this->getStrategy()->getAttributeString();
    }

    public function validate() {
        parent::validate();
        $this->getStrategy()->validate();
    }
}