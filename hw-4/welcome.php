<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link href="imdb.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />
        <title>imdb</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </head>
    <body data-spy="scroll" data-offset="20">
        <div id="Navigation" class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                        <div class="d-flex flex-grow-1">
                            <a class="navbar-brand">
                                <img src="images/imdb_logo.png" width="auto" height="auto" style="margin-left:10px" class="d-inline-block align-left" alt="">
                            </a>
                            <form class="mr-2 my-auto w-100 d-inline-block order-1">
                                <div class="input-group">
                                    <input type="text" class="form-control border border-right-0" placeholder="Search...">
                                        <span class="input-group-append">
                                            <button class="btn btn-outline-light border border-left-0" type="button">
                                                <i class="fa fa-search">Search</i>
                                            </button>
                                        </span>
                                </div>
                            </form>
                        </div>
                        <div class="navbar-collapse collapse flex-shrink-1 flex-grow-0 order-last" id="navbar7">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class ="nav-link"><?php echo htmlspecialchars($_SESSION["username"]); ?></a>
                                </li>
                                <li class="nav-item">
                                    <a href="logout.php" class="btn btn-danger d-inline-block justify-content-right justify-content-center">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-7">
                    <div id="Wrapper_NewMovie">



                    </div>


                </div>
                <div class="col-md-1">
                    <div id="Adding" class="btn btn-success" style="<?php if($_SESSION['id'] == 1) echo 'display:block;'; else 'display:none;'?>">Add New</div>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </body>
</html>