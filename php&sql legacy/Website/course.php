<?php
	include("header.inc");
?>


<?php
	include("nav.inc");
?>


	<main id=cous>
	<table id=tab>
	<tr>
	<th>Course id</th><th>Course Name</th><th>Course Code</th><th>Subject</th><th>Weeks</th><th>Instructor Name</th><th>Description</th>
	</tr>
		
		<?php
		 $id = $_GET['id'];
		 
         $db = mysqli_connect("localhost","root","","college");
         // Check connection
		 if (mysqli_connect_errno())
		{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		
		//run a select query
        $query = "select * from course where course_id=$id";
        $resultset = mysqli_query($db, $query) or die(mysqli_error($db));
		
		 while($row=mysqli_fetch_array($resultset))
		 {
		 print "<tr>\n";
		 print "<td>{$row['course_id']}</td>\n";
		  print "<td>{$row['name']}</td>\n";
		   print "<td>{$row['course_code']}</td>\n";
		    print "<td>{$row['subject']}</td>\n";
			 print "<td>{$row['weeks']}</td>\n";
			  print "<td>{$row['instructor']}</td>\n";
			  print "<td>{$row['description']}</td>\n";
			   print "</tr>\n";
		 }
		?> 
			
</table>
	</main>



<?php
	include("footer.inc");
?>