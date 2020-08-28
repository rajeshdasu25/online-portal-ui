<?php
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$itemType = isset($_REQUEST['type']) && $_REQUEST['type'] != "" ? $_REQUEST['type'] : "";
	$id = isset($_REQUEST['id']) && $_REQUEST['id'] != "" ? $_REQUEST['id'] : 0;

	$err = $succ = "";
	$table = "";
	$field_names = $field_datas = array();

	switch ($itemType) {
		case 'roles':
			$Name = isset($request->Name) ? $request->Name : '';
			$DisplayName = isset($request->DisplayName) ? $request->DisplayName : '';
			$table = TBL_ROLES;
			$field_names = array('Name', 'DisplayName');
			$field_datas = array($Name, $DisplayName);
			break;
		case 'skills':
			$RoleId = isset($request->RoleId) ? $request->RoleId : '';
			$Name = isset($request->Name) ? $request->Name : '';
			$DisplayName = isset($request->DisplayName) ? $request->DisplayName : '';
			$table = TBL_SKILLS;
			$field_names = array('RoleId', 'Name', 'DisplayName');
			$field_datas = array($RoleId, $Name, $DisplayName);
			break;
		case 'trainings':
			$Name = isset($request->Name) ? $request->Name : '';
			$Description = isset($request->Description) ? $request->Description : '';
			$table = TBL_TRAININGS;
			$field_names = array('Name', 'Description');
			$field_datas = array($Name, $Description);
			break;
		default:
			break;
	}

	try
	{
		$cnt = 0;
		if(empty($err))
		{
		    if($id == 0)
			{				
				$cnt = $GLOBALS['DB']->InsertTable($table, $field_names, $field_datas);
			}
			else
			{
				$cnt = $GLOBALS['DB']->updateTable($table, $field_names, $field_datas, "WHERE Id='" . $id . "'");
			}
			
			echo $cnt;
			
		}
	}		
	catch(PDOException $e)
	{
		
	}

?>