<?php

session_start();
if (!isset($_SESSION['custID'])) // check if session variable exist
{
	header("Location:login.php");
	exit(0);
} else {
}

$CurrentCustomer = $_SESSION['cust_FName'];
$CustAccValue = $_SESSION['CustAccValue'];
$CurrCustID = $_SESSION['custID'];

?>




<?php
include("header.inc");
?>

<?php
include("nav.inc");
?>

<main id=cous>


	<h1>
		<?php print "Hi " . $CurrentCustomer	?>
		<br></br>
		<?php print "Account Balance: $" . $CustAccValue	?>
	</h1>
	<b></b>


	<table id=tab>
		<tr>
			<th>Transaction ID</th>
			<th>Amount</th>
			<th>Transaction Date</th>
		</tr>

		<?php
		$db = mysqli_connect("localhost", "root", "", "paydb");
		$query = "select * from transaction where custID=$CurrCustID";
		$resultset = mysqli_query($db, $query) or die(mysqli_error($db));
		while ($row = mysqli_fetch_array($resultset)) {
			print "<tr>\n";
			print "<td>{$row['transact_id']}</td>\n";
			print "<td>{$row['amount_value']}</td>\n";
			print "<td>{$row['transact_date']}</td>\n";
			print "</tr>\n";
		}
		?>
	</table>



</main>



<?php
include("footer.inc");
?>