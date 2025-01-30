Application.Services
    .factory('UserResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context +'/api/UserApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('UserKey', [['id', 'id']])
    .constant('UserFilters', [['EQUAL','id'], ['EQUAL','name'], ['EQUAL','lastName1'], ['EQUAL','lastName2'], ['EQUAL','email']])
    .service('UserParams', function ($http,$rootScope) {
        this.itemNameEdit = 'itemUserEdit';
        this.itemName = 'itemUser';
        this.routeBase = 'user';
		this.load = function (item, callback) {
			var myService = this;
			if (myService.getRole().length === 0) {
				myService.loadRole(function () {
					if (angular.isFunction(callback)) callback();
				});
			} else {
				if (angular.isFunction(callback)) callback();

			}
		};
        this.data = {};
		this.loadingRole = false;
		this.data.Role = [];
		this.setRole = function (data) {
			this.data.Role = data;
		};
		this.getRole = function () {
			return this.data.Role;
		};
		this.loadRole = function (callback) {
			var myService = this;
			if (!myService.loadingRole) {
				myService.loadingRole = true;
				$http({ method: 'GET', url: '/'+ $rootScope.context +"/api/RoleApi?number=0&size=0" })
					.success(function (data, status, headers, config) {
						myService.loadingRole = false;
						myService.setRole(data);
						if (angular.isFunction(callback)) callback();
					});
			}
		};

    });
