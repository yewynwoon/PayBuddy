<?php    $custId = $_GET['CustomerId']; ?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel=stylesheet href=website.css>
        <title>Admin</title>
    </head>

    <body>
        <main>
            <div>
                <table>
                    <tr>
                        <th>PaymentID</th><th>Biller Code</th><th>CRN</th><th>Amount</th><th>Description</th><th>Date</th>
                    </tr>

                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "select * from cust_bpay_payments where cust_id = $custId ";
                        
                        $results = mysqli_query($db, $q )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                            print "<tr>\n";
                            print "<td>{$row['bpay_payment_id']}</td>\n";
                            print "<td>{$row['biller_code']}</td>\n";
                            print "<td>{$row['crn']}</td>\n";
                            print "<td>{$row['amount']}</td>\n";
                            print "<td>{$row['description']}</td>\n";
                            print "<td>{$row['date_stamp']}</td>\n";
                            print "</tr>\n";
                            
                        }

                    ?>
                </table>
            </div>

            <div>
                <table>
                    <tr>
                        <th>Deposit ID</th><th>Amount</th><th>Description</th><th>Date</th>
                    </tr>

                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "select * from cust_deposit where cust_id = $custId ";
                        
                        $results = mysqli_query($db, $q )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                            print "<tr>\n";
                            print "<td>{$row['deposit_id']}</td>\n";
                            print "<td>{$row['amount']}</td>\n";
                            print "<td>{$row['description']}</td>\n";
                            print "<td>{$row['date_stamp']}</td>\n";
                            print "</tr>\n";
                            
                        }

                    ?>
                </table>
            </div>

            <div>
                <h4>Transfer</h4>
                <table>
                    <tr>
                        <th>Transaction ID</th><th>Customer ID</th><th>Full Name</th><th>Amount</th><th>Description</th><th>Date</th>
                    </tr>

                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "Select transact_id, dest_cust_id, amount, description, date_stamp, concat(fname, ' ', lname) As full_name 
                        FROM users u, cust_transfer ct 
                        WHERE src_cust_id = $custId 
                        AND ct.dest_cust_id = u.cust_id";
                        
                        $results = mysqli_query($db, $q )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                            print "<tr>\n";
                            print "<td>{$row['transact_id']}</td>\n";
                            print "<td>{$row['dest_cust_id']}</td>\n";
                            print "<td>{$row['full_name']}</td>\n";
                            print "<td>{$row['amount']}</td>\n";
                            print "<td>{$row['description']}</td>\n";
                            print "<td>{$row['date_stamp']}</td>\n";
                            print "</tr>\n";
                            
                        }

                    ?>
                </table>
            </div>

            <div>
                <h4>Received</h4>
                <table>
                    <tr>
                        <th>Transaction ID</th><th>Customer ID</th><th>Full Name</th><th>Amount</th><th>Description</th><th>Date</th>
                    </tr>

                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "Select transact_id, dest_cust_id, src_cust_id, dest_cust_id, amount, description, date_stamp, concat(fname, ' ', lname) As full_name 
                        FROM users u, cust_transfer ct 
                        WHERE dest_cust_id =  $custId
                        AND ct.src_cust_id = u.cust_id";
                        
                        $results = mysqli_query($db, $q )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                            print "<tr>\n";
                            print "<td>{$row['transact_id']}</td>\n";
                            print "<td>{$row['dest_cust_id']}</td>\n";
                            print "<td>{$row['full_name']}</td>\n";
                            print "<td>{$row['amount']}</td>\n";
                            print "<td>{$row['description']}</td>\n";
                            print "<td>{$row['date_stamp']}</td>\n";
                            print "</tr>\n";
                            
                        }

                    ?>
                </table>
            </div>


            
        </main>


        <footer>
        </footer>
        
    </body>
</html>