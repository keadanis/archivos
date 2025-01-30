Application.Controllers   
	.controller('SchoolListCtrl', ['$injector', '$scope', '$rootScope','$routeParams','$timeout' , 'SchoolResource', 'SchoolKey', 'SchoolFilters', 'SchoolParams', 'EventsList','PreOrderParams',
         function ($injector, $scope,$rootScope, $routeParams, $timeout,ApiResource, ApiKey, ApiFilters, ApiParameters, Events,PreOrderParams) {
         $injector.invoke(function ($controller) { $controller('ListCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });

	         //Attrs
         	 var countPreload = 0;
	         $scope.hasCheckedSendProforma = false;
	         $scope.itemToPreOrder = {"listPreOrderDetail" : []};
	         
	         
	         //Custom
	         $scope.removeSchool = function(item){
	             $scope.$apply(function () {
	                 $scope.itemCustomerEdit.schoolList.removeItem(item);
	             });
	         };
	         
            $scope.addDetail = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
                $scope.itemToPreOrder.listPreOrderDetail.push(newItem);
                
                var sumSubTotal = 0;
                angular.forEach($scope.itemToPreOrder.listPreOrderDetail, function (value, key) {
                    sumSubTotal += value.totalAmount;
                });

                //$scope.itemToPreOrder.nameCustomerT = 'CLIENTE CONTADO';
                //$scope.itemToPreOrder.idCustomer = 187;
                $scope.itemToPreOrder.subTotal = sumSubTotal;
                $scope.itemToPreOrder.total = sumSubTotal;
                $scope.itemToPreOrder.discount = 0;
                $scope.itemToPreOrder.status = 'ING';
                $scope.itemToPreOrder.type = 'D';
                $scope.itemToPreOrder.date = new Date();

                if($scope.itemToPreOrder.listPreOrderDetail.length == countPreload)
                {
                	window.localStorage['itemToPreOrder'] = angular.toJson($scope.itemToPreOrder);
    				location.href ='/'+$rootScope.context+'/Content/app/modules/PreOrder.html#/proformas/new';
                }
            };
	         
            //Set all projections
            $scope.sendProforma = function(){
            	countPreloadToOrder = 0;
            	Events.onLoad();
            	
                if(PreOrderParams.getProducts().length > 0){
	            	angular.forEach($scope.items, function (value, key) {
	                    $timeout(function () {
		   	          		 if (value.sendPreorder == "Y")
		   	          		 {
			   	          		$scope.setProjectionBySchool(value.displayName,value.idSchool);       		
		   	          		 }
	                    }, 100);
	            	});
                }
                else
                {
                	PreOrderParams.loadProducts(function(){                
		            	angular.forEach($scope.items, function (value, key) {
		                    $timeout(function () {
			   	          		 if (value.sendPreorder == "Y")
			   	          		 {
				   	          		$scope.setProjectionBySchool(value.displayName,value.idSchool);
			   	          		 }
		                    }, 100);
		            	});
                	});
                }
            };
            
            //Set projection by school
            $scope.setProjectionBySchool = function(pDisplayName,pIdSchool){
            	PreOrderParams.loadProjection(
                        function () {
                     	   var projectionSchool = PreOrderParams.getProjection();
                    	   var i = 0;
                    	   if(!angular.isUndefined(projectionSchool)) {
                    		   var newSchoolPreload = 
                    		   {
                    			   totalAmount : 0,
                				   description: pDisplayName,
                				   school: {idSchool : pIdSchool},
                				   preOrderProductDetails : [],
                				   cantProducts : 0,
                				   schoolInPre: false
                    		   };
                    		   
                    		   
                        	   //Parse details
                        	   angular.forEach(projectionSchool.details, function (pvalue, pkey) {
                        		   var detObje = angular.fromJson(pvalue);
                        		   projectionSchool.details[i] = detObje;
                        		   angular.forEach(PreOrderParams.getProducts(), function (prvalue, prkey) {
                        			   if(prvalue.gradePack && prvalue.grade == detObje.grade){
                        				   pvalue = angular.fromJson(pvalue);
   
                        				   //Create new detail
                        				   
                        				   //SET ONE BY DEFAULT
                        				   /*var qty = pvalue.quantity == 0 ? 1 : pvalue.quantity;
                        				   pvalue.quantity = qty;*/
                        				   
                        				   var newProduct = {
                        						   defaultCode:prvalue.defaultCode,
                        						   amount:(prvalue.price * pvalue.quantity),
                        						   quantity: pvalue.quantity
                        				   };
                        				   
                        				   //Set product
                        				   newSchoolPreload.totalAmount += (prvalue.price * pvalue.quantity);
                        				   newSchoolPreload.cantProducts += pvalue.quantity;
                        				   newSchoolPreload.preOrderProductDetails.push(newProduct);
                        			   }
                        		   });

                        		   i++;
                        	   }); 
                        	   
                        	   if(projectionSchool.details.length > 0){
 	
                        		 //Set schoolInPre
                        		   PreOrderParams.loadOrderSchools(function(){
                        			   //newSchoolPreload.schoolInPre = PreOrderParams.getOrdersSchools().length > 0;                        			 
                        			   //Add detail
                        			   $scope.addDetail(newSchoolPreload);
                        		   },pIdSchool);
                        	   }   
                    	   } 
                        },pIdSchool);
            };
	         
	         
	       /*  $scope.sendProforma = function(item){
	        	 angular.forEach($scope.items, function (pvalue, pkey) {
	          		 if (pvalue.sendPreorder == "Y")
	          		 {
	          			var preOrderItem = {
	          					
	          					"school" : { "idSchool" : 1 },
	          					"description" : "",
	          					"cantProducts" : "",
	          					"totalAmount" : "",
	          					"preOrderProductDetails" : [
	          						{
	          							"defaultCode" : 1,
	          							"quantity" : 1,
	          							"amount" : 1,
	          						}
	          					]
	          				}
	          		 };
	        	 });
	         };*/
	         
	         //Changes events
	         $scope.changeSendProformaCheck = function(){
	        	 countPreload = 0;
	        	 angular.forEach($scope.items, function (pvalue, pkey) {
	          		 if (pvalue.sendPreorder == "Y")
	          			countPreload++;
	        	 });
		         $scope.hasCheckedSendProforma = countPreload > 0;
	         };
		}
    ])
    	.controller('SchoolEditCtrl', ['$injector', '$scope', '$routeParams','$timeout','$window', 'SchoolResource', 'SchoolKey', 'SchoolFilters', 'SchoolParams', 'EventsEditDetail', 
         function ($injector, $scope, $routeParams,$timeout,$window, ApiResource, ApiKey, ApiFilters, ApiParameters, Events) {
         $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
 
         	//Set current date
         	$scope.curDate = new Date();
         
	      	//Custom Funcionts
	         $scope.getMatriculaTotal = function(){
		         $timeout(function() {
		        	 var sum = 0;
		        	 angular.forEach($scope.itemSchoolEdit.detailsProjection, function (pvalue, pkey) {
		          		 sum += pvalue.quantity;
		        	 });
		        	 $scope.itemSchoolEdit.matriculaAct = sum;
		         }, 1000);
	        };
	        
	         $scope.changeYear = function(){
		         $timeout(function() {
		        	 $window.location.href = '#/escuelas/edit/' + $scope.itemSchoolEdit.idSchool + "-" + $scope.itemSchoolEdit.year;
		         }, 100);
	        };
	        
	         $scope.init = function(){
		         $timeout(function() {
		        	 
		        	 //Matricula to json ya que el objecto viene como string
		        	 console.log($scope.itemSchoolEdit);
		        	 $scope.itemSchoolEdit.matricula = angular.fromJson($scope.itemSchoolEdit.matricula);
		        	 console.log($scope.itemSchoolEdit.matricula);
		        	 var i = 0;
		        	 angular.forEach($scope.itemSchoolEdit.matricula.details, function (pvalue, pkey) {
		        		 $scope.itemSchoolEdit.matricula.details[i] = angular.fromJson(pvalue);
		        		 i++;
		        	 });
		         }, 3000);
	        };
	        
	        //Init functions
	        //$scope.getMatriculaTotal();
	        $scope.init();

		}
    ])    