/**
 * Main container: a tab panel
 *  @requires	
 *  	1. sengap.view.GeoLive
 *  	2. sengap.view.GeoFootprint
 * 	@author 	Zhiliang Su (zsu2 [at] buffalo.edu)
 *  @revisit 	Mon Jun 25
 */
Ext.define("sengap.view.Main", {
    extend: 'Ext.tab.Panel',

    config: {
        tabBarPosition: 'bottom',

        items: [{ // components, one for each tab
                xtype: 'geolivepanel'
            },
            {
				xtype: 'geofootprintpanel'
            }]
    }
});
