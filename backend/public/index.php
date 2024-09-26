<?php
// backend/public/index.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: *");

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controllers\ProductController;
use App\Core\Router;

$router = new Router();
$productController = new ProductController();

$router->addRoute('GET', '/', function() use ($productController) {
    return $productController->index();
});

$router->addRoute('POST', '/', function() use ($productController) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $productController->store($data);
});

$router->addRoute('DELETE', '/', function() use ($productController) {
    $data = json_decode(file_get_contents('php://input'), true);
    return $productController->delete($data);
});

$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

echo $router->handleRequest($method, $path);
