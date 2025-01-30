Application.Controllers
    .controller('ActivitiesListCtrl', ['$injector', '$scope', '$routeParams', 'ActivitiesResource', 'ActivitiesKey', 'ActivitiesFilters', 'ActivitiesParams', 'EventsList',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('ActivitiesCreateCtrl', ['$injector', '$scope', 'ActivitiesResource', 'ActivitiesKey', 'ActivitiesFilters', 'ActivitiesParams', 'EventsCreateInLine',
        function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $scope.itemEdit = { 'id' : '',
'descripcion' : '',
'fecha' : '',
'observaciones' : '' };
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('ActivitiesEditCtrl', ['$injector', '$scope', '$routeParams', 'ActivitiesResource', 'ActivitiesKey', 'ActivitiesFilters', 'ActivitiesParams', 'EventsEditInLine',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ]);
