<?php
namespace app\classes;


class DocsDirectory
{
    private $path;
    private $name;
    private $docs;

    public function __construct($path, $docs = null) {
        $this->path = $path;

        $this->name = basename($path);
        if ($docs == null) {
            var_dump($subDirectories);
            die();
        } else
            $this->docs = $docs;
    }

    public function each(\Closure $each){
        foreach (scandir($this->path) as $file) {
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