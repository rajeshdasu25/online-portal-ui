<?php 
	date_default_timezone_set('Asia/Calcutta');
	ini_set('display_errors', 'on'); 
	
	//----DB CONSTANTS--------//
	define('DB_DRIVER', 	'mysql');
	define('HOSTNAME', 		'127.0.0.1'); 
	define('DB_NAME', 		'online_portal');
	define('USERNAME', 		'root');
	define('PASSWORD', 		'');
	
	//----TABLE CONSTANTS-----//
	define('TBL_FORMS', 			'forms');
	define('TBL_ROLES', 			'roles');
	define('TBL_SKILLS', 			'skills');
	define('TBL_RESPONSES', 		'responses');
	define('TBL_TRAININGS', 		'trainings');
	define('TBL_USERS', 			'users');
	define('TBL_USER_TYPES', 		'user_types');
	
	//----Create PDO Obj------//
	try
	{ 
		$GLOBALS["PDO"] = new PDO(DB_DRIVER . ':host=' . HOSTNAME . ';dbname=' . DB_NAME , USERNAME, PASSWORD);
		$GLOBALS["PDO"]->exec('set names utf8');
	}
	catch(PDOException $e)
	{
		$e->getMessage();
	}	
	
	require_once "class_db.php";
	$GLOBALS['DB'] = new DBFunctions();
	
	require_once "class_user.php";
	$GLOBALS['USER'] = new User();

?>
