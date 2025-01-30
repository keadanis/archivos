var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Customer", ['ngRoute', 'ngAnimate','ngMask','ngCookies','ui.mask','application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Clientes
        $routeProvider.
            when('/clientes/list', {
                controller: 'ListCtrl',
                templateUrl: 'Customer/views/list.Customer.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsList'
                }
            }).
            when('/clientes/list/:idnumber?', {
                controller: 'ListCtrl',
                templateUrl: 'Customer/views/list.Customer.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsList'
                }
            }).
            when('/clientes/list/:idnumber?/:name?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Customer/views/list.Customer.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsList'
                }
            }).
            when('/clientes/new', {
                controller: 'CustomerCreateCtrl',
                templateUrl: 'Customer/views/details.Customer.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/clientes/edit/:idcustomer', {
                controller: 'CustomerEditCtrl',
                templateUrl: 'Customer/views/details.Customer.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsEditDetail'
                }
            }).
            when('/clientes/home', {
                controller: 'CustomerCreateCtrl',
                templateUrl: 'Customer/views/home.Page.html',
                resolve: {
                    ApiResource: 'CustomerResource',
                    ApiKey: 'CustomerKey',
                    ApiFilters: 'CustomerFilters',
                    ApiParameters: 'CustomerParams',
                    Events: 'EventsEditDetail'
                }
                	
            }).
            otherwise({ redirectTo: '/clientes/list' });
    });
