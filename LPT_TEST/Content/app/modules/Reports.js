var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Reports", ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngCsv', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Reports
        $routeProvider.
            when('/Reports/list', {
                controller: 'ReportsListCtrl',
                templateUrl: 'Reports/views/list.Reports.html',
                resolve: {
                    ApiResource: 'PreOrderResource',
                    ApiKey: 'PreOrderKey',
                    ApiFilters: 'PreOrderFilters',
                    ApiParameters: 'PreOrderParams',
                    Events: 'EventsList'
                }
            }).
            otherwise({ redirectTo: '/Reports/list' });
    });
