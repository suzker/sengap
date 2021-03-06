/**
 * Tab Panel: a panel keeping a track of Geo Locations
 *  @requires	
 *  	1. Ext.form.FieldSet
 *  	2. Ext.TitleBar
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Sun Jul 15
 */
 
Ext.define("sengap.view.GeoLive",{
	extend: 'Ext.Panel',
	xtype: 'geolivepanel',
	id: 'geolivepanel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.TitleBar'
	],
	
	config: {
		title: 'Geo Live',
		iconCls: 'locate',
		id: 'geolivepanel',
		
		styleHtmlContent: true,
		scrollable: true,
		
		items: [ // components inside this panel
			{ // the title bar
				xtype: 'titlebar',
				docked: 'top',
				title: 'GPS Live Show'
			},
			{ // the form field
				xtype: 'fieldset',
				title: 'GPS Status',
				name: 'statusField',
				id:	'gpsStatusFieldSet',
				instructions: 'tracking your move 8-D',
            		
				items: [{// the fileds inside the fieldset
							xtype: 'textfield',
							id: 'gpsStatLat',
							label: 'Latitude',
							readOnly: true
						},
						{
							xtype: 'textfield',
							id: 'gpsStatLng',
							label: 'Longitude',
							readOnly: true
						},
						{
							xtype: 'textfield',
							id: 'gpsStatAccuracy',
							label: 'Accuracy',
							readOnly: true
						},
						{
							xtype: 'textfield',
							id: 'gpsStatTime',
							label: 'Time',
							readOnly: true
						}
						]
            }]
	}
});