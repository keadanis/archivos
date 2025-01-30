var Application = Application || {};

Application.Services = angular.module('application.services', ['ngResource', 'framework.services']);
Application.Controllers = angular.module('application.controllers', ['framework.controllers']);
Application.Filters = angular.module('application.filters', ['framework.filters']);
Application.Directives = angular.module('application.directives', ['framework.directives']);

angular.module("School", ['ngRoute', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.controllers'])
    .config(function ($routeProvider) {
		//Escuelas
        $routeProvider.
            when('/escuelas/list', {
                controller: 'SchoolListCtrl',
                templateUrl: 'School/views/list.School.html',
                resolve: {
                    ApiResource: 'SchoolResource',
                    ApiKey: 'SchoolKey',
                    ApiFilters: 'SchoolFilters',
                    ApiParameters: 'SchoolParams',
                    Events: 'EventsList'
                }
            }).
            when('/escuelas/list/:nameSchool?/:codmep?/:dirRegional?/:circuito?/:province?/:canton?/:distric?/:matriculaAct?/:poblado?/:donante?/:vendedor?', {
                controller: 'SchoolListCtrl',
                templateUrl: 'School/views/list.School.html',
                resolve: {
                    ApiResource: 'SchoolResource',
                    ApiKey: 'SchoolKey',
                    ApiFilters: 'SchoolFilters',
                    ApiParameters: 'SchoolParams',
                    Events: 'EventsList'
                }
            }).
            when('/escuelas/list/:nameSchool?/:codmep?/:dirRegional?/:circuito?/:province?/:canton?/:distric?/:matriculaAct?/:poblado?/:donante?/:vendedor?/:query?/:sort_by/:sort_desc/:pag_size/:pag_number', {
                controller: 'SchoolListCtrl',
                templateUrl: 'School/views/list.School.html',
                resolve: {
                    ApiResource: 'SchoolResource',
                    ApiKey: 'SchoolKey',
                    ApiFilters: 'SchoolFilters',
                    ApiParameters: 'SchoolParams',
                    Events: 'EventsList'
                }
            }).
            when('/escuelas/new', {
                controller: 'CreateCtrl',
                templateUrl: 'School/views/details.School.html',
                resolve: {
                    ApiResource: 'SchoolResource',
                    ApiKey: 'SchoolKey',
                    ApiFilters: 'SchoolFilters',
                    ApiParameters: 'SchoolParams',
                    Events: 'EventsCreateDetail'
                }
            }).
            when('/escuelas/edit/:idschool', {
                controller: 'SchoolEditCtrl',
                templateUrl: 'School/views/details.School.html',
                resolve: {
                    ApiResource: 'SchoolResource',
                    ApiKey: 'SchoolKey',
                    ApiFilters: 'SchoolFilters',
                    ApiParameters: 'SchoolParams',
                    Events: 'EventsEditDetail'
                }
            }).
            otherwise({ redirectTo: '/escuelas/list' });
    });
