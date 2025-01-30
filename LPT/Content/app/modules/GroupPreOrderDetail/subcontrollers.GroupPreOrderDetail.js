Application.Controllers
    .controller('PreOrderCreateCtrl', ['$injector', '$scope','$window','$timeout', '$cookieStore', '$filter','PreOrderResource', 'PreOrderKey', 'PreOrderFilters', 'PreOrderParams', 'EventsCreateDetail','sharedModal',
        function ($injector, $scope, $window, $timeout, $cookieStore,$filter, ApiResource, ApiKey, ApiFilters, ApiParameters, Events, sharedModal) {
            $injector.invoke(function ($controller) { $controller('CreateCtrl', { $scope: $scope, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            //TODO: Si existen dependencias se recomienda poner este controller dentro de otro scope que halla inicializado la dependencia
            //luego se establece la dependencia, ej: $scope.itemPreOrderEdit.ForeingKey = $scope.itemParentEdit.Key;
            
            $scope.updateTime = Date.now();
            $scope.itemPreOrderEdit.listPreOrderDetail = [];
            $scope.itemPreOrderEdit.preloadSchools = [];
            $scope.itemPreOrderEdit.type = 'D';
            $scope.itemPreOrderEdit.subTotal = 0;
            $scope.itemPreOrderEdit.total = 0;
            $scope.itemPreOrderEdit.status = 'ING';
                        
            $scope.addDetail = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
                $scope.itemPreOrderEdit.listPreOrderDetail.push(newItem);
            };
            var objFromSchools = angular.fromJson(window.localStorage['itemToPreOrder']);
            if(!angular.isUndefined(objFromSchools))
            {
            	$scope.itemPreOrderEdit = objFromSchools;
            	window.localStorage.removeItem('itemToPreOrder');
            }

            $scope.setDetail = function (oldItem, newItem) {
                var index = $scope.itemPreOrderEdit.listPreOrderDetail.indexOfItem(oldItem);
                if (index != null) {
                    angular.copy(newItem, $scope.itemPreOrderEdit.listPreOrderDetail[index]);
                }
            };
            $scope.removeDetail = function (item) {
                $scope.$apply(function () {
                    $scope.itemPreOrderEdit.listPreOrderDetail.removeItem(item);
                    
                    var sumSubTotal = 0;
                    angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail, function (value, key) {
                        sumSubTotal += value.totalAmount;
                    });

                    $scope.itemPreOrderEdit.subTotal = sumSubTotal;
                });
            };

            //Custom
            $scope.showModalDetalle = function () {
                sharedModal.showModal();
            };

            //Edit detail
            $scope.editar = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
                sharedModal.setModal(newItem)
                sharedModal.setIsEdit(true);
                sharedModal.showModal();
            };

            $scope.updateTotal = function () {
                var discount = 0;
                if ($scope.itemPreOrderEdit.discount > 0) {
                    discount = (($scope.itemPreOrderEdit.discount / 100) * $scope.itemPreOrderEdit.subTotal);
                }
                $scope.itemPreOrderEdit.total = $scope.itemPreOrderEdit.subTotal - discount;
            };

            //Función para buscar al anunciante depende del ng-include de search.AnuncianteOption.html
            $scope.searchAnunciante = function () {
                $("#BuscarCliente").modal();
            };

            //Watch list
            $scope.$watch('itemPreOrderEdit.subTotal', function () {
                $scope.updateTotal();
            });
            
          //Watch Customer preload
            $scope.$watch('itemPreOrderEdit.idCustomer',function(){  
            	if(angular.isUndefined(objFromSchools)){
	            	//Clean details
	            	$scope.itemPreOrderEdit.listPreOrderDetail=[];
	            	//Donation
	            	if($scope.itemPreOrderEdit.type === "D" && $scope.itemPreOrderEdit.type1 != "DB"){
	                    ApiParameters.loadFullCustomer(
	                            function () {
	                         	   var fullCustomer = ApiParameters.getFullCustomer();
	                         	   var i = 0;
	                         	   angular.forEach(fullCustomer.schoolList, function (value, key) {
	                         		   fullCustomer.schoolList[i] = angular.fromJson(value);
	                         		   i++;
	                         	   });
	
	                         	   //Set full customer parser
	                         	   ApiParameters.setFullCustomer(fullCustomer);
	                         	   //Add school list to preload
	                         	   $scope.itemPreOrderEdit.preloadSchools = fullCustomer.schoolList;
	                         	   //Set Projections
	                         	   $scope.setProjections();
	
	                           },$scope.itemPreOrderEdit.idCustomer);
	            	}
            	}
            });
            
            //Set all projections
            $scope.setProjections = function(){
                if(ApiParameters.getProducts().length > 0){
	            	angular.forEach($scope.itemPreOrderEdit.preloadSchools, function (value, key) {
	                    $timeout(function () {
	                    	$scope.setProjectionBySchool(value.displayName,value.idSchool);
	                    }, 100);
	            	});
                }else{
                	ApiParameters.loadProducts(function(){                
		            	angular.forEach($scope.itemPreOrderEdit.preloadSchools, function (value, key) {
		                    $timeout(function () {
		                    	$scope.setProjectionBySchool(value.displayName,value.idSchool);
		                    }, 100);
		            	});
                	});
                }
            };
            
            //Set projection by school
            $scope.setProjectionBySchool = function(pDisplayName,pIdSchool){
                ApiParameters.loadProjection(
                        function () {
                     	   var projectionSchool = ApiParameters.getProjection();
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
                        		   angular.forEach(ApiParameters.getProducts(), function (prvalue, prkey) {
                        			   if(prvalue.gradePack && prvalue.grade == detObje.grade){
                        				   pvalue = angular.fromJson(pvalue);
   
                        				   //Create new detail
                        				   
                        				   //SET ONE BY DEFAULT, se quita por solicitud de LPT
                        				  /* var qty = pvalue.quantity == 0 ? 1 : pvalue.quantity;
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
                        		   ApiParameters.loadOrderSchools(function(){
                        			   newSchoolPreload.schoolInPre = ApiParameters.getOrdersSchools().length > 0;                        			 
                        			   //Add detail
                        			   $scope.addDetail(newSchoolPreload);
                        			   
                                       var sumSubTotal = 0;
                                       angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail, function (value, key) {
                                           sumSubTotal += value.totalAmount;

                                       });

                                       $scope.itemPreOrderEdit.subTotal = sumSubTotal;
                        			   
                        		   },pIdSchool);

                        	   }   
                    	   } 
                        },pIdSchool);
            };
            
            $scope.currentUser = $cookieStore.get('userLogin');
            
            $scope.enableExecutiveButtons =function() {
            	var result = false;
            	if (($scope.currentUser.role.description == 'Ejecutivo' || $scope.currentUser.role.description == 'Administrador' ||$scope.currentUser.role.description == 'Coordinador')
            		&& ($scope.itemPreOrderEdit.status == 'ING' || $scope.itemPreOrderEdit.status == 'REC')){
            		result = true;
            	}
            	return result;
            };
            
            $scope.isValidForm = function(){
            	var result= 
            	!angular.isUndefined($scope.itemPreOrderEdit.idCustomer) 
            	&& !angular.isUndefined($scope.itemPreOrderEdit.date)
            	&& !angular.isUndefined($scope.itemPreOrderEdit.discount);
            	return result;
            }
            
            

        }
    ])
	.controller('PreOrderEditCtrl', ['$injector', '$scope', '$routeParams', '$cookieStore', 'PreOrderResource', 'PreOrderKey', 'PreOrderFilters', 'PreOrderParams', 'EventsEditDetail', 'sharedModal',
        function ($injector, $scope, $routeParams, $cookieStore, ApiResource, ApiKey, ApiFilters, ApiParameters, Events, sharedModal) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
            $scope.addDetail = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
				//TODO: Si el objeto anidado tiene valores predeterminados que están establecidos en el padre se recomienda establecerlos en el API,
                //o bien inicializarlos aquí, ej: newItem.ForeingKey = $scope.itemPreOrderEdit.Key;
                $scope.itemPreOrderEdit.listPreOrderDetail.push(newItem);
            };
            $scope.setDetail = function (oldItem, newItem) {
                var index = $scope.itemPreOrderEdit.listPreOrderDetail.indexOfItem(oldItem);
                if (index != null) {
                    angular.copy(newItem, $scope.itemPreOrderEdit.listPreOrderDetail[index]);
                }
            };
            
            $scope.removeDetail = function (item) {
                $scope.$apply(function () {
                    $scope.itemPreOrderEdit.listPreOrderDetail.removeItem(item);
                    
                    var sumSubTotal = 0;
                    angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail, function (value, key) {
                        sumSubTotal += value.totalAmount;
                    });

                    $scope.itemPreOrderEdit.subTotal = sumSubTotal;
                });
            };
            
            //Custom
            $scope.updateTime = Date.now();
            
            $scope.showModalDetalle = function () {
                sharedModal.showModal();
            };

            //Edit detail
            $scope.editar = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
                sharedModal.setModal(newItem)
                sharedModal.setIsEdit(true);
                sharedModal.showModal();
            };

            $scope.updateTotal = function () {
                var discount = 0;
                if ($scope.itemPreOrderEdit.discount > 0) {
                    discount = (($scope.itemPreOrderEdit.discount / 100) * $scope.itemPreOrderEdit.subTotal);
                }
                $scope.itemPreOrderEdit.total = $scope.itemPreOrderEdit.subTotal - discount;
            };
            
            //Watch list
            $scope.$watch('itemPreOrderEdit.subTotal', function () {
                $scope.updateTotal();
            });
            
            //Set current user
            $scope.currentUser = $cookieStore.get('userLogin');
            
            $scope.enableExecutiveButtons =function() {
            	var result = false;
            	if (($scope.currentUser.role.description == 'Ejecutivo' || $scope.currentUser.role.description == 'Administrador' ||$scope.currentUser.role.description == 'Coordinador')
            		&& ($scope.itemPreOrderEdit.status == 'ING' || $scope.itemPreOrderEdit.status == 'REC')){
            		result = true;
            	}
            	return result;
            };
            
            $scope.enableAdminButtons =function() {
            	var result = false;
            	if ( ($scope.currentUser.role.description == 'Administrador' || $scope.currentUser.role.description == 'Coordinador') 
            			&& $scope.itemPreOrderEdit.status == 'PPA' ){
            		result = true;
            	}
            	return result;
            };
            
            $scope.updateStatus = function(status){
            	
            	$scope.itemPreOrderEdit.status = status;
            	$scope.save();
            	
            };
            
            $scope.isValidForm = function(){
            	var result= 
            	!angular.isUndefined($scope.itemPreOrderEdit.idCustomer) 
            	&& !angular.isUndefined($scope.itemPreOrderEdit.date)
            	&& !angular.isUndefined($scope.itemPreOrderEdit.discount);
            	return result;
            }
        }
    ])
    .controller('GroupPreOrderDetailSubCreateCtrl', ['$injector', '$scope', '$routeParams', '$timeout','$location', 'GroupPreOrderDetailKey', 'GroupPreOrderDetailParams', 'sharedModal','PreOrderParams',
        function ($injector, $scope, $routeParams, $timeout,$location, ApiKey, ApiParameters, sharedModal,PreOrderParams) {
            $injector.invoke(function ($controller) { $controller('SubCreateCtrl', { $scope: $scope, $routeParams: $routeParams, ApiKey: ApiKey, ApiParameters: ApiParameters }); });
            //TODO: puede agregar observadores a los campos, los cuales activan la función asociada cuando el valor del

            $scope.parameters = ApiParameters;

            //Model 
            $scope.selectSettingsSchool = { displayProp: 'displayName', idProp: 'idSchool', enableSearch: true, externalIdProp: '', scrollableHeight: '300px', scrollable: true, smartButtonMaxItems: 2 };
            $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails = [];
            $scope.itemGroupPreOrderDetailEdit.school ={};
            $scope.itemGroupPreOrderDetailEdit.school.idSchool = "";
            $scope.itemGroupPreOrderDetailEdit.totalAmount = 0;
            $scope.itemGroupPreOrderDetailEdit.cantProducts = 0;
            $scope.itemGroupPreOrderDetailEdit.schoolInPre = false;
            $scope.validQuantity = true;
            var localItem = {};
            
            //Preload
            $scope.preload = function(){
            	ApiParameters.getCustomer()
            };

            //Modals actions
            $scope.resetModal = function () {
                $scope.cleanModal();
                sharedModal.hideModal();
            };

            $scope.cleanModal = function () {
                $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails = [];
                $scope.itemGroupPreOrderDetailEdit.schoolInPre = false;
                $scope.itemGroupPreOrderDetailEdit.description = "";
                //$scope.itemGroupPreOrderDetailEdit.cantProducts = "";
                $scope.itemGroupPreOrderDetailEdit.totalAmount = "";
                $scope.itemGroupPreOrderDetailEdit.schoolT = "";
                $scope.itemGroupPreOrderDetailEdit.school.idSchool = "";
                $scope.itemGroupPreOrderDetailEdit.totalAmount = 0;
                $scope.itemGroupPreOrderDetailEdit.cantProducts = 0;
                $scope.itemDetNew = {};
                $scope.validQuantity = true;
            }

            //Products details
            
            $scope.detailSale = function (){
                if($scope.itemPreOrderEdit.type == "V")
                {
                	$scope.itemPreOrderEdit.listPreOrderDetail.length = 0;
                    var newItemMaster = {};
                    angular.copy($scope.itemGroupPreOrderDetailEdit, newItemMaster);
                    $scope.addDetail(newItemMaster);
                    $scope.updateSubtotal();
                }
            };

            //Add Detail
            $scope.addDetailDet = function (item) {
                var newItem = {};
                angular.copy(item, newItem);
                $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.push(newItem);
                $scope.itemDetNew = {};
                //Update totals
                $scope.updateTotals();
                $scope.detailSale();
            };

            //Update detail
            $scope.setDetailDet = function (oldItem, newItem) {
                var index = $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.indexOfItem(oldItem);
                if (index != null) {
                    angular.copy(newItem, $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails[index]);
                }
            };

            //Remove detail
            $scope.removeDetailDet = function (item) {
                $scope.$apply(function () {
                    $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.removeItem(item);
                    //Update totals
                    $scope.updateTotals();
                });
            };

            //Update Current row
            $scope.updateAddRow = function () {
                angular.forEach($scope.parameters.getProducts(), function (value, key) {
                    if (value.defaultCode === $scope.itemDetNew.defaultCode) 
                    {
                    	var discountLine = 0;
                    	if(!angular.isUndefined($scope.itemDetNew.discount) &&  $scope.itemDetNew.discount > 0)
                    		discountLine = (value.price * $scope.itemDetNew.quantity) * ($scope.itemDetNew.discount / 100);
                    	
                        $scope.itemDetNew.amount = ((value.price * $scope.itemDetNew.quantity) - discountLine);
                    }
                });
            };

            $scope.updateEditRow = function (item) {
            	
                angular.forEach($scope.parameters.getProducts(), function (value, key) {
                    if (value.defaultCode === item.defaultCode) 
                    {
                    	var discountLine = 0;
                    	if(!angular.isUndefined(item.discount) &&  item.discount > 0)
                    		discountLine = (parseInt(value.price,10) * parseInt(item.quantity,10)) * (item.discount / 100);
                    	
                        item.amount = (parseInt(value.price,10) * parseInt(item.quantity,10)) - discountLine;
                        
                        
                        //Muestras
                    	var exist=false;
                    	var oldItem = {};
                    	const qty = value.grade <=6 ? 20 : 150;
                    	
                        if(value.sampleCode != "-1" && $scope.itemPreOrderEdit.type == "V")
                        {
                        	angular.forEach($scope.itemGroupPreOrderDetailEdit.preOrderProductDetails, function (valueR, keyR) {
                    			if(value.sampleCode.trim() == valueR.defaultCode.trim())
                    			{
                          			exist = true;
                          			oldItem = valueR;
                    			}
                        	});
                        	
                            //Muestras
                        	var cantToAdd = Math.floor(item.quantity / qty);
                        	angular.forEach($scope.parameters.getProducts(), function (valueT, keyT) {
                        		if(value.sampleCode.trim() == valueT.defaultCode.trim())
                        		{
                 				   //Create new detail
                 				   var newProduct = {
                 						   defaultCode:valueT.defaultCode,
                 						   amount:(valueT.price * cantToAdd),
                 						   quantity: cantToAdd,
                 						   defaultCodeT: valueT.name,
                 						   disabled : true
                 				   };
                 				   
                 				   if(!exist && cantToAdd > 0)
                 				   {
                     				   //Set product
                     				   $scope.itemGroupPreOrderDetailEdit.totalAmount += (valueT.price * cantToAdd);
                     				   $scope.itemGroupPreOrderDetailEdit.cantProducts += cantToAdd;
                     				   $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.push(newProduct); 
                     				   
                 				   }
                 				   else if(exist && cantToAdd == 0)
                				   {
                 					   //Substract
                 					  $scope.itemGroupPreOrderDetailEdit.totalAmount += -(oldItem.price * oldItem.quantity);
                 					  $scope.itemGroupPreOrderDetailEdit.cantProducts += -(oldItem.quantity);
                 					   
                 					   //Delete
                 					 $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.removeItem(oldItem);
                					  
                				   }else if(exist && cantToAdd > 0)
                 				   {
                 					   //Substract
                  					  $scope.itemGroupPreOrderDetailEdit.totalAmount += -(oldItem.price * oldItem.quantity);
                  					  $scope.itemGroupPreOrderDetailEdit.cantProducts += -(oldItem.quantity);
                  					  
                 					   //Add
                  					  $scope.itemGroupPreOrderDetailEdit.totalAmount += newProduct.price * newProduct.quantity;
                  					  $scope.itemGroupPreOrderDetailEdit.cantProducts += newProduct.quantity;
                  					  
                					   //Update
                 					  $scope.setDetailDet(oldItem,newProduct);
                 				   }
                        		}
                        	});
                        }
                    }
                });
                //Update totals
                $scope.updateTotals();
            };

            $scope.updateTotals = function () {
                var sum = 0;
                var count = 0;
                var quantityValid = true;
                angular.forEach($scope.itemGroupPreOrderDetailEdit.preOrderProductDetails, function (value, key) {
                    sum += value.amount;
                    count += parseInt(value.quantity,10);
                    if(parseInt(value.quantity,10)==0||value.quantity==undefined || value.quantity==""){
                    	quantityValid = false;
                    }
                });
                if(count==0||count==NaN){
                	quantityValid = false;
                }
                $scope.itemGroupPreOrderDetailEdit.totalAmount = sum;
                $scope.itemGroupPreOrderDetailEdit.cantProducts = count;
                $scope.validQuantity = quantityValid;
                
                if($scope.itemPreOrderEdit.type == "V")
                {
                	$scope.detailSale();
                	$scope.updateSubtotal();
                }
            };
            
            $scope.updateSubtotal = function(){
                var sumSubTotal = 0;
                angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail, function (value, key) {
                    sumSubTotal += parseInt(value.totalAmount,10);
                });

                $scope.itemPreOrderEdit.subTotal = sumSubTotal;
            };

            $scope.save = function () {
                var newItem = {};
                if (!sharedModal.getIsEdit()) {
                    angular.copy($scope.itemGroupPreOrderDetailEdit, newItem);
                    $scope.addDetail(newItem);
                }
                else {
                    $scope.setDetail(localItem, $scope.itemGroupPreOrderDetailEdit);
                }

                $scope.resetModal();
                $scope.updateSubtotal();
            };

            //**Change methods**//

            //Change Add Quantity
            $scope.changeAddQuantity = function () {
                $scope.updateAddRow(); 
            };

            //Change Add Product
            $scope.changeAddProduct = function () {
                $scope.updateAddRow();
            };

            //Change Edit Quantity
            $scope.changeEditQuantity = function (item) {
                $scope.updateEditRow(item);
            };

            //Change Edit Product
            $scope.changeEditProduct = function (item) {
                $scope.updateEditRow(item);
            };
            
            //Change School
            $scope.changeSchool = function(){
            	
            	if($scope.itemPreOrderEdit.type === "D")
            		$scope.getOrderSchool();
            	
            	//Donation
            	if($scope.itemPreOrderEdit.type === "D" && !sharedModal.getIsEdit()){
            		
                	//Set description
                	$scope.itemGroupPreOrderDetailEdit.description = $scope.itemGroupPreOrderDetailEdit.schoolT;
                	//Clean details
                	$scope.itemGroupPreOrderDetailEdit.preOrderProductDetails=[];
                	
            		PreOrderParams.loadProjection(
                            function () {
                         	   var projectionSchool = PreOrderParams.getProjection();
                         	   console.log(projectionSchool);
                        	   var i = 0;
                        	   if(!angular.isUndefined(projectionSchool)) {
                            	   //Parse details
                            	   angular.forEach(projectionSchool.details, function (pvalue, pkey) {
                            		   var detObje = angular.fromJson(pvalue);
                            		   projectionSchool.details[i] = detObje;
                            		   angular.forEach(ApiParameters.getProducts(), function (prvalue, prkey) {
                            			   if(prvalue.gradePack && prvalue.grade == detObje.grade){
                            				   pvalue = angular.fromJson(pvalue);
                            				   
                            				   //SET ONE BY DEFAULT, se quita por solicitud de LPT
                            				   /*var qty = pvalue.quantity == 0 ? 1 : pvalue.quantity;
                            				   pvalue.quantity = qty;*/
                            				   
                            				   //Create new detail
                            				   var newProduct = {
                            						   defaultCode:prvalue.defaultCode,
                            						   amount:(prvalue.price * pvalue.quantity),
                            						   quantity: pvalue.quantity
                            				   };
                            				   
                            				   //Set product
                            				   $scope.itemGroupPreOrderDetailEdit.totalAmount += (prvalue.price * pvalue.quantity);
                            				   $scope.itemGroupPreOrderDetailEdit.cantProducts += pvalue.quantity;
                            				   $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.push(newProduct);
                            			   }
                            		   });
                            		   i++;
                            	   }); 
                        	   } 
                            },$scope.itemGroupPreOrderDetailEdit.school.idSchool);
            		}
	
            };
            
            $scope.getOrderSchool = function(){
            	PreOrderParams.loadOrderSchools(function(){
            		$scope.itemGroupPreOrderDetailEdit.schoolInPre = PreOrderParams.getOrdersSchools().length > sharedModal.getIsEdit() ? 1 : 0;
            	},$scope.itemGroupPreOrderDetailEdit.school.idSchool);
            }
            
            $scope.loadSaleProducts = function(){
                $timeout(function() {
                	if($scope.itemPreOrderEdit.type === "V")
                	{
              		   angular.forEach(ApiParameters.getProducts(), function (prvalue, prkey) {
            			   if(prvalue.pack)
            			   {
            				   //Create new detail
            				   var newProduct = {
            						   defaultCode:prvalue.defaultCode,
            						   amount:(prvalue.price * 0),
            						   quantity: 0
            				   };

            				   //Set product
            				   $scope.itemGroupPreOrderDetailEdit.totalAmount += (prvalue.price * 0);
            				   $scope.itemGroupPreOrderDetailEdit.cantProducts += 0;
            				   $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails.push(newProduct);
            			   }
            		   });
                	}
                }, 2000);
            };
            
            //Init
            $scope.init = function()
            {
            	if(angular.isUndefined($scope.itemPreOrderEdit.id))
            	{
                	var typePreorder = $location.search().TPreOrder;
                	$scope.itemPreOrderEdit.type1 = typePreorder;
                	typePreorder = typePreorder == "D" || typePreorder == "DB" ? "D" : typePreorder;
                	if(typePreorder == "D" || typePreorder == "V")
                		$scope.itemPreOrderEdit.type = typePreorder;
                	
            		$scope.loadSaleProducts();
            	}else
            	{
                    $timeout(function() {
                        if($scope.itemPreOrderEdit.type == "V" && $scope.itemPreOrderEdit.listPreOrderDetail.length > 0)
                        {
                        	$scope.itemGroupPreOrderDetailEdit.preOrderProductDetails = $scope.itemPreOrderEdit.listPreOrderDetail[0].preOrderProductDetails;
                        }
                    }, 2000);
            	}	
            };
            
            //Call init
            $scope.init();

            //Watches
            $scope.$watch(function () { return sharedModal.getIsOpen(); },
                function (newValue) {
                    if (newValue && sharedModal.getIsEdit()) {
                        angular.copy(sharedModal.getModal(), $scope.itemGroupPreOrderDetailEdit);
                        angular.copy(sharedModal.getModal(), localItem);
                        $scope.actionDetail = "Editar";
                    } else {
                        $scope.itemGroupPreOrderDetailEdit.preOrderProductDetails = [];
                        //TODO: If is Donation add preload
                        $scope.actionDetail = "Agregar";
                    }
                });
            
            $scope.$watch('itemGroupPreOrderDetailEdit.school.idSchool',function(){
            	if($scope.itemGroupPreOrderDetailEdit.school.idSchool > 0)
            		$scope.changeSchool();
            });
              
        }
    ])
    .controller('GroupPreOrderDetailSubEditCtrl', ['$injector', '$scope', '$routeParams', '$window', 'GroupPreOrderDetailKey', 'GroupPreOrderDetailParams',
        function ($injector, $scope, $routeParams,$window, ApiKey, ApiParameters) {
            $injector.invoke(function ($controller) { $controller('SubEditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiKey: ApiKey, ApiParameters: ApiParameters }); });
    }
    ])

        //TODO:ALONSO
    .controller('PreOrderPrintCtrl', ['$injector', '$scope', '$routeParams','$window', 'PreOrderResource', 'PreOrderKey', 'PreOrderFilters', 'PreOrderParams', 'EventsEditDetail', 'sharedModal',
        function ($injector, $scope, $routeParams,$window, ApiResource, ApiKey, ApiFilters, ApiParameters, Events, sharedModal) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });

            $scope.getTotalItems = function(){
            	var result = 0;
            	angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail,function(value,key){
            		angular.forEach(value.preOrderProductDetails,function(Ivalue,Ikey){
                        angular.forEach(ApiParameters.getProducts(), function (value, key) {
                            if (value.defaultCode === Ivalue.defaultCode) {
                    			result +=  Ivalue.quantity * (value["gradePack"] ? 4 : 1);
                            }
                        });
            		});
            	});
            	return result;
            };
            
            $scope.getTotalItemsPkg= function(schoolId){
            	var result = 0;
            	angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail,function(value,key){
            		if(value.school.codMep == schoolId)
            		{
                		angular.forEach(value.preOrderProductDetails,function(Ivalue,Ikey){
                            angular.forEach(ApiParameters.getProducts(), function (value, key) {
                                if (value.defaultCode === Ivalue.defaultCode) {
                                	if(value.gradePack)
                                		result += parseInt(Ivalue.quantity,10);
                                }
                            });
                		});
            		}
            	});
            	return result;
            };
            
            $scope.getTotalItemsCom= function(schoolId){
            	var result = 0;
            	angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail,function(value,key){
            		if(value.school.codMep == schoolId)
            		{
                		angular.forEach(value.preOrderProductDetails,function(Ivalue,Ikey){
                            angular.forEach(ApiParameters.getProducts(), function (value, key) {
                                if (value.defaultCode === Ivalue.defaultCode) {
                                	if(!value.gradePack)
                                		result += parseInt(Ivalue.quantity,10);
                                }
                            });
                		});
            		}
            	});
            	return result;
            };

            $scope.getTotalBySchool= function(listDetails){
            	var result = 0;
            	angular.forEach(listDetails, function (value, key) {
            		result += $scope.getUnitPriceItem(value.defaultCode) * value.quantity;
            	});
            	return result;
            };
            
            $scope.getUnitPriceItem= function(itemCode){
            	var result = 0;
                angular.forEach(ApiParameters.getProducts(), function (value, key) {
                    if (value.defaultCode === itemCode) 
                    	result = value.price;
                });
            	return result;
            };

            $scope.printIt = function () {
               /* var doc = "<link href='../commons/bootstrap/css/bootstrap.min.css' rel='stylesheet' />";
                doc += "<link href='../css/datepicker.css' rel='stylesheet' />"; 
                doc += "<link href='../css/typeahead.js-bootstrap.css' rel='stylesheet' />";
                doc += "<link href='../css/app.css' rel='stylesheet' />";	 
                doc += "<link href='../css/animate.css' rel='stylesheet' />";
                doc += "<link href='../css/print.css' rel='stylesheet' />";
	
                doc += document.getElementById('printPreOrder').innerHTML;
                var myWindow = $window.open('', '', 'width=800, height=600');
                myWindow.document.write(doc);
                myWindow.print();*/
            };
        }
    ])

        .controller('PreOrderPrintOutCtrl', ['$injector', '$scope', '$routeParams','$window','$timeout','$filter','PreOrderResource', 'PreOrderKey', 'PreOrderFilters', 'PreOrderParams', 'EventsEditDetail', 'sharedModal',
        function ($injector, $scope, $routeParams,$window,$timeout,$filter, ApiResource, ApiKey, ApiFilters, ApiParameters, Events, sharedModal) {
            $injector.invoke(function ($controller) { $controller('EditCtrl', { $scope: $scope, $routeParams: $routeParams, ApiResource: ApiResource, ApiKey: ApiKey, ApiFilters: ApiFilters, ApiParameters: ApiParameters, Events: Events }); });
                        
            $scope.showAddItem = true;
            $scope.addCustomList = [];
            
            $scope.getTotalItems = function(){
            	var result = 0;
            	angular.forEach($scope.itemPreOrderEdit.listPreOrderDetail,function(value,key){
            		angular.forEach(value.preOrderProductDetails,function(Ivalue,Ikey){
                        angular.forEach(ApiParameters.getProducts(), function (value, key) {
                            if (value.defaultCode === Ivalue.defaultCode) {
                    			result +=  Ivalue.quantity * (value["gradePack"] ? 4 : 1);
                            }
                        });
            		});
            	});
            	return result;
            };

            $scope.getTotalBySchool= function(listDetails,idSchool){
            	var result = 0;
            	angular.forEach(listDetails, function (value, key) {
            		if(value.school.idSchool == idSchool)
            			result += parseInt(value.totalAmount,10);
            	});
            	
            	return result;
            };
            
            $scope.addItem = function(item,school){
                var newItem = {};
                angular.copy(item, newItem);
                newItem.idschool = school;
            	$scope.addCustomList.push(newItem);
            	//Clean item
            	item.number = "";
            	item.defaultCode = "";
            	item.name = "";
            	item.quantity = "";
            };
            

            
            $scope.printIt = function () {

            	$scope.showAddItem = false;
            	
                $timeout(function() {
                    var doc = "<link href='../commons/bootstrap/css/bootstrap.min.css' rel='stylesheet' />";
                    doc += "<link href='../css/datepicker.css' rel='stylesheet' />"; 
                    doc += "<link href='../css/typeahead.js-bootstrap.css' rel='stylesheet' />";
                    doc += "<link href='../css/app.css' rel='stylesheet' />";	 
                    doc += "<link href='../css/animate.css' rel='stylesheet' />";
                    doc += "<link href='../css/print.css' rel='stylesheet' />";
    	
                    doc += document.getElementById('printPreOrder').innerHTML;
                    var myWindow = $window.open('', '', 'width=900, height=600');
                    myWindow.document.write(doc);
                    myWindow.print();
                    
                    $scope.showAddItem = true;
                    
                }, 1000);

            };
            
            $scope.returnComment = function(pOrder,idSchool){
            	var subtotal = $scope.getTotalBySchool(pOrder.listPreOrderDetail,idSchool);
            	var discount = ((pOrder.discount / 100) * subtotal);
            	var total = subtotal - discount;
            	var totalPrint = $filter('currency')(total, "₡", 2);
            	return "La donación del producto entregado representa el monto de " + totalPrint +". Una vez que se nos proporcionan los datos de los docentes, se les brinda el código para acceder al Club Docente. "
            }

        }
    ])


