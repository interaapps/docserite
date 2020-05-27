<?= tmpl("header") ?>
<app>

<div class="contents">
    <div id="folders">
    <?php
        \app\controller\DocsController::getCurrentFolder()->each(function(\app\classes\Docs $docs){
            echo "<a href='".$docs->getLink()."'>
            <img src='".$docs->getManifest()->icon."'>
            <span>".$docs->getName()."</span>
            </a>";
        });
    ?>
    </div>
</div>
    <style>
        #main {
            margin-left: 0px;
        }
    </style>
<app>
<?= tmpl("footer") ?>
