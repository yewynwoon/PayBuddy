<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel=stylesheet href=website.css>
        <title>PayBuddyAdmin</title>
    </head>

    <body>
        <header>
          <h1>Admin Portal</a></h1>
        </header>
        
        <main>

            <div>
                <form method=post>
                    Admin Login ID:<input type=text name=f-loginID class="form-control form-control-lg"><br>
                    Password:<input type=password name=password class="form-control form-control-lg"><br>
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
    if(isset($_POST['f-loginID']) && isset($_POST['password']))
    {
        $varloginID = $_POST['f-loginID'];
        $password = $_POST['password'];
        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
        $q = "select * from admins where loginID='$varloginID' and admin_Pass='$password'";
        $results = mysqli_query($db, $q) or die(mysqli_error($db));


            if(mysqli_num_rows($results) > 0)
                    {
                            session_start();
                            header("Location:index.php");
                            exit(0);

                    }else{
                        echo "HELLO";
                        print "<br>";
                        print "<h3>Your username or password is wrong!!!</h3>"; 
                        print "<br>";
                      
                        
                    }
        
    }
	
	
	
    
?>
  
  

