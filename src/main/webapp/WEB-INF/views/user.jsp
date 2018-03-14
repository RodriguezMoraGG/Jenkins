<%-- 
    Document   : user
    Created on : Feb 26, 2017, 2:17:34 PM
    Author     : Maximino Llovera
--%>

<!DOCTYPE html>
<html>
    <head>
        <%@include file="commons/_include.jsp" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <jsp:useBean id="date" class="java.util.Date" />
        <fmt:formatDate value="${date}" pattern="yyyy" var="currentYear" />
        <link href="<c:url value='/resources/css/jquery-ui-1.10.3.custom.css' />" rel="stylesheet" />
        <script src="<c:url value='/resources/js/jquery-ui.min.js' />" ></script>
        <script src="<c:url value='/resources/js/userFunct.js' />" ></script>
        <style>
            @media (max-width: 3600px) {
                .main-panel{width: 100%;}
            }
        </style>
    </head>
    <body>
        <div class="wrapper"  id="containter">
            <%--<%@include file="commons/_navTopMenu.jsp"  %>--%>
            <div class="main-panel">


                <div class="row" style="background-color:#fb8c00;">
                    <div class="col-md-11 col-md-offset-1" >
                        <img style="margin:0 0 0 30px" src="${path}/resources/img/banner_perfill.png">
                         <a href="#" id="printScreen" ><img style="margin:0 0 0 30px" src="${path}/resources/img/pdf.png"></a>
                    </div>
                </div>



                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                                <div class="card card-profile">
                                    <div class="card-avatar">
                                        <a href="#pablo">
                                            <img class="img" src="${path}/resources/img/marc.jpg" />
                                        </a>
                                    </div>

                                    <div class="content">
                                        <h6 class="category text-gray" id='spJobName'></h6>
                                        <h4 class="card-title" id='spFullName'></h4>

                                        <span id='spDepartament'></span><br/>
                                        <span id='spBusinessUnit'></span><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                                <div class="card">
                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mis Datos Generales</h4>
                                        <!--<p class="category">Informaci&oacute;n personal</p>-->
                                    </div>
                                    <div class="card-content">
                                        <form id="fromGnrlData" class="disableForm">

                                            <div class="row">                                                
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">N&oacute;mina</label>
                                                        <input id="payroll" type="text" class="form-control"  value=" ">
                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Nombre completo</label>
                                                        <input id="fullName" type="text" class="form-control"   value=" ">
                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Puesto</label>
                                                        <input id="jobName" type="text" class="form-control" value=" " >
                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Business Unit</label>
                                                        <input id="businessUnit" type="text" class="form-control" value=" " >
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Departamento</label>
                                                        <input id="departament" type="text" class="form-control" value=" ">
                                                    </div>
                                                </div>                                                
                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Salario</label>
                                                        <input id="monthlySalary" type="text" class="form-control" value="" >
                                                    </div>
                                                </div>

                                                <div class="col-md-2 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Centro de Costo</label>
                                                        <input id="cecos" type="text" class="form-control"  value=" " >
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Fecha de ingreso</label>
                                                        <input id="hiredDate" type="text" class="form-control"  value=" ">
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Compañia</label>
                                                        <input id="companyName" type="text" class="form-control" value=" " >
                                                    </div>
                                                </div>
                                                <!--                                                
                                                <div class="col-md-3">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">&Aacute;rea</label>
                                                        <input id="area" type="text" class="form-control" >
                                                    </div>
                                                </div>
                                                -->
                                            </div>


                                            <div class="row">
                                                <!--                                                
                                                <div class="col-md-3">
                                                    <div class="checkbox">
                                                        <label>
                                                            <input id="chkActive" type="checkbox" name="optionsCheckboxes" checked="">
                                                            Activo
                                                        </label>
                                                    </div>
                                                </div>
                                                -->
                                                <!--                                                
                                                <div class="col-md-3">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Usuario de sesi&oacute;n</label>
                                                        <input type="text" class="form-control" >
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Password</label>
                                                        <input type="password" class="form-control" >
                                                    </div>
                                                </div>
                                                -->
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mi Informaci&oacute;n personal</h4>
                                    </div>
                                    <div class="card-content disableForm">
                                        <div class="row">
                                            <div class="col-md-4 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label ">Pa&iacute;s</label>
                                                    <input id="countryBirth" type="text" class="form-control" value=" " >
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Estado</label>
                                                    <input id="state" type="text" class="form-control" value=" " >
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Ciudad</label>
                                                    <input id="city" type="text" class="form-control" value=" " >
                                                </div>
                                            </div>

                                        </div>


                                        <div class="row">

                                            <!--                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                                                                <div class="form-group label-floating">
                                                                                                    <label class="control-label">N&uacute;mero exterior</label>
                                                                                                    <input id="extNumber" type="number" class="form-control" >
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-md-3 col-sm-6 col-xs-6">
                                                                                                <div class="form-group label-floating">
                                                                                                    <label class="control-label">N&uacute;mero interior</label>
                                                                                                    <input id="interiorNumber" type="text" class="form-control" >
                                                                                                </div>
                                                                                            </div>-->


                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Direcci&oacute;n (calle)</label>
                                                    <input id="street" type="text" class="form-control"  value=" ">
                                                </div>
                                            </div>

                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Colonia</label>
                                                    <input id="colony" type="text" class="form-control"   value=" ">
                                                </div>
                                            </div>

                                            <!--                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                                                                <div class="form-group label-floating">
                                                                                                    <label class="control-label">CP</label>
                                                                                                    <input id="zipCode" type="number" class="form-control" >
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-md-3 col-sm-6 col-xs-6 hidden">
                                                                                                <div class="form-group label-floating">
                                                                                                    <label class="control-label">Municipio</label>
                                                                                                    <select id="address.municipality" class="form-control">
                                                                                                        <option value="mty">Monterrey</option>
                                                                                                        <option value="apodaca">Apodaca</option>
                                                                                                        <option value="guadalupe">Guadalupe</option>
                                                                                                        <option value="sannicolas">San nicolas</option>
                                                                                                        <option value="sanpedro">San Pedro</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>-->

                                        </div>
                                        <div class="row">
                                            <div class="col-md-3 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Correo</label>
                                                    <input id="email" type="text" class="form-control" >
                                                </div>
                                            </div>
                                            <!--                                                <div class="col-md-3 col-sm-6 col-xs-6">
                                                                                                <div class="form-group label-floating">
                                                                                                    <label class="control-label">N&uacute;mero de tel&eacute;fono</label>
                                                                                                    <input id="phoneNumber" type="text" class="form-control" >
                                                                                                </div>
                                                                                            </div>-->
                                            <div class="col-md-3 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Estado civil</label>

                                                    <input id="maritalStatus" type="text" class="form-control" >
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">NSS</label>
                                                    <input id="ssn" type="text" class="form-control" >
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-6 col-xs-6">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Fecha de nacimiento</label>
                                                    <input id="birthday" type="text" class="form-control" value="13-10-1986" >
                                                </div>
                                            </div>
                                        </div>
                                        <form id="formContactInfo" class="disableForm">
                                            <div class="row">
                                                <div class="btnAdd">
                                                    <i data-toggle="tooltip" title="Editar información"  class="material-icons button action editAvailabilityChangeRecidence">edit</i>
                                                    <i data-toggle="tooltip" title="Guardar información"  class="material-icons button hidden floatRight saveAvailabilityChangeRecidence">save</i>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Nombre de Contacto de emergencias:</label>
                                                        <input id="additionalInfo.contactPersonEmployee" maxlength="50" name="additionalInfo.contactPersonEmployee" type="text" class="form-control" >
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6 col-xs-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Tel&eacute;fono de contacto de emergencias:</label>
                                                        <input id="additionalInfo.contactPhoneEmployee" maxlength="15"  name="additionalInfo.contactPhoneEmployee" type="text" class="form-control" >
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="row hidden">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Onservaciones</label>
                                                        <textarea id="address.observations" class="form-control" rows="5"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mi trayectoria</h4>
                                    </div>
                                    <div class="card-content">
                                        <!--                                        <i data-toggle="tooltip" id="addJobHistory" target="#modalJobHistory" title="Agregar nuevo elemento"  class="material-icons button btnAdd">add</i>-->
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="col-md-2">Posici&oacute;n</th>
                                                    <th class="col-md-2 ">&Aacute;rea</th>
                                                    <th class="col-md-2 ">Fecha de inicio</th>
                                                    <th class="col-md-2 ">Fecha fin</th>
                                                    <th class="col-md-4 ">Breve descripci&oacute;n</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbJobHistory' targetProperty="jobHistory" prefix="jh">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-header hidden" data-background-color="orange">
                                        <h4 class="title">Mi historial de desempeño</h4>
                                    </div>
                                    <div class="card-content hidden">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Fecha de inicio</th>
                                                    <th>Fecha fin</th>
                                                    <th>&Iacute;ndice</th>
                                                    <th>Descripci&oacute;n</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbPerformanceHistory'>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Historial de aumentos</h4>
                                    </div>
                                    <div class="card-content">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Sueldo $</th>
                                                    <th>Porcentaje %</th>
                                                    <th>Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbIncreaseHistory'>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mi Experiencia Laboral</h4>
                                    </div>
                                    <div class="card-content">
                                        <i data-toggle="tooltip" id="addJobHistoryOthers" target="#modalJobHistoryOthers" title="Agregar nuevo elemento"  class="material-icons button btnAdd">add</i>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="col-md-2" targetId="jhoCompany">Compañia</th>
                                                    <th class="col-md-2" targetId="jhoPosition">Posici&oacute;n</th>
                                                    <th class="col-md-2" targetId="jhoArea">&Aacute;rea</th>
                                                    <th class="col-md-2" targetId="jhoDateIni">Fecha de inicio</th>
                                                    <th class="col-md-2" targetId="jhoDateEnd">Fecha fin</th>
                                                    <th class="col-md-2" targetId="jhoDescription">Breve descripci&oacute;n</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbJobHistoryOthers' targetProperty="jobInfoOthers" prefix="jho">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Disponibilidad de cambio de Residencia</h4>
                                    </div>
                                    <div class="card-content">
                                        <div class="card-content">
                                            <form id="formAvailabilityChangeRecidence" class="disableForm">
                                                <div class="row">
                                                    <div class="btnAdd">
                                                        <i data-toggle="tooltip" title="Editar información"  class="material-icons button action editAvailabilityChangeRecidence">edit</i>
                                                        <i data-toggle="tooltip" title="Guardar  información"  class="material-icons button hidden floatRight saveAvailabilityChangeRecidence">save</i>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-2">
                                                        <div class="checkbox">
                                                            <label>
                                                                <input id="additionalInfo.id" type="hidden">
                                                                <input id="additionalInfo.bloodType" type="hidden">
                                                                <input id="additionalInfo.acrInCountry" type="checkbox" name="optionsCheckboxes">
                                                                Dentro del pa&iacute;s
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="checkbox">
                                                            <label>
                                                                <input id="additionalInfo.acrOutCountry" type="checkbox" name="optionsCheckboxes">
                                                                Fuera del pa&iacute;s
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Restricciones geogr&aacute;ficas</label>
                                                            <input id="additionalInfo.acrGeographicalRestrictions" type="text" maxlength="100" class="form-control" >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Preferencias geogr&aacute;ficas</label>
                                                            <input id="additionalInfo.acrGeographicalPreferences" type="text" maxlength="100" class="form-control" >
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mi educaci&oacute;n</h4>
                                    </div>
                                    <div class="card-content">
                                        <i data-toggle="tooltip" id="addEducation" target="#modalEducation" title="Agregar nuevo elemento"  class="material-icons button btnAdd">add</i>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th  class="col-md-3" >Grado/Titulo</th>
                                                    <th  class="col-md-2" >Universidad/Colegio</th>
                                                    <th  class="col-md-2" >&Aacute;rea de estudios</th>
                                                    <th  class="col-md-2" >A&ntilde;o</th>
                                                    <th  class="col-md-3" >Notas</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbEducation' targetProperty="education" prefix="e">
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="card-header" data-background-color="orange">
                                        <h4 class="title">Mis Idiomas</h4>
                                    </div>
                                    <div class="card-content">
                                        <i data-toggle="tooltip" id="addLanguage" target="#modalLanguage" title="Agregar nuevo idioma"  class="material-icons button btnAdd">add</i>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="col-md-6">Idioma</th>
                                                    <th class="col-md-6">Competencia</th>
                                                    <!--<th>Porcentaje</th>-->
                                                </tr>
                                            </thead>
                                            <tbody id='tbLanguage' targetProperty="languages" prefix="l">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-header hidden" data-background-color="orange">
                                        <h4 class="title">Plan de desarrollo siguiente año</h4>
                                    </div>
                                    <div class="card-content hidden">
                                        <input type="hidden" id='developmentPlan.id' />
                                        <i data-toggle="tooltip" id="editDevelopmentPlan" title="Editar información"  class="material-icons button">edit</i>
                                        <i data-toggle="tooltip" id="saveDevelopmentPlan" title="Guardar  información"  class="material-icons button hidden">save</i>
                                        <form id="formDevelopmentPlan" class="disableForm">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Descripci&oacute;n de desarrollo siguiente año</label>
                                                            <textarea id="developmentPlan.description" class="form-control" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">360° Fortalezas</label>
                                                            <textarea id="developmentPlan.strengths" class="form-control" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">360° Oportunidades</label>
                                                            <textarea id="developmentPlan.opportunities" class="form-control" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%@include file="commons/_footer.jsp" %>

            </div>
        </div>
        <div class="modal fade" id="modalJobHistory" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Historial laboral</h4>
                    </div>
                    <form id="frmJobHistory">
                        <div class="modal-body">
                            <input id="jhId" type="hidden" value="" >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Posici&oacute;n</label>
                                        <input required id="jhPosition" name="jhPosition" maxlength="100" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">&Aacute;rea</label>
                                        <input required id="jhArea" name="jhArea" type="text" maxlength="100" class="form-control" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Fecha de inicio</label>
                                        <input required id="jhDateIni" name="jhDateIni" type="text" class="form-control datepickerFrom" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">fecha de fin</label>
                                        <input required id="jhDateEnd" name="jhDateEnd" type="text" class="form-control datepickerTo" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="form-group label-floating">
                                            <label class="control-label">Breve descripci&oacute;n</label>
                                            <textarea required id="jhDescription" name="jhDescription" maxlength="100" class="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Cerrar</button>
                            <button type="submit" id="jhBtnSave" class="btn btn-info btn-simple">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalJobHistoryOthers" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Historial laboral (Otras compañias)</h4>
                    </div>
                    <form id="frmJobHistoryOthers">
                        <div class="modal-body">
                            <input id="jhoId" type="hidden" value="" >
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Compañia</label>
                                        <input id="jhoCompany" name="jhoCompany" required minlength="2" maxlength="100" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Posici&oacute;n</label>
                                        <input id="jhoPosition" name="jhoPosition" required maxlength="100" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group label-floating">
                                        <label class="control-label">&Aacute;rea</label>
                                        <input id="jhoArea" name="jhoArea" required type="text" maxlength="100" class="form-control" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Fecha de inicio</label>
                                        <input id="jhoDateIni" name="jhoDateIni" required type="text" class="form-control datepickerFrom" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">fecha de fin</label>
                                        <input id="jhoDateEnd" name="jhoDateEnd" required type="text" class="form-control datepickerTo" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="form-group label-floating">
                                            <label class="control-label">Breve descripci&oacute;n</label>
                                            <textarea id="jhoDescription" name="jhoDescription"  required  maxlength="100"class="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Cerrar</button>
                            <button type="submit" id="jhoBtnSave" class="btn btn-info btn-simple">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalEducation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Educaci&oacute;n</h4>
                    </div>
                    <form id="frmEducation">
                        <div class="modal-body">
                            <input id="eId" type="hidden" value="" >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Grado/Titulo</label>
                                        <input required maxlength="100" id="eLevel" name="eLevel" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">&Aacute;rea de estudios</label>
                                        <input required maxlength="100" id="eAreaStudy" name="eAreaStudy" type="text" class="form-control" >
                                    </div>
                                </div>
                            </div>                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Nombre de la escuela</label>
                                        <input required maxlength="100" id="eSchoolName" name="eSchoolName" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Fecha</label>
                                        <input required id="eDateIni" name="eDateIni" type="text" digits='true' min='1900' max='${currentYear}' class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row hidden">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">fecha de fin</label>
                                        <input id="eDateEnd" name="eDateEnd" type="text" class="form-control datepickerTo">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="form-group label-floating">
                                            <label class="control-label">Notas</label>
                                            <textarea id="eDescription" name="eDescription" class="form-control" required maxlength="100" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Cerrar</button>
                            <button type="submit" id="eBtnSave" class="btn btn-info btn-simple">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalLanguage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Mis Idiomas</h4>
                    </div>
                    <form id="frmLanguaje">
                        <div class="modal-body">
                            <input id="lId" type="hidden" val='' >
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Idioma</label>
                                        <select id="lLanguage" name="lLanguage" required class="form-control" >
                                            <option>Seleccione un valor</option>
                                            <option value="Español">Español</option>
                                            <option value="Inglés">Inglés</option>
                                            <option value="Chino">Chino</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Arabe">Arabe</option>
                                            <option value="Portuges">Portuges</option>
                                            <option value="Ruso">Ruso</option>
                                            <option value="Japones">Japones</option>
                                            <option value="Frances">Frances</option>
                                            <option value="Indonecio">Indonecio</option>
                                            <option value="Alemán">Alemán</option>
                                            <option value="Coreano">Coreano</option>
                                            <option value="Italiano">Italiano</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                        <!--<input id="lLanguage" name="lLanguage" required type="text" class="form-control" >-->
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Competencia</label>
                                        <select id="lDescription" name="lDescription" required class="form-control" >
                                            <option>Seleccione un valor</option>
                                            <option value="Competencia básica">Competencia básica</option>
                                            <option value="Competencia básica limitada">Competencia básica limitada</option>
                                            <option value="Competencia básica profesional">Competencia básica profesional</option>
                                            <option value="Competencia profesional">Competencia profesional</option>
                                            <option value="Competencia bilingüe o nativa">Competencia bilingüe o nativa</option>
                                        </select>
                                        <!--<input id="lDescription" name="lDescription" required type="text" class="form-control" >-->
                                    </div>
                                </div>
                            </div>
                            <div class="row hidden">
                                <div class="col-md-12">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Porcentaje</label>
                                        <input id="lPercent" name="lPercent" required number="true" type="text" class="form-control" >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Cerrar</button>
                            <button type="submit" id="lBtnSave" class="btn btn-info btn-simple">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
