<?php
    //convert the POST variables to normal variables
    $course_code = $_POST['course_code'];
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $instructor = $_POST['instructor'];
    $weeks = $_POST['weeks'];
    $description = $_POST['description'];
	
    //connect
    $db = mysqli_connect("localhost","root","","college") or die(mysqli_error($db));
    
    //run the insert query
    $query = "insert into course values(null, '$course_code', '$name', '$subject', '$instructor', $weeks, '$description')";
    mysqli_query($db, $query) or die(mysqli_error($db));
    
    //redirect to home
    header("location:index.php");
?>


<?php
    $tmp = $_FILES['file01']['tmp_name'];
    $dest = "Course_Guide /{$_FILES['file01']['name']}";
    move_uploaded_file($tmp, $dest);
	
?>



