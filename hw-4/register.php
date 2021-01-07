<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $email = $password = $confirm_password = $name = $surname = "";
$username_err = $email_err = $password_err = $confirm_password_err = $name_err = $surname_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Validate name
    if(empty(trim($_POST["name"]))){
        $name_err = "Please enter your name.";
    }
    else
    {
        $param_name = trim($_POST["name"]);
    }

    // Validate surname
    if(empty(trim($_POST["surname"]))){
        $surname_err = "Please enter your surname.";
    }
    else
    {
        $param_surname = trim($_POST["surname"]);
    }

    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = trim($_POST["username"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }

    // Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter an email.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE email = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            
            // Set parameters
            $param_email = trim($_POST["email"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $email_err = "An account with this email has already been registered.";
                } else{
                    $email = trim($_POST["email"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($email_err) && empty($name_err) && empty($surname_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password, email, name, surname) VALUES (?, ?, ?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssss", $param_username, $param_password, $param_email, $param_name, $param_surname);

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_email = $email;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                header("location: login.php");
            } else{
                echo "Something went wrong. Please try again later.";
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
        <title>Imdb Sign Up</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>    
    </head>
    <body data-spy="scroll" data-offset="20">
        <div id="SignUp" class="container-fluid">
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
                            <h1 class="text-center font-weight-bold">Sign Up</h1>
                            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($name_err)) ? 'has-error' : ''; ?>">
                                            <label>Name</label>
                                            <input type="text" name="name" class="form-control" value="<?php echo $name; ?>">
                                            <span id = "Error" class="help-block"><?php echo $name_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($surname_err)) ? 'has-error' : ''; ?>">
                                            <label>Surname</label>
                                            <input type="text" name="surname" class="form-control" value="<?php echo $surname; ?>">
                                            <span id = "Error" class="help-block"><?php echo $surname_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                                            <label>Username</label>
                                            <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                                            <span id = "Error" class="help-block"><?php echo $username_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                                            <label>Email</label>
                                            <input type="email" name="email" class="form-control" value="<?php echo $email; ?>">
                                            <span id = "Error" class="help-block"><?php echo $email_err; ?></span>
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
                                <div class="form-row form-element">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                                            <label>Confirm Password</label>
                                            <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                                            <span id = "Error" class="help-block"><?php echo $confirm_password_err; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                                <p id = "Padding_Short"></p>
                                <div class="form-row form-element">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <input type="submit" class="btn btn-success btn-lg btn-block" value="Submit">
                                    </div>
                                    <div class="col-md-5">
                                        <input type="reset" class="btn btn-warning btn-lg btn-block" value="Reset">
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                                <div class="form-row form-element">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10">
                                        <p id= "LogInRef">Already have an account? <a href="login.php">Login here</a>.</p>
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