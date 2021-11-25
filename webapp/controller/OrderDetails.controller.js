sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/BindingMode"
], function(BaseController, JSONModel, formatter, BindingMode) {
	"use strict";

	return BaseController.extend("first_app.controller.OrderDetails", {
		
			formatter: formatter,
			
			orderDetails : null,
			
			onInit: function(){
				
				var router = this.getRouter();
				router.getRoute("orderDetails").attachPatternMatched(this._onObjectMatched, this);
				
				var view = new JSONModel({
						currency : "EUR",
						summaryPrice : "",
						busy : false,
						delay : 0,
						selectedTab : ""
					});
			
				this.setModel(view, "view");
				
				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
				
			},
			
			_onObjectMatched : function(oEvent){
				
				var orderPath = oEvent.getParameter("arguments").orderPath;
				
				this._bindOrder(orderPath);
			},
			
			_bindOrder : function(sPath){
				var oViewModel = this.getModel("view");
				
				this.getView().bindElement({
					path : "/" + sPath,
					parameters : {
						expand : "Order_Details"
					},
					events : {
						dataRequested : function(){
						    oViewModel.setProperty("/busy", true);
						},
						dataReceived: function(oData){
							this.orderDetails = oData.mParameters.data;
							var summaryPrice = 0.0;
							var products = this.orderDetails.Order_Details;
							for(var i = 0; i<products.length; i++){
								summaryPrice = summaryPrice + ((products[i].UnitPrice * products[i].Quantity) * (1 - products[i].Discount)) ;
							}
											
							oViewModel.setProperty("/summaryPrice", summaryPrice);
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},
			_onMetadataLoaded : function(){
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay();
				var oViewModel = this.getModel("view");
				
				oViewModel.setProperty("/busy", true);
				
				oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
				
			}
			
	});

});