var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Role", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Role
        $routeProvider.
            when('/role/list', {
                controller: 'ListCtrl',
                templateUrl: 'Role/views/list.Role.html',
                resolve: {
                    ApiResource: 'RoleResource',
                    ApiKey: 'RoleKey',
                    ApiFilters: 'RoleFilters',
                    ApiParameters: 'RoleParams',
                    Events: 'EventsList'
                }
            }).
            when('/role/list', {
                controller: 'ListCtrl',
                templateUrl: 'Role/views/list.Role.html',
                resolve: {
                    ApiResource: 'RoleResource',
                    ApiKey: 'RoleKey',
                    ApiFilters: 'RoleFilters',
                    ApiParameters: 'RoleParams',
                    Events: 'EventsList'
                }
            }).
            when('/role/list/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Role/views/list.Role.html',
                resolve: {
                    ApiResource: 'RoleResource',
                    ApiKey: 'RoleKey',
                    ApiFilters: 'RoleFilters',
                    ApiParameters: 'RoleParams',
                    Events: 'EventsList'
                }
            }).
            otherwise({ redirectTo: '/role/list' });
    });
