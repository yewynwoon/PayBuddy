<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel=stylesheet href=ws.css>
    <title>Pay</title>
</head>

<body class="body">
    <header class=header>
        <h1><a href="index.php" target="_blank">PayService</a></h1>
        <h5>Online Payment</h5>
    </header>
    <main>

        <div class="container">
            <form method=post>
                email:<input type=text name=email class="form-control form-control-lg"><br>
                password:<input type=password name=password class="form-control form-control-lg"><br>
                <input type=submit value=Login class="btn btn-primary btn-block">
            </form>
        </div>

    </main>
    <footer>
        <p>&copy; 2020 PP1 Team 4</p>
    </footer>
</body>

</html>





<?php
    if(isset($_POST['email']) && isset($_POST['password'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $db = mysqli_connect("localhost", "root","", "paydb")  or die(mysqli_error($db));
        $q = "select * from customer where email='$email' and password='$password'";
        $results = mysqli_query($db, $q) or die(mysqli_error($db));


   
        
  while($row=mysqli_fetch_array($results))
  {
    $CurrentCustomer = $row["cust_FName"];
    $CAccountValue = $row["account_value"];
    $CurrCustID = $row["custID"];

    if(mysqli_num_rows($results) > 0)
            {
                if($custAccStatus !== 0)
                {
                    session_start();
                    $_SESSION['cust_FName'] = $CurrentCustomer;
                    $_SESSION['CustAccValue'] = $CAccountValue;
                    $_SESSION['custID'] = $CurrCustID;

                    header("Location:dashboard.php");
                    exit(0);
                }else
                {
                    print "Your Account is disabled!";
                   
                }

            }else{
                echo "HEllp";
                print "<br>";
                print "<h3>Either you are not registered or your username or password is wrong!!!</h3>"; 
                print "<br>";
                print " <a href= login.php> Click here to Login again </a>";
                
            }
        }
    }
	
	
	
    
  
  

