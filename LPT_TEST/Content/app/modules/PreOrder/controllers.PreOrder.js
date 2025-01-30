Application.Controllers
	.controller('PreOrderListCtrl', ['$injector', '$scope', '$routeParams', '$window','$timeout','PreOrderResource','PreOrderKey','PreOrderFilters', 'PreOrderParams','EventsList',
        function ($injector, $scope, $routeParams,$window,$timeout,ApiResource, ApiKey,ApiFilters, ApiParameters,Events) {
            $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            
            	$scope.customerData = [];
            	$scope.totalCliente = 0;
            	
                $scope.getCustomer = function(){
                	ApiParameters.loadCustomer(function(){
                		$scope.customerData=ApiParameters.getCustomer();
                	});
                }
                $scope.getCustomer();
                
                $scope.getTotalByCustomer = function(){
                    $timeout(function() {
                    	var total = 0;
                    	if($scope.list_parms[2])
                    	{
                            for(var i = 0; i < $scope.items.length; i++){
                            	var tempObje = $scope.items[i];
                                total += tempObje.total; 
                            }
                    	}
                    	$scope.totalCustomer = total;
                    }, 2000);
                }
                
                $scope.getTotalByCustomer();

    }
    ])