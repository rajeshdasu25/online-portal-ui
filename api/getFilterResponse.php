<?php 
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$table = $feilds = $whereCondition = $orderCondition = "";
	$items = array();
	
	$limitCondition = isset($_REQUEST['count']) && $_REQUEST['count'] != "" ? " LIMIT " .$_REQUEST['count'] : "";
	$FilterType = isset($request->FilterType) && $request->FilterType != "" ? $request->FilterType : "";
	
	switch ($FilterType) {
		case 'Form':
			$table = TBL_FORMS.' AS f LEFT JOIN ' .
						TBL_USERS.' AS u ON(f.UserId = u.Id)';
			$feilds = "f.*, u.*, " .
						"f.Name AS FormName, " .
						"CONCAT(u.FirstName, ' ', u.LastName) AS Creator, ";
			$whereCondition = "WHERE f.ActiveStatus=1 ";
			$orderCondition = " ORDER BY f.Name ASC";
			break;
		case 'User':
			$table = TBL_RESPONSES.' AS r LEFT JOIN ' .
						TBL_USERS.' AS u ON(r.UserId = u.Id) LEFT JOIN ' .
						TBL_FORMS.' AS f ON(r.FormId = f.Id)';
			$feilds = "r.*, u.*, " .
						"f.Name AS FormName, " .
						"CONCAT(u.FirstName, ' ', u.LastName) AS Creator" .
						"DATE_FORMAT(r.Date, '%d-%m-%Y %H:%i') AS FormattedDate ";
			$userIdCondition = isset($request->UserId) && $request->UserId != "" ? "AND r.UserId=" .$request->UserId : "";
			$whereCondition = "WHERE r.ActiveStatus=1 ". $userIdCondition;
			$orderCondition = " ORDER BY f.Name ASC";
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