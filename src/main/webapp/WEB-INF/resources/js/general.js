var contextPath = getContextPath();
currentText = "Hoy";
monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
dayNamesShort = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
dayNamesMin = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

$(function () {
    if ($.datepicker) {
        $.datepicker.setDefaults({
            dateFormat: 'dd/mm/yy',
            currentText: currentText,
            monthNames: monthNames,
            monthNamesShort: monthNamesShort,
            dayNames: dayNames,
            dayNamesShort: dayNamesShort,
            dayNamesMin: dayNamesMin,
            changeMonth: true,
            changeYear: true,
            prevText: "",
            nextText: "",
//        showOn: "both",
            onClose: function (selectedDate) {
                if (selectedDate && selectedDate.length > 0) {
                    $(this).parent(".form-group").removeClass('is-empty');
                }
                return;
            }
        });
        $(".datepicker, .datepickerFrom, .datepickerTo").datepicker();

        $('.datepickerFrom').datepicker('option', {
            onSelect: function (selectedDate) {
                $(".datepickerFrom").datepicker("option", "maxDate", null);
                $(".datepickerTo").datepicker("option", "minDate", null);
                var fechaFin = $(".datepickerTo").datepicker("getDate");
                $(".datepickerTo").datepicker("option", "minDate", selectedDate);
                if (fechaFin)
                    $(".datepickerFrom").datepicker("option", "maxDate", fechaFin);
            }
        });
        $('.datepickerTo').datepicker('option', {
            onSelect: function (selectedDate) {
                $(".datepickerFrom").datepicker("option", "maxDate", null);
                $(".datepickerTo").datepicker("option", "minDate", null);
                var fechaIni = $(".datepickerFrom").datepicker("getDate");
                $(".datepickerFrom").datepicker("option", "maxDate", selectedDate);
                if (fechaIni)
                    $(".datepickerTo").datepicker("option", "minDate", fechaIni);
            }
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
    swal.setDefaults({
        width: 300,
        buttonsStyling: false,
        confirmButtonColor: 'transparent',
        cancelButtonColor: 'transparent',
        confirmButtonClass: 'btn btn-success  btn-simple',
        cancelButtonClass: 'btn btn-danger btn-simple'
    });
    $(".modal").each(function (index) {
        $(this).on('show.bs.modal', function (e) {
            $('.modal-dialog').velocity('transition.flipBounceXIn');
        });
    });
    /*Para bootstrap se asignan estos parametros*/
    $.validator.setDefaults({
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).after('<span class="material-icons form-control-feedback">clear</span>');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'error',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    jQuery.validator.addMethod("validaKey", function (value) {
        if (!value)
            return true;
        return new RegExp("^[a-zA-Z0-9_-]+$").test(value);
    }, "La clave solo acepta letras(a-zA-Z), n&uacute;meros(0-9), gi&oacute;n bajo(_) y gi&oacute;n medio(-) ");
});
$.ajaxSetup({
    cache: false
});
function getContextPath() {
    try {
        var pathName = window.location.pathname;
        if (pathName && pathName.lastIndexOf("/") > 1) {
            return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2) + 1);
        } else {
            return pathName + "/";
        }
    } catch (error) {
        return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) + '/';
    }
}
function castToJson(objToEvaluate) {
    var objectConstructor = {}.constructor;
    var arrayConstructor = [].constructor;
    var stringContructor = 'test'.constructor;
    if (objToEvaluate) {
        if (objToEvaluate.constructor === objectConstructor || objToEvaluate.constructor === arrayConstructor) {
            return objToEvaluate;
        } else if (objToEvaluate.constructor === stringContructor) {
            try {
                return $.parseJSON(objToEvaluate);
                ;
            } catch (error) {
                return null;
            }
        }
    }
    return objToEvaluate;
}

String.prototype.format = String.prototype.f = function () {
    var s = this;
    var args = [];
    if (arguments && arguments.length > 0) {
        var arrayConstructor = [].constructor;
        for (i = 0; i < arguments.length; i++) {
            var itemArg = arguments[i];
            if (itemArg) {
                if (itemArg.constructor === arrayConstructor) {
                    for (idxArr = 0; idxArr < itemArg.length; idxArr++) {
                        args[args.length] = itemArg[idxArr];
                    }
                } else {
                    args[args.length] = itemArg;
                }
            }
        }
    }
    var i = args.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function assignValueFromObject(objData, objName, selector, prefix) {
    if (!objData)
        return;
    selector = selector ? selector : '.main-panel';
    var isEmptyObjName = !objName && objName.length === 0;
    var objNameAux = isEmptyObjName === false ? objName + '\\.' : '';
//    if (prefix && prefix.length > 0 && isEmpty === true) {
//        var firstChar = objNameAux[0];
//        objNameAux = prefix + objNameAux.replace(firstChar, firstChar.toUpperCase());
//    }
    for (var param in objData) {
        var val = objData[param];
        if (val) {
            if (prefix && prefix.length > 0 && isEmptyObjName === true) {
                var firstChar = param[0];
                param = prefix + param.replace(firstChar, firstChar.toUpperCase());
            }
            if (val.constructor === {}.constructor) {
                assignValueFromObject(val, objNameAux + param, selector);
            } else {
                param = param.replace(".", "\\.");
                var id = selector + ' #' + objNameAux + param;
                //if (id === '.main-panel #additionalInfo\\.acrInCountry') {
                //    console.log('eee');
                //}
                if ($(id).is('input:checkbox')) {
//                    $(id).attr('checked', val === true ? true : false);
                    $(id).prop('checked', val === true);
                } else if ($(id).is('input') || $(id).is('select') || $(id).is('textarea')) {
                    if ($(id).hasClass('hasDatepicker')) {
                        val = getDateFromData(val);
                    }
                    $(id).val(val);
                    $(id).attr('value', val);//FIX: Para la impresion no se estaba tomando los valores asignados ya que no se estaba modificando el DOM con esta instruccino ya se modifica el DOM y se puede imprimir
                    $(id).parent(".form-group").removeClass('is-empty');
                } else {
                    $(id).html(val);
                }
//                console.log((id) + '=' + val);
            }
        }
    }
}

function executeAjax(options) {
    var settings = $.extend({
        type: 'POST',
        url: '',
        async: true,
        dataType: 'json',
        contentType: "application/json",
        data: null,
        success: function (data) {
            swal('', 'Informaci&oacute;n guardada correctamente', 'success')
        },
        error: function (data) {
            swal('', 'Ha ocurrido un error', 'error');
        }
    }, options);

    $.ajax({
        type: settings.type,
        url: settings.url,
        dataType: settings.dataType,
        contentType: settings.contentType,
        data: settings.data,
        success: settings.success,
        error: settings.error
    });
}

function cleanErrors(target) {
    $(target).find('form').trigger('reset');
    $(target).find('form input').val('');
    $('.has-error').removeClass('has-error');
    $('.error').remove();
    errors = [];
    showErrors();
}

function showErrors() {
    var errorsStr = '';
    if (errors.length > 0) {
        for (i = 0; i < errors.length; i++) {
            errorsStr += errors[i] + ',';
        }
        $('#errors').text(errorsStr.replace(/(^[,\s]+)|([,\s]+$)/g, ''));
        $('#errorsAlert').show();
    } else {
        $('#errorsAlert').hide();
    }
}

function getDateFromData(valueData) {
    var value = valueData;
    if (value && value.constructor === ''.constructor
            && value.indexOf('Date(') > 0) {
        value = value.replace('/Date(', '');
        value = value.replace(')/', '');
    }
    value = new Date(Number(value));
    if (value instanceof Date && !isNaN(value.getTime())) {
        var d = value.getDate() < 10 ? ('0' + value.getDate()) : value.getDate();
        var m = (value.getMonth() + 1) < 10 ? ('0' + (value.getMonth() + 1)) : value.getDate();
        return d + '/' + m + '/' + value.getFullYear();
    }

    return valueData;
}

function convertFormatMMDDYYY(date) {
    if (date) {
        var arr = date.split('-');
        if (arr.length === 3) {
            return arr[1] + '-' + arr[0] + '-' + arr[2];
        }
    }
    return date;
}

function get_browser() {
    var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem !== null) {
            tem = tem.slice(1);
            return {name: tem[0].replace('OPR', 'Opera'), version: (tem[1] || '')};
            return;
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null)
        M.splice(1, 1, tem[1]);
    return {
        name: M[0],
        version: M[1]
    };
}

function printSection(idSection) {
    createIframeToPrint();
    var plPrint = '';
    if (document.getElementById(idSection).constructor === HTMLIFrameElement) {
//        plPrint = $("#" + idSection).contents().find("body").html();
        plPrint = $('#' + idSection).contents().find("div#canvas").html();
    } else {
        plPrint = document.getElementById(idSection).innerHTML;
    }
    var browserInfo = get_browser();
    if (browserInfo.name === 'MSIE' || browserInfo.name === 'IE' || browserInfo.name === 'Edge')
    {
        var printDivCSS = '';
        printDivCSS += new String('<link href="' + contextPath + 'static/css/bootstrap.min.css" rel="stylesheet" type="text/css">');
        printDivCSS += new String('<link href="' + contextPath + 'static/css/fonts.css" rel="stylesheet" type="text/css">');
        printDivCSS += new String('<link href="' + contextPath + 'static/css/flowchart/jsPlumbToolkit-demo.css" rel="stylesheet" type="text/css"  media="print">');
        printDivCSS += new String('<link href="' + contextPath + 'static/css/flowchart/main.css" rel="stylesheet" type="text/css"  media="print">');
        printDivCSS += new String('<link href="' + contextPath + 'static/css/flowchart/shapes.css" rel="stylesheet" type="text/css"  media="print">');
        printDivCSS += new String('<link href="' + contextPath + 'static/css/stylePrint.css" rel="stylesheet" type="text/css"  media="print">');

        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>';
        windowContent += '<head>' + printDivCSS + '<title>' + document.title + '</title></head>';
        windowContent += '<body style="display:none;">';
        windowContent += plPrint;
        windowContent += '</body>';
        windowContent += '</html>';
        var printWin = window.open('', '', 'width=1,height=1');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.resizeTo(0, 0);
//        printWin.moveTo(0, -1000);
        printWin.print();
        printWin.close();
    } else {
        setTimeout(function () {
            frames["print_frame"].document.title = document.title;
            frames["print_frame"].document.body.innerHTML = plPrint;
            frames["print_frame"].focus();
            frames["print_frame"].print();
        }, 1000);
    }
    return false;
}
function createIframeToPrint() {
    if ($('#printing-frame').length === 0) {
        $('body').append('<iframe id="printing-frame" name="print_frame" src="' + contextPath + 'printSection" style="position:absolute;top:0px; left:0px;width:0px; height:0px;border:0px;overfow:none; z-index:-1"></iframe>');
        //window.frames["print_frame"].document.head.innerHTML = printDivCSS;
    }
}