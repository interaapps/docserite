<?= tmpl("header", [
    "title"=>\app\controller\DocsController::getCurrentDoc()->getName(),
    "docs"=>\app\controller\DocsController::getCurrentDoc()->getParent()
]) ?>
<div id="behind_sidenav">
    <div id="mySidenav" class="sidenav">
        <?php
        \app\controller\DocsController::getCurrentDoc()->getParent()->each(function($item){
            require_once "themes/default/logic/helper.php";
            if ($item instanceof \app\classes\Doc) {
                echo "<a href=\"".$item->getLink()."\" title=\"".$item->getName()."\" class=\"rippleeffect drawerbtn drawerbtn1 sidenava \"></a>";
            } else if ($item instanceof \app\classes\DocsDirectory) {
                echo recursiveFolderNavEntry($item);
            }
        });
        ?>
    </div>
</div>




<app>

    <div class="contents">
        <?= \app\controller\DocsController::getCurrentDoc()->getContent() ?>
    </div>
<app>


<?= tmpl("footer") ?>
