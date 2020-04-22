

<!DOCTYPE html>
<html>

       <head>

              <title>Main</title>
              <meta charset=utf-8>

       </head>



       <body>

              <header>
                     <h1>Main Content</h1>
                     
              </header>







              <main>
                            <?php

                                   session_start();
                                   if(!isset($_SESSION['username'])) // check if session variable exist
                                   { header("Location:login.php");
                                   exit(0); } 
                                   
                                   else {
                                   print "Logged in as " . $_SESSION['username'];
                                   }
                            ?>

                                   <a href="logout.php">Log Out</a>

              </main>








       </body>


</html>