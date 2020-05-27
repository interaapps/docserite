<?php
function recursiveFolderNavEntry(\app\classes\DocsDirectory $link){
    $out = "<a href=\"#\" title=\"".$link->getName()."\" class=\"rippleeffect drawerbtn drawerbtn1 sidenava sidenav-submenu-opener\" menu='".$link->getName()."'><i  class=\"small material-icons-outlined sideicon\">keyboard_arrow_right</i></a>";
    $out .= "<div class='sidenav-submenu' menu='".$link->getName()."'>";
    $link->each(function($item) use (&$out) {
        if ($item instanceof \app\classes\Doc) {
            $out .= "<a href=\"".$item->getLink()."\" title=\"".$item->getName()."\" class=\"rippleeffect drawerbtn drawerbtn1 sidenava \"></a>";
        } else if ($item instanceof \app\classes\DocsDirectory) {
            $out .= recursiveFolderNavEntry($item);
        }
    });
    $out .= "</div>";
    return $out;
}