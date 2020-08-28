<?php
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";
	require_once "class_user.php";

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	$Username = $request->Username;
	$Password = $request->Password;
	
	$validity = $GLOBALS['USER']->CheckValidUser($Username, $Password);
	echo json_encode($validity);

?>