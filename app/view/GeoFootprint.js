/**
 * Tab Panel: a panel show all histories of Geo Locations
 *  @requires	
 *  	1. Ext.dataview.List
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Mon Jun 25
 */

Ext.define('sengap.view.GeoFootprint',{
	/*
	 * !!! it turns out that you can't nest a list into 'items' of a tab panel, 
	 * in order to use the list in a tab panel normally, one MUST make the list
	 * the only item in the tab panel. Thus, here we extend the 'dataview.List'
	 * instead of the normal 'Ext.Panel'.
	 */
	extend: 'Ext.dataview.List',
	xtype: 'geofootprintpanel',
	id: 'geofootprintpanel',
	
	config: {
		title: 'Footprints',
		iconCls: 'maps',
		store: 'GeoFootprint',
		itemTpl: '<p><h1> At {time}: </h1></p> <p><h3>Lat = {lat}</h3></p> <p><h3>Long = {lng}</h3></p>',
		onItemDisclosure: true
	}
});