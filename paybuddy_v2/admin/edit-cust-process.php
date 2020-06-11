
<?php
if (isset($_POST['email'])) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $id = $_POST['id'];

    
    //query to update data
    //connect to the SQL server in gcloud 
    $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test', null, 'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
    //query
    //$q1 = "select * from users where cust_id = $custId";
    $q1 = "UPDATE users SET fname = '$fname', lname = '$lname', email = '$email' WHERE cust_id ='$id'";
    $results = mysqli_query($db, $q1) or die(mysqli_error($db));

    if($results){
        echo 'data updated';
    }
}
?>