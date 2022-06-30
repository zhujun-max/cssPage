
(function( $ ){
		
	// This is meant to be used on collections of TD elements. 
	// It will get at most the 8 surrounding TD cells.
	$.fn.near = function(){
		var nearNodes = $( [] );
		var currentCell = $( this );
		var currentRow = currentCell.parent( "tr" );
		var tbody = currentRow.parent();
		var prevRow = currentRow.prev();
		var nextRow = currentRow.next();
		var currentCellIndex = currentRow.find( "td" ).index( currentCell );
		
		// Check to see if there is a previous row.
		if (prevRow.size()){
			
			// Grab the cell just above the current cell.
			var prevRowCell = prevRow.find( "td:eq(" + currentCellIndex + ")" );
			
			// Add the top 3 near cells to the collection that
			// we are going to return.
			nearNodes = nearNodes
				.add( prevRowCell.prev() )
				.add( prevRowCell )
				.add( prevRowCell.next() )
			;
			
		}
		
		// Add the left / right near cells to the collection
		// that we are going to return.
		nearNodes = nearNodes
			.add( currentCell.prev() )
			.add( currentCell.next() )
		;
		
		// Check to see if there is a next row.
		if (nextRow.size()){
			
			// Grab the cell just below the current cell.
			var nextRowCell = nextRow.find( "td:eq(" + currentCellIndex + ")" );
			
			// Add the bottom 3 near cells to the collection that
			// we are going to return.
			nearNodes = nearNodes
				.add( nextRowCell.prev() )
				.add( nextRowCell )
				.add( nextRowCell.next() )
			;
			
		}
		
		// Return the collection of near cells.
		return( nearNodes );
	}
	
})( jQuery );