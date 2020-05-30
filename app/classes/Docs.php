<?php
namespace app\classes;


use ulole\core\classes\util\File;
use ulole\core\classes\util\JSON;

class Docs
{

    private $name = "";
    private $path = "";
    private $manifest;
    private $link;


    public function __construct($path) {
        $this->manifest = JSON::parse(File::get($path."/manifest.json"));
        $this->link = str_replace("///", "/", replaceFirst(\DocsConfig::$config->docs, "", $path));
        $this->name = $this->manifest->name;
        $this->path = $path;
    }

    public function each(\Closure $each){
        $dir = scandir($this->path);
        if (isset($this->manifest->order));
            $dir = sortArrayByArray($dir, $this->manifest->order);

        foreach ($dir as $file) {
            if ($file != "." && $file != ".." && $file != "manifest.json") {
                $file = $this->path . "/" . $file;
                if (is_dir($file)) {
                    $each(new DocsDirectory($file, $this));
                } else {
                    $each(new Doc($file, $this));
                }
            }
        }
    }

    public function getName() : string {
        return $this->name;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getManifest(){
        return $this->manifest;
    }

    public function getLink() {
        return $this->link;
    }
}