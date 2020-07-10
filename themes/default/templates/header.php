

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" type="image/svg+xml" href="<?= isset($docs) ? $docs->getManifest()->icon : DocsConfig::$config->icon ?>">

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
    <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charset="utf-8" />
    <link rel="stylesheet" href="/assets/css/app.css" type="text/css">

    <!-- STYLES -->
    <link rel="stylesheet" href="/assets/css/app.css">
    <!-- JS -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
    <script src="/assets/js/app.js"></script>
    
    <title><?= isset($title) ? $title : "" ?></title>
</head>
<body>


<div id="nav" style="display: flex">
    <a class="material-icons rippleeffect menubtn">menu</a>
    <a id="logo" href="/"><img id="logoimg" height="40px" src="<?= isset($docs) ? $docs->getManifest()->icon : DocsConfig::$config->icon ?>"/> <p><?= isset($docs) ? $docs->getManifest()->name : DocsConfig::$config->name ?></p></a>
    <div id="navmenu">

    </div>
</div>
<div style='padding-top: 65px'>


    <div id="main">
        </head>
        <body>
            <!--<a class="fab" target="_blank" href="https://twitter.com/intent/tweet?text=<?= htmlspecialchars(getFullURL()) ?>" style="position: fixed; right: 20px; bottom: 90px;"><i>share</i><span>Share</span></a>-->
            <a id="darkmode" class="fab rippleeffect" style="position: fixed; right: 20px; bottom: 20px; background: #323232"><i>nights_stay</i><span>Darkmode</span></a>