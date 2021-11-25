sap.ui.define([
	] , function () {
		"use strict";

		return {

			parseFreight : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},
			
			parsePrice : function(sValue){
				if (!sValue){
					return "";
				}
				return parseFloat(sValue).toFixed(2);
				
			}

		};

	}
);