<%-- 
    Document   : _leftMenu
    Created on : Mar 21, 2017, 11:44:41 PM
    Author     : Maximino Llovera
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--<div class="sidebar" data-color="blue" data-image="../assets/img/sidebar-1.jpg">-->
<div class="sidebar" data-color="blue" data-background-color="white">
    <!--
    Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

    Tip 2: you can also add an image using data-image tag
    -->

    <div class="logo">
        <a href="<c:url value='/' />" class="simple-text" data-image="../img/logo.png">

        </a>
    </div>

    <div class="sidebar-wrapper">
        <ul class="nav">

            <li>
                <a href="<c:url value='/user/viewProfile' />">
                    <i class="material-icons">person</i>
                    <p>Perfil de usuario</p>
                </a>
            </li>

        </ul>
    </div>
</div>

