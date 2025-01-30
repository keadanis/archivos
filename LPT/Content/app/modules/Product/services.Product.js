Application.Services
    .factory('ProductResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context + '/api/ProductApi/:defaultCode', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('ProductKey', [['id', 'defaultCode']])
    .constant('ProductFilters', [['EQUAL','defaultCode']])
    .service('ProductParams', function ($http,$rootScope) {
        this.itemNameEdit = 'itemProductEdit';
        this.itemName = 'itemProduct';
        this.routeBase = 'productos';
		this.load = function (item, callback) {
			var myService = this;
			if (myService.getProductErp().length === 0) {
				myService.loadProductErp(function () {
					if (angular.isFunction(callback)) callback();
				});
			} else {
				if (angular.isFunction(callback)) callback();

			}
		};
        this.data = {};
		this.loadingProductErp = false;
		this.data.ProductErp = [];
		this.setProductErp = function (data) {
			this.data.ProductErp = data;
		};
		this.getProductErp = function () {
			return this.data.ProductErp;
		};
		this.loadProductErp = function (callback) {
			var myService = this;
			if (!myService.loadingProductErp) {
				myService.loadingProductErp = true;
				$http({ method: 'GET', url: '/'+ $rootScope.context + "/api/ProductErpApi" })
					.success(function (data, status, headers, config) {
						myService.loadingProductErp = false;
						myService.setProductErp(data);
						if (angular.isFunction(callback)) callback();
					});
			}
		};

    });
