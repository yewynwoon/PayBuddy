

<!DOCTYPE html>
<html>

       <head>

              <title>Profile</title>
              <meta charset=utf-8>

       </head>



       <body>

              <header>
                     <h1>Main Content</h1>
                     
              </header>






              <main>
                     <div>
                            <?php

                                   session_start();
                                   if(!isset($_SESSION['username'])) // check if session variable exist
                                   { header("Location:login.php");
                                   exit(0); } 
                                   
                                   else {
                                   print "Logged in as " . $_SESSION['username'];
                                   }

                                   
                            ?>
                                   <br><a href="addfunds.php">Add Funds</a>
                                   <br><a href="logout.php">Log Out</a>
                     </div>




              </main>








       </body>


</html>