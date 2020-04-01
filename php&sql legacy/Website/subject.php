<?php
	include("header.inc");
?>

<?php
	include("nav.inc");
?>

<main id=cous>
		<table id=tab>
            <tr>
                <th>Course Name</th>
<?php
//connect
$db = mysqli_connect("localhost","root","","college") or die(mysqli_error($db));

$subject = $_GET['subject'];

//run a select query
$query = "select * from course where subject='$subject'";
$resultset = mysqli_query($db, $query) or die(mysqli_error($db));
 
//for each result in the resultset create a tr in the table
while($row = mysqli_fetch_array($resultset))
{
    print "<tr>\n";
    print "<td><a href='course.php?id={$row['course_id']}' course_id={$row['course_id']}'>{$row['name']}</a></td>\n";
    print "</tr>\n";
    

}

?>
    </table>
	
	</main>
	



<?php
	include("footer.inc");
?>