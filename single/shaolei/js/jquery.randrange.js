
(function( $ ){
	
	//  I get a random value between the min and max values 
	// (inclusive). The min and max values are expected to be 
	// interger values.
	$.randRange = function( minValue, maxValue ){
		// Get the range of our random values.
		var delta = (maxValue - minValue);
		
		// Select a random number for our range and truncate it.
		var randomValue = Math.floor( Math.random() * delta );
		
		// Get a random value by adding the random selection to 
		// our min value.
		return( minValue + randomValue );
	};
	
})( jQuery );