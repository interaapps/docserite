<?php
require "Git.php";

use modules\gitclient\Git;

$git = new Git();

$git->changeDirectory(".");
$git->initIfNot();
$git->setRemote("origin");
$git->add(".");
$git->commit("Hello, this push has been sent by GitPHPClient by UPPM");
$git->push("master");