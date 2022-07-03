
(function( $ ){
		
	// I filter the given collection down to the given size by 
	// randomly selecting the filtered elements.
	$.fn.randomFilter = function( size ){
		// Make sure that the size is not more than the size of 
		// the collection.
		size = Math.min( size, this.size() );
		
		// Build up an array of possible index values.
		var indexes = new Array( this.size() );
		
		// Loop over the size of the collection and store the 
		// current index value at the corresponding index of 
		// the lookup array.
		for (var i = 0 ; i < this.size() ; i++){
			indexes[ i ] = i;
		}
		
		// Create an object to hold our random indexes.
		var randomIndexes = {};
		
		// Get the correct number of random index values.
		for (var i = 0 ; i < size ; i++){
			
			// Select a random index from the lookup array.
			// Remember that this array will be getting smaller
			// with each random selection.
			randomIndex = $.randRange( 0, indexes.length - 1 );
			
			// Add the randomly selected index to the index 
			// collection.
			randomIndexes[ indexes[ randomIndex ] ] = true;
		
			// Remove the selected index from the available pool.
			indexes.splice( randomIndex, 1 );
			
		}
		
		// Return the filtered collection.
		return(
			this.filter(
				function( index ){
					return( index in randomIndexes );
				}
			)
		);
	};
	
})( jQuery );