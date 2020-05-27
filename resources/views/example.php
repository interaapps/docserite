<?php // You can use <?php instead of <?php
    echo "Hello world!";
    $a = ["a","b"];
?>


<?php /* Including a template file (in directory templates), defines var title to Welcome (Passes it threw) */?>
<?php tmpl("header.php", ["title"=>"Welcome"]); ?>

<?php if(false):?>
    hi
<?php else: ?>
    hallool
<?php endif; ?>

<?php foreach($a as $v):?>
    <?php echo ( $v ); ?>
<?php endforeach; ?>

<?php view("components/error", ["err"=>"You're not logged in!"]); ?>

<?php tmpl("footer.php"); ?>