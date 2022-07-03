
(function( $ ){
	
	// I repeat the given string the given number of times.
	$.repeatString = function( value, count ){
		return(
			(new Array( count + 1 )).join( value )
		);
	};
	
})( jQuery );