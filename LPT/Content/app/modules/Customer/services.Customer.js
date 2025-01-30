Application.Services
.factory('CustomerResource', function ($resource,$rootScope) {
	return $resource( '/'+ $rootScope.context + '/api/CustomerApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
})
.constant('CustomerKey', [['id', 'idcustomer']])
.constant('CustomerFilters', [['EQUAL','idnumber'],['LIKE','name']])
.service('CustomerParams', function ($http,$rootScope) {
	this.itemNameEdit = 'itemCustomerEdit';
	this.itemName = 'itemCustomer';
	this.routeBase = 'clientes';
	this.load = function (item, callback) {
		var myService = this;
		if (angular.isFunction(callback)) callback();
	};
	this.data = {};
	
});



