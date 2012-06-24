/**
 * Controller implementation for the GeoLive container
 * 
 *  @requires:
 *  	1. navigator.geolocation.watchPosition (Cordova)
 * 	@author: Zhiliang SU (zsu2 [at] buffalo.edu)
 *  @revisit: Mon Jun 25, 2012
 */

// Global cordova geolocation watch id
var GeoWatchId = null;
// Geo location update interval in MillionSecond
var GeoUpdateInterval = 3000;

Ext.define('sengap.controller.GeoLive', {
	extend: 'Ext.app.Controller',

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
	GeoWatchId = navigator.geolocation.watchPosition(
		 function onSuccess(position){ // on success callback
		 	updateToGpsForm(position.coords.latitude, position.coords.longitude, position.timestamp);
		 	console.log('Successful updated at' + position.timestamp + ' :' + position.coords.latitude + ', ' + position.coords.longitude);
		 },
		 function onError(err){ // on error callback
		 	updateToGpsForm('Err', 'Err', 'Err');
		 	Ext.Msg.alert('Error', 'Failed when requesting GEO Location.' + '\n' + ' code: ' + err.code + '\n' + 'msg: ' + err.message, Ext.emptyFn);
		 	console.log(err);
		 },
		 { // additional options
		 	frequency: GeoUpdateInterval
		 }
		);
}