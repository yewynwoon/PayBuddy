<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="Login.css">
        <title>Paybuddy: Admin Login</title>
    </head>

    <body id="background-image">
        <div class="main-container">
            <header>
                <img class="spaceout" id="login-logo" src="img/logoandtext.png"/>
                <h1>Admin Portal</a></h1>
            </header>
            
            <main>
                <hr class="spaceout" id="centre-fade"></hr>
                <div>
                    <form method=post>
                        <input 
                            class="input-box" 
                            id="top" 
                            type=text 
                            name=f-loginID 
                            placeholder="Login ID"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Login ID'" 
                        ><br>
                        <input 
                            class="input-box" 
                            id="bottom" 
                            type=password 
                            name=password 
                            placeholder="Password"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Password'" 
                        ><br>
                        <input class="orange-button button-text spaceout-more" type=submit value=Login>
                    </form>
                </div>
            </main>
            <span class="fade-in" id="error-message">
                <?php
                    if(isset($_POST['f-loginID']) && isset($_POST['password']))
                    {
                        $varloginID = $_POST['f-loginID'];
                        $password = $_POST['password'];
                        $db = mysqli_connect('34.87.251.98', 'root', 'hello', 'test' ,null,'paybuddy-2020:australia-southeast1:paybuddy-mysql-db');
                        $q = "select * from admins where loginID='$varloginID' and admin_Pass='$password'";
                        $results = mysqli_query($db, $q) or die(mysqli_error($db));

                        if(mysqli_num_rows($results) > 0)
                        {
                            session_start();
                            header("Location:index.php");
                            $_SESSION['admin'] = $varloginID;
                            exit(0);
                        }else{
                            $message = "Your Login ID or password is incorrect. Please try again.";
                            echo $message;
                        }
                    }  
                ?>
            </span>
        </div>
        <footer>
                <p>&copy; 2020 PP1 Group 15</p>
        </footer>
    </body>

</html>
