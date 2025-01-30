Application.Controllers
.controller('EntregasListCtrl', ['$injector', '$scope', '$routeParams','$timeout','$window','$location', 'EntregasResource', 'EntregasKey', 'EntregasFilters', 'EntregasParams', 'EventsList',
                             function ($injector, $scope, $routeParams,$timeout,$window,$location, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
                                 $injector.invoke(function ($controller) { $controller('ListCtrl', { $injector: $injector, $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });

     	$scope.listaEntregas = [];
     	$scope.button = {};
     	$scope.button2 = {};
     	$scope.button.status = "PEN";
     	$scope.button.label = "Aceptar";
     	$scope.button.visble = false; 
     	$scope.button2.label = "";
     	$scope.button2.visble = false; 
     	$scope.listaUsuarios = {};
     	$scope.listaVehiculos = {};
     	
     	ApiParameters.loadUser(function(){
     		$scope.listaUsuarios = ApiParameters.getUser();
     	});
     	
     	ApiParameters.loadVehiculo(function(){
     		$scope.listaVehiculos = ApiParameters.getVehiculo();
     	});
     	                       
        $scope.changeMarkCheck = function(item){
        	if(item.checkMark == 'Y')
        		$scope.listaEntregas.push(item);
        	else
        		$scope.listaEntregas.removeItem(item)
        		
        	$scope.changeButton();
    	};
    	
    	$scope.changeButton = function()
    	{
    		$scope.button.visble = false; 
    		var firstEstado = $scope.listaEntregas.length > 0 ? $scope.listaEntregas[0].estado : "";
        	angular.forEach($scope.listaEntregas, function (value, key) {
                $timeout(function () {
                	if(firstEstado != value.estado)
                	{
                		$scope.button.visble = false;
                		$scope.button.status = "ND";
                	}
                	else
                	{
                		$scope.button2.visble = true;
                		
                		switch(firstEstado) {
                	    case 'PEN':
                	    	$scope.button.status='PER';
                	    	$scope.button.label = "Por Asignar";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'PER':
                	    	$scope.button.status='PAL';
                	    	$scope.button.label = "Rutas Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'PAL':
                	    	$scope.button.status='PDE';
                	    	$scope.button.label = "Bodega Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'PDE':
                	    	$scope.button.status='PLQ';
                	    	$scope.button.label = "Despacho Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'PLQ':
                	    	$scope.button.status='LQ';
                	    	$scope.button.label = "Liquidacion Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'PDE':
                	    	$scope.button.status='LQ';
                	    	$scope.button.label = "Liquidacion Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    case 'LQ':
                	    	$scope.button.status='CON';
                	    	$scope.button.label = "Confirmacion Listo";
                	    	$scope.button.visble = true;
                	        break;
                	    default:
                	    	$scope.button.status='ND';
            	    		$scope.button.label = "";
            	    		$scope.button.visble = false;
                		}
                	}
                }, 100);
        	});
    	};
    	
    	$scope.sendAction = function()
    	{
    		var lista = "";
    		angular.forEach($scope.listaEntregas, function (value, key) {
    			lista+=value.id +"-";
    		});

    		ApiParameters.setListaEntregas(function(){
    			$location.path('/Entregas');
    		},lista,$scope.button.status);
    	};
    	
    	$scope.getlistIds=function(){
    		var lista = "";
    		angular.forEach($scope.listaEntregas, function (value, key) {
    			lista+=value.id +"-";
    		});
    		return lista;
    	};
    	
}
])
.controller('EntregasCreateCtrl', ['$injector', '$scope', 'EntregasResource', 'EntregasKey', 'EntregasFilters', 'EntregasParams', 'EventsCreateDetail',
                               function ($injector, $scope, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
	$scope.itemEdit = { 'id' : '',
			'description' : '' };
	$injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
}
])
.controller('EntregasEditCtrl', ['$injector', '$scope', '$routeParams', '$timeout', '$window','$location', 'EntregasResource', 'EntregasKey', 'EntregasFilters', 'EntregasParams', 'EventsEditDetail',
                             function ($injector, $scope, $routeParams,$timeout, $window,$location, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
	$injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams,$window, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
	
	var listOrders = $location.search().s;
	$scope.isBulkUpdate = !angular.isUndefined(listOrders);
	$scope.isReady = !$scope.isBulkUpdate;

	
	$timeout(function () {
		$scope.itemEntregasEdit.listIDs = listOrders;
		$scope.isReady = true;
	},2000)
	
	
	
    $scope.changeTipoRuta = function () {
		
		$scope.itemEntregasEdit.ruta1 ="";
    	
    	if(!$scope.isBulkUpdate && ($scope.itemEntregasEdit.tipoRuta == 'S' || $scope.itemEntregasEdit.tipoRuta == 'R' || $scope.itemEntregasEdit.tipoRuta == 'C'))
    	{
        	ApiParameters.loadSchools(function(){                
            	angular.forEach(ApiParameters.getSchools(), function (value, key) {
                    $timeout(function () {
                    	if(value.codMep == $scope.itemEntregasEdit.codMep)
                    	{
                    		$scope.school = value;
                    		
                        	if($scope.itemEntregasEdit.tipoRuta == 'S')
                        	{
                        		$scope.itemEntregasEdit.ruta = "Escuela";
                        		$scope.itemEntregasEdit.direccionExacta = $scope.school.province + " " + $scope.school.canton + " " + $scope.school.distric + " " + $scope.school.address;
                        	}
                        	else if($scope.itemEntregasEdit.tipoRuta == 'R' || $scope.itemEntregasEdit.tipoRuta == 'C' )
                        	{
                            	ApiParameters.loadRutas(function(){                
                                	angular.forEach(ApiParameters.getRutas(), function (valueR, keyR) {
                                        $timeout(function () {
                                        	if($scope.itemEntregasEdit.tipoRuta == 'R')
                                        	{                                        		
                                        		if(valueR.regional.trim() == $scope.school.dirRegional.trim() && valueR.tipo.trim() == 'regional')
                                        		{
                                        			//$scope.itemEntregasEdit.ruta = valueR.regional + " C" + valueR.circuito + " D" + valueR.destino;
                                        			$scope.itemEntregasEdit.ruta = valueR.regional; 
                                        			$scope.itemEntregasEdit.ruta1 = " C" + valueR.circuito + " D" + valueR.destino;
                                            		$scope.itemEntregasEdit.direccionExacta = valueR.direccion;
                                        		}
                                        			
                                        	}else if($scope.itemEntregasEdit.tipoRuta == 'C')
                                        	{
                                        		if(valueR.circuito== $scope.school.circuito
                                        				&& valueR.regional.trim() == $scope.school.dirRegional.trim()
                                        				&& valueR.tipo.trim() == 'circuito')
                                        		{
                                        			//$scope.itemEntregasEdit.ruta = valueR.regional + " C" + valueR.circuito + " D" + valueR.destino;
                                        			$scope.itemEntregasEdit.ruta = valueR.regional;
                                        			$scope.itemEntregasEdit.ruta1 = " C" + valueR.circuito + " D" + valueR.destino;
                                            		$scope.itemEntregasEdit.direccionExacta = valueR.direccion;
                                        		}
                                        	}
                                        }, 100);
                                	});
                            	});
                        	}
                    	}
                    }, 100);
            	});
        	});
	
    	}/*else if($scope.itemEntregasEdit.tipoRuta == 'E')
    	{
    		//Cargar direccion exacta de empresa
    	}*/
    	else if(!$scope.isBulkUpdate)
    	{
    		switch($scope.itemEntregasEdit.tipoRuta) 
    		{
    	    case "L":
    	    	$scope.itemEntregasEdit.ruta = "LPT"
    	    	$scope.itemEntregasEdit.direccionExacta = "LPT";
    	        break;
    	    case "E":
    	    	$scope.itemEntregasEdit.ruta = "Empresa"
    	    	$scope.itemEntregasEdit.direccionExacta = "Empresa";
    	        break;
    	    case "B":
    	    	$scope.itemEntregasEdit.ruta = "Bodega"
    	    	$scope.itemEntregasEdit.direccionExacta = "Bodega"	
    	        break;
    	    case "D":
    	    	$scope.itemEntregasEdit.ruta = "Despacho nocturno"
    	    	$scope.itemEntregasEdit.direccionExacta = "Despacho nocturno"		
    	        break;
    	    case "M":
    	    	$scope.itemEntregasEdit.ruta = "Encomienda"
    	    	$scope.itemEntregasEdit.direccionExacta = "Encomienda"
    	        break;
    	    case "O":
    	    	$scope.itemEntregasEdit.ruta = "Otro"
    	    	$scope.itemEntregasEdit.direccionExacta = "Otro"
    	        break;
    		}
    	}
    };
}
])
.controller('EntregasCalendarCtrl', function ($scope,$compile,uiCalendarConfig, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
	
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    var parms = {};
    parms.filters = [];
    parms.q = "";
    parms.sort = "id";
    parms.desc = true;
    parms.size = 0;
    parms.number = 0;
    $scope.items = [];
    $scope.eventSources = [];
    $scope.events = [];

    $scope.getAllEvents = function(){
    	  ApiResource.query(
    	    		parms,
    	            function (items) {
    	                $scope.items = $scope.items.concat(items);
    	                angular.forEach($scope.items, function(value, key) {
    	                	
    	                	var colorStatus = "#454545";
    	                	switch(value.estado) {
    	                    case "PEN":
    	                    	colorStatus = "#ff0000"; //Rojo
    	                        break;
    	                    case "PER":
    	                    	colorStatus = "#ffbf00"; // Amarillo
    	                        break;
    	                    case "PAL":
    	                    	colorStatus = "#0080ff"; //Azul
    	                        break;
    	                    case "PLQ":
    	                    	colorStatus = "#ff00ff"; //Fucsia
    	                        break;
    	                    case "LQ":
    	                    case "LQP":
    	                    	colorStatus = "#00ff80"; // Turquesa
    	                        break;
    	                    case "CON":
    	                    	colorStatus = "#40ff00"; // Verde
    	                        break;
    	                };
    	                	
    	                var dat = new Date(value.fechaEntrega);
    	                dat.setDate(dat.getDate() + 1);
    	                
    	                	var newEvent = {color: colorStatus,title: value.codMep +" "+ value.nombreEscuela + " "  + value.cantLibros, start: new Date(dat),stick : true};
    	                	$scope.events.push(newEvent);
    	                });
    	            },
    	            function (response) {
    	            	console.log(response);
    	            });
    };
    
    $scope.getAllEvents();

    /* event source that contains custom events on the scope */
   /* $scope.events = [
      {color: '#f01',textColor: 'yellow',title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];*/

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
    	$scope.getAllEvents();
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        dayNames : ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ],
        dayNamesShort : ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        monthNames : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
        monthNamesShort : ["Ene", "Feb", "Mar", "Ab", "May", "Jun", "Jul","Agt","Sep","Oct","Nov","Dic"]
      }
    };
    
    /* event sources array*/
    $scope.eventSources = [$scope.events];
    

}
);

