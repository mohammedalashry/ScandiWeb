<?php

// backend/src/Strategies/BookStrategy.php
namespace App\Strategies;

class BookStrategy implements ProductStrategy {
    private $weight;

    public function setWeight($weight) {
        $this->weight = $weight;
    }
    public function getWeight() {
        return $this->weight;
    }
    public function getAttributes() {
        return ['weight' => $this->getWeight()];
    }

    public function getAttributeString() {
        return "Weight: {$this->getWeight()} Kg";
    }
    public function setAttributes(array $attributes) {
        $this->setWeight($attributes['weight']);
    }
    public function validate() {
        if (!is_numeric($this->weight) || $this->weight <= 0) {
            throw new \InvalidArgumentException("Weight must be a positive number");
        }
    }
}
