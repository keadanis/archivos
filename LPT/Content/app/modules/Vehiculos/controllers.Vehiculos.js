Application.Controllers
    .controller('VehiculosListCtrl', ['$injector', '$scope', '$routeParams', 'VehiculosResource', 'VehiculosKey', 'VehiculosFilters', 'VehiculosParams', 'EventsList',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('VehiculosCreateCtrl', ['$injector', '$scope', 'VehiculosResource', 'VehiculosKey', 'VehiculosFilters', 'VehiculosParams', 'EventsCreateInLine',
        function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $scope.itemEdit = { 'id' : '',
'descripcion' : '',
'capacidad' : '' };
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('VehiculosEditCtrl', ['$injector', '$scope', '$routeParams', 'VehiculosResource', 'VehiculosKey', 'VehiculosFilters', 'VehiculosParams', 'EventsEditInLine',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ]);
