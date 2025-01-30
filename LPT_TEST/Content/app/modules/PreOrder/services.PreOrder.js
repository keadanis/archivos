Application.Services
    .factory('PreOrderResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context + '/api/PreOrderApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('PreOrderKey', [['id', 'id']])
    .constant('PreOrderFilters', [['EQUAL', 'id'],['EQUAL', 'type'],['EQUAL', 'customerId'],['EQUAL', 'status']])
    .service('PreOrderParams', function ($http,$rootScope) {
        this.itemNameEdit = 'itemPreOrderEdit';
        this.itemName = 'itemPreOrder';
        this.routeBase = 'proformas';
        this.load = function (item, callback) {
            var myService = this;
            if (myService.getCustomer().length === 0) {
                myService.loadCustomer(function () {
                	if (myService.getProducts().length === 0) {
                		myService.loadProducts(function () {
                			if (angular.isFunction(callback)) callback();
                		});
                	}
                });
            } else {
                if (angular.isFunction(callback)) callback();

            }
        };
        this.data = {};
        this.loadingCustomer = false;
        this.data.Customer = [];
        this.setCustomer = function (data) {
            this.data.Customer = data;
        };
        this.getCustomer = function () {
            return this.data.Customer;
        };
        this.loadCustomer = function (callback) {
            var myService = this;
            if (!myService.loadingCustomer) {
                myService.loadingCustomer = true;
                $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/CustomerApi" })
					.success(function (data, status, headers, config) {
					    myService.loadingCustomer = false;
					    myService.setCustomer(data);
					    if (angular.isFunction(callback)) callback();
					});
            }
        };
        
        this.loadingFullCustomer = false;
        this.data.FullCustomer = [];
        this.setFullCustomer = function (data) {
            this.data.FullCustomer = data;
        };
        this.getFullCustomer = function () {
            return this.data.FullCustomer;
        };
        this.loadFullCustomer = function (callback,param) {;
            var myService = this;
            if (!myService.loadingFullCustomer) {
                myService.loadingFullCustomer = true;
                $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/CustomerApi",params: { "id": param } })
					.success(function (data, status, headers, config) {
					    myService.loadingFullCustomer = false;
					    myService.setFullCustomer(data);
					    if (angular.isFunction(callback)) callback();
					});
            }
        };
        
        this.loadingProducts = false;
        this.data.Products = [];
        this.setProducts = function (data) {
            this.data.Products = data;
        };
        this.getProducts = function () {
            return this.data.Products;
        };
        this.loadProducts = function (callback) {
            var myService = this;
            if (!myService.loadingProducts) {
                myService.loadingProducts = true;
                $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/ProductApi?q=NO" })
					.success(function (data, status, headers, config) {
					    myService.loadingProducts = false;
					    myService.setProducts(data);
					    if (angular.isFunction(callback)) callback();
					});
            }
        };
        
        this.data.Projection  = [];
        this.setProjection  = function (data) {
            this.data.Projection  = data;
        };
        this.getProjection  = function () {
            return this.data.Projection;
        };
        this.loadProjection  = function (callback,param) {
            var myService = this;
            $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/ProjectionApi",params: { "q": param } })
				.success(function (data, status, headers, config) {
				    myService.setProjection(data);
				    if (angular.isFunction(callback)) callback();
				});
        };
        
        
		this.data.ordersSchools = [];
		this.setOrdersSchools = function (data) {
			this.data.ordersSchools = data;
		};
		this.getOrdersSchools = function () {
		    return this.data.ordersSchools;
		};
		this.loadOrderSchools = function(callback,param){
			var myService = this;
			var filters = "";
			filters += "{ 'PropertyName': 'schoolId', 'Operator': '=', 'Expression': '" + param +"' }";
			filters = "[" + filters + "]";
			
	        $http({ 
	        	method: 'GET', 
	        	url: '/'+ $rootScope.context + "/api/PreOrderApi",
	        	params:{filters:filters}
	        	})
				.success(function (data, status, headers, config) {
				    myService.setOrdersSchools(data);
				    if (angular.isFunction(callback)) callback();
				});
		};
		this.data.ordersReports = [];
		this.setOrdersReports = function (data) {
			this.data.ordersReports = data;
		};
		this.getOrdersReports = function () {
		    return this.data.ordersSchools;
		};
		this.loadOrdersReports = function(callback,param1, param2){
			var myService = this;
			var filters = "";
			filters += "{ 'PropertyName': 'date', 'Operator': 'MOREOREQUAL', 'Expression': '" + param1 +"' }";
			filters += ",{ 'PropertyName': 'date', 'Operator': 'LESSOREQUAL', 'Expression': '" + param2 +"' }";
			filters = "[" + filters + "]";
			
	        $http({ 
	        	method: 'GET', 
	        	url: '/'+ $rootScope.context + "/api/PreOrderApi",
	        	params:{filters:filters}
	        	})
				.success(function (data, status, headers, config) {
				    myService.setOrdersSchools(data);
				    if (angular.isFunction(callback)) callback();
				});
		};


    });
