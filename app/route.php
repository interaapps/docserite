<?php
// Directory for the views
$views_dir      =   "themes/".DocsConfig::$config->theme."/";
$templates_dir  =   "themes/".DocsConfig::$config->theme."/templates/";

$router->get("/api", "");

$router->get("/(.*)", "!DocsController@app");
$router->setPageNotFound(DocsConfig::$theme->routes->everything_else);