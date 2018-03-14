<%-- 
    Document   : catalogs
    Created on : Mar 10, 2017, 4:43:33 PM
    Author     : Maximino Llovera
--%>
<!DOCTYPE html>
<html>
    <head>
        <%@include file="commons/_include.jsp"  %>
        <link href="<c:url value='/resources/css/jquery-ui-1.10.3.custom.css' />" rel="stylesheet" />
        <%@include file="commons/_jqGridInclude.jsp"  %>
        <script src="<c:url value='/resources/js/catalogs/simpleCatalogDetail.js' />" ></script>
        <title>Detalle del cat&aacute;logo</title>
    </head>
    <body>
        <div class="wrapper">
            <%@include file="commons/_navMenu.jsp"  %>
            <!-- you can use the class main-raised if you want the main area to be as a page with shadows -->
            <div class="main-panel">
                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="container">
                                <div class="col-md-11">
                                    <div class="card">
                                        <div class="card-header" data-background-color="orange">
                                            <input type="hidden" id="catalog.id" value="${catalog.id}" />
                                            <h4 class="title">Detalle del cat&aacute;logo: ${catalog.name}</h4>
                                            <p class="category">${catalog.description}</p>
                                        </div>
                                        <div class="card-content">
                                            <table id="jqGrid"></table>
                                            <div id="jqGridPager"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%@include file="commons/_footer.jsp"  %>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="modalForm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="modalFormTitle"></h4>
                    </div>
                    <form class="form-horizontal" id="frm">
                        <div class="modal-body">
                            <input id="id" type="hidden" value="" >
                            <div hidden class="alert alert-danger" role="alert" id="errorsAlert">
                                <span id="errors">errors</span>
                            </div>           
                            <c:if test="${not empty catalog.catalogRelationship}">                 
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group label-floating">
                                            <label class="control-label" id="lblCatDetailRelationship">${catalog.catalogRelationship.name}</label>
                                            <select id="catDetailRelationship.id" class="form-control" >
                                                <c:forEach var="cat" items="${catalogDetail}">
                                                    <option value="${cat.id}"> ${cat.name} </option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </c:if>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Clave</label>
                                        <input id="key" name="key" type="text" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Subclave</label>
                                        <input id="subkey" name="subkey" type="text" class="form-control" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Nombre</label>
                                        <input id="name" name="name" type="text" class="form-control" >
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group label-floating">
                                        <label class="control-label">Descripci&oacute;n</label>
                                        <textarea id="description" name="description" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-simple" data-dismiss="modal" id="btnCancel">Cancelar
                            </button>
                            <button type="submit" class="btn btn-success btn-simple" id="btnSave">Guardar
                            </button>
                        </div>

                    </form>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </body>
</html>
