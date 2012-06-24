/**
 * Store: a store for storing/r/w geo footprint records
 *  @requires	
 *  	1. Ext.data.Store
 *  	2. sengap.model.GeoFootprint
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Mon Jun 25
 */

Ext.define('sengap.store.GeoFootprint', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'sengap.model.GeoFootprint',
		autoLoad: true,
		proxy: { // proxy to provide r/w operations 
			type: 'localstorage', // we're using HTML5 standard local storage
			id: 'GeoFt'
		}
	}
});