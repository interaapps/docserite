

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" type="image/svg+xml" href="<?= isset($docs) ? $docs->getManifest()->icon : DocsConfig::$config->icon ?>">

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charset="utf-8" />
    <link rel="stylesheet" href="/assets/css/app.css" type="text/css">

    <!-- STYLES -->
    <link rel="stylesheet" href="/assets/css/app.css">
    <!-- JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
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




