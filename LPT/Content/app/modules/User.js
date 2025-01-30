var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("User", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//User
        $routeProvider.
            when('/user/list', {
                controller: 'ListCtrl',
                templateUrl: 'User/views/list.User.html',
                resolve: {
                    ApiResource: 'UserResource',
                    ApiKey: 'UserKey',
                    ApiFilters: 'UserFilters',
                    ApiParameters: 'UserParams',
                    Events: 'EventsList'
                }
            }).
            when('/user/list/:id?/:name?/:lastName1?/:lastName2?/:email?', {
                controller: 'ListCtrl',
                templateUrl: 'User/views/list.User.html',
                resolve: {
                    ApiResource: 'UserResource',
                    ApiKey: 'UserKey',
                    ApiFilters: 'UserFilters',
                    ApiParameters: 'UserParams',
                    Events: 'EventsList'
                }
            }).
            when('/user/list/:id?/:name?/:lastName1?/:lastName2?/:email?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'User/views/list.User.html',
                resolve: {
                    ApiResource: 'UserResource',
                    ApiKey: 'UserKey',
                    ApiFilters: 'UserFilters',
                    ApiParameters: 'UserParams',
                    Events: 'EventsList'
                }
            }).
            when('/user/new', {
                controller: 'CreateCtrl',
                templateUrl: 'User/views/details.User.html',
                resolve: {
                    ApiResource: 'UserResource',
                    ApiKey: 'UserKey',
                    ApiFilters: 'UserFilters',
                    ApiParameters: 'UserParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/user/edit/:id', {
                controller: 'EditCtrl',
                templateUrl: 'User/views/details.User.html',
                resolve: {
                    ApiResource: 'UserResource',
                    ApiKey: 'UserKey',
                    ApiFilters: 'UserFilters',
                    ApiParameters: 'UserParams',
                    Events: 'EventsEditDetail'
                }
            }).
            otherwise({ redirectTo: '/user/list' });
    });
