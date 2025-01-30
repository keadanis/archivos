var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Product", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Productos
        $routeProvider.
            when('/productos/list', {
                controller: 'ListCtrl',
                templateUrl: 'Product/views/list.Product.html',
                resolve: {
                    ApiResource: 'ProductResource',
                    ApiKey: 'ProductKey',
                    ApiFilters: 'ProductFilters',
                    ApiParameters: 'ProductParams',
                    Events: 'EventsList'
                }
            }).
            when('/productos/list/:default_code?', {
                controller: 'ListCtrl',
                templateUrl: 'Product/views/list.Product.html',
                resolve: {
                    ApiResource: 'ProductResource',
                    ApiKey: 'ProductKey',
                    ApiFilters: 'ProductFilters',
                    ApiParameters: 'ProductParams',
                    Events: 'EventsList'
                }
            }).
            when('/productos/list/:default_code?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Product/views/list.Product.html',
                resolve: {
                    ApiResource: 'ProductResource',
                    ApiKey: 'ProductKey',
                    ApiFilters: 'ProductFilters',
                    ApiParameters: 'ProductParams',
                    Events: 'EventsList'
                }
            }).
            otherwise({ redirectTo: '/productos/list' });
    });
