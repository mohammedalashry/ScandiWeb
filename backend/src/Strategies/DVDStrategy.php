<?php
// backend/src/Strategies/DVDStrategy.php
namespace App\Strategies;

class DVDStrategy implements ProductStrategy {
    private $size;

    public function setSize($size) {
        $this->size = $size;
    }

    public function getSize() {
        return $this->size;
    }

    public function getAttributes() {
        return ['size' => $this->getSize()];
    }

    public function getAttributeString() {
        return "Size: " . $this->getSize() . " MB";
    }
    public function setAttributes(array $attributes) {
        $this->setSize($attributes['size']);
    }
    public function validate() {
        if (!is_numeric($this->size) || $this->size <= 0) {
            throw new \InvalidArgumentException("Size must be a positive number");
        }
    }
}