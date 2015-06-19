require.config({
	paths: {
		'jquery': 'public/vendor/jquery/dist/jquery',
		'donny':'donnyGrabber.build'
	}
});

define(['app'], function(app) {
	'use strict';
	return app;
})
