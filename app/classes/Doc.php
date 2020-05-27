<?php


namespace app\classes;


use modules\parsedown\Parsedown;

class Doc
{
    private $parent;

    private $name = "";
    private $file = "";
    private $link = "";

    public function __construct(string $file, Docs $parent) {
        $this->name = basename(basename(basename($file, ".md"), ".php"), ".html");

        $this->link = str_replace("///", "/", replaceFirst(\DocsConfig::$config->docs, "", $file));
        $this->file = $file;
        $this->parent = $parent;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getFile(): string {
        return $this->file;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getContent() : string {
        if (endsWith($this->file, ".php")) {
            ob_start();
            if (file_exists($this->file))
                include $this->file;
            return ob_end_clean();
        } else if (endsWith($this->file, ".md")) {
            return (new Parsedown())->parse(file_get_contents($this->file));
        } else {
            return "";
        }
    }

    public function getParent(): Docs {
        return $this->parent;
    }

    public function getLink(): string {
        return $this->link;
    }

}