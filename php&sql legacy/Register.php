<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <link rel=stylesheet href=ws.css>
        <title>Pay</title>

    </head>

    <body class="body">

        <header class=header>
            <h1><a href="index.php" target="_blank">Pay</a></h1>
            <h5>PayService</h5>
        </header>

        <main>

            <form method="post" action="process_register.php">
                Username:<input type="text" name="username" ><br>
                password:<input type="password" name="password" ><br>
                First Name:<input type="FN" name="FN" ><br>
                Last Name:<input type="LN" name="LN" ><br>
                Mobile:<input type="Mobile" name="Mobile" ><br>
                Street:<input type="Street" name="Street" ><br>
                Subrub:<input type="Subrub" name="Subrub" ><br>
                Postcode:<input type="Postcode" name="Postcode" ><br>


                <input type=submit value="Register" >
           </form>

        </main>

        <footer>
            <p>&copy; 2020 PP1 Team 4</p>
        </footer>
    </body>
</html>

