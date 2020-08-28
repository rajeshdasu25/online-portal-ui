<?php 
class DBFunctions
{
	public function __construct() {
		
	}
	public function selectAll($table, $fields, $condition)
	{ 	//echo "SELECT $fields FROM $table $condition"; //echo "<br><br>";//exit();
		$stmt = $GLOBALS["PDO"]->prepare("SELECT $fields FROM $table $condition");
		$stmt->execute();
		return $stmt; // returns a resource
	}
	public function executeSelectQuery($query){
		$stmt = $GLOBALS["PDO"]->prepare($query);
		$stmt->execute(); 
		return $stmt; // returns a resource
	}	
	public function selectOneRow($table, $fields, $condition)
	{
		$result = $this->selectAll($table, $fields, $condition); 
		return $result->fetch(); // returns an array //PDO::FETCH_ASSOC
	}
	
	public function selectOneAttribute($table, $field_name, $condition)
	{
		$row = $this->selectOneRow($table, $field_name, $condition); 
		return $row[0]; // returns an attribute
	}
	
	public function InsertTable($tablename, $field_names, $field_data)
	{
		$query = "INSERT INTO $tablename ($field_names[0]";	
	
		for($k=1;$k<count($field_names);$k++)
		{
			$query.=', '."$field_names[$k]";	
		}
		$field_data[0] = addslashes($field_data[0]);
		$query.=") VALUES ('$field_data[0]'";
		for($k=1;$k< count($field_data);$k++)
		{
			$field_data[$k] = addslashes($field_data[$k]);
			$query.=', '."'$field_data[$k]'"; 
		}	
		$query.=')';
		//echo $query;exit;
		$count = $GLOBALS["PDO"]->exec($query);
		return $count;	   	
	}

	public function updateTable($tablename,$field_names,$field_data,$condition)
	{	
		$field_data[0] = addslashes($field_data[0]);
		$query="UPDATE $tablename SET $field_names[0]='$field_data[0]'";
		for($k=1;$k<count($field_names);$k++)
		{
			$field_data[$k] = addslashes($field_data[$k]);
			$query.=", "."$field_names[$k]='$field_data[$k]'";
		}
		
		$query.=" $condition ";

		$count = $GLOBALS["PDO"]->exec($query);
		return $count;	   	
	}
	
	public function deleteWithCondition($tbname,$conditions)
	{
		$query="DELETE FROM $tbname $conditions";	
		$count = $GLOBALS["PDO"]->exec($query);
		return $count;	   	
	}

	public function deleteAll($tbname)
	{
		$query="DELETE FROM $tbname";	
		$count = $GLOBALS["PDO"]->exec($query);
		return $count;	   	
	}
	
	public function dateFormate($date,$formate)
	{
		if($date != "")
		$changeDate = date($formate,strtotime($date));
		if($date == "0000-00-00" || $date == ""){
			$date_formate = "-";
		}else{
			$date_formate = $changeDate;
		}
		return $date_formate;
	}
	
	public static function encodeStr($Str)
	{	
	    return base64_encode($Str. substr(SAULT,0,10));
	}
	
	public static function decodeStr($encStr)
	{
	    $str = str_replace(substr(SAULT,0,10), '', base64_decode($encStr));
	
	    return $str;
	}	
	
	public static function printArray($arr) {
		echo "<pre>";print_r($arr);echo "</pre>";
	}
}
?>
