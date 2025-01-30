angular.module('framework.services', [])
    .factory('EventsList', function ($rootScope, $animate, $window) {
        var alertTop = angular.element('<div class="alert alert-info alert-top"><span class="glyphicon glyphicon-open"></span> Leyendo datos...</div>');
        var alertTopVisible = false;
        return {
            onInstantiate: function (scope) {
                //Nop;
            },
            onSearchStart: function (scope) {
                if (alertTopVisible === false) {
                    alertTopVisible = true;
                    $animate.enter(alertTop, $(".container").parent(), $(".container"));
                }
            },
            onSearchFinish: function (scope) {
                if (alertTopVisible === true) {
                    alertTopVisible = false;
                    $animate.leave(alertTop);
                }
            },
            onSearchError: function (scope, status, message) {
                if (alertTopVisible === true) {
                    alertTopVisible = false;
                    $animate.leave(alertTop);
                }
                Message("Error " + status, message);
            },
            onDeleteStart: function (scope) {
                Loading.show();
            },
            onDeleteFinish: function (scope, id) {
                Loading.hide();
                $(id).fadeOut();
            },
            onDeleteError: function (scope, status, message) {
                Loading.hide();
                Message("No se puede eliminar (" + status + ")", message);
            },
            onLoad: function () {
            	Loading.show();
            }
        }
    })
    .factory('EventsCreateDetail', function ($rootScope, $location, $window) {
        return {
            onInstantiate: function (scope) {
                scope.initialize();
            },
            onInitializeStart: function (scope) {
                Loading.show();
            },
            onInitializeFinish: function (scope) {
                Loading.hide();
            },
            onInitializeError: function (scope) {
                Loading.hide();
                Message('Atención', 'No se pudo cargar el registro solicitado');
                $window.history.back();
            },
            onCreateStart: function (scope) {
                Loading.show();
            },
            onCreateFinish: function (scope) {
                Loading.hide();
                $window.history.back();
            },
            onCreateError: function (scope, status, message) {
                Loading.hide();
                Message("No se puede agregar (" + status + ")", message);
            },
            onCanceled: function (scope) {
                $window.history.back();
            },
            onCreateFinishHome: function (scope) {
                Loading.hide();
                $window.location.href = "/" + $rootScope.context + "/Content/app/modules/Customer.html#/clientes/home";
            }
        }
    })
    .factory('EventsEditDetail', function ($rootScope, $location, $window) {
        return {
            onInstantiate: function (scope) {
                scope.initialize();
            },
            onInitializeStart: function (scope) {
                Loading.show();
            },
            onInitializeFinish: function (scope) {
                Loading.hide();
            },
            onInitializeError: function (scope) {
                Loading.hide();
                Message('Atención', 'No se pudo cargar el registro solicitado');
                $window.history.back();
            },
            onEditStart: function (scope) {
                Loading.show();
            },
            onEditFinish: function (scope) {
                Loading.hide();
                $window.history.back();
            },
            onEditError: function (scope, status, message) {
                Loading.hide();
                Message("No se puede agregar (" + status + ")", message);
            },
            onCanceled: function (scope) {
                $window.history.back();
            }
        }
    })
    .factory('EventsCreateInLine', function ($rootScope, $location, $window) {
        return {
            onInstantiate: function (scope) {
                scope.initialize();
            },
            onInitializeStart: function (scope) {
                Loading.show();
            },
            onInitializeFinish: function (scope) {
                Loading.hide();
            },
            onInitializeError: function (scope) {
                Loading.hide();
                Message('Atención', 'No se pudo cargar el registro solicitado');
            },
            onCreateStart: function (scope) {
                Loading.show();
            },
            onCreateFinish: function (scope) {
                Loading.hide();
                scope[scope.parameters.itemNameEdit] = {};
                scope.reset();
            },
            onCreateError: function (scope, status, message) {
                Loading.hide();
                Message("No se puede agregar (" + status + ")", message);
            },
            onCanceled: function (scope) {
                $window.history.back();
            }
        }
    })
    .factory('EventsEditInLine', function ($rootScope, $location, $window) {
        return {
            onInstantiate: function (scope) {
                //Nop
            },
            onInitializeStart: function (scope) {
                Loading.show();
            },
            onInitializeFinish: function (scope) {
                Loading.hide();
            },
            onInitializeError: function (scope) {
                Loading.hide();
                Message('Atención', 'No se pudo cargar el registro solicitado');
            },
            onEditStart: function (scope) {
                Loading.show();
            },
            onEditFinish: function (scope) {
                Loading.hide();
                angular.copy(scope[scope.parameters.itemNameEdit], scope[scope.parameters.itemName]);
                scope.enable = false;
            },
            onEditError: function (scope, status, message) {
                Loading.hide();
                Message("No se puede agregar (" + status + ")", message);
            },
            onCanceled: function (scope) {
                scope.enable = false;
            }
        }
    })
    .factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<!--[if gte mso 9]&gt;{worksheet}&lt;![endif]--><table>{table}</table>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
