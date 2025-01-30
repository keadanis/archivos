var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Vehiculos", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Vehículos
        $routeProvider.
            when('/vehículos/list', {
                controller: 'ListCtrl',
                templateUrl: 'Vehiculos/views/list.Vehiculos.html',
                resolve: {
                    ApiResource: 'VehiculosResource',
                    ApiKey: 'VehiculosKey',
                    ApiFilters: 'VehiculosFilters',
                    ApiParameters: 'VehiculosParams',
                    Events: 'EventsList'
                }
            }).
            when('/vehículos/list/:id?/:descripcion?/:capacidad?', {
                controller: 'ListCtrl',
                templateUrl: 'Vehiculos/views/list.Vehiculos.html',
                resolve: {
                    ApiResource: 'VehiculosResource',
                    ApiKey: 'VehiculosKey',
                    ApiFilters: 'VehiculosFilters',
                    ApiParameters: 'VehiculosParams',
                    Events: 'EventsList'
                }
            }).
            when('/vehículos/list/:id?/:descripcion?/:capacidad?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Vehiculos/views/list.Vehiculos.html',
                resolve: {
                    ApiResource: 'VehiculosResource',
                    ApiKey: 'VehiculosKey',
                    ApiFilters: 'VehiculosFilters',
                    ApiParameters: 'VehiculosParams',
                    Events: 'EventsList'
                }
            }).
            otherwise({ redirectTo: '/vehículos/list' });
    });
