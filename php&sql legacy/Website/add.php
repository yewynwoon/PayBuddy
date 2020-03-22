<?php
	include("header.inc");
?>


<?php
	include("nav.inc");
?>


	<main id=cous>
		
		<h2>Add New Course</h2>
		<form method=post action=process_add.php  enctype="multipart/form-data">
			Course Code: <input type=text name=course_code  ><br>
			Course Name: <input type=text name=name  ><br>
			subject: <input type=text name=subject  ><br>
			Weeks:        <input type=int name=weeks  ><br>
			Instructor Name: <input type=text name=instructor  ><br>
			Description: <br>
			<textarea rows=10 cols = 30 name=description></textarea><br>
			
			
		<input type="file" name = "file01" /><br>
		<input type="submit" />
	    </form>
		
	
	</main>






<?php
	include("footer.inc");
?>