<?php
$custId = $_GET['CustomerId'];
?>
<?php
session_start();
if(!isset($_SESSION['admin'])) // check if session variable exist
{ header("Location:login.php");
exit(0); } 

else {
print "Logged in as " . $_SESSION['admin'];

}
?>
<br><br>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        .collapsible {
            background-color: #777;
            color: white;
            cursor: pointer;
            padding: 18px;
            width: 855px;
            border: none;
            text-align: left;
            outline: none;
            font-size: 15px;
        }

        .active,
        .collapsible:hover {
            background-color: #555;
        }

        .content {
            padding: 0 18px;
            display: none;
            overflow: hidden;
            width: 850px;
            background-color: #f1f1f1;
        }
    </style>
    <link rel=stylesheet href=website.css>
    <title>Admin</title>


</head>

<body>
    <main>
        <nav>
            <div class="topnav">
                <a href="index.php">Home</a>
                <?php print "<a href='edit-customer.php?CustomerId={$custId}'>Edit Customer Details</a>" ?>
                <?php print "<a href='view-customer.php?CustomerId={$custId}'>View Customer</a>" ?>
                <a href="logout.php">admin Logout</a>
            </div>
        </nav>

        </nav>
    </main>


    <main>

        <h2>Okta</h2>

        <p>User Account status</p>
        <button type="button" class="collapsible">Open Collapsible</button>
        <div class="content">
            <iframe frameborder="0" height="500" width="855" scrolling="yes" src="https://dev-203865-admin.okta.com/admin/users"></iframe>
        </div>


        <script>
            var coll = document.getElementsByClassName("collapsible");
            var i;

            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") {
                        content.style.display = "none";
                    } else {
                        content.style.display = "block";
                    }
                });
            }
        </script>


    </main>

    <main>
        <div>
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

        <div>
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

        <div>
            <h4>Transfer</h4>
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

        <div>
            <h4>Received</h4>
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



    </main>


    <footer>
    </footer>

</body>

</html>