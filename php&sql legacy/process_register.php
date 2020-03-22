<?php
       $username = $_POST['username'];
	   $password = $_POST['password'];
	   $FN = $_POST['FN'];
	   $LN = $_POST['LN'];
	   $Mobile = $_POST['Mobile'];
	   $Street = $_POST['Street'];
	   $Subrub = $_POST['Subrub'];
	   $Postcode = $_POST['Postcode'];
	

	   //logon to  server 
	   $db = mysqli_connect("localhost", "root", "", "paydb");
	   
	   //the query
//	   $q = "insert into customer values('', '$FN', '$LN', '$Mobile', '$username', SHA('$password'), '', '$Street', '$Subrub', '$Postcode')";
		$q = "insert into customer values('', '$FN', '$LN', '$Mobile', '$username', '$password', '', '$Street', '$Subrub', '$Postcode')";
	   
	   //run the query
	   
	   mysqli_query($db, $q) or die (mysqli_error($db));
	   
	header("location:Login.php");
	   
?>