var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Login", ['ngRoute', 'ngAnimate','ngCookies','application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Login
        $routeProvider.

            when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'Login/views/details.Login.html',
                resolve: {
                    ApiResource: 'LoginResource',
                    ApiKey: 'LoginKey',
                    ApiFilters: 'LoginFilters',
                    ApiParameters: 'LoginParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/logout', {
                controller: 'EditCtrl',
                templateUrl: 'Login/views/details.Login.html',
                resolve: {
                    ApiResource: 'LoginResource',
                    ApiKey: 'LoginKey',
                    ApiFilters: 'LoginFilters',
                    ApiParameters: 'LoginParams',
                    Events: 'EventsEditDetail'
                }
            }).
            otherwise({ redirectTo: '/login' });
    });
