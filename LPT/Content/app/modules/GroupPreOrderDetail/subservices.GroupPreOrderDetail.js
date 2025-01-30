Application.Services
    .factory('GroupPreOrderDetailResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context + '/api/GroupPreOrderDetailApi/:NumOrder', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('GroupPreOrderDetailKey', [['id', 'NumOrder']])
    .constant('GroupPreOrderDetailFilters', [])
    .service('GroupPreOrderDetailParams', function ($http,$rootScope) {
        this.itemNameEdit = 'itemGroupPreOrderDetailEdit';
        this.itemName = 'itemGroupPreOrderDetail';
        this.routeBase = 'detalles';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
		this.data = {};

        this.load = function (item, callback) {
            var myService = this;
            if (myService.getSchools().length === 0) {
                myService.loadSchools(function () {
                    if (myService.getProducts().length === 0) {
                        myService.loadProducts(function () {
                        	if (angular.isFunction(callback)) callback();
                        });
                    } else {
                    	if (angular.isFunction(callback)) callback();
                    }
                });
            } else {
                if (myService.getProducts().length === 0) {
                    myService.loadSchools(function () {
                    	if (angular.isFunction(callback)) callback();
                    });
                } else {
                	if (angular.isFunction(callback)) callback();
                }
            }
        };
		

        //Loading
		this.loadingSchools = false;
		this.loadingProducts = false;

        //Data
		this.data.schools = [];
		this.data.products = [];

        //Setters and Getters
		this.setSchools = function (data) {
		    this.data.schools = data;
		};
		this.getSchools = function () {
		    return this.data.schools;
		};
		this.setProducts = function (data) {
		    this.data.products = data;
		};
		this.getProducts = function () {
		    return this.data.products;
		};

        //LoadMethods
		this.loadSchools = function (callback) {
			var myService = this;
		    if (!myService.loadingSchools) {
		        myService.loadingSchools = true;
		        $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/SchoolApi?q=NO" })
					.success(function (data, status, headers, config) {
					    myService.loadingSchools = false;
					    myService.setSchools(data);
					    if (angular.isFunction(callback)) callback();
					});
		    }
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
		
    })

.service('sharedModal', function () {
    var modal = {};
    var modalIsOpen = false;
    var modalIsEdit = false;

    return {
        getModal: function () {
            return modal;
        },
        setModal: function (value) {
            modal = value;
        },
        getIsOpen: function () {
            return modalIsOpen;
        },
        setIsOpen: function (value) {
            modalIsOpen = value;
        },
        showModal: function () {
            $("#detalleModal").modal({ backdrop: 'static' });
            modalIsOpen = true;
        },
        hideModal: function () {
            $("#detalleModal").modal('hide');
            modalIsOpen = false;
            this.setIsEdit(false);
        },
        getIsEdit: function () {
            return modalIsEdit;
        },
        setIsEdit: function (value) {
            modalIsEdit = value;
        }
    };
})

.service('sharedPreOrder', function () {
    var item = {};
    var isLoaded;

    return {
        getItem: function () {
            return item;
            isLoaded = false;
            item = {};
        },
        setItem: function (value) {
        	item = value;
        	isLoaded = true;
        },
        getIsLoaded: function () {
            return isLoaded;
        },
    };
});
