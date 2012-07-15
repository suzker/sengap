/**
 * Tab Panel: a panel to show routes on google map recorded according to the footprints saved
 *  @requires	
 *  	1. Ext.Map
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Sun Jul 15
 */
 Ext.define('sengap.view.GeoMap', {
 	extend: 'Ext.Map',
 	xtype: 'geomappanel',
 	id: 'geomappanel',
 	requires: [
		'Ext.Map',
		'Ext.TitleBar'
	],
 	
 	config: {
 		title: 'Geo Map',
		iconCls: 'time',
		id: 'geomappanel',
		
 		useCurrentLocation: true,
 		mapOptions: {
 		}
 	}
 });
 