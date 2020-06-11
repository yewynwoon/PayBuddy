<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" href="view-customer.css">
            <title>Paybuddy Admin: Customer Detail</title>
    </head>
    <body>
        <header>
            <img src="./img/logoandtext.png">
            <?php
                $custId = $_GET['CustomerId'];
            ?>
            <div class="admin-details">
                <?php
                    session_start();
                    if(!isset($_SESSION['admin'])) {
                        header("Location:login.php");
                        exit(0); 
                    } else {
                        print "Logged in as " . $_SESSION['admin'];
                    }
                ?>
                <input id="logout-button" type="button" onclick="location.href='logout.php';" value="Logout" />
            </div>
            <div class="topnav">
                <a href="index.php">Home</a>
                <div id="float-right">
                    <?php print "<a href='edit-customer.php?CustomerId={$custId}'>Edit User Details</a>" ?>
                    <a href="https://dev-203865-admin.okta.com/admin/users">Edit user access</a>
                </div>
            </div>
        </header>

        <main>
            <div id="title">
                <?php
                    print "USER ID: " . $custId;
                ?>
            </div>
            <div class="main-container">                
                <button type="button" class="collapsible">B-Pay Transactions</button>
                <div class="content">
                    <table>
                        <tr>
                            <th>PaymentID</th>
                            <th>Biller Code</th>
                            <th>CRN</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>

                        <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "select * from cust_bpay_payments where cust_id = $custId ";

                        $results = mysqli_query($db, $q) or die(mysqli_error($db));

                        while ($row = mysqli_fetch_array($results)) {
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

                <button type="button" class="collapsible">Past Funds Added to Account</button>
                <div class="content">
                    <table>
                        <tr>
                            <th>Deposit ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>

                        <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "select * from cust_deposit where cust_id = $custId ";

                        $results = mysqli_query($db, $q) or die(mysqli_error($db));

                        while ($row = mysqli_fetch_array($results)) {
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

                <button type="button" class="collapsible">Past Fund Transfers</button>
                <div class="content">
                    <table>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Customer ID</th>
                            <th>Full Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>

                        <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "Select transact_id, dest_cust_id, amount, description, date_stamp, concat(fname, ' ', lname) As full_name 
                                FROM users u, cust_transfer ct 
                                WHERE src_cust_id = $custId 
                                AND ct.dest_cust_id = u.cust_id";

                        $results = mysqli_query($db, $q) or die(mysqli_error($db));

                        while ($row = mysqli_fetch_array($results)) {
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

                <button type="button" class="collapsible">Received Funds</button>
                <div class="content">
                    <table>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Customer ID</th>
                            <th>Full Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>

                        <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        $q = "Select transact_id, dest_cust_id, src_cust_id, dest_cust_id, amount, description, date_stamp, concat(fname, ' ', lname) As full_name 
                                FROM users u, cust_transfer ct 
                                WHERE dest_cust_id =  $custId
                                AND ct.src_cust_id = u.cust_id";

                        $results = mysqli_query($db, $q) or die(mysqli_error($db));

                        while ($row = mysqli_fetch_array($results)) {
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
            </div>
        </main>
        <footer class="spaceout-more">
            <p>&copy; 2020 PP1 Group 15</p>
        </footer>
    </body>

    <script>
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            }
        });
        }
</script>
</html>