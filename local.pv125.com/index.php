<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<?php include $_SERVER["DOCUMENT_ROOT"] . "/header.php"; ?>

<div class="container">
    <?php
    $b[0]=34;
    $b["Аліна"]=18;
    $b["Марина"]=25;
    $a="asdfasdf".$b["Аліна"];
    $b=45;
    echo "<h3>$a</h3>";
    echo "<h2>".$_SERVER['SERVER_NAME']."</h2>";
    ?>
    <h1>Привіт PHP!----</h1>
</div>

<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>
