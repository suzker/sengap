/**
 * Controller implementation for the GeoLive container
 * 
 *  @requires:
 *  	1. navigator.geolocation.watchPosition (Cordova)
 *  	2. sengap.model.GeoFootprint
 *  	3. sengap.store.GeoFootprint
 * 	@author: Zhiliang SU (zsu2 [at] buffalo.edu)
 *  @revisit: Mon Jun 25, 2012
 */

// Global cordova geolocation watch id
var GeoWatchId = null;
// Geo location update interval in MillionSecond
var GeoUpdateInterval = 3000;

Ext.define('sengap.controller.GeoLive', {
	extend: 'Ext.app.Controller',
	requires: [
		'sengap.model.GeoFootprint',
		'sengap.store.GeoFootprint'
	],
	
	config: {
		refs: { // add the geolivepanel to reference by id
			geolivepanel: '#geolivepanel'
		},
		control: { // config listeners on reffered geolivepanel
			geolivepanel: {
				activate: 'doGpsLiveWatch',
				deactivate: 'doGpsLiveClearWatch'
			}
		}
	},

	doGpsLiveWatch: function(){
		updateToGpsForm('Acquiring Latitude...', 'Acquiring Longitude...', 'Acquiring Timestamp...');
		requestGeoLocation();
	},

	doGpsLiveClearWatch: function(){
		if (GeoWatchId != null){
			navigator.geolocation.clearWatch(GeoWatchId);
			GeoWatchId = null;
		}
	}
});

/*
 * function: updateToGpsForm
 * 	@lat latitude
 *  @lng longitude
 *  @time timestamp
 *
 *  to display the lat lng time value to the form.
 */
function updateToGpsForm(lat, lng, time){
	Ext.getCmp('gpsStatLat').setValue(lat);
	Ext.getCmp('gpsStatLng').setValue(lng);
	Ext.getCmp('gpsStatTime').setValue(time);
}

/*
 * function: requestGeoLocation
 *  @GeoUpdateInterval interval while updating the position, in million second
 * 
 * to acquire geolocations from the PhoneGap(cordova) API
 */
function requestGeoLocation(){
	// get the store reference by name
	var geoftstore = Ext.getStore('GeoFootprint');
	
	GeoWatchId = navigator.geolocation.watchPosition(
		 function onSuccess(position){ // on success callback
		 	updateToGpsForm(position.coords.latitude, position.coords.longitude, position.timestamp);
		 	
		 	// add to store making it persistent
		 	geoftstore.add({
		 		time: position.timestamp,
		 		lat: position.coords.latitude,
		 		lng: position.coords.longitude
		 	});
		 	// re-sync
		 	geoftstore.sync();

		 	console.log('Successful updated at' + position.timestamp + ' :' + position.coords.latitude + ', ' + position.coords.longitude);
		 },
		 function onError(err){ // on error callback
		 	updateToGpsForm('Err', 'Err', 'Err');
		 	Ext.Msg.alert('Error', 'Failed when requesting GEO Location.' + '\n' + ' code: ' + err.code + '\n' + 'msg: ' + err.message, Ext.emptyFn);
		 	console.log(err);
		 },
		 { // additional options
		 	frequency: GeoUpdateInterval,
		 	enableHighAccuracy: true
		 }
		);
}