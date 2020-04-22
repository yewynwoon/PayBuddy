<?php
	include("header.inc");
?>

<?php
	include("nav.inc");
?>


<main id=cous>
<table id=tab>
	<tr>
	<th>Instructors</th>
	</tr>
<?php
		
         $db = mysqli_connect("localhost","root","","college");
         // Check connection
		 if (mysqli_connect_errno())
		{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
        $query = "Select distinct instructor From course";
		$resultset = mysqli_query($db, $query);
		
		while($row=mysqli_fetch_array($resultset))
     {
		  print "<tr>\n";
         print "<td><a href='instructor.php?instructor={$row['instructor']}'>{$row['instructor']}</a></td>\n";
		   print "</tr>\n";
		 
		 }
		
?>
</table>
</main>




<?php
	include("footer.inc");
?>