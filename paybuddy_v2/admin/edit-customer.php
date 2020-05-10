<?php $customerId = $_GET['CustomerId']; ?>
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
    <title>Admin</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>

<body>
    <main>
        <nav>
            <div class="topnav">
                <a href="index.php">Home</a>
                <?php print "<a href='edit-customer.php?CustomerId={$customerId}'>Edit Customer Details</a>" ?>
                <?php print "<a href='view-customer.php?CustomerId={$customerId}'>View Customer</a>" ?>
                <a href="logout.php">admin Logout</a>
            </div>
        </nav>

        </nav>
    </main>
    <main>
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    //connect to the SQL server in gcloud 
                    $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                    //query
                    $q1 = "select * from users where cust_id = $customerId";
                    //  $q1 = "select * from users";
                    $table = mysqli_query($db, $q1) or die(mysqli_error($db));

                    while ($row = mysqli_fetch_array($table)) { ?>
                        <tr id="<?php echo $row['cust_id']; ?>">
                            <td data-target="fname"><?php echo $row['fname']; ?></td>
                            <td data-target="lname"><?php echo $row['lname']; ?></td>
                            <td data-target="email"><?php echo $row['email']; ?></td>
                            <td><a href="#" data-role="update" data-id="<?php echo $row['cust_id']; ?>">Update</td>
                        </tr>
                    <?php } ?>


                </tbody>


            </table>

            <!-- Trigger the modal with a button -->
            <!--<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->

        </div>




        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" id="fname" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" id="lname" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" id="email" maxlength="30" class="form-control">
                        </div>

                        <input type="hidden" id="userId" class="form-control">

                    </div>

                    <div class="modal-footer">
                        <a href="#" id="save" class="btn btn-primary pull-right">Update</a>
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

    </main>




    <footer>


    </footer>
</body>

<script>
    $(document).ready(function() {
        $(document).on('click', 'a[data-role=update]', function() {
            var id = $(this).data('id');
            var fname = $('#' + id).children('td[data-target=fname]').text();
            var lname = $('#' + id).children('td[data-target=lname]').text();
            var email = $('#' + id).children('td[data-target=email]').text();

            $('#fname').val(fname);
            $('#lname').val(lname);
            $('#email').val(email);
            $('#userId').val(id);
            $('#myModal').modal('toggle');
        })

        //now create event to get data from fields and update in database

        $('#save').click(function() {
            var id = $('#userId').val();
            var fname = $('#fname').val();
            var lname = $('#lname').val();
            var email = $('#email').val();

            $.ajax({
                url: 'edit-cust-process.php',
                method: 'post',
                data: {
                    fname: fname,
                    lname: lname,
                    email: email,
                    id: id
                },
                success: function(response) {
                    //console.log(response);
                    $('#' + id).children('td[data-target=fname]').text(fname);
                    $('#' + id).children('td[data-target=lname]').text(lname);
                    $('#' + id).children('td[data-target=email]').text(email);
                    $('#myModal').modal('toggle');
                }

            })
        });
    });
</script>



</html>