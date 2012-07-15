/**
 * Controller implementation for the GeoMap container
 * 
 *  @requires:
 *  	1. sengap.model.GeoFootprint
 *  	2. sengap.store.GeoFootprint
 * 	@author: Zhiliang SU (zsu2 [at] buffalo.edu)
 *  @revisit: Sun July 15, 2012
 */
 
 Ext.define('sengap.controller.GeoMap', {
 	extend: 'Ext.app.Controller',
 	requires: [
		'sengap.model.GeoFootprint',
		'sengap.store.GeoFootprint'
	],
	
	config: {
		refs: { // add the geolivepanel to reference by id
			geomappanel: '#geomappanel'
		},
		control: { // config listeners on reffered geolivepanel
			geomappanel: {
				maprender: 'doPlaceMarker'
			}
		}
	},
	
	doPlaceMarker: function(ExtMap, GoogleMap, eOpts){
		// get store reference
		var geoftstore = Ext.getStore('GeoFootprint');
		var currentMap = Ext.getCmp('geomappanel');
		// iterate over the records in the store
		geoftstore.data.each(
			function(item, index, length){
				// create a marker object, it'll be automatically added to map on construction
				var marker = new google.maps.Marker({
                     position: pos = new google.maps.LatLng (item.data.lat, item.data.lng),
                     map: GoogleMap,
                     optimized: true
                     //animation: google.maps.Animation.DROP//
                     //don't trust the animation that javascript promises you//  
                });
			}
		);
	}
 });