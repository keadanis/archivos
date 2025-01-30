var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("Activities", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Activities
        $routeProvider.
            when('/activities/list', {
                controller: 'ListCtrl',
                templateUrl: 'Activities/views/list.Activities.html',
                resolve: {
                    ApiResource: 'ActivitiesResource',
                    ApiKey: 'ActivitiesKey',
                    ApiFilters: 'ActivitiesFilters',
                    ApiParameters: 'ActivitiesParams',
                    Events: 'EventsList'
                }
            }).
            when('/activities/list/:id?/:descripcion?/:fecha?/:observaciones?', {
                controller: 'ListCtrl',
                templateUrl: 'Activities/views/list.Activities.html',
                resolve: {
                    ApiResource: 'ActivitiesResource',
                    ApiKey: 'ActivitiesKey',
                    ApiFilters: 'ActivitiesFilters',
                    ApiParameters: 'ActivitiesParams',
                    Events: 'EventsList'
                }
            }).
            when('/activities/list/:id?/:descripcion?/:fecha?/:observaciones?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'ListCtrl',
                templateUrl: 'Activities/views/list.Activities.html',
                resolve: {
                    ApiResource: 'ActivitiesResource',
                    ApiKey: 'ActivitiesKey',
                    ApiFilters: 'ActivitiesFilters',
                    ApiParameters: 'ActivitiesParams',
                    Events: 'EventsList'
                }
            }).
            otherwise({ redirectTo: '/activities/list' });
    });
