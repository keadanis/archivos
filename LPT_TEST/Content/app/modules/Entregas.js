var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Entregas", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers','ui.calendar'])
    .config(function ($routeProvider) {
		//Entregas
        $routeProvider.
            when('/entregas/list', {
                controller: 'EntregasListCtrl',
                templateUrl: 'Entregas/views/list.Entregas.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsList'
                }
            }).
            when('/entregas/list/:id?/:codMep?/:nombreEscuela?/:canal?/:nombreCliente?/:numFacturaErp?/:ruta?/:ruta1?/:tipoRuta?/:fechaEntrega?/:cantLibros?/:estado?/:numLote?', {
                controller: 'EntregasListCtrl',
                templateUrl: 'Entregas/views/list.Entregas.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsList'
                }
            }).
            when('/entregas/list/:id?/:codMep?/:nombreEscuela?/:canal?/:nombreCliente?/:numFacturaErp?/:ruta?/:ruta1?/:tipoRuta?/:fechaEntrega?/:cantLibros?/:estado?/:numLote?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'EntregasListCtrl',
                templateUrl: 'Entregas/views/list.Entregas.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsList'
                }
            }).
            when('/entregas/new', {
                controller: 'EntregasCreateCtrl',
                templateUrl: 'Entregas/views/details.Entregas.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/entregas/edit/:id', {
                controller: 'EntregasEditCtrl',
                templateUrl: 'Entregas/views/details.Entregas.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsEditDetail'
                }
            }).
            when('/entregas/calendar', {
                controller: 'EntregasCalendarCtrl',
                templateUrl: 'Entregas/views/calendar.Entregas1.html',
                resolve: {
                    ApiResource: 'EntregasResource',
                    ApiKey: 'EntregasKey',
                    ApiFilters: 'EntregasFilters',
                    ApiParameters: 'EntregasParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            otherwise({ redirectTo: '/entregas/list' });
    });
