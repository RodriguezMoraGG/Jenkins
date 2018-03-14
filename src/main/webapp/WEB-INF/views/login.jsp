<%-- 
    Document   : login
    Created on : Feb 26, 2017, 9:05:37 AM
    Author     : Maximino Llovera
--%>

<!DOCTYPE html>
<html>
    <head>
        <%@include file="commons/_include.jsp"  %>
        <title>JSP Page</title>
    </head>
    <body class="signup-page">
        <div class="wrapper">
            <div class="header header-filter" style="background-image: url('<c:url value='resources/img/bgLogin.jpg' />'); background-size: cover; background-position: top center;">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
                            <div class="card card-signup">
                                <form class="form" method="" action="">
                                    <div class="header header-primary text-center">
                                        <h4>Login</h4>
                                        <!--                                      
                                        <div class="social-line">
                                            <a href="#pablo" class="btn btn-simple btn-just-icon">
                                                <i class="fa fa-facebook-square"></i>
                                            </a>
                                            <a href="#pablo" class="btn btn-simple btn-just-icon">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                            <a href="#pablo" class="btn btn-simple btn-just-icon">
                                                <i class="fa fa-google-plus"></i>
                                            </a>
                                        </div>
                                        -->  
                                    </div>
                                    <!--<p class="text-divider">Or Be Classical</p>-->
                                    <div class="content">

                                        <div class="form-group input-group label-floating">
                                            <span class="input-group-addon">
                                                <i class="material-icons">group</i>
                                            </span>
                                            <label class="control-label">User</label>
                                            <input type="text" class="form-control">
                                        </div>

                                        <div class="form-group input-group label-floating">
                                            <span class="input-group-addon">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                            <label class="control-label">Password</label>
                                            <input type="password" class="form-control" />
                                        </div>

                                        <!-- If you want to add a checkbox to this form, uncomment this code
                                        
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="optionsCheckboxes">
                                                Remember me
                                            </label>
                                        </div> -->
                                    </div>
                                    <div class="footer text-center">
                                        <a href="#pablo" class="btn btn-simple btn-primary btn-lg">Login</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <%@include file="commons/_footer.jsp"  %>
            </div>
        </div>
    </body>
</html>
