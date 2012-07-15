/**
 * Controller implementation for the GeoLive container
 * 
 *  @requires:
 *  	1. navigator.geolocation.watchPosition (Cordova)
 *  	2. sengap.model.GeoFootprint
 *  	3. sengap.store.GeoFootprint
 * 	@author: Zhiliang SU (zsu2 [at] buffalo.edu)
 *  @revisit: Sat July 14, 2012
 */

// Global cordova geolocation watch id
var GeoWatchId = null;
// Geo location update interval in MillionSecond
var GeoUpdateInterval = 3000;
// Global current best position object
var GeoCurrentBestPosition = null;
// Constant: Time Threshold to judge if a position is new or old, in MillionSecond
var TimeThreshold = 60000; // 1 min
// Constant: Accuracy Threshold/tolerance
var AccuracyThreshold = 50; // in meter

Ext.define('sengap.controller.GeoLive', {isBetterLocation
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
		 	
		 	if (isBetterLocation(position, GeoCurrentBestPosition)){
		 		updateToGpsForm(position.coords.latitude, position.coords.longitude, position.timestamp);
			 	// add to store making it persistent
			 	geoftstore.add({
			 		time: position.timestamp,
			 		lat: position.coords.latitude,
			 		lng: position.coords.longitude
			 	});
			 	// re-sync
		 		geoftstore.sync();
		 		
		 		// **for debugging
		 		
		 	} else {
		 		// **for debugging
		 		
		 	}
		 	
		 },
		 function onError(err){ // on error callback
		 	updateToGpsForm('Err', 'Err', 'Err');
		 	Ext.Msg.alert('Error', 'Failed when requesting GEO Location.' + '\n' + ' code: ' + err.code + '\n' + 'msg: ' + err.message, Ext.emptyFn);
		 },
		 { // additional options
		 	frequency: GeoUpdateInterval,
		 	enableHighAccuracy: true
		 }
		);
}

/*
 * function: isBetterLocation
 *  @newLocation 			a new location update from the position change listener
 *  @currentLocation 	the saved current best location
 *  return: boolean true/false
 * to give out judgements given two locations from two different time spots
 * translated from the java example from developer.android.com
 */
function isBetterLocation(newLocation, currentLocation){
	// the zero priority: a location is always better than nothing
	if (currentLocation == null){
		return true;
	}
	
	// calculate the time delta
	timeDelta = newLocation.timestamp - currentLocation.timestamp;
    isSignificantlyNewer = (timeDelta > TimeThreshold);
    isSignificantlyOlder = (timeDelta < -TimeThreshold);
    isNewer = (timeDelta > 0);
    
    // 1st thought: if the new location is significantly new/old? -> accept / discard
    if (isSignificantlyNewer) {
        return true;
    // If the new location is more than two minutes older, it must be worse
    } else if (isSignificantlyOlder) {
        return false;
    }
    
    // calculate the accuracy delta
    accuracyDelta = (newLocation.coords.accuracy - currentLocation.coords.accuracy);
    isLessAccurate = (accuracyDelta > 0);
    isMoreAccurate = (accuracyDelta < 0);
    isSignificantlyLessAccurate = (accuracyDelta > 50);
    
    // 2nd rule: choose a more accruate one if they are about the same age
    if (isMoreAccurate) {
    	return true;
    } else if(isNewer && !isSignificantlyLessAccurate){ // bottom line, indicates the user is actually moving but we can't get a accurate update like last time
    	return true;
    }
    
    return false; // we don't need that
}