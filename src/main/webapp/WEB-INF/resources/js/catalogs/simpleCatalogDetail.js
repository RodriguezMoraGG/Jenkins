var errors = [];
var jqGrid = "#jqGrid";
var pActive = 'Activo';
var isFirstLoad = true;
$(function () {
    $('form#frm').validate({
        rules: {
            key: {
                maxlength: 36,
                required: true,
                validaKey: true
            },
            subkey: {
                maxlength: 36,
                required: false,
                validaKey: true
            },
            name: {
                minlength: 3,
                maxlength: 70,
                required: true
            },
            description: {
                minlength: 3,
                maxlength: 1500,
                required: true
            }
        }, submitHandler: function (form) {
            fnSave();
            return false;
        }
    });


    var urlList = contextPath + 'catalog/detail/list/' + $('#catalog\\.id').val();
    var urlAdd = contextPath + 'catalog/detail/add';
    var urlEdit = contextPath + 'catalog/detail/edit';
    var urlDelete = contextPath + 'catalog/detail/delete';
    var arrayColumns = [
        {label: 'ID', name: 'id', hidden: true, editable: false},
        {label: 'Clave', name: 'key', width: '50', editable: true,
            searchoptions: {sopt: ['cn']}},
        {label: 'Subclave', name: 'subKey', width: '50', editable: true,
            searchoptions: {sopt: ['cn']}},
        {label: 'Nombre', name: 'name', width: '50', editable: true},
        {
            label: 'Descripci&oacute;n', name: 'description', width: 60, editable: true,
            editrules: {required: true},
            searchoptions: {sopt: ['cn']}
        },
        {label: 'Id catalogo', name: 'catalog.id', hidden: true, editable: false},
        {label: 'Id detalle realcionado', name: 'catDetailRelationship.id', hidden: true, editable: false},
        {label: 'Relacionado', name: 'catDetailRelationship.name', width: 50, editable: true,
            searchoptions: {sopt: ['cn']}},
        {name: 'active', index: 'active', width: 60, align: 'center',
            stype: 'select',
            searchoptions: {sopt: ['eq'], value: ':Todos;Activo:Activo;Inactivo:Inactivo'}
        }
//        {label: 'Activo', name: 'active',
//            width: 20, stype: 'select',
//            formatter: "checkbox", edittype: 'checkbox', search: true,
//            searchoptions: {sopt: ['eq'], value: ':Todos;true:Si;false:No'}
////            searchoptions: {sopt: ["eq"], value: ':Todos;true:Si;false:No', defaultValue: 'true'}
//        }
    ];
    var fnEditRow = function () {
        var selRowId = $(jqGrid).jqGrid('getGridParam', 'selrow');
        var data = $(jqGrid).jqGrid('getLocalRow', selRowId);
        if (selRowId) {
            fillCatalogCbx();
            $('#modalFormTitle').text('Modificar registro');
            assignValueFromObject(data, '', '#modalForm');
            $('#modalForm').modal().on('hidden.bs.modal', function () {
                cleanErrors(this);
            });
        } else {
            swal('', 'Debe seleccionar un registro para editar.', 'warning');
        }
    };

    var fnAddRow = function () {
        fillCatalogCbx();
        $('#modalFormTitle').text('Agregar registro');
        $('#modalForm').modal().on('hidden.bs.modal', function () {
            cleanErrors(this);
        });
    };

    var fnDeleteRow = function () {
        var selRowId = $(jqGrid).jqGrid('getGridParam', 'selrow');
        var data = $(jqGrid).jqGrid('getLocalRow', selRowId);
        if (selRowId) {
            swal({
                title: (data.active === pActive ? 'Eliminar' : 'Activar') + ' registro',
                text: 'Desea ' + (data.active === pActive ? 'Eliminar' : 'Activar') + ' el regitro?',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Aceptar',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve, reject) {
                        executeAjax({
                            url: urlDelete + '/' + data.id,
                            async: false,
//                        data: JSON.stringify({id: }),
                            success: function (data) {
                                $('#modalForm').modal('hide');
                                reloadGridFromServer();
                                resolve();
                            }
                        });
                    });
                },
                allowOutsideClick: false
            }).then(function (email) {
                swal('', 'Elemento ' + (data.active === pActive ? 'Eliminado' : 'Activado') + ' con &eacute;xito', 'success');
            });
        } else {
            swal('', 'Debe seleccionar un registro para editar.', 'warning');
        }
    };

    var jsPostData = null;
    var fnConfGrid = {
        fnEditRow: fnEditRow,
        fnAddRow: fnAddRow,
        fnDeleteRow: fnDeleteRow,
        includeDelete: true,
        fnOnGridComplete: function () {
            var ids = $(jqGrid).jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var id_ = ids[i];
                var active = $(jqGrid).jqGrid('getCell', id_, 'active');
                var isChecked = 'Inactivo';
                if (active === pActive || active === 'true' || active === true) {
                    isChecked = pActive;
                }
                $(this).jqGrid('setRowData', id_, {
                    active: isChecked
                });
            }
        },
        beforeSelectRow: function (rowid) {
            if (rowid) {
                var data = $(jqGrid).jqGrid('getLocalRow', rowid);
                var isActive = data.active === pActive || data.active === 'true' || data.active === true;
                $('#jqgridCustomDelte').removeClass('ui-state-disabled');
                $('#jqgridCustomDelte span.glyphicon').removeClass('glyphicon-repeat glyphicon-trash');
                $('#jqgridCustomDelte span.glyphicon').addClass(isActive === true ? 'glyphicon-trash' : 'glyphicon-repeat');
                $('#jqgridCustomDelte').attr('title', (isActive === true ? 'Borrar' : 'Activar') + ' fila seleccionada');
            } else {
                $('#jqgridCustomDelte').addClass('ui-state-disabled');
            }
            return true; // allow selection or unselection
        },
        loadAfterConfig: function (isForced) {
            if (isFirstLoad === true) {
                setTimeout(function () {
                    isFirstLoad = false;
                    $('#gs_jqGrid_active').val('Activo');
                    forceFilter();
                }, 40);
            } else {
//            if (isForced && isForced === true) {
                //forceFilter();
//            }
            }
        }
    };
    initGrid(jqGrid, "#jqGridPager", urlList, urlAdd, urlEdit, urlDelete, arrayColumns, jsPostData, fnConfGrid);
});
var timeOut = null;
function forceFilter() {
    if (timeOut === null) {
        timeOut = setTimeout(function () {
            var v = $('#gs_jqGrid_active').val();
            $('#gs_jqGrid_active').val('');
            $('#gs_jqGrid_active').change();
            $('#gs_jqGrid_active').val(v);
            $('#gs_jqGrid_active').change();
            timeOut = null;
        }, 50);
    }
}

function fnSave() {
    var dataInfo = {
        id: $('#id').val(),
        key: $('#key').val(),
        subKey: $('#subkey').val(),
        catalog: {
            id: $('#catalog\\.id').val()
        },
        name: $('#name').val(),
        description: $('#description').val(),
        catDetailRelationship: {
            id: $('#catDetailRelationship\\.id').val() ? $('#catDetailRelationship\\.id').val() : null
        }
    };
    var url = dataInfo.id ? urlEdit : urlAdd;
    executeAjax({
        url: url,
        data: JSON.stringify(dataInfo),
        success: function (data) {
            swal('', 'Informaci&oacute;n guardada correctamente', 'success')
            $('#modalForm').modal('hide');
            reloadGridFromServer();
        }
    });
}

function fillCatalogCbx() {
    var allRowsInGrid = $(jqGrid).jqGrid('getGridParam', 'data');
    if (allRowsInGrid && allRowsInGrid.constructor === [].constructor
            && allRowsInGrid.length > 0) {
        $('#cbxCatRel').show();
        var optCbx = '<option value=""></option>';
        $.each(allRowsInGrid, function (idx, objItem) {
            optCbx += '<option value="' + objItem.id + '">' + objItem.name + ' </option>';
        });
        $('#catalogRelationship\\.id').html(optCbx);
    } else {
        $('#cbxCatRel').hide();
    }
}