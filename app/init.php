<?php


class DocsConfig {
    public static $config;

    public static $theme;
}

DocsConfig::$config = json_decode(file_get_contents("docs-config.json"));
DocsConfig::$theme  = json_decode(file_get_contents("themes/".DocsConfig::$config->theme."/manifest.json"));