Application.Services
.factory('EntregasResource', function ($resource,$rootScope) {
	return $resource('/'+ $rootScope.context +'/api/EntregasApi/:id', { id: '@id' }, { update: { method: 'PUT' } });
})
.constant('EntregasKey', [['id', 'id']])
.constant('EntregasFilters', [
	['EQUAL','id'], //0
	['EQUAL','codMep'], //1
	['EQUAL','nombreEscuela'],//2
	['EQUAL','canal'], //3
	['EQUAL','nombreCliente'], //4
	['EQUAL','numFacturaErp'], //5
	['EQUAL','ruta'],//6
	['EQUAL','ruta1'],//7
	['EQUAL','tipoRuta'], //8
	['EQUAL','fechaEntrega'], //9
	['EQUAL','cantLibros'], //10
	['EQUAL','estado'], //11
	['EQUAL','numLote']])//12
.service('EntregasParams', function ($http,$rootScope) {
	this.itemNameEdit = 'itemEntregasEdit';
	this.itemName = 'itemEntregas';
	this.routeBase = 'entregas';
	this.load = function (item, callback) {
		var myService = this;
		if (myService.getVehiculo().length === 0) {
			myService.loadVehiculo(function () {
				if (myService.getUser().length === 0) {
					myService.loadUser(function () {
						if (angular.isFunction(callback)) callback();
					});
				} else {
					if (angular.isFunction(callback)) callback();

				}
			});
		} else {
			if (myService.getUser().length === 0) {
				myService.loadUser(function () {
					if (angular.isFunction(callback)) callback();
				});
			} else {
				if (angular.isFunction(callback)) callback();

			}

		}
	};
	this.data = {};
	this.loadingUser = false;
	this.data.User = [];
	this.setUser = function (data) {
		this.data.User = data;
	};
	this.getUser = function () {
		return this.data.User;
	};
	this.loadUser = function (callback) {
		var myService = this;
		if (!myService.loadingUser) {
			myService.loadingUser = true;
			$http({ method: 'GET', url: '/'+ $rootScope.context +"/api/UserApi?number=0&size=0" })
			.success(function (data, status, headers, config) {
				myService.loadingUser = false;
				myService.setUser(data);
				if (angular.isFunction(callback)) callback();
			});
		}
	};
	this.loadingVehiculo = false;
	this.data.Vehiculo = [];
	this.setVehiculo = function (data) {
		this.data.Vehiculo = data;
	};
	this.getVehiculo = function () {
		return this.data.Vehiculo;
	};
	this.loadVehiculo = function (callback) {
		var myService = this;
		if (!myService.loadingVehiculo) {
			myService.loadingVehiculo = true;
			$http({ method: 'GET', url: '/'+ $rootScope.context +"/api/VehiculosApi?number=0&size=0" })
			.success(function (data, status, headers, config) {
				myService.loadingVehiculo = false;
				myService.setVehiculo(data);
				if (angular.isFunction(callback)) callback();
			});
		}
	};
	
	
    //Loading
	this.loadingRutas = false;
	this.loadingSchools = false;
	
    //Data
	this.data.schools = {};
	this.data.rutas = [];
	
    //Setters and Getters
	this.setSchools = function (data) {
	    this.data.schools = data;
	};
	this.getSchools = function () {
	    return this.data.schools;
	};
	this.setRutas= function (data) {
	    this.data.rutas = data;
	};
	this.getRutas = function () {
	    return this.data.rutas;
	};
	
    //LoadMethods
	this.loadSchools = function (callback,idSchool) {
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

	this.loadRutas = function (callback) {
		var myService = this;
	    if (!myService.loadingRutas) {
	        myService.loadingRutas = true;
	        $http({ method: 'GET', url: '/'+ $rootScope.context + "/api/RutasApi?size=0&number=0" })
				.success(function (data, status, headers, config) {
				    myService.loadingRutas = false;
				    myService.setRutas(data);
				    if (angular.isFunction(callback)) callback();
				});
	    }
	};
	
	//PUT
	this.setListaEntregas = function (callback,plista,pstatus) {
        $http({ method: 'DELETE', url: '/'+ $rootScope.context + "/api/EntregasApi?l="+plista + "&s=" + pstatus + "&"})
			.success(function (data, status, headers, config) {
			    if (angular.isFunction(callback)) callback();
			});
	};
	
});
