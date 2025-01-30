var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("PreOrder", ['ngRoute', 'ngAnimate','ngCookies', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Proformas
        $routeProvider.
            when('/proformas/list', {
                controller: 'PreOrderListCtrl',
                templateUrl: 'PreOrder/views/list.PreOrder.html',
                resolve: {
                    ApiResource: 'PreOrderResource',
                    ApiKey: 'PreOrderKey',
                    ApiFilters: 'PreOrderFilters',
                    ApiParameters: 'PreOrderParams',
                    Events: 'EventsList'
                }
            }).
            when('/proformas/list/:id?/:type?/:customerId?/:status?', {
                controller: 'PreOrderListCtrl',
                templateUrl: 'PreOrder/views/list.PreOrder.html',
                resolve: {
                    ApiResource: 'PreOrderResource',
                    ApiKey: 'PreOrderKey',
                    ApiFilters: 'PreOrderFilters',
                    ApiParameters: 'PreOrderParams',
                    Events: 'EventsList'
                }
            }).
            when('/proformas/list/:id?/:type?/:customerId?/:status?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'PreOrderListCtrl',
                templateUrl: 'PreOrder/views/list.PreOrder.html',
                resolve: {
                    ApiResource: 'PreOrderResource',
                    ApiKey: 'PreOrderKey',
                    ApiFilters: 'PreOrderFilters',
                    ApiParameters: 'PreOrderParams',
                    Events: 'EventsList'
                }
            }).
            when('/proformas/new', {
                controller: 'PreOrderCreateCtrl',
                templateUrl: 'PreOrder/views/details.PreOrder.html'
            }).
            when('/proformas/edit/:id', {
                controller: 'PreOrderEditCtrl',
                templateUrl: 'PreOrder/views/details.PreOrder.html'
            }).
            when('/proformas/print/:id', {
                controller: 'PreOrderPrintCtrl',
                templateUrl: 'PreOrder/views/print.PreOrder.html'
            }).
            when('/proformas/printout/:id', {
                controller: 'PreOrderPrintOutCtrl',
                templateUrl: 'PreOrder/views/printout.PreOrder.html'
            }).
            otherwise({ redirectTo: '/proformas/list' });
    });
