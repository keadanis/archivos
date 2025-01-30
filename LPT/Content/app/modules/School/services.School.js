Application.Services
    .factory('SchoolResource', function ($resource,$rootScope) {
        return $resource('/'+ $rootScope.context + '/api/SchoolApi/:idschool', { id: '@id' }, { update: { method: 'PUT' } });
    })
    .constant('SchoolKey', [['id', 'idschool']])
    .constant('SchoolFilters', [['LIKE','nameSchool'], ['LIKE','codmep'],['LIKE','dirRegional'], ['LIKE','circuito'], ['LIKE','province'], ['LIKE','canton'], ['LIKE','distric'],['EQUAL','matriculaAct'],['LIKE','poblado'],['LIKE','donante'],['LIKE','vendedor']]) 
    .service('SchoolParams', function ($http) {
        this.itemNameEdit = 'itemSchoolEdit';
        this.itemName = 'itemSchool';
        this.routeBase = 'escuelas';
		this.load = function (item, callback) {
			var myService = this;
if (angular.isFunction(callback)) callback();
		};
        this.data = {};

    });
