<?php
// Directory for the views
$views_dir      =   "themes/".DocsConfig::$config->theme."/";
$templates_dir  =   "themes/".DocsConfig::$config->theme."/templates/";

$router->get("/api", "");


if (DocsConfig::$theme->custom_routes !== null) {
    foreach (DocsConfig::$theme->custom_routes as $name=>$route) {
        $router->get($name, $route);
    }
}

$router->get("/(.*)", "!DocsController@app");
$router->setPageNotFound(DocsConfig::$theme->routes->everything_else);