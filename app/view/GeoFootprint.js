/**
 * Tab Panel: a panel show all histories of Geo Locations
 *  @requires	
 *  	1. Ext.List
 *  	2. Ext.TitleBar
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Mon Jun 25
 */
 
Ext.define('sengap.view.GeoFootprint',{
	extend: 'Ext.Panel',
	xtype: 'geofootprintpanel',
	id: 'geofootprintpanel',
	requires: ['Ext.dataview.List'],
	
	config: {
		title: 'Footprints',
		iconCls: 'maps',
		id: 'geofootprintpanel',
		
		items: [ // components inside this panel
			{ // the title bar
				docked: 'top',
				xtype: 'titlebar',
				title: 'GPS Footprints'
			},
			{ // the list binding the footprints
				xtype: 'list',
				//requires: ['Sengap.store.GeoFootprints'],

				config: {
				title: 'Geo Footprints'
				//itemTpl: '{lat} {lng}',
				//store: 'GeoFootprints'
				}
			}
		]
	}
});