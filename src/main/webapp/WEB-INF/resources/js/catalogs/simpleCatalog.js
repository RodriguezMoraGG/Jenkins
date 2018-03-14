var errors = [];
var jqGrid = "#jqGrid";
$(function () {
    $('form#frm').validate({
        rules: {
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
            var dataInfo = {
                id: $('#id').val(),
                name: $('#name').val(),
                description: $('#description').val(),
                catalogRelationship: {
                    id: $('#catalogRelationship\\.id').val() ? $('#catalogRelationship\\.id').val() : null
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
            return false;
        }
    });

    var urlList = contextPath + 'catalog/list';
    var urlAdd = contextPath + 'catalog/add';
    var urlEdit = contextPath + 'catalog/edit';
    var urlDelete = contextPath + 'catalog/delete';
    var arrayColumns = [
        {label: 'ID', name: 'id', hidden: true, editable: false},
        {label: 'Nombre', name: 'name', width: '50', editable: true},
        {
            label: 'Descripci&oacute;n', name: 'description', width: 60, editable: true,
            editrules: {required: true},
            searchoptions: {sopt: ['cn']}
        },
        {label: 'Id cat relacionado', name: 'catalogRelationship.id', hidden: true, editable: false},
        {label: 'C&aacute;talogo relacionado', name: 'catalogRelationship.name', width: 50, editable: true,
            searchoptions: {sopt: ['cn']}}
//        {label: 'Active', name: 'active', width: 10, edittype: "checkbox",
//            editoptions: {value: "true:false"},
//            searchoptions: {sopt: ['eq'], value: ':' + 'Todos' + ';true:' + 'Si' + ';false:' + 'No' + ''}, stype: 'select'
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
                title: 'Eliminar registro',
                text: 'Desea eliminar el regitro?',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    executeAjax({
                        url: urlDelete + '/' + data.id,
                        async: false,
//                        data: JSON.stringify({id: }),
                        success: function (data) {
                            swal('', 'Elemento eliminado con &eacute;xito', 'success');
                            $('#modalForm').modal('hide');
                            reloadGridFromServer();
                        }
                    });
                },
                allowOutsideClick: false
            });
        } else {
            swal('', 'Debe seleccionar un registro para editar.', 'warning');
        }
    };

    var jsPostData = null;
    var fnConfGrid = {
        fnEditRow: fnEditRow,
        fnAddRow: fnAddRow,
//        fnDeleteRow: fnDeleteRow,
        includeDelete: false,
        fnOnGridComplete: function () {
            var ids = $(jqGrid).jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                var id_ = ids[i];
                var active = $(this).jqGrid('getCell', id_, 'active');
                var isChecked = '';
                if (active === 'true' || active === true) {
                    isChecked = 'checked';
                }
                var check = "<input type='checkbox' disabled='true' " + isChecked + ">";
                $(this).jqGrid('setRowData', id_, {
                    active: check
                });
            }
        }};
    initGrid(jqGrid, "#jqGridPager", urlList, urlAdd, urlEdit, urlDelete, arrayColumns, jsPostData, fnConfGrid);
});



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