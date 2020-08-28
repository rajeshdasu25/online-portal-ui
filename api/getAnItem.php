<?php 
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$table = ""; $feilds = ""; $whereCondition = "";
	
	$id = isset($_REQUEST['id']) && $_REQUEST['id'] != "" ? $_REQUEST['id'] : 0;
	$itemType = isset($_REQUEST['type']) && $_REQUEST['type'] != "" ? $_REQUEST['type'] : "";
	
	switch ($itemType) {
		case 'users':
			$table = TBL_USERS . ' AS u LEFT JOIN ' . 
						TBL_USER_TYPES . ' AS ut ON(u.UserTypeId = ut.Id) LEFT JOIN ' .
						TBL_ROLES . ' AS r ON(u.RoleId = r.Id)';
			$feilds = "u.*, ut.Name AS UserType, r.DisplayName AS RoleName";
			$whereCondition = "WHERE u.ActiveStatus = 1 AND u.Id = '".$id."'";
			break;
		case 'usertypes':
			$table = TBL_USER_TYPES;
			$feilds = "*";
			$whereCondition = "WHERE Id = '" . $id ."'";
			break;
		default:
			break;
	}

	$item = $GLOBALS['DB']->selectOneRow($table, $feilds, $whereCondition);
	echo json_encode($item);

?>