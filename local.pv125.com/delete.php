<?php
$id=$_GET["id"];
if($_SERVER["REQUEST_METHOD"]=="POST") {
    include $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
    if(isset($dbh)) {
        $sql = "DELETE FROM `users` WHERE id = ?;";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$id]);
    }
}