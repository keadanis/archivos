Application.Controllers
    .controller('RoleListCtrl', ['$injector', '$scope', '$routeParams', 'RoleResource', 'RoleKey', 'RoleFilters', 'RoleParams', 'EventsList',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('RoleCreateCtrl', ['$injector', '$scope', 'RoleResource', 'RoleKey', 'RoleFilters', 'RoleParams', 'EventsCreateInLine',
        function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $scope.itemEdit = { 'id' : '',
'description' : '' };
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('RoleEditCtrl', ['$injector', '$scope', '$routeParams', 'RoleResource', 'RoleKey', 'RoleFilters', 'RoleParams', 'EventsEditInLine',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ]);
