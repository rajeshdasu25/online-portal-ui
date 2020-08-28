<?php 
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	require_once "config.php";
	require_once "class_db.php";

	$allItems = (object)[];

	$limitCondition = isset($_REQUEST['count']) && $_REQUEST['count'] != "" ? " LIMIT " .$_REQUEST['count'] : "";
	$catCondition = isset($_REQUEST['cat']) && $_REQUEST['cat'] != "" ? "AND t.TransactionTypeId=2 " : "";	

	$accountsTable = TBL_ACCOUNTS . ' AS a LEFT JOIN ' . TBL_ACCOUNT_TYPES . ' AS at ON(a.AccountTypeId = at.Id)';
	$accountsFeilds = "a.*, at.Name AS AccountType";
	$accountsWhereCondition = "WHERE a.ActiveStatus=1 ";
	$accountsOrderCondition = " ORDER BY a.Id ASC";
	$accountsStmt = $GLOBALS['DB']->selectAll($accountsTable, $accountsFeilds, $accountsWhereCondition.$accountsOrderCondition.$limitCondition);
	while ($accountsRow = $accountsStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->accounts[] = $accountsRow;
	}
	
	$accountTypesTable = TBL_ACCOUNT_TYPES;
	$accountTypesFeilds = "*";
	$accountTypesWhereCondition = "WHERE ActiveStatus=1 ";
	$accountTypesOrderCondition = " ORDER BY Id ASC";
	$accountTypesStmt = $GLOBALS['DB']->selectAll($accountTypesTable, $accountTypesFeilds, $accountTypesWhereCondition.$accountTypesOrderCondition.$limitCondition);
	while ($accountTypesRow = $accountTypesStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->accountTypes[] = $accountTypesRow;
	}
	
	$categoriesTable = TBL_CATEGORIES;
	$categoriesFeilds = "*";
	$categoriesWhereCondition = "WHERE ActiveStatus=1 ";
	$categoriesOrderCondition = " ORDER BY Id ASC";
	$categoriesStmt = $GLOBALS['DB']->selectAll($categoriesTable, $categoriesFeilds, $categoriesWhereCondition.$categoriesOrderCondition.$limitCondition);
	while ($categoriesRow = $categoriesStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->categories[] = $categoriesRow;
	}
	
	$incomeTable = TBL_TRANSACTIONS;
	$incomeFeilds = "SUM(Amount) AS TotalAmountIncome";
	$incomeWhereCondition = "WHERE TransactionTypeId=1 AND ActiveStatus=1 ";
	$incomeOrderCondition = "";
	$incomeStmt = $GLOBALS['DB']->selectAll($incomeTable, $incomeFeilds, $incomeWhereCondition.$incomeOrderCondition.$limitCondition);
	while ($incomeRow = $incomeStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->income[] = $incomeRow;
	}
	
	$notAnIncomeTable = TBL_TRANSACTIONS;
	$notAnIncomeFeilds = "SUM(Amount) AS TotalAmountIncome";
	$notAnIncomeWhereCondition = "WHERE TransactionTypeId=3 AND ActiveStatus=1 ";
	$notAnIncomeOrderCondition = "";
	$notAnIncomeStmt = $GLOBALS['DB']->selectAll($notAnIncomeTable, $notAnIncomeFeilds, $notAnIncomeWhereCondition.$notAnIncomeOrderCondition.$limitCondition);
	while ($notAnIncomeRow = $notAnIncomeStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->notAnIncome[] = $notAnIncomeRow;
	}
	
	$notAnSpendTable = TBL_TRANSACTIONS;
	$notAnSpendFeilds = "SUM(Amount) AS TotalAmountIncome";
	$notAnSpendWhereCondition = "WHERE TransactionTypeId=4 AND ActiveStatus=1 ";
	$notAnSpendOrderCondition = "";
	$notAnSpendStmt = $GLOBALS['DB']->selectAll($notAnSpendTable, $notAnSpendFeilds, $notAnSpendWhereCondition.$notAnSpendOrderCondition.$limitCondition);
	while ($notAnSpendRow = $notAnSpendStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->notAnSpend[] = $notAnSpendRow;
	}
	
	$transactionsTable = TBL_TRANSACTIONS.' AS t LEFT JOIN ' .
						TBL_USERS.' AS u ON(t.UserId = u.Id) LEFT JOIN ' .
						TBL_TRANSACTION_TYPES.' AS tt ON(t.TransactionTypeId = tt.Id) LEFT JOIN ' .
						TBL_ACCOUNTS.' AS acc ON(t.AccountId = acc.Id) LEFT JOIN ' .
						TBL_CATEGORIES.' AS cat ON(t.CategoryId = cat.Id)';
	$transactionsFeilds = "t.*, DATE_FORMAT(t.Date, '%d-%m-%Y') AS FormattedTransactionDate, " .
							"u.Username, tt.DisplayName AS TransactionType, acc.Name AS AccountName, " .
							"cat.DisplayName AS CategoryName, cat.Color AS CategoryColor";
	$transactionsWhereCondition = "WHERE t.ActiveStatus=1 ". $catCondition;
	$transactionsOrderCondition = " ORDER BY t.Date DESC";
	$transactionsStmt = $GLOBALS['DB']->selectAll($transactionsTable, $transactionsFeilds, $transactionsWhereCondition.$transactionsOrderCondition.$limitCondition);
	while ($transactionsRow = $transactionsStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->transactions[] = $transactionsRow;
	}
	
	$transactionTypesTable = TBL_TRANSACTION_TYPES;
	$transactionTypesFeilds = "*";
	$transactionTypesWhereCondition = "WHERE ActiveStatus=1 ";
	$transactionTypesOrderCondition = " ORDER BY Id ASC";
	$transactionTypesStmt = $GLOBALS['DB']->selectAll($transactionTypesTable, $transactionTypesFeilds, $transactionTypesWhereCondition.$transactionTypesOrderCondition.$limitCondition);
	while ($transactionTypesRow = $transactionTypesStmt->fetch(PDO::FETCH_ASSOC)) {
		$allItems->transactionTypes[] = $transactionTypesRow;
	}
	
	echo json_encode($allItems);	

?>