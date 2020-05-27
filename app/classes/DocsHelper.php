<?php
namespace app\classes;


use ulole\core\classes\util\File;
use ulole\core\classes\util\JSON;

class DocsHelper
{
    public static function getByFolder($folder) {
        if (file_exists($folder."/manifest.json")) {
            $manifest = JSON::parse(File::get($folder."/manifest.json"));
            if (strtolower($manifest->type) == "docs")
                return new Docs($folder);
            if (strtolower($manifest->type) == "folder")
                return new DocFolder($folder);

        }
        return new DocsDirectory($folder);
    }

    public static function getDocsByPath($path)  {
        $currentFolder = $path;
        $subDirectories = [];
        while ($currentFolder != \DocsConfig::$config->docs) {
            $currentFolder = dirname($currentFolder);

            if (
                file_exists($currentFolder."/manifest.json") && JSON::parse(File::get($currentFolder."/manifest.json"))->type == "docs") {
                return new Docs($currentFolder);
            }
        }
        return null;
    }
}