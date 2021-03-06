sap.ui.define([
	"sap/ui/core/UIComponent",
	"first_app/model/models"
], function(UIComponent, models) {
	"use strict";

	return UIComponent.extend("first_app.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.getRouter().initialize();
		}
	});

});