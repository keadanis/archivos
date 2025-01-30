angular.module('framework.directives', [])
    //.directive('ngControllerResolve', ['$controller', '$injector', function ($controller, $injector) {
    //    return {
    //        scope: true,
    //        link: function (scope, elem, attrs) {
    //            var dependencies = attrs.dependencies.split(',');
    //            var locals = {};
    //            for (var i = 0; i < dependencies.length; i++) {
    //                var resolve = scope.$eval(dependencies[i]);
    //                angular.extend(locals, resolve);
    //            };
    //            console.log(locals);
    //            //$controller(attrs.ngControllerResolve, resolve);
    //            $injector.invoke(function ($controller) { $controller(attrs.ngControllerResolve, locals); });
    //            this.$inject = ['$injector', '$scope', '$routeParams', 'LineaFacturaKey', 'LineaFacturaParams'];

//        }
//    };
//}])

.directive('confirmDelete', function () {
    return {
        restrict: 'A',
        scope: {
            delete: "&confirmDelete"
        },
        link: function (scope, element, attrs) {
            element.bind('click', function (event) {
                Question(
                    "Atención",
                    "Si elimina el registro, este no se podrá recuperar. Desea proseguir?",
                    scope.delete
                );
            });
        }
    }
})
    .directive('sortByFunc', function () {
        return {
            restrict: 'A',
            scope: true,
            transclude: true,
            template: '<a ng-click="exec_short()"><span ng-transclude></span> ' +
                '<i ng-if="isSorted()" class="glyphicon glyphicon-{{getDirection()}}"></i></a>',
            controller: function ($scope, $element, $attrs) {
                $scope.exec_short = function () {
                    $scope.do_sort($attrs.sortByFunc);
                };
                $scope.isSorted = function () {
                    return ($scope.sort_by === $attrs.sortByFunc);
                };
                $scope.getDirection = function () {
                    return ($scope.sort_desc ? 'circle-arrow-down' : 'circle-arrow-up');
                };
            }
        };
    })
    .directive('sortBy', function () {
        return {
            restrict: 'A',
            scope: true,
            transclude: true,
            template: '<a href="#{{getPath()}}"><span ng-transclude></span> ' +
                '<i ng-show="isSorted()" class="glyphicon glyphicon-{{getDirection()}}"></i></a>',
            link: function (scope, element, attrs) {
                scope.getPath = function () {
                    var path = "/" + scope.parameters.routeBase + "/list";
                    angular.forEach(scope.list_parms, function (value) {
                        path += "/" + value;
                    });
                    if (angular.isDefined(attrs.query)) {
                        path += "/" + attrs.query;
                    } else {
                        path += "/" + scope.query;
                    }
                    if (angular.isDefined(attrs.sortBy)) {
                        path += "/" + attrs.sortBy;
                    } else {
                        path += "/" + scope.sort_by;
                    }
                    if (angular.isDefined(attrs.sortDesc)) {
                        path += "/" + attrs.sortDesc;
                    } else {
                        path += "/" + (scope.isSorted() ? !scope.sort_desc : scope.sort_desc);
                    }
                    if (angular.isDefined(attrs.pagSize)) {
                        path += "/" + attrs.pagSize;
                    } else {
                        path += "/" + scope.pag_size;
                    }
                    path += "/1";
                    return path;
                };
                scope.isSorted = function () {
                    return (scope.sort_by === attrs.sortBy);
                };
                scope.getDirection = function () {
                    return (scope.sort_desc ? 'circle-arrow-down' : 'circle-arrow-up');
                };
            }
        }
    })
    .directive('linkTo', function () {
        return {
            restrict: 'E',
            scope: true,
            transclude: true,
            replace: true,
            template: '<a href="#{{getPath()}}" ng-transclude></a>',
            link: function (scope, element, attrs) {
                scope.getPath = function () {
                    var path = "/" + scope.parameters.routeBase + "/list";
                    angular.forEach(scope.list_parms, function (value) {
                        path += "/" + value;
                    });
                    if (angular.isDefined(attrs.query)) {
                        path += "/" + attrs.query;
                    } else {
                        path += "/" + scope.query;
                    }
                    if (angular.isDefined(attrs.sortBy)) {
                        path += "/" + attrs.sortBy;
                    } else {
                        path += "/" + scope.sort_by;
                    }
                    if (angular.isDefined(attrs.sortDesc)) {
                        path += "/" + attrs.sortDesc;
                    } else {
                        path += "/" + scope.sort_desc;
                    }
                    if (angular.isDefined(attrs.pagSize)) {
                        path += "/" + attrs.pagSize;
                    } else {
                        path += "/" + scope.pag_size;
                    }
                    if (angular.isDefined(attrs.pagNumber)) {
                        path += "/" + attrs.pagNumber;
                    } else {
                        path += "/" + scope.pag_number;
                    }
                    return path;
                };
            }
        }
    })
    .directive('keyEscape', function () {
        var ESCAPE_KEY = 27;
        return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                var action = elem.parent().find("[data-toggle='escape']");
                if (action.length) {
                    action.trigger('click');
                }
            });
        };
    })
    .directive('keyEnter', function () {
        var ENTER_KEY = 13;
        return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                if (event.keyCode === ENTER_KEY) {
                    var action = elem.parent().find("[data-toggle='enter']");
                    if (action.length) {
                        action.trigger('click');
                    }
                }
            });
        };
    })
    .directive('inputTypeahead', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                isDisabled: "&ngDisabled",
                inputFrontModel: "=ngModel",
                inputTypeahead: "=",
                inputTypeaheadData: "="
            },
            link: function (scope, element, attrs) {
                var getter = $parse(attrs.ngModel);
                var setter = getter.assign;
                var txt = attrs.inputTypeaheadText;
                var val = attrs.inputTypeaheadValue;
                var elementos = [];
                scope.$watch("inputTypeaheadData", function (value) {
                    var data = value || [];
                    if (data.length > 0) {
                        scope.$watch("inputTypeahead", function (newValue, oldValue) {
                            if (angular.isUndefined(scope.inputFrontModel)) {
                                var elemento = data.search(val, newValue)
                                if (elemento) {
                                    scope.inputFrontModel = elemento[txt];
                                    setter(scope, scope.inputFrontModel);
                                }
                            }
                        });
                        $.each(data, function (i, e) {
                            elementos.push({
                                value: e[txt],
                                id: e[val]
                            });
                        });
                        element.typeahead('destroy').typeahead({
                            local: elementos
                        }).bind('typeahead:selected', function (obj, datum) {
                            scope.$apply(function () {
                                scope.inputFrontModel = datum.value;
                                scope.inputTypeahead = datum.id;
                            });
                        });
                    }
                });
            }
        }
    }])
    .directive('inputDatepicker', function ($timeout) {

        var isAppleTouch = /(iP(a|o)d|iPhone)/g.test(navigator.userAgent);

        var regexpMap = function regexpMapFn(language) {
            language = language || 'en';
            return {
                '/': '[\\/]',
                '-': '[-]',
                '.': '[.]',
                ' ': '[\\s]',
                'dd': '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
                'd': '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
                'mm': '(?:[0]?[1-9]|[1][012])',
                'm': '(?:[0]?[1-9]|[1][012])',
                'DD': '(?:' + $.fn.datepicker.dates[language].days.join('|') + ')',
                'D': '(?:' + $.fn.datepicker.dates[language].daysShort.join('|') + ')',
                'MM': '(?:' + $.fn.datepicker.dates[language].months.join('|') + ')',
                'M': '(?:' + $.fn.datepicker.dates[language].monthsShort.join('|') + ')',
                'yyyy': '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
                'yy': '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
            };
        };

        var regexpForDateFormat = function regexpForDateFormatFn(format, language) {
            var re = format,
                map = regexpMap(language),
                i;
            // Abstract replaces to avoid collisions
            i = 0;
            angular.forEach(map, function (v, k) {
                re = re.split(k).join('${' + i + '}');
                i++;
            });
            // Replace abstracted values
            i = 0;
            angular.forEach(map, function (v, k) {
                re = re.split('${' + i + '}').join(v);
                i++;
            });
            return new RegExp('^' + re + '$', ['i']);
        };

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, controller) {

  
                var options = angular.extend({
                    autoclose: true
                }, {}),
                    type = attrs.dateType || options.type || 'date';

                // $.fn.datepicker options
                angular.forEach(['format', 'weekStart', 'calendarWeeks', 'startDate', 'endDate', 'daysOfWeekDisabled', 'autoclose', 'startView', 'minViewMode', 'todayBtn', 'todayHighlight', 'keyboardNavigation', 'language', 'forceParse'], function (key) {
                    if (angular.isDefined(attrs[key])) options[key] = attrs[key];
                });

                var language = options.language || 'en',
                    readFormat = attrs.dateFormat || options.format || ($.fn.datepicker.dates[language] && $.fn.datepicker.dates[language].format) || 'mm/dd/yyyy',
                    format = isAppleTouch ? 'yyyy-mm-dd' : readFormat,
                    dateFormatRegexp = regexpForDateFormat(format, language),
                    ISODateRegexp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

                // Handle date validity according to dateFormat
                if (controller) {

                    // modelValue -> $formatters -> viewValue
                    controller.$formatters.unshift(function (modelValue) {
                        if (modelValue && modelValue.indexOf("T")) {
                            modelValue = modelValue.split("T")[0];
                        }
                        if (modelValue && type === 'iso' && ISODateRegexp.test(modelValue)) {
                            return $.fn.datepicker.DPGlobal.parseDate(new Date(modelValue), $.fn.datepicker.DPGlobal.parseFormat(readFormat), language);
                        } else if (modelValue && type === 'date' && angular.isString(modelValue)) {
                            console.log($.fn.datepicker.DPGlobal.parseDate(modelValue, $.fn.datepicker.DPGlobal.parseFormat(readFormat), language));
                            return $.fn.datepicker.DPGlobal.parseDate(modelValue, $.fn.datepicker.DPGlobal.parseFormat(readFormat), language);
                        } else {
                            return modelValue;
                        }
                    });

                    // viewValue -> $parsers -> modelValue
                    controller.$parsers.unshift(function (viewValue) {
                        if (!viewValue) {
                            controller.$setValidity('date', true);
                            return null;
                        } else if ((type === 'date' || type === 'iso') && angular.isDate(viewValue)) {
                            controller.$setValidity('date', true);
                            return viewValue;
                        } else if (angular.isString(viewValue) && dateFormatRegexp.test(viewValue)) {
                            controller.$setValidity('date', true);
                            if (isAppleTouch) return new Date(viewValue);
                            return type === 'string' ? viewValue : $.fn.datepicker.DPGlobal.parseDate(viewValue, $.fn.datepicker.DPGlobal.parseFormat(format), language);
                        } else {
                            controller.$setValidity('date', false);
                            return undefined;
                        }
                    });

                    // ngModel rendering
                    controller.$render = function ngModelRender() {
                        if (isAppleTouch) {
                            var date = controller.$viewValue ? $.fn.datepicker.DPGlobal.formatDate(controller.$viewValue, $.fn.datepicker.DPGlobal.parseFormat(format), language) : '';
                            element.val(date);
                            return date;
                        }
                        if (!controller.$viewValue) element.val('');
                        return element.datepicker('update', controller.$viewValue);
                    };

                }

                // Use native interface for touch devices
                if (isAppleTouch) {

                    element.prop('type', 'date').css('-webkit-appearance', 'textfield');

                } else {

                    // If we have a ngModelController then wire it up
                    if (controller) {
                        element.on('changeDate', function (ev) {
                            scope.$apply(function () {
                                controller.$setViewValue(type === 'string' ? element.val() : ev.date);
                            });
                        });
                    }

                    // Create datepicker
                    // element.attr('data-toggle', 'datepicker');
                    element.datepicker(angular.extend(options, {
                        format: format,
                        language: language
                    }));

                    // Garbage collection
                    scope.$on('$destroy', function () {
                        var datepicker = element.data('datepicker');
                        if (datepicker) {
                            datepicker.picker.remove();
                            element.data('datepicker', null);
                        }
                    });

                    // Update start-date when changed
                    attrs.$observe('startDate', function (value) {
                        element.datepicker('setStartDate', value);
                    });

                    // Update end-date when changed
                    attrs.$observe('endDate', function (value) {
                        element.datepicker('setEndDate', value);
                    });
                }
                // Support add-on
                var component = element.parent().find("[data-toggle='datepicker']");
                if (component.length) {
                    component.on('click', function () {
                        if (!element.prop('disabled')) { // Hack check for IE 8
                            element.trigger('focus');
                        }
                    });
                }
            }
        };
    })
    .directive('inputMaskReference', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: "=",
                inputMask: "=inputMaskReference"
            },
            link: function (scope, element, attrs, controller) {
                var getter = $parse(attrs.ngModel);
                var setter = getter.assign;
                scope.$watch("ngModel", function (value) {
                    element.val(value);
                });
                scope.$watch("inputMask", function (newValue, oldValue) {
                    if (angular.isDefined(newValue) && newValue != oldValue) {
                        element.mask(newValue, {
                            completed: function () {
                                var value = this.val();
                                setter(scope, value);
                                scope.$apply(function () {
                                    scope.ngModel = value;
                                });
                            }
                        }).focus();
                    }
                });
            }
        };
    })
    .directive('inputMask', function () {
        return {
            require: '?ngModel',
            link: function ($scope, element, attrs, controller) {
                $scope.$watch("inputMask", function (value) {
                    element.mask(attrs.inputMask, {
                        completed: function () {
                            controller.$setViewValue(this.val());
                            $scope.$apply();
                        }
                    });
                });
            }
        };
    })
    .directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
        function ($filter, $document, $compile, $parse) {

            return {
                restrict: 'AE',
                transclude: true,
                scope: {
                    selectedModel: '=',
                    options: '=',
                    isLoading: '=',
                    extraSettings: '=',
                    events: '=',
                    searchFilter: '=?',
                    translationTexts: '=',
                    groupBy: '@'
                },
                template: function (element, attrs) {
                    var checkboxes = attrs.checkboxes ? true : false;
                    var groups = attrs.groupBy ? true : false;

                    var template = '';

                    template += '<div class="multiselect-parent btn-group dropdown-multiselect">';
                    template += '<button ng-disabled="settings.disabledIfIsEmpty && !options.length > 0" type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                    template += '<ul ng-show="open" class="dropdown-menu dropdown-menu-form" ng-style="{display: \'block\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
                    template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                    template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                    template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                    template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                    template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                    if (groups) {
                        template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header-custom">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                        template += '<li ng-repeat-end role="presentation">';
                    } else {
                        template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                    }

                    template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                    if (checkboxes) {
                        template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                    } else {
                        template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                    }

                    template += '</li>';

                    template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                    template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';
                    template += '</ul>';
                    template += '<span>&nbsp;<span ng-transclude></span></span>';
                    template += '</div>';

                    element.html(template);
                },
                link: function ($scope, $element, $attrs) {
                    var $dropdownTrigger = $element.children()[0];

                    $scope.toggleDropdown = function () {
                        $scope.open = !$scope.open;
                    };

                    $scope.checkboxClick = function ($event, id) {
                        $scope.setSelectedItem(id);
                        $event.stopImmediatePropagation();
                    };

                    $scope.externalEvents = {
                        onItemSelect: angular.noop,
                        onItemDeselect: angular.noop,
                        onSelectAll: angular.noop,
                        onDeselectAll: angular.noop,
                        onInitDone: angular.noop,
                        onMaxSelectionReached: angular.noop
                    };

                    $scope.settings = {
                        dynamicTitle: true,
                        scrollable: false,
                        scrollableHeight: '300px',
                        closeOnBlur: true,
                        displayProp: 'label',
                        idProp: 'id',
                        externalIdProp: 'id',
                        specificProps: '',
                        enableSearch: false,
                        disabledIfIsEmpty:true,
                        selectionLimit: 0,
                        showCheckAll: true,
                        showUncheckAll: true,
                        closeOnSelect: false,
                        buttonClasses: 'btn btn-default',
                        closeOnDeselect: false,
                        groupBy: $attrs.groupBy || undefined,
                        groupByTextProvider: null,
                        smartButtonMaxItems: 0,
                        smartButtonTextConverter: angular.noop
                    };

                    $scope.texts = {
                        checkAll: 'Marcar todos',
                        uncheckAll: 'Desmarcar todos',
                        selectionCount: 'Seleccionado(s)',
                        selectionOf: '/',
                        searchPlaceholder: 'Buscar...',
                        buttonDefaultText: 'Seleccionar',
                        dynamicButtonTextSuffix: 'Seleccionado(s)'
                    };

                    $scope.searchFilter = $scope.searchFilter || '';

                    if (angular.isDefined($scope.settings.groupBy)) {
                        $scope.$watch('options', function (newValue) {
                            if (angular.isDefined(newValue)) {
                                $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                            }
                        });
                    }

                    angular.extend($scope.settings, $scope.extraSettings || []);
                    angular.extend($scope.externalEvents, $scope.events || []);
                    angular.extend($scope.texts, $scope.translationTexts);

                    $scope.singleSelection = $scope.settings.selectionLimit === 1;

                    function getFindObj(id) {
                        var findObj = {};

                        if ($scope.settings.externalIdProp === '') {
                            findObj[$scope.settings.idProp] = id;
                        } else {
                            findObj[$scope.settings.externalIdProp] = id;
                        }

                        return findObj;
                    }

                    function clearObject(object) {
                        for (var prop in object) {
                            delete object[prop];
                        }
                    }

                    if ($scope.singleSelection) {
                        if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                            clearObject($scope.selectedModel);
                        }
                    }

                    if ($scope.settings.closeOnBlur) {
                        $document.on('click', function (e) {
                            var target = e.target.parentElement;
                            var parentFound = false;

                            while (angular.isDefined(target) && target !== null && !parentFound) {
                                if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                    if (target === $dropdownTrigger) {
                                        parentFound = true;
                                    }
                                }
                                target = target.parentElement;
                            }
                            
                            if (!parentFound) {
                                if (!$scope.$$phase) {
                                    //$digest or $apply
                                    $scope.$apply(function () {
                                        $scope.open = false;
                                    });
                                }
                            }
                            
                        });
                    }

                    $scope.getGroupTitle = function (groupValue) {
                        if ($scope.settings.groupByTextProvider !== null) {
                            return $scope.settings.groupByTextProvider(groupValue);
                        }

                        return groupValue;
                    };

                    $scope.getButtonText = function () {
                        if (!angular.isUndefined($scope.selectedModel) && $scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                            if ($scope.settings.smartButtonMaxItems > 0) {

                                var itemsText = [];

                                angular.forEach($scope.options, function (optionItem) {
                                    if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                        var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                        var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                        itemsText.push(converterResponse ? converterResponse : displayText);
                                    }
                                });

                                if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                    itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                    itemsText.push('...');
                                }

                                return itemsText.join(', ');
                            } else {
                                var totalSelected;

                                if ($scope.singleSelection) {
                                    totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                                } else {
                                    totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                                }

                                if (totalSelected === 0) {
                                    return $scope.texts.buttonDefaultText;
                                } else {
                                    return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                                }
                            }
                        } else {
                            return $scope.texts.buttonDefaultText;
                        }
                    };

                    $scope.getPropertyForObject = function (object, property) {
                        if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                            return object[property];
                        }

                        return '';
                    };

                    $scope.selectAll = function () {
                        $scope.deselectAll(false);
                        $scope.externalEvents.onSelectAll();

                        angular.forEach($scope.options, function (value) {
                            $scope.setSelectedItem(value[$scope.settings.idProp], true);
                        });
                    };

                    $scope.deselectAll = function (sendEvent) {
                        sendEvent = sendEvent || true;

                        if (sendEvent) {
                            $scope.externalEvents.onDeselectAll();
                        }

                        if ($scope.singleSelection) {
                            clearObject($scope.selectedModel);
                        } else {
                            $scope.selectedModel.splice(0, $scope.selectedModel.length);
                        }
                    };

                    $scope.setSelectedItem = function (id, dontRemove) {
                        var findObj = getFindObj(id);
                        var finalObj = null;

                        if ($scope.settings.externalIdProp === '') {
                            finalObj = _.find($scope.options, findObj);
                            if ($scope.settings.specificProps.length > 0)
                            {
                                angular.forEach(finalObj, function (finalValue, finalKey) {
                                    var isIn = false;
                                    angular.forEach($scope.settings.specificProps, function (specificValue, specificKey) {
                                        if (specificValue === finalKey)
                                            isIn = true;
                                    });
                                    if(!isIn)
                                        delete finalObj[finalKey];
                                });
                            }
                        } else {
                            finalObj = findObj;
                        }

                        if ($scope.singleSelection) {
                            clearObject($scope.selectedModel);
                            angular.extend($scope.selectedModel, finalObj);
                            $scope.externalEvents.onItemSelect(finalObj);
                            if ($scope.settings.closeOnSelect) $scope.open = false;

                            return;
                        }

                        dontRemove = dontRemove || false;

                        var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                        if (!dontRemove && exists) {
                            $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                            $scope.externalEvents.onItemDeselect(findObj);
                        } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                            $scope.selectedModel.push(finalObj);
                            $scope.externalEvents.onItemSelect(finalObj);
                        }
                        if ($scope.settings.closeOnSelect) $scope.open = false;

                    };

                    $scope.isChecked = function (id) {
                        if ($scope.singleSelection) {
                            return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                        }

                        return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                    };

                    $scope.externalEvents.onInitDone();
                }
            };
        }
    ])

    .directive('ngMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMin, function () {
                    if (ctrl.$isDirty) ctrl.$setViewValue(ctrl.$viewValue);
                });
                var minValidator = function (value) {
                    var min = scope.$eval(attr.ngMin) || 0;
                    if (!isEmpty(value) && value < min) {
                        ctrl.$setValidity('ngMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMin', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    })

    .directive('ngMax', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMax, function () {
                    if (ctrl.$isDirty) ctrl.$setViewValue(ctrl.$viewValue);
                });
                var maxValidator = function (value) {
                    var max = scope.$eval(attr.ngMax) || Infinity;
                    //console.log(value);
                    //console.log(max);
                    if (!isEmpty(value) && value > max) {
                        ctrl.$setValidity('ngMax', false);
                        return value;
                    } else {
                        ctrl.$setValidity('ngMax', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    });

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
};