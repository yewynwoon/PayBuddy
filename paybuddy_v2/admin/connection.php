<?php
    //connect to the SQL server in gcloud 
    $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
   
    //query
    $results = mysqli_query($db, "select * from users"); 
    
    //this is to test
    while($row = mysqli_fetch_array($results))
    {
        print $row['fname'];

    }

?>