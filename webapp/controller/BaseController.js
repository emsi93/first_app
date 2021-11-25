sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("first_app.controller.BaseController", {
		
		getRouter : function () {
			return this.getOwnerComponent().getRouter();
		},
		
		getBindingContextPath : function(){
			return this.getView().getBindingContext().sPath;
		},
		
		getBindingContextObject : function(){
			return 	this.getView().getBindingContext().getObject();
		},
		
		getModelData : function(sName){
			return this.getView().getModel(sName).getData();
		},
		
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},
		
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}
		
	});
});