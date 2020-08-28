<?php 
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";

	$table = $feilds = $whereCondition = $orderCondition = $userIdCondition = "";
	$items = array();

	$limitCondition = isset($_REQUEST['count']) && $_REQUEST['count'] != "" ? " LIMIT " .$_REQUEST['count'] : "";
	//$userIdCondition = isset($_REQUEST['userId']) && $_REQUEST['userId'] != "" ? "AND f.UserId=" .$_REQUEST['userId'] : "";
	
	$itemType = isset($_REQUEST['type']) && $_REQUEST['type'] != "" ? $_REQUEST['type'] : "";
	switch ($itemType) {
		case 'forms':
			$table = TBL_FORMS . ' AS f LEFT JOIN ' . 
						TBL_USERS . ' AS u ON(f.UserId = u.Id) LEFT JOIN ' .
						TBL_RESPONSES.' AS r ON(r.FormId = f.Id)';
			$feilds = "f.*, " .
						"CONCAT(u.FirstName, ' ', u.LastName) AS UserFullName, " .
						"DATE_FORMAT(f.CreatedDate, '%d-%m-%Y') AS FormattedCreatedDate, " .
						"DATE_FORMAT(f.ClosedDate, '%d-%m-%Y') AS FormattedClosedDate";
			$userIdCondition = isset($_REQUEST['userId']) && $_REQUEST['userId'] != "" ? "AND f.UserId=" .$_REQUEST['userId'] : "";
			$whereCondition = "WHERE f.ActiveStatus=1 ". $userIdCondition;
			$orderCondition = " ORDER BY f.Name ASC";
			break;
		case 'responses':
			$table = TBL_RESPONSES.' AS r LEFT JOIN ' .
						TBL_USERS.' AS u ON(r.UserId = u.Id) LEFT JOIN ' .
						TBL_FORMS.' AS f ON(r.FormId = f.Id)';
			$feilds = "r.*, " .
						"f.Name AS FormName, " .
						"CONCAT(u.FirstName, ' ', u.LastName) AS Creator, " .
						"DATE_FORMAT(r.Date, '%d-%m-%Y %H:%i') AS FormattedDate ";
			$userIdCondition = isset($_REQUEST['userId']) && $_REQUEST['userId'] != "" ? "AND r.UserId=" .$_REQUEST['userId'] : "";
			$whereCondition = "WHERE r.ActiveStatus=1 ". $userIdCondition;
			$orderCondition = " ORDER BY f.Name ASC";
			break;
		case 'roles':
			$table = TBL_ROLES;
			$feilds = "*";
			$whereCondition = "WHERE ActiveStatus=1 ";
			$orderCondition = " ORDER BY Name ASC";
			break;
		case 'skills':
			$roleIdCondition = isset($_REQUEST['roleId']) && $_REQUEST['roleId'] != "" ? "AND s.RoleId=" .$_REQUEST['roleId'] : "";
			$table = TBL_SKILLS.' AS s LEFT JOIN ' .
						TBL_ROLES.' AS r ON(s.RoleId = r.Id)';
			$feilds = "s.*, r.DisplayName AS RoleName";
			$whereCondition = "WHERE s.ActiveStatus=1 ". $roleIdCondition;
			$orderCondition = " ORDER BY s.Name ASC";
			break;
		case 'trainings':
			$table = TBL_TRAININGS;
			$feilds = "*";
			$whereCondition = "WHERE ActiveStatus=1 ";
			$orderCondition = " ORDER BY Name ASC";
			break;
		case 'users':
			$userIdCondition = isset($_REQUEST['userId']) && $_REQUEST['userId'] != "" ? "AND u.Id!=" .$_REQUEST['userId'] : "";
			$table = TBL_USERS . ' AS u LEFT JOIN ' . 
						TBL_USER_TYPES . ' AS ut ON(u.UserTypeId = ut.Id) LEFT JOIN ' .
						TBL_ROLES . ' AS r ON(u.RoleId = r.Id)';
			$feilds = "u.*, ut.Name AS UserType, r.DisplayName AS RoleName";
			$whereCondition = "WHERE u.ActiveStatus=1 ". $userIdCondition;
			$orderCondition = " ORDER BY u.FirstName ASC";
			break;
		case 'usertypes':
			$table = TBL_USER_TYPES;
			$feilds = "*";
			$whereCondition = "WHERE ActiveStatus=1 ";
			$orderCondition = " ORDER BY Name ASC";
			break;
		default:
			break;
	}

	$stmt = $GLOBALS['DB']->selectAll($table, $feilds, $whereCondition.$orderCondition.$limitCondition);
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$items[] = $row;
	}
	echo json_encode($items);	

?>