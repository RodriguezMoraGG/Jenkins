<%-- 
    Document   : _include
    Created on : Feb 26, 2017, 8:41:09 AM
    Author     : Maximino Llovera
--%>

<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:set  var="path" value="${pageContext.servletContext.contextPath}"></c:set>
<c:set var="req" value="${pageContext.request}" />
<c:set var="uri" value="${req.requestURI}" />
<c:set var="url">${req.requestURL}</c:set>

    <!--Fonts & Icons-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
    <!-- CSS Files -->
    <link href="<c:url value='/resources/css/bootstrap.min.css' />" rel="stylesheet" />
<!--<link href="<c:url value='/resources/css/material-kit.css' />" rel="stylesheet" />-->
<link href="<c:url value='/resources/css/style.css' />" rel="stylesheet" />
<link href="<c:url value='/resources/css/sweetalert2.min.css' />" rel="stylesheet" />
<link href="<c:url value='/resources/css/customStyle.css' />" rel="stylesheet" />

<!--   Core JS Files   -->
<script src="<c:url value='/resources/js/jquery.min.js' />" ></script>
<script src="<c:url value='/resources/js/velocity.min.js' />" ></script>
<script src="<c:url value='/resources/js/velocity.ui.min.js' />" ></script>

<script src="<c:url value='/resources/js/bootstrap.min.js' />" ></script>
<script src="<c:url value='/resources/js/material.min.js' />" ></script>
<script src="<c:url value='/resources/js/material-dashboard.js' />" ></script>
<script src="<c:url value='/resources/js/validate/jquery.validate.min.js' />" ></script>
<script src="<c:url value='/resources/js/validate/localization/messages_es.min.js' />" ></script>
<script src="<c:url value='/resources/js/sweetalert2.min.js' />" ></script>
<script src="<c:url value='/resources/js/bluebird.min.js' />"></script>
<script src="<c:url value='/resources/js/general.js' />" ></script>
<script src="<c:url value='/resources/js/loading-overlay.min.js' />" ></script>