<?php
session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  header("location: welcome.php");
  exit;
}

require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username or email.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            header("location: welcome.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                }
                else{
                    $sql = "SELECT id, email, password FROM users WHERE email = ?";
        
                    if($stmt = mysqli_prepare($link, $sql)){
                        // Bind variables to the prepared statement as parameters
                        mysqli_stmt_bind_param($stmt, "s", $param_username);
            
                        // Set parameters
                        $param_username = $username;
            
                        // Attempt to execute the prepared statement
                        if(mysqli_stmt_execute($stmt)){
                            // Store result
                            mysqli_stmt_store_result($stmt);
                
                            // Check if username exists, if yes then verify password
                            if(mysqli_stmt_num_rows($stmt) == 1){                    
                                // Bind result variables
                                mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                                if(mysqli_stmt_fetch($stmt)){
                                    if(password_verify($password, $hashed_password)){
                                        // Password is correct, so start a new session
                                        session_start();
                            
                                        // Store data in session variables
                                        $_SESSION["loggedin"] = true;
                                        $_SESSION["id"] = $id;
                                        $_SESSION["username"] = $username;                            
                            
                                        // Redirect user to welcome page
                                        header("location: welcome.php");
                                    } else{
                                        // Display an error message if password is not valid
                                        $password_err = "The password you entered was not valid.";
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        // Display an error message if username or email doesn't exist
                        $username_err = "No account found with that username or email.";
                    }
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link href="imdb.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />
        <title>Imdb Log in</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>    
    </head>
    <body data-spy="scroll" data-offset="20">
        <div id="SignIn" class="container-fluid">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div id="LogoContainer">
                        <img id="Logo" src="images/imdb_logo.png" alt="logo" />
                    </div>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div id="Register">
                            <h1 class="text-center font-weight-bold">Sign In</h1>
                            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                                            <label>Username or Email</label>
                                            <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                                            <span id = "Error" class="help-block"><?php echo $username_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                                            <label>Password</label>
                                            <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                                            <span id = "Error" class="help-block"><?php echo $password_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <p id = "Padding_Short"></p>
                                <div class="form-row form-element">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <input type="submit" class="btn btn-success btn-lg btn-block" value="Login">
                                    </div>
                                    <div class="col-md-5">
                                        <input type="reset" class="btn btn-warning btn-lg btn-block" value="Reset">
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10">
                                        <p id= "LogInRef">Don't have an account? <a href="register.php">Sign up now</a>.</p>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </body>
</html>