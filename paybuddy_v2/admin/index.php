<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="index.css">
        <title>Paybuddy: Admin Home</title>
    </head>

    <body>
        <header>
            <img src="./img/logoandtext.png">
            <div class="admin-details">
                <?php
                    session_start();
                    if(!isset($_SESSION['admin'])) { // check if session variable exist
                        header("Location:login.php");
                        exit(0); 
                    } else {
                        print "Logged in as " . $_SESSION['admin'];
                    }
                ?>
                <input id="logout-button" type="button" onclick="location.href='logout.php';" value="Logout" />
            </div>
            <h1>
                    User list
            </h1>
            <hr id='left-hr'></hr>
        </header>

        <main>
            <div class="main-container">
                <table>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                    </tr>
                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "select cust_id, fname, lname, email from users";
                        
                        $results = mysqli_query($db, $q )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                            print "<tr>\n";
                            print "<td>{$row['cust_id']}</td>\n";
                            print "<td>{$row['fname']}</td>\n";
                            print "<td>{$row['lname']}</td>\n";
                            print "<td>{$row['email']}</td>\n";
                            print "<td><button><a href='view-customer.php?CustomerId={$row['cust_id']}'>View</button></td>";
                            print "</tr>\n";
                            
                        }

                    ?>
                </table>
            </div>
        <footer class="spaceout-more">
            <p>&copy; 2020 PP1 Group 15</p>
        </footer>
        </main>
    </body>
</html>