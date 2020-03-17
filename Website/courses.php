<?php
	include("header.inc");
?>

<?php
	include("nav.inc");
?>


<main id=cous>
      
     <table id=tab>
	 
	    <tr>
				<th>Course Name</th><th>Course Code</th>
		</tr>
		
		
		<?php
	       $db = mysqli_connect('localhost', 'root', '','college') or die(mysqli_error($db));
           $q = "select course_id, name, course_code From course";
		   $resultset = mysqli_query($db, $q) or die(mysqli_error($db));
		   
		   while($row=mysqli_fetch_array($resultset))
				{

					print "<td><a href='course.php?id={$row['course_id']}'>{$row['name']}</a></td>\n";
					print "<td>{$row['course_code']}</td>\n";
			
		        }
		?>
			
	</table>
	
</main>




<?php
	include("footer.inc");
?>