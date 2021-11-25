sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/ui/model/json/JSONModel"
], function(BaseController, formatter, Filter, FilterOperator, Sorter, JSONModel) {
	"use strict";

	return BaseController.extend("first_app.controller.Index", {
			formatter : formatter,
			
			onInit : function(){
				var appView = new JSONModel({
					order : 0,
					currency : "EUR"
				});
			
				this.getView().setModel(appView, "appView");
			},
			
			displayOrder : function(oEvent){
				var router = this.getRouter();
				var oItem = oEvent.getSource();
				var path = oItem.getBindingContext().getPath().substr(1);
				
				
				router.navTo("orderDetails", {
					orderPath : path
				 });
				
			},
			
			searchByOrderId : function(oEvent){
				var aFilter = [];
					var sQuery = oEvent.getParameter("query");
					if (sQuery){
						aFilter.push(new Filter("OrderID", FilterOperator.EQ, sQuery));
					}
					
					var oTable = this.byId("orders");
					var oBinding = oTable.getBinding("items");
					oBinding.filter(aFilter);
			},
			
			filterOrders : function(oEvent){
				var oFilterBar = oEvent.getSource();
	    		var aFilterItems = oFilterBar.getFilterItems();
	    		var aFilters = [];
	    		
	    		for(var i=0; i < aFilterItems.length; i++){
	    			var aFilterItem = aFilterItems[i];
	    			var sFilterName = aFilterItem.getName();
	    			var oControl = oFilterBar.determineControlByFilterItem(aFilterItem);
	    			var sValue;
	    			
	    			if (oControl.getMetadata().getName() === "sap.m.Select") {
			            sValue = oControl.getSelectedKey();
			        } else if (oControl.getMetadata().getName() === "sap.m.Input") {
			            sValue = oControl.getValue();
			        }
			        
			        if(sValue !== ""){
			        	aFilters.push(new Filter(sFilterName, FilterOperator.EQ, sValue));
			        }
	    		}
	    		
			    var oTable = this.byId("orders");
				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilters);
			},
			
			sortOrders : function(){
				var oView = this.getView(),
				aStates = ["asc", "desc"],
				iOrder = oView.getModel("appView").getProperty("/order");

				iOrder = (iOrder + 1) % aStates.length;
				var sOrder = aStates[iOrder];
	
				oView.getModel("appView").setProperty("/order", iOrder);
				oView.byId("orders").getBinding("items").sort(sOrder && new Sorter("OrderID", sOrder === "desc"));
			},
			
			clearFilterBar : function(){
				var oSelect = this.getView().byId("customerName");
				oSelect.setSelectedKey("");
				
				var oInput = this.getView().byId("orderID");
				oInput.setValue("");
			}
	});

});