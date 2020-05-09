<?php    $custId = $_GET['CustomerId']; ?>

<!DOCTYPE html>

<html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel=stylesheet href=website.css>
        <title>Admin</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

    </head>

    <body>

    <main>
             <div>
                <table>
                    <tr>
                        <th>First Name</th><th>Last Name</th><th>Email Address</th>
                    </tr>

                    <?php
                        //connect to the SQL server in gcloud 
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        //query
                        //$q1 = "select * from users where cust_id = $custId";
                        $q1 = "select * from users";
                        $results = mysqli_query($db, $q1 )or die(mysqli_error($db)); 

                        while($row=mysqli_fetch_array($results))
                        {
                    ?>      <tr id = <?php echo $custId ?>>
                            <td> data-target='firstName'>{$row['fname']}</td>\n";
                            print "<td data-target='lastName'>{$row['lname']}</td>\n";
                            print "<td data-target='email'>{$row['email']}</td>\n";
                    ?>
                            <td><a href = "#" data-role="update" data-id = <?php echo $custId ?>>Update</a></td>
                        </tr>
                            
                      <?php  } ?>

                    
                </table>
            </div>



<!-- Trigger the modal with a button -->
<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
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
                <input type="text" id="firstName" class="form-control">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" id="lastName" class="form-control">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" id="email" class="form-control">
            </div>
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
        $(document).ready(function(){
            $(document).on('click', 'a[data-role=update]', function(){
                var id = $(this).data('id');
                var firstName = $('#' + id).children('td[data-target=firstName]').text();
                var lastName = $('#' + id).children('td[data-target=lastName]').text();
                var email = $('#' + id).children('td[data-target=email]').text();

                $('#firstName').val(firstName);
                $('#lastName').val(lastName);
                $('#email').val(email);
                $('#myModel').modal('toggle');
            })
        });
    </script>
</html>
