Application.Controllers
	.controller('ReportsListCtrl', ['$injector','$scope', '$routeParams', '$window', '$filter','PreOrderResource','PreOrderKey','PreOrderFilters', 'PreOrderParams','EventsList',
        function ($injector,$scope, $routeParams, $window, $filter, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
        
        $scope.filename;
	    $scope.preOrderData = [];
	    $scope.initDate;
	    $scope.endDate;

      
      $scope.getHeader = function () {return ['PROFORMA','TIPO','RAZON SOCIAL','CANT ART.','TOTAL','SUB TOTAL','DESCUENTO','FECHA','ID USUARIO','NOMBRE USUARIO','ESTADO','A']};    

      $scope.getPreOrderData = function(){
    	  //Clear preOrderData
    	  $scope.preOrderData = [];
    	  
    	  //Add day due to angular datepicker known issue
    	  var dateAdjustOneDay= new Date($scope.initDate);
    	  $scope.initDate = dateAdjustOneDay.setDate(dateAdjustOneDay.getDate()+1);
    	      	  
    	  dateAdjustOneDay= new Date($scope.endDate);
    	  $scope.endDate = dateAdjustOneDay.setDate(dateAdjustOneDay.getDate()+1);
    	  
    	  
    	  //Format dates
    	  
    	  $scope.initDate = $filter('date')($scope.initDate, "yyyy-MM-dd");
    	  $scope.endDate = $filter('date')($scope.endDate, "yyyy-MM-dd");
        	ApiParameters.loadOrdersReports(function(){
        		$scope.preOrderData=ApiParameters.getOrdersReports();
        		console.log($scope.preOrderData);
        	},$scope.initDate,$scope.endDate);
      }
      
    }
    ])