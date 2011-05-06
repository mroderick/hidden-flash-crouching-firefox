/*jslint evil: false, strict: false, undef: true, white: false, onevar:false, plusplus:false */
/*global jQuery, Mustache, FailFast, window, navigator */

var tdc = tdc || {};
tdc.ui = tdc.ui || {};


/**
 *	Rotator can display content in tabs
 *	@param
 *
 *
 *	@constructor
 */
tdc.ui.Rotator = (function($){
	
	"use strict";
	// default time between slides
	var DEFAULT_ROTATE_TIME = 6000;
	var FLASH_WIDTH_12_COLUMNS = 972;
	var FLASH_WIDTH_8_COLUMNS = 646;
	var FLASH_HEIGHT = 372;
	
	// determine if we're allowed to use flash or if it should be avoided
	// see https://bugzilla.opasia.dk/show_bug.cgi?id=14267
	var bugfix_shouldUseFallbackInsteadOfFlash = (function(){
		var re = /^.*Firefox\/4\.0(\.1)?$/;
		var isFlashBuggyFirefox4Zero = re.test( navigator.userAgent.toString() );
		var isOnWindows = navigator.userAgent.toLowerCase().indexOf("windows") !== -1;
		return isFlashBuggyFirefox4Zero && isOnWindows;
	}());
	
	/**
	 *	Starts all the flash elements on the page with the data provided
	 *	
	 *	Contains bugfix for weird behaviour in FF4.0/Win
	 *	@see https://bugzilla.opasia.dk/show_bug.cgi?id=14267
	 *	
	 *	@param { Number }	numberOfColumns
	 *	@param { Array }	flashData
	 *	@private
	 *
	 */
	var startFlash = function( numberOfColumns, flashData ){
		if ( bugfix_shouldUseFallbackInsteadOfFlash ){
			return false;
		}

		// select the correct dimensions for the flash object
		var width = numberOfColumns === 12 ? FLASH_WIDTH_12_COLUMNS : FLASH_WIDTH_8_COLUMNS,
			height = FLASH_HEIGHT,
			data;
	
		// start all the flash elements, if there are any
		for ( var i = 0, j = flashData.length; i < j; i++ ){
		
			data = flashData[i];
		
			// set the correct dimensions
			data.width = width;
			data.height = height;
		
			tdc.Grd.Event.Pool.bind({
				init: tdc.Grd.Flash.embed( data )
			});
		}
	};
		
	return function konstructor( id, numberOfColumns, flashData, options ){
		// throw error if the constructor is being called without using "new" keyword
		if (!(this instanceof konstructor)){
			throw('tdc.ui.Rotator constructor must be called with "new" keyword, or there will be polution of global scope');
		}
		
		FailFast.assertString( 'expected id to be a String', id );
		FailFast.assert( 'expected numberOfColumns to be one of the following values: 8, 12', numberOfColumns === 8 || numberOfColumns === 12 );
		FailFast.assertArray( 'expected flashData to be an Array', flashData );

		// start loading the flash files, most of this is async, so needs to be started sooner, rather than later
		startFlash( numberOfColumns, flashData );

		var rotateTime = options && parseInt( options.rotateTime, 10 ) || DEFAULT_ROTATE_TIME,
			tabsSelector = '#' + id + '.g_rotator';
		
		$(tabsSelector).tabs().tabs("rotate", rotateTime , false);
	};
	
}(jQuery));