<?php

// backend/src/Strategies/FurnitureStrategy.php
namespace App\Strategies;

class FurnitureStrategy implements ProductStrategy {
    private $height;
    private $width;
    private $length;

    public function setHeight($height) {
        $this->height = $height;
    }

    public function getHeight() {
        return $this->height;
    }
    public function setWidth($width) {
        $this->width = $width;
    }
    public function getWidth() {
        return $this->width;
    }
    public function setLength($length) {
        $this->length = $length;
    }
    public function getLength() {
        return $this->length;
    }
    public function getAttributes() {
        return [
            'height' => $this->getHeight(),
            'width' => $this->getWidth(),
            'length' => $this->getLength()
        ];
    }
    public function setAttributes(array $attributes) {
        $this->setHeight($attributes['height']);
        $this->setWidth($attributes['width']);
        $this->setLength($attributes['length']);
    }
    public function getAttributeString() {
        return "Dimensions: {$this->getHeight()}x{$this->getWidth()}x{$this->getLength()}";
    }
    public function validate() {
        if (!is_numeric($this->height) || $this->height <= 0 || !is_numeric($this->width) || $this->width <= 0 || !is_numeric($this->length) || $this->length <= 0) {
            throw new \InvalidArgumentException("Please, provide the data of indicated type");
        }
    }
}

