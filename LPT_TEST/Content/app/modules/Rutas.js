var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Rutas", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Rutas
        $routeProvider.
            when('/rutas/list', {
                controller: 'ListCtrl',
                templateUrl: 'Rutas/views/list.Rutas.html',
                resolve: {
                    ApiResource: 'RutasResource',
                    ApiKey: 'RutasKey',
                    ApiFilters: 'RutasFilters',
                    ApiParameters: 'RutasParams',
                    Events: 'EventsList'
                }
            }).
            when('/rutas/list/:id?/:circuito?/:direccion?/:regional?/:destino?/:tipo?', {
                controller: 'ListCtrl',
                templateUrl: 'Rutas/views/list.Rutas.html',
                resolve: {
                    ApiResource: 'RutasResource',
                    ApiKey: 'RutasKey',
                    ApiFilters: 'RutasFilters',
                    ApiParameters: 'RutasParams',
                    Events: 'EventsList'
                }
            }).
            when('/rutas/list/:id?/:circuito?/:direccion?/:regional?/:destino?/:tipo?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Rutas/views/list.Rutas.html',
                resolve: {
                    ApiResource: 'RutasResource',
                    ApiKey: 'RutasKey',
                    ApiFilters: 'RutasFilters',
                    ApiParameters: 'RutasParams',
                    Events: 'EventsList'
                }
            }).
            when('/rutas/new', {
                controller: 'CreateCtrl',
                templateUrl: 'Rutas/views/details.Rutas.html',
                resolve: {
                    ApiResource: 'RutasResource',
                    ApiKey: 'RutasKey',
                    ApiFilters: 'RutasFilters',
                    ApiParameters: 'RutasParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/rutas/edit/:id', {
                controller: 'EditCtrl',
                templateUrl: 'Rutas/views/details.Rutas.html',
                resolve: {
                    ApiResource: 'RutasResource',
                    ApiKey: 'RutasKey',
                    ApiFilters: 'RutasFilters',
                    ApiParameters: 'RutasParams',
                    Events: 'EventsEditDetail'
                }
            }).
            otherwise({ redirectTo: '/rutas/list' });
    });
