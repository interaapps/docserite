<?php
namespace app\classes;


use ulole\core\classes\util\File;
use ulole\core\classes\util\JSON;

class DocsDirectory
{
    private $path;
    private $name;
    private $docs;
    private $manifest;

    public function __construct($path, $docs = null) {
        $this->path = $path;
        if (file_exists($path."/manifest.json"))
            $this->manifest = JSON::parse(File::get($path."/manifest.json"));
        $this->name = basename($path);
        if ($docs == null) {
            die("DOCSDIRECTORY");
        } else
            $this->docs = $docs;
    }

    public function each(\Closure $each){
        $dir = scandir($this->path);
        if (isset($this->manifest) && isset($this->manifest->order))
            $dir = sortArrayByArray(scandir($this->path), $this->manifest->order);
        foreach ($dir as $file) {
            if ($file != "." && $file != ".." && $file != "manifest.json") {
                $file = $this->path . "/" . $file;
                if (is_dir($file)) {
                    $each(new DocsDirectory($file, $this->getDocs()));
                } else {

                    $each(new Doc($file, $this->getDocs()));
                }
            }
        }
    }


    public function getDocs() : Docs {
        return $this->docs;
    }

    public function getParent() : DocFolder {
        return $this->parent;
    }

    public function getName() : string {
        return $this->name;
    }
}