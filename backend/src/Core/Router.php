<?php
namespace App\Core;

class Router {
    private $routes = [];

    public function addRoute($method, $path, $handler) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function handleRequest($method, $path) {
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && $this->matchPath($route['path'], $path)) {
                return $route['handler']();
            }
        }
        http_response_code(214);
        return ['error' => 'Not Found'];
    }

    private function matchPath($routePath, $requestPath) {
        $routeParts = explode('/', trim($routePath, '/'));
        $requestParts = explode('/', trim($requestPath, '/'));

        if (count($routeParts) !== count($requestParts)) {
            return false;
        }

        foreach ($routeParts as $index => $routePart) {
            if ($routePart[0] === '{' && $routePart[strlen($routePart) - 1] === '}') {
                continue;
            }
            if ($routePart !== $requestParts[$index]) {
                return false;
            }
        }

        return true;
    }
}
