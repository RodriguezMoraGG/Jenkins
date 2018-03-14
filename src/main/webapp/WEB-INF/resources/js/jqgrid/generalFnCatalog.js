var jqGrid = '';
var jqGridPager = '';
var urlAdd = '';
var urlEdit = '';
var urlDelete = '';
var fnConfGrid = {
    fnSerializeData: function (data) {
        return $.param(data);
    },
    fnSerializeDataToEdit: function (data) {
        return $.param(data);
    },
    fnOnGridComplete: function () {
    },
    fnAfterShowForm: function () {
    },
    fnAddRow: addRow,
    fnEditRow: editRow,
    fnDeleteRow: deleteRow,
    fnJsPostData: {},
    beforeSelectRow: function () {
        return true;
    },
    loadAfterConfig: function () {
    },
    includeAdd: true,
    includeEdit: true,
    includeDelete: true
};
var loadOnce = false;
function initGrid(jqGridTarget, jqGridPagerTarget, urlList, urlAddTarget, urlEditTarget, urlDeleteTarget, arrayColumns, jsPostData, globalFunctions) {
    jqGrid = jqGridTarget;
    jqGridPager = jqGridPagerTarget;
    urlAdd = urlAddTarget;
    urlEdit = urlEditTarget;
    urlDelete = urlDeleteTarget;
    if (globalFunctions && globalFunctions.constructor === {}.constructor) {
        fnConfGrid.fnSerializeData = globalFunctions.fnSerializeData ? globalFunctions.fnSerializeData : fnConfGrid.fnSerializeData;
        fnConfGrid.fnSerializeDataToEdit = globalFunctions.fnConfGrid ? globalFunctions.fnConfGrid : fnConfGrid.fnSerializeDataToEdit;
        fnConfGrid.fnOnGridComplete = globalFunctions.fnOnGridComplete ? globalFunctions.fnOnGridComplete : fnConfGrid.fnOnGridComplete;
        fnConfGrid.fnAddRow = globalFunctions.fnAddRow ? globalFunctions.fnAddRow : fnConfGrid.fnAddRow;
        fnConfGrid.fnEditRow = globalFunctions.fnEditRow ? globalFunctions.fnEditRow : fnConfGrid.fnEditRow;
        fnConfGrid.fnDeleteRow = globalFunctions.fnDeleteRow ? globalFunctions.fnDeleteRow : fnConfGrid.fnDeleteRow;
        fnConfGrid.fnJsPostData = jsPostData ? jsPostData : fnConfGrid.fnJsPostData;
        fnConfGrid.beforeSelectRow = globalFunctions.beforeSelectRow ? globalFunctions.beforeSelectRow : fnConfGrid.beforeSelectRow;
        fnConfGrid.loadAfterConfig = globalFunctions.loadAfterConfig ? globalFunctions.loadAfterConfig : fnConfGrid.loadAfterConfig;
        fnConfGrid.includeAdd = globalFunctions.includeAdd ? (globalFunctions.includeAdd === true) : fnConfGrid.includeAdd;
        fnConfGrid.includeEdit = globalFunctions.includeEdit ? (globalFunctions.includeEdit === true) : fnConfGrid.includeEdit;
        fnConfGrid.includeDelete = globalFunctions.includeDelete !== null ? (globalFunctions.includeDelete === true) : fnConfGrid.includeDelete;
        //fnConfGrid.fnAfterShowForm = globalFunctions.fnAfterShowForm ? globalFunctions.fnAfterShowForm : fnConfGrid.fnAfterShowForm;
    }

    $(document).ready(function () {
        $(jqGrid).jqGrid({
            url: urlList,
            postData: fnConfGrid.fnJsPostData,
            datatype: 'json',
            records: 'records',
            autowidth: true,
            sortable: true,
            viewrecords: true,
            loadonce: true,
            ignoreCase: true,
            gridview: true,
            rownumbers: true,
            colModel: arrayColumns,
            height: 400,
            rowNum: 30,
            rowList: [10, 20, 30, 50, 200],
            sortname: 'id',
            //emptyrecords: 'Scroll to bottom to retrieve new page', // the message will be displayed at the bottom 
            pager: jqGridPager,
            jsonReader: {
                repeatitems: false,
                id: "id"
            },
            loadComplete: function () {
                $(this).setGridParam({datatype: 'local'});
                $(this).trigger("reloadGrid");
                fnConfGrid.loadAfterConfig();
                loadFilterToGrid();
                if (fnConfGrid.fnOnGridComplete) {
                    fnConfGrid.fnOnGridComplete();
                }
            },
            gridComplete: fnConfGrid.fnOnGridComplete,
            beforeSelectRow: fnConfGrid.beforeSelectRow
        });
        loadFilterToGrid();
    });
}

function loadFilterToGrid() {
    if (!loadOnce) {
        loadOnce = true;
        $(jqGrid).filterToolbar({
// JSON stringify all data from search, including search toolbar operators
            stringResult: true,
            // instuct the grid toolbar to show the search options
            searchOperators: true
        });
        $(jqGrid).jqGrid('navGrid',
                jqGridPager,
                {
                    edit: false, add: false, del: false, search: false, refresh: false
                }, {}, {}, {},
                {
                    multipleSearch: true,
                    multipleGroup: true,
                    showQuery: false
                }
        );

        if (fnConfGrid.includeAdd && fnConfGrid.fnAddRow) {
            $(jqGrid).jqGrid('navButtonAdd', jqGridPager, {
                caption: '',
                title: 'Agregar nueva fila',
                buttonicon: 'glyphicon glyphicon-plus',
                onClickButton: function (parameters) {
                    fnConfGrid.fnAddRow();
                }
            });
        }
        if (fnConfGrid.includeEdit && fnConfGrid.fnEditRow) {
            $(jqGrid).jqGrid('navButtonAdd', jqGridPager, {
                caption: '',
                title: 'Modificar fila seleccionada',
                buttonicon: 'glyphicon glyphicon-edit',
                onClickButton: function (parameters) {
                    fnConfGrid.fnEditRow();
                }
            });
        }
        if (fnConfGrid.includeDelete && fnConfGrid.fnDeleteRow) {
            $(jqGrid).jqGrid('navButtonAdd', jqGridPager, {
                caption: '',
                id: 'jqgridCustomDelte',
                title: 'Borrar fila seleccionada',
                buttonicon: 'glyphicon glyphicon-trash',
                onClickButton: function (parameters) {
                    fnConfGrid.fnDeleteRow();
                }
            });
        }

        setTimeout(function () {
            $(jqGrid)[0].triggerToolbar();
        }, 50);
        $('.navtable .ui-pg-button .ui-icon').removeClass('ui-icon');
    }
}

function addRow() {
    $(jqGrid).jqGrid('editGridRow', 'new', {
        url: urlAdd,
        serializeEditData: fnConfGrid.fnSerializeData,
        recreateForm: true,
        closeAfterAdd: true,
        reloadAfterSubmit: true,
        beforeShowForm: function (form) {
            $('#sData').addClass('pull-right');
        },
        afterSubmit: function (response, postdata) {
            var result = eval('(' + response.responseText + ')');
            var errors = "";
            if (result.Success === false) {
                for (var i = 0; i < result.Message.length; i++) {
                    errors += result.Message[i] + "<br/>";
                }
            } else {
                reloadGridFromServer();
            }
            // only used for adding new records
            var new_id = null;
            return [result.Success, errors, new_id];
        }
    });
}

function editRow() {
// Get the currently selected row
    var row = $(jqGrid).jqGrid('getGridParam', 'selrow');
    if (row !== null) {
        $(jqGrid).jqGrid('editGridRow', row, {
            url: urlEdit,
            serializeEditData: fnConfGrid.fnSerializeDataToEdit,
            recreateForm: true,
            closeAfterEdit: true,
            reloadAfterSubmit: true,
            afterShowForm: function (formId) {
                $('#sData').addClass('pull-right');
            },
            afterSubmit: function (response, postdata) {
                var result = eval('(' + response.responseText + ')');
                var errors = "";
                if (result.success === false) {
                    for (var i = 0; i < result.Message.length; i++) {
                        errors += result.Message[i] + "<br/>";
                    }
                } else {
                    reloadGridFromServer();
                }
                return [result.success, errors, null];
            }
        });
    } else {
        swal('', 'Debe seleccionar una fila', 'warning');
    }
}

function deleteRow() {
// Get the currently selected row
    var row = $(jqGrid).jqGrid('getGridParam', 'selrow');
    if (row !== null) {
        $(jqGrid).jqGrid('delGridRow', row, {
            url: urlDelete,
            closeOnEscape: true,
            afterShowForm: function (formId) {
                $('#sData').addClass('pull-right');
            },
            afterSubmit: function (response, postdata) {
                var result = eval('(' + response.responseText + ')');
                var errors = "";
                var success = false;
                if (result.Success === false) {
                    for (var i = 0; i < result.Message.length; i++) {
                        errors += result.Message[i] + "<br/>";
                    }
                } else {
                    success = true;
                    reloadGridFromServer();
                }
                return [success, errors, null];
            }
        });
    } else {
        swal('', 'Debe seleccionar una fila', 'warning');
    }
}

function reloadGridFromServer() {
    $(jqGrid).setGridParam({datatype: 'json'});
    $(jqGrid).trigger("reloadGrid");
    fnConfGrid.loadAfterConfig(true);
}

