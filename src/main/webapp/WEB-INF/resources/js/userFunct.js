var idEmployee = '';
var employeeInfo = {};
$(function () {
    idEmployee = '2';
    getEmployee(idEmployee);
    disableElements('.disableForm', true);
    $('.btnAdd').click(function () {
        $($(this).attr('target')).modal('show');
        cleanElements($(this).attr('target'));
    });
    $('table').on('click', 'button.btnGridEdit', function () {
        var id = $(this).closest("tr").attr('id');
        var property = $(this).closest("tbody").attr('targetProperty');
        var prefix = $(this).closest("tbody").attr('prefix');
        var modal = $(this).closest("div.card-content").find('i.btnAdd:first').attr('target');
        var objData = getDataById(property, id);
        assignValueFromObject(objData, '', modal, prefix);
        $(modal).modal('show');
        cleanElements($(this).attr('target'));
//        swal('ID:' + id + '<br/>::property:' + property + '<br/>::modal:' + modal);
    });
    $('table').on('click', 'button.btnGridDelete', function () {
        var id = $(this).closest("tr").attr('id');
        var property = $(this).closest("tbody").attr('targetProperty');
        fnDeleteElement(id, property);
    });
    $(".modal").each(function (index) {
        $(this).on('hidden.bs.modal', function (e) {
            cleanErrors(this);
        });
    });
    $('.editAvailabilityChangeRecidence').click(function () {
        if ($(this).hasClass('editing')) {
            $(this).closest('.btnAdd').find(".saveAvailabilityChangeRecidence").addClass('hidden');
            $(this).removeClass('editing');
            disableElements('#' + $(this).closest('form').attr('id'), true);
            $(this).html('edit');
            $(this).attr('title', 'Editar información');
            $('input[type=text]').each(function () {
                $(this).val($(this).attr('origin'));
            });
        } else {
            $(this).addClass('editing');
            $(this).closest('.btnAdd').find(".saveAvailabilityChangeRecidence").removeClass('hidden');
            disableElements('#' + $(this).closest('form').attr('id'), false);
            $(this).html('cancel');
            $(this).attr('title', 'Cancelar acción');
            $('input[type=text]').each(function () {
                $(this).attr('origin', $(this).val());
            });
        }
        $('[data-toggle="tooltip"]').tooltip();
    });
    $('#editDevelopmentPlan').click(function () {
        if ($(this).hasClass('editing')) {
            $('#saveDevelopmentPlan').addClass('hidden');
            $(this).removeClass('editing');
            disableElements('#formDevelopmentPlan', true);
            $(this).html('edit');
            $(this).attr('data-original-title', 'Editar información');
        } else {
            $(this).addClass('editing');
            $('#saveDevelopmentPlan').removeClass('hidden');
            disableElements('#formDevelopmentPlan', false);
            $(this).html('cancel');
            $(this).attr('data-original-title', 'Cancelar acci&oacute;n');
        }
    });

    $('.saveAvailabilityChangeRecidence').click(function () {
        saveAvailabilityChangeRecidence();
    });
    $('#saveDevelopmentPlan').click(function () {
        saveDevelopmentPlan();
    });
    $('#jhBtnSave').click(function () {
        $('#modalJobHistory').modal('show');
    });
    activateValidation('frmJobHistory', saveJobHistory);
    activateValidation('frmJobHistoryOthers', saveJobHistoryOthers);
    activateValidation('frmEducation', saveEducation);
    activateValidation('frmLanguaje', saveLanguaje);
    
    $('#printScreen').click(function(e){
        e.preventDefault();
        printSection('containter');
    });
});

function activateValidation(idForm, actionOnSubmit) {
    idForm = 'form#' + idForm;
    $(idForm).validate({
        submitHandler: function (form) {
            if (actionOnSubmit)
                actionOnSubmit();
            return false;
        }
    });
}
function fnDeleteElement(id, target) {
    if (id) {
        swal({
            title: 'Eliminar registro',
            text: 'Desea eliminar el regitro?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    executeAjax({
                        type: "DELETE",
                        url: contextPath + 'user/delete?id=' + id + '&target=' + target,
                        async: false,
                        success: function (data) {
                            resolve();
                        }
                    });
                });
            },
            allowOutsideClick: false
        }).then(function (email) {
            swal('', 'Elemento Eliminado con &eacute;xito', 'success');
            getEmployee(idEmployee);
        });
    } else {
        swal('', 'Debe seleccionar un registro para borrar.', 'warning');
    }
}
function loadInfoOnGrid(idTbTarget, lstInfo, properties, includeRowCount, includeEditAndDelete) {
    idTbTarget = '#' + idTbTarget;
    $(idTbTarget).html('');
    if (lstInfo && lstInfo.constructor === [].constructor
            && lstInfo.length > 0) {
        $.each(lstInfo, function (idx, objItem) {
            var row = '<tr id="' + objItem['id'] + '">';
            if (includeRowCount === true) {
                row += '<td class="text-center">' + (idx + 1) + '</td>';
            }
            $.each(properties, function (idxProp, objProp) {
                var valConf = objProp.split('|');
                var obj = objItem[objProp];
                if (valConf && valConf.length > 1) {
                    valConf[1] = valConf[1].toLowerCase();
                    switch (valConf[1]) {
                        case 'date':
                            obj = getDateFromData(objItem[valConf[0]]);
                    }
                }
                row += '<td>' + obj + '</td>';
            });
            if (includeEditAndDelete === true) {
                /*Inicio botones para editar*/
                row += '<td class="td-actions text-right"><button type="button" data-toggle="tooltip" title="Editar" class="btn btn-primary btn-simple btn-xs btnGridEdit"><i class="material-icons">edit</i></button>';
                row += '<button type="button" data-toggle="tooltip" title="Remover" class="btn btn-danger btn-simple btn-xs btnGridDelete"><i class="material-icons">close</i></button></td>';
                /*Fin botones para editar*/
            }
            row += '</tr>';
            $(idTbTarget).append(row);
        });
    }
}


function disableElements(selector, isDisable) {
    selector = selector + ' input,' + selector + ' select,' + selector + ' textarea,' + selector + ' checkbox';
    $(selector).attr('disabled', isDisable);
}
function cleanElements(selector) {
    selector = selector + ' input,' + selector + ' select,' + selector + ' textarea';
    $(selector).val('');
    //$(selector + ' checkbox').val('');
}

function getEmployee(idEmployee) {
    $.ajax({
        type: 'GET',
        url: contextPath + 'user/getEmployee/' + idEmployee,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            employeeInfo = data;
            assignValueFromObject(data, '');
            loadInfoOnGrid('tbLanguage', data.languages,
                    ['language', 'description'/*, 'percent'*/], false, true);
            loadInfoOnGrid('tbEducation', data.education,
                    ['level', 'schoolName', 'areaStudy', 'dateIni', 'description'], false, true);
            loadInfoOnGrid('tbJobHistoryOthers', data.jobInfoOthers,
                    ['company', 'position', 'area', 'dateIni|date', 'dateEnd|date', 'description'], false, true);
            loadInfoOnGrid('tbJobHistory', data.jobHistory,
                    ['position', 'area', 'dateIni|date', 'dateEnd|date', 'description'], false);
            loadInfoOnGrid('tbPerformanceHistory', data.performanceHistory,
                    ['dateIni|date', 'dateEnd|date', 'indice', 'description'], false);
            loadInfoOnGrid('tbIncreaseHistory', data.increaseHistory,
                    ['sueldo', 'description', 'date|date'], false);

            $('#spJobName').html(data.job_name);
            $('#jobName').val(data.job_name);

            $('#spDepartament').html(data.departament_name);
            $('#departament').val(data.departament_name);

            $('#spBusinessUnit').html(data.businessUnit);
            $('#BusinessUnit').val(data.businessUnit);

            $('#spFullName').html(data.fullName);
            $('#fullName').val(data.fullName);

            $('#monthlySalary').val(data.monthlySalary);
            $('#cecos').val(data.cecos);
            $('#hiredDate').val(data.hiredDate);
            $('#companyName').val(data.companyName);
            $('#countryBirth').val(data.countryBirth);
            $('#state').val(data.state);
            $('#city').val(data.city);

            $('#extNumber').val(data.extNumber);
            $('#interiorNumber').val(data.interiorNumber);

            $('#zipCode').val(data.zipCode);
            $('#colony').val(data.colony);

            $('#phoneNumber').val(data.phoneNumber);
            $('#maritalStatus').val(data.maritalStatus);
            $('#ssn').val(data.ssn);
            $('#birthday').val(data.birthday);
            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function (data) {
            swal('', 'Ha ocurrido un error al obtener la informacion del empleado', 'error');
        }
    });
}


function saveLanguaje() {
    var dataInfo = {
        id: $('#lId').val(),
        idEmployee: idEmployee,
        language: $('#lLanguage').val(),
        description: $('#lDescription').val(),
        percent: $('#lPercent').val()
    };
    executeAjax({
        url: contextPath + 'user/saveLanguages/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            getEmployee(idEmployee);
            swal('', 'Informaci&oacute;n guardada correctamente', 'success');
            $('#modalLanguage').modal('hide');
        }
    });
}
function saveEducation() {
    var dataInfo = {
        id: $('#eId').val(),
        idEmployee: idEmployee,
        level: $('#eLevel').val(),
        schoolName: $('#eSchoolName').val(),
        areaStudy: $('#eAreaStudy').val(),
        dateIni: $('#eDateIni').val(),
        dateEnd: $('#eDateEnd').val(),
        description: $('#eDescription').val()
    };
    executeAjax({
        url: contextPath + 'user/saveEducation/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            getEmployee(idEmployee);
            swal('', 'Informaci&oacute;n guardada correctamente', 'success');
            $('#modalEducation').modal('hide');
        }
    });
}
function saveJobHistoryOthers() {
    var dataInfo = {
        id: $('#jhoId').val(),
        idEmployee: idEmployee,
        company: $('#jhoCompany').val(),
        position: $('#jhoPosition').val(),
        area: $('#jhoArea').val(),
        dateIni: $('#jhoDateIni').val(),
        dateEnd: $('#jhoDateEnd').val(),
        description: $('#jhoDescription').val()
    };
    executeAjax({
        url: contextPath + 'user/saveJobHistoryOthers/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            getEmployee(idEmployee);
            swal('', 'Informaci&oacute;n guardada correctamente', 'success')
            $('#modalJobHistoryOthers').modal('hide');
        }
    });
}

function saveJobHistory() {
    var dataInfo = {
        id: $('#jhId').val(),
        idEmployee: idEmployee,
        position: $('#jhPosition').val(),
        area: $('#jhArea').val(),
        dateIni: $('#jhDateIni').val(),
        dateEnd: $('#jhDateEnd').val(),
        description: $('#jhDescription').val()
    };
    executeAjax({
        url: contextPath + 'user/saveJobHistory/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            getEmployee(idEmployee);
            swal('', 'Informaci&oacute;n guardada correctamente', 'success');
            $('#modalJobHistory').modal('hide');
        }
    });
}

function saveAvailabilityChangeRecidence() {
    var dataInfo = {
        id: $('#additionalInfo\\.id').val(),
        idEmployee: idEmployee,
        bloodType: $('#additionalInfo\\.bloodType').val(),
        acrInCountry: $('#additionalInfo\\.acrInCountry').is(':checked'),
        acrOutCountry: $('#additionalInfo\\.acrOutCountry').is(':checked'),
        acrGeographicalRestrictions: $('#additionalInfo\\.acrGeographicalRestrictions').val(),
        acrGeographicalPreferences: $('#additionalInfo\\.acrGeographicalPreferences').val(),
        contactPersonEmployee: $('#additionalInfo\\.contactPersonEmployee').val(),
        contactPhoneEmployee: $('#additionalInfo\\.contactPhoneEmployee').val()
    };
    executeAjax({
        url: contextPath + 'user/saveAvailabilityChangeRecidence/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            swal('', 'Informaci&oacute;n guardada correctamente', 'success');
            $('input[type=text]').each(function () {
                $(this).attr('origin', $(this).val());
            });
            $('.editAvailabilityChangeRecidence.editing').click();
        }
    });
}

function saveDevelopmentPlan() {
    var dataInfo = {
        id: $('#developmentPlan\\.id').val(),
        idEmployee: idEmployee,
        strengths: $('#developmentPlan\\.strengths').val(),
        opportunities: $('#developmentPlan\\.opportunities').val(),
        description: $('#developmentPlan\\.description').val()
    };
    executeAjax({
        url: contextPath + 'user/saveDevelopmentPlan/',
        data: JSON.stringify(dataInfo),
        success: function (data) {
            swal('', 'Informaci&oacute;n guardada correctamente', 'success')
            $('#editDevelopmentPlan').click();
        }
    });
}

function getDataById(property, id) {
    var data = {};
    property = employeeInfo[property];
    if (property && property.constructor === [].constructor && property.length > 0) {
        $.each(property, function (idx, value) {
            if (Number(value.id) === Number(id)) {
                data = value;
                return;
            }
        });
    }
    return data;
}