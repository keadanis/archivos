angular.module('framework.controllers', [])
	.run(function($rootScope,$timeout) {
		//TODO : Change context
	 //   $rootScope.context = "LPT"; //Localhost or Production
	    $rootScope.context = "LPT_TEST"; //Test in tomcat  
	})
    .controller('CreateCtrl', function ($scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
        "use strict";
        $scope.parameters = ApiParameters;
        $scope.action = "Agregar";
        $scope.ready = false;
        $scope[$scope.parameters.itemNameEdit] = {};
        $scope.isDisabled = function (fieldName) {
            return false;
        };
        $scope.initialize = function () {
            Events.onInitializeStart($scope);
            if (angular.isFunction($scope.parameters.load)) {
                $scope.parameters.load(null, function () {
                    Events.onInitializeFinish($scope);
                    $scope.ready = true;
                });
            } else {
                Events.onInitializeFinish($scope);
                $scope.ready = true;
            }
        };
        $scope.cancel = function () {
            Events.onCanceled($scope);
        };
        $scope.save = function () {
            Events.onCreateStart($scope);
            ApiResource.save($scope[$scope.parameters.itemNameEdit],
                function () {
                    Events.onCreateFinish($scope);
                },
                function (response) {
                    Events.onCreateError($scope, response.status, response.data);
                });
        };
        Events.onInstantiate($scope);
    })
    .controller('EditCtrl', function ($scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
        "use strict";
        var itemKey = {},
            i = 0;
        for (i = 0; i < ApiKey.length; i++) {
            if (angular.isDefined($scope[ApiParameters.itemName])) {
                itemKey[ApiKey[i][0]] = $scope[ApiParameters.itemName][ApiKey[i][1]];
            } else {
                itemKey[ApiKey[i][0]] = $routeParams[ApiKey[i][1]];
            }
        }
        $scope.route = $routeParams;
        $scope.parameters = ApiParameters;
        $scope.action = "Actualizar";
        $scope.ready = false;
        $scope[$scope.parameters.itemNameEdit] = {};
        $scope.enable = false;
        $scope.isDisabled = function (fieldName) {
            var key = false;
            for (i = 0; i < ApiKey.length && !key; i++) {
                if (ApiKey[i][1] === fieldName) {
                    key = true;
                }
            }
            return key;
        };
        $scope.initialize = function () {
            Events.onInitializeStart($scope);
            $scope[$scope.parameters.itemNameEdit] = ApiResource.get(itemKey,
                function (value, responseHeaders) {
                    if (angular.isFunction($scope.parameters.load)) {
                        $scope.parameters.load(value, function () {
                            Events.onInitializeFinish($scope);
                            $scope.ready = true;
                        });
                    } else {
                        Events.onInitializeFinish($scope);
                        $scope.ready = true;
                    }
                },
                function () {
                    Events.onInitializeError($scope);
                });
        };
        $scope.cancel = function () {
            Events.onCanceled($scope);
        };
        $scope.save = function () {
            Events.onEditStart($scope);
            ApiResource.update(itemKey, $scope[$scope.parameters.itemNameEdit],
                function () {
                    Events.onEditFinish($scope);
                },
                function (response) {
                    Events.onEditError($scope, response.status, response.data);
                });
        };
        $scope.edit = function () {
            if (!$scope.enable) {
                $scope.ready = false;
                $scope.enable = true;
                $scope.initialize();
            }
        };
        Events.onInstantiate($scope);
    })
    .controller('SeeCtrl', function ($scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
        "use strict";
        var itemKey = {},
            i = 0;
        for (i = 0; i < ApiKey.length; i++) {
            if (angular.isDefined($scope[ApiParameters.itemName])) {
                itemKey[ApiKey[i][0]] = $scope[ApiParameters.itemName][ApiKey[i][1]];
            } else {
                itemKey[ApiKey[i][0]] = $routeParams[ApiKey[i][1]];
            }
        }
        $scope.route = $routeParams;
        $scope.parameters = ApiParameters;
        $scope.action = "Actualizar";
        $scope.ready = false;
        $scope[$scope.parameters.itemNameEdit] = {};
        $scope.enable = false;
        $scope.isDisabled = function (fieldName) {
            return true;
        };
        $scope.initialize = function () {
            Events.onInitializeStart($scope);
            $scope[$scope.parameters.itemNameEdit] = ApiResource.get(itemKey,
                function (value, responseHeaders) {
                    if (angular.isFunction($scope.parameters.load)) {
                        $scope.parameters.load(value, function () {
                            Events.onInitializeFinish($scope);
                            $scope.ready = true;
                        });
                    } else {
                        Events.onInitializeFinish($scope);
                        $scope.ready = true;
                    }
                },
                function () {
                    Events.onInitializeError($scope);
                });
        };
        $scope.cancel = function () {
            Events.onCanceled($scope);
        };
        $scope.save = function () {
            //Nop
        };
        $scope.edit = function () {
            if (!$scope.enable) {
                $scope.ready = false;
                $scope.enable = true;
                $scope.initialize();
            }
        };
        Events.onInstantiate($scope);
    })
    .controller('ListCtrl', function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
        "use strict";
        $scope.route = $routeParams;
        $scope.parameters = ApiParameters;
        $scope.pag_forward = true;
        $scope.searching = false;
        $scope.delete = function () {
            Events.onDeleteStart($scope);
            var parms = {},
                id = "#" + ApiParameters.itemName,
                i = 0;
            for (i = 0; i < ApiKey.length; i++) {
                parms[ApiKey[i][0]] = this[ApiParameters.itemName][ApiKey[i][1]];
                id = id + "_" + (parms[ApiKey[i][0]] == null ? "" : parms[ApiKey[i][0]]);
            }
            ApiResource.delete(
                parms,
                function () {
                    Events.onDeleteFinish($scope, id);
                },
                function (response) {
                    Events.onDeleteError($scope, response.status, response.data);
                });
        };
        $scope.search = function (ready) {
            if ($scope.searching === false) {
                Events.onSearchStart($scope);
                $scope.searching = true;
                var parms = {};
                parms.filters = $scope.filters;
                parms.q = $scope.query;
                parms.sort = $scope.sort_by;
                parms.desc = $scope.sort_desc;
                parms.size = $scope.pag_size;
                parms.number = $scope.pag_number;
                $scope.items = [];
                ApiResource.query(
                    parms,
                    function (items) {
                        $scope.searching = false;
                        $scope.items = $scope.items.concat(items);
                        if (angular.isFunction(ready)) {
                            ready();
                        }
                        Events.onSearchFinish($scope);
                    },
                    function (response) {
                        $scope.searching = false;
                        Events.onSearchError($scope, response.status, response.data);
                    });
            }
        };
        $scope.reset = function (ready) {
            $scope.filters = "";
            var i = 0;
            for (i = 0; i < ApiFilters.length; i++) {
                $scope.list_parms.push("");
                if ($scope.list_parms[i] != "") {
                    if ($scope.filters.length > 0) {
                        $scope.filters += ",";
                    }
                    $scope.filters += "{ 'PropertyName': '" + ApiFilters[i][1] + "', 'Operator': '" + ApiFilters[i][0] + "', 'Expression': '" + $scope.list_parms[i].replace("'", "").replace(/\*/g, "%") + "' }";
                }
            }
            $scope.filters = "[" + $scope.filters + "]";
            $scope.pag_number = 1;
            $scope.items = [];
            $scope.search(ready);
        };
        $scope.do_init = function (ready) {
            $scope.items = [];
            $scope.list_parms = [];
            $scope.query = "";
            $scope.sort_by = ApiKey[0][1];
            $scope.sort_desc = false;
            $scope.pag_size = 8;
            $scope.pag_number = 1;
            var i = 0;
            for (i = 0; i < ApiFilters.length; i++) {
                $scope.list_parms.push("");
            }
            if (angular.isFunction(ready)) {
                ready();
            }
        };
        $scope.do_sort = function (ord) {
            if ($scope.sort_by === ord) {
                $scope.sort_desc = !$scope.sort_desc;
            } else {
                $scope.sort_desc = false;
            }
            $scope.sort_by = ord;
            $scope.reset();
        };
        $scope.do_next = function (ready) {
            $scope.pag_forward = true;
            $scope.pag_number = $scope.pag_number + 1;
            $scope.search(ready);
        };
        $scope.do_prev = function (ready) {
            $scope.pag_forward = false;
            $scope.pag_number = $scope.pag_number - 1;
            $scope.search(ready);
        };
        $scope.show_next = function () {
            return $scope.items.length >= $scope.pag_size;
        };
        $scope.show_prev = function () {
            return $scope.pag_number > 1;
        };
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $scope.list_parms = [];
            $scope.filters = "";
            var i = 0;
            for (i = 0; i < ApiFilters.length; i++) {
                $scope.list_parms.push($routeParams[ApiFilters[i][1]] || "");
                if ($routeParams[ApiFilters[i][1]]) {
                    if ($scope.filters.length > 0) {
                        $scope.filters += ",";
                    }
                    $scope.filters += "{ 'PropertyName': '" + ApiFilters[i][1] + "', 'Operator': '" + ApiFilters[i][0] + "', 'Expression': '" + $routeParams[ApiFilters[i][1]].replace("'", "").replace(/\*/g, "%") + "' }";
                }
            }
            $scope.filters = "[" + $scope.filters + "]";
            $scope.query = $routeParams.query || "";
            $scope.sort_by = $routeParams.sort_by || ApiKey[0][1];
            $scope.sort_desc = $routeParams.sort_desc === "true";
            $scope.pag_size = ($routeParams.pag_size * 1) || 8;
            $scope.pag_number = ($routeParams.pag_number * 1) || 1;
            $scope.pag_forward = (angular.isUndefined(previous) || angular.isUndefined(previous.scope) || angular.isUndefined(previous.scope.pag_number) || (previous.scope.pag_number <= $scope.pag_number));

            $scope.search(function () {
                //console.log("Completado el routeChange " + ($scope.pag_forward ? "adelante" : "atrás"));
            });
        });
        Events.onInstantiate($scope);
    })
    .controller('SubCreateCtrl', function ($scope, $routeParams, ApiKey, ApiParameters) {
        "use strict";
        $scope.subparameters = ApiParameters;
        $scope.action = "Agregar";
        $scope.ready = false;
        $scope[$scope.subparameters.itemNameEdit] = {};
        $scope.isDisabled = function (fieldName) {
            return false;
        };
        $scope.initialize = function () {
            if (angular.isFunction($scope.subparameters.load)) {
                $scope.subparameters.load(null, function () {
                    $scope.ready = true;
                });
            } else {
                $scope.ready = true;
            }
        };
        $scope.save = function () {
            var newItem = {};
            angular.copy($scope[$scope.subparameters.itemNameEdit], newItem);
            $scope.addDetail(newItem);
            $scope[$scope.subparameters.itemNameEdit] = {};
        };
        $scope.initialize();
    })
    .controller('SubEditCtrl', function ($scope, $routeParams, ApiKey, ApiParameters) {
        "use strict";
        var localItem = {};
        $scope.route = $routeParams;
        $scope.subparameters = ApiParameters;
        $scope.action = "Actualizar";
        $scope.ready = false;
        $scope[$scope.subparameters.itemNameEdit] = {};
        $scope.enable = false;
        $scope.isDisabled = function (fieldName) {
            var key = false;
            for (var i = 0; i < ApiKey.length && !key; i++) {
                if (ApiKey[i][1] === fieldName) {
                    key = true;
                }
            }
            return key;
        };
        $scope.initialize = function () {
            angular.copy(localItem, $scope[$scope.subparameters.itemNameEdit]);
            if (angular.isFunction($scope.subparameters.load)) {
                $scope.subparameters.load(localItem, function () {
                    $scope.ready = true;
                });
            } else {
                $scope.ready = true;
            }
        };
        $scope.delete = function () {
            $scope.$apply(function () {
                $scope.removeDetail(localItem);
            });
        };
        $scope.edit = function (item) {
            $scope.ready = false;
            $scope.enable = true;
            angular.copy(item, localItem);
            $scope.initialize();
        };
        $scope.cancel = function () {
            $scope.enable = false;
        };
        $scope.save = function () {
            $scope.setDetail(localItem, $scope[$scope.subparameters.itemNameEdit])
            $scope.enable = false;
        };

    }
);