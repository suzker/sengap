/**
 * Model: a model for a geo footprint record
 *  @requires	
 *  	1. Ext.data.Model
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Mon Jun 25
 */
 
Ext.define('sengap.model.GeoFootprint',{
	extend:'Ext.data.Model',
	config:{
		fields: ['id', 'time', 'lat', 'lng']
	}
});