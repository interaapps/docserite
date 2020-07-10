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

    <div id="overview">
        <h3>Overview:</h3>
    </div>

    <script>
    $(document).ready(function(){
        $(".contents h1, .contents h2").each(function(element){
            console.log(element);
            var id = "contents_"+element.tagName+"_"+element.innerText.replace(/[\W_]+/g,"_");
            element.id = id;
            if (element.tagName == "H1")
                $("#overview").append($n("a").attr("href", "#"+id).text(element.innerText));
            else if (element.tagName == "H2")
                $("#overview").append($n("a").css({
                    "paddingLeft": "10px"
                }).attr("href", "#"+id).text(element.innerText));
                
        });
    });
    </script>
<app>


<?= tmpl("footer") ?>
