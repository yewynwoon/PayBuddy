<?php
    if(isset($_POST['username'])) 
    $username = $_POST['username'];
    
    if(isset($_POST['password'])) 
    $password = $_POST['password'];
	
	$db = mysqli_connect("localhost", "root","", "paydb")  or die(mysqli_error($db));

    $q = "select * from customer where custUsername='$username' and custPassword='$password'";
	$results = mysqli_query($db, $q) or die(mysqli_error($db));
    

    //-----------------//delete

    while($row=mysqli_fetch_array($results))
    {
        $CurrentSCustID = $row["custID"];
        $CurrentSCustUser = $row["custUsername"];
    }

    //-------------------------------

    if(mysqli_num_rows($results) > 0)
    {
        //print "<h3>Great</h3>"; 
       session_start();
       //$_SESSION['username'] = $username;
       $_SESSION['id'] = $CurrentSCustID;
       $_SESSION['username'] = $CurrentSCustUser;
       header("Location:Profile.php");
       exit(0);
        
	
?>






<?php 
 } 
 else {
 print "<br>";
 print "<h3>Either you are not registered or your username or password is wrong!!!</h3>"; 
 
 print " <a href= register.php> Click here to register </a>";
  print "<br>";
  print "<br>";
 print " <a href= login.php> Click here to Login again </a>";
 
 
 }
 ?>