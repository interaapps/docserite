<?php
namespace app\controller;

use app\classes\Doc;
use app\classes\DocsDirectory;
use app\classes\DocFolder;
use app\classes\Docs;
use app\classes\DocsHelper;
use DocsConfig;
use ulole\core\classes\util\File;
use ulole\core\classes\util\JSON;
use ulole\core\classes\util\Str;

class DocsController {

    private static $currentDoc;
    private static $currentFolder;

    public static function app() {
        global $_ROUTEVAR;

        if ($_ROUTEVAR[1] == "")
            $_ROUTEVAR[1] = "/";

        if (!Str::contains("..", $_ROUTEVAR[1])) {
            $themeFolder = "themes/" . DocsConfig::$config->theme;
            $docFolder   = DocsConfig::$config->docs;
            if (self::bindStatics(DocsConfig::$theme->static, $themeFolder)) return;
            if (self::bindStatics(JSON::parse(File::get(DocsConfig::$config->docs."/manifest.json"))->static, DocsConfig::$config->docs)) return;


            if (file_exists($docFolder . "/" . $_ROUTEVAR[1])) {

                if (is_dir($docFolder . "/" . $_ROUTEVAR[1])) {
                    $dir = DocsHelper::getByFolder($docFolder . "/" . $_ROUTEVAR[1]);
                    if ($dir instanceof DocFolder) {
                        self::$currentFolder = new DocFolder($docFolder."/".$_ROUTEVAR[1]);
                        return view((new Str(DocsConfig::$theme->routes->folder))->replace(".php", ""), [
                            "doc"=>self::$currentFolder
                        ]);
                    } else if ($dir instanceof Docs) {
                        $index = $docFolder."/".$_ROUTEVAR[1]."/index";
                        if (isset($dir->getManifest()->index))
                            $index = $docFolder."/".$_ROUTEVAR[1]."/".$dir->getManifest()->index;
                        self::$currentDoc = new Doc(
                            $index,
                            new Docs($docFolder . "/" . $_ROUTEVAR[1])
                        );
                        return view((new Str(DocsConfig::$theme->routes->doc))->replace(".php", ""), [
                            "doc"=>self::$currentDoc
                        ]);
                    } else if ($dir instanceof DocsDirectory) {

                    }
                } else {
                  self::$currentDoc = new Doc(
                      $docFolder . "/" . $_ROUTEVAR[1],
                      DocsHelper::getDocsByPath($docFolder . "/" . $_ROUTEVAR[1])
                  );
                  return view((new Str(DocsConfig::$theme->routes->doc))->replace(".php", ""), [
                      "doc"=>self::$currentDoc
                  ]);
                }

            }

        }
        return view((new Str(DocsConfig::$theme->routes->everything_else))->replace(".php", ""));
    }

    public static function getCurrentDoc() : Doc {
        return self::$currentDoc;
    }

    public static function getCurrentFolder():DocFolder{
        return self::$currentFolder;
    }


    private static function bindStatics($statics, $folder) : bool {
        global $_ROUTEVAR;
        foreach ($statics as $static) {
            if (startsWith($_ROUTEVAR[1], $static)) {
                if (file_exists($folder . "/" . $_ROUTEVAR[1])) {

                    if (endsWith($_ROUTEVAR[1], ".css")) {
                        header("content-type: text/css");
                    } else if (endsWith($_ROUTEVAR[1], ".js")) {
                        header("content-type: text/js");
                    } else if (endsWith($_ROUTEVAR[1], ".svg")) {
                        header("content-type: image/svg+xml");
                    } else {
                        header("content-type: ". mime_content_type( $folder . "/" . $_ROUTEVAR[1] ));
                    }

                    readfile($folder . "/" . $_ROUTEVAR[1]);
                    return true;
                    }
                }
        }
        return false;
    }


}