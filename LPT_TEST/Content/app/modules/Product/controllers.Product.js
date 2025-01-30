Application.Controllers
    .controller('ProductListCtrl', ['$injector', '$scope', '$routeParams', 'ProductResource', 'ProductKey', 'ProductFilters', 'ProductParams', 'EventsList',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
        }
    ])
    .controller('ProductCreateCtrl', ['$injector', '$scope', 'ProductResource', 'ProductKey', 'ProductFilters', 'ProductParams', 'EventsCreateInLine',
        function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $scope.itemProductEdit = { 'defaultCode' : '',
								'pack' : '',
								'isGradePack' : '',
								'grade' : '',
								'edition' : '',
								'name' : ''};
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            

            $scope.$watch('itemProductEdit.defaultCode', function(newValue, oldValue) {
            	for(var i=0; i < ApiParameters.getProductErp().length; i++ ){  
            		
            		var item = ApiParameters.getProductErp()[i];
            		if(item.default_code === $scope.itemProductEdit.defaultCode){
            			$scope.itemProductEdit.name = item.name;
            			$scope.itemProductEdit.price = item.list_price;
            			console.log($scope.itemProductEdit);
            			break;
            		}            		
            	}
            	});
        }
    ])
    .controller('ProductEditCtrl', ['$injector', '$scope', '$routeParams', 'ProductResource', 'ProductKey', 'ProductFilters', 'ProductParams', 'EventsEditInLine',
        function ($injector, $scope, $routeParams, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            
            $scope.changeProduct =  function(){

            	for(var i=0; i < ApiParameters.getProductErp().length; i++ ){     

            		var item = ApiParameters.getProductErp()[i];
            		if(item.default_code === $scope.itemProductEdit.defaultCode){
            			$scope.itemProductEdit.name = item.name;
            			$scope.itemProductEdit.price = item.list_price;
            			break;
            		}            		
            	}            	
            };    
    	}
    ]);
