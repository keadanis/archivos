Application.Services
    .factory('LoginResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context + '/api/LoginApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('LoginKey', [['id', 'email']])
    .constant('LoginFilters', [])
    .service('LoginParams', function ($http,$cookieStore,$rootScope) {
        this.itemNameEdit = 'itemLoginEdit';
        this.itemName = 'itemLogin';
        this.routeBase = 'login';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};
        this.data.user = [];
        
        this.loadingUser = false;
        
        //Setters and Getters
		this.setUser = function (data) {
			$cookieStore.put('userLogin', data);
			$rootScope.$broadcast('userName', data.name + " " + data.lastName1);
		};
//		this.getUser = function () {
//			return $cookieStore.get('userLogin');
//		};
		
        //LoadMethods
//		this.loadUser = function (callback) {
//			var myService = this;
//		    if (!myService.loadingUser) {
//		        myService.loadingUser = true;
//		        $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/UserApi" })
//					.success(function (data, status, headers, config) {
//					    myService.loadingUser = false;
//					    myService.setUser(data);
//					    if (angular.isFunction(callback)) callback();
//					});
//		    }
//		};

    });
