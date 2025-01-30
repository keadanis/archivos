Application.Controllers   
	.controller('CustomerCreateCtrl', ['$injector', '$scope', '$routeParams','$cookieStore','$location','CustomerResource', 'CustomerKey', 'CustomerFilters', 'CustomerParams', 'EventsCreateDetail',
         function ($injector, $scope, $routeParams, $cookieStore,$location,ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
         $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });

         $scope.currentUser = $cookieStore.get('userLogin');
         
         $scope.idNumberMask = "";
         //$scope.itemCustomerEdit.TCustomer="";
         
         $scope.getMask = function(){
        	 switch($scope.itemCustomerEdit.customerType) {
	     	    case "F":
	     	    	$scope.idNumberMask="999999999";
	     	        break;
	     	    case "J":
	     	    	$scope.idNumberMask="9999999999";
	     	        break;
	     	    default:
	     	    	$scope.idNumberMask = "";
	     	}
         };
         
         //Custom
         $scope.getIdNumberValidation = function(){
        	 var result=100;
        	 
        	 switch($scope.itemCustomerEdit.customerType) {
        	    case "F":
        	    	result=9;
        	        break;
        	    case "J":
        	        result=13;
        	        break;
        	    default:
        	        result = 1000;
        	}
        	 
        	 return result;
        	 
         };
         
         $scope.enableAdminButtons = function() {
         	return $scope.currentUser.role.description == 'Administrador';
         };
         
         $scope.removeSchool = function(item){
             $scope.$apply(function () {
                 $scope.itemCustomerEdit.schoolList.removeItem(item);
             });
         };
         
         //Init
         $scope.init = function()
         {
         	var typePreorder = $location.search().TCustomer;         	
         	if(typePreorder == "D" || typePreorder == "V")
         		$scope.itemCustomerEdit.tcustomer  = typePreorder;
         	
         	$scope.enableAdminButtons();
         	
         };
         
         //Call init
         $scope.init();
         
	
		}
    ])
	.controller('CustomerEditCtrl', ['$injector', '$scope', '$routeParams', '$cookieStore','CustomerResource', 'CustomerKey', 'CustomerFilters', 'CustomerParams', 'EventsEditDetail', 
         function ($injector, $scope, $routeParams,$cookieStore, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
         $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });

         //Custom
         console.log($scope.itemCustomerEdit);
         
         $scope.idNumberMask = "";
         $scope.currentUser = $cookieStore.get('userLogin');
         
         $scope.getMask = function(){
        	 switch($scope.itemCustomerEdit.customerType) {
	     	    case "F":
	     	    	$scope.idNumberMask="999999999";
	     	        break;
	     	    case "J":
	     	    	$scope.idNumberMask="9999999999";
	     	        break;
	     	    default:
	     	    	$scope.idNumberMask = "";
	     	}
         };
         
         $scope.getIdNumberValidation = function(){
        	 var result=100;
        	 
        	 switch($scope.itemCustomerEdit.customerType) {
        	    case "F":
        	    	result=9;
        	        break;
        	    case "J":
        	        result=10;
        	        break;
        	    default:
        	        result = 1000;
        	}
        	 
        	 return result;
        	 
         };
         
         $scope.removeSchool = function(item){
             $scope.$apply(function () {
                 $scope.itemCustomerEdit.schoolList.removeItem(item);
             });
         };
         
         $scope.enableAdminButtons =function() {
          	return $scope.currentUser.role.description == 'Administrador';
          };
         
		}
    ])    

