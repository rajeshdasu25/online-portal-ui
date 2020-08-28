<?php
class User
{
	public function __construct() {
    }
	
	/*public function CheckValidUser($Username, $Pword) {
		$result = "";
		$IpAddress = $_SERVER['REMOTE_ADDR'];
		$AccessTime = date('Y-m-d H:i:s');
		$Description = "";
		$LogFields = array('IpAddress','AccessTime','Username','Description');
		$LogValues = array($IpAddress,$AccessTime,$Username);
		$userStmt = $GLOBALS['DB']->selectAll(TBL_USERS, "*","WHERE Username LIKE '$Username' OR EmailAddr LIKE '$Username' LIMIT 1");
		if($userStmt->rowCount() > 0)
		{		
			$user = $userStmt->fetch();
   	      	if($user['Pword'] == sha1($Pword.SAULT))
		  	{
				if($user['ActiveStatus'] == '1')
				{
					if($user['LoggedInIp'] == '000.000.000.000') {
						$_SESSION['login'] = 1;
						$_SESSION['UserId'] = $user['Id'];
						$_SESSION['Username'] = $Username;
						$LoginToken = md5(microtime() . uniqid('iKz') . $IpAddress);
						$result = "VALID_USER";
				        $Description = "Logged In";
				        $GLOBALS['DB']->updateTable(TBL_USERS, array('DtimeLastAccess','LoggedInIp', 'LoginToken'), array($AccessTime,$IpAddress, $LoginToken), "WHERE Id={$user['Id']}");
			        }
			        else {
						$result = "ALREADY_LOGIN:{$user['LoggedInIp']}";
				        $Description = "Already Logged-in from {$user['LoggedInIp']}.";
			        }
				}
				else {
					$result = "ACCESS_DENIED";
			        $Description = "Access Denied";
	            }
			}
			else {
				$result = "WRONG_PWD";
				$Description = "Incorrect Password";
			}
        }
		else {
			$result = "NOT_EXIST";
		    $Description = "UserId does not exist";
        }
		array_push($LogValues, $Description);
        $GLOBALS['DB']->InsertTable(TBL_USER_ACCESS_LOG, $LogFields, $LogValues);
		return $result;
	}*/
	
	public function CheckValidUser($Username, $Pword)
	{
		$userObj = (object)[]; $result = "";
		$userStmt = $GLOBALS['DB']->selectAll(TBL_USERS, "*","WHERE Username LIKE '$Username' OR EmailAddr LIKE '$Username' LIMIT 1");
		if($userStmt->rowCount() > 0)
		{		
			$user = $userStmt->fetch();
   	      	if($user['Pword'] == $Pword)
		  	{
				if($user['ActiveStatus'] == '1') {
					$result = "VALID_USER";
					//$userId = $GLOBALS['DB']->selectOneAttribute(TBL_USERS, "Id", "WHERE Username LIKE '$Username' OR EmailAddr LIKE '$Username'");
					$userObj->userId = $user['Id'];
					$userObj->ssoId = $user['SsoId'];
					$userObj->userTypeId = $user['UserTypeId'];
				}
				else {
					$result = "ACCESS_DENIED";
	            }
			}
			else {
				$result = "WRONG_PWD";
			}
        }
		else {
			$result = "NOT_EXIST";
        }
		$userObj->userValidity = $result;
		return $userObj;
	}	
	
}
?>