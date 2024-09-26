<?php
// backend/src/Strategies/ProductStrategy.php
namespace App\Strategies;

interface ProductStrategy {
    public function getAttributes();
    public function setAttributes(array $attributes);
    public function getAttributeString();
    public function validate();

}
