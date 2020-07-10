<?php
namespace app\classes;

use ulole\core\classes\util\File;
use ulole\core\classes\util\JSON;

class DocFolder {

    private $parent;
    private $path;
    private $manifest;
    private $name;

    public function __construct($path) {
        $this->manifest = JSON::parse(File::get($path."/manifest.json"));
        $this->name = $this->manifest->name;
        $this->path = $path;
    }
    public function each(\Closure $each){
        if ($this->manifest->exclude !== null) {
            foreach (scandir($this->path) as $file) {
                if ($file != "." && $file != ".." && !in_array($file, $this->manifest->exclude)) {
                    $file = $this->path . "/" . $file;
                    if (is_dir($file)) {
                        $each(new Docs($file));
                    }
                }
            }
        }
    }
    public function getName()
    {
        return $this->name;
    }

    public function getManifest()
    {
        return $this->manifest;
    }

}