Application.Controllers
    .controller('LoginCtrl', ['$injector', '$scope','LoginResource', 'LoginKey', 'LoginFilters', 'LoginParams', 'EventsCreateDetail',
        function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            
            $scope.login = function () {
                Events.onCreateStart($scope);
                ApiResource.save($scope.itemLoginEdit,
                    function (response) {;
                    	//Save Cookie
                    	ApiParameters.setUser(response);
                        Events.onCreateFinishHome($scope);
                    },
                    function (response) {
                        Events.onCreateError($scope, response.status, response.data);
                    });
            };   
    }
    ]);