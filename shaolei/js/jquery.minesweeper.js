
(function( $ ){

	// I am the controller for the mine sweeper game.
	function MineSweeper( selector, columnCount, rowCount, bombCount ){
		var self = this;
		this.table = $( selector );
		this.columnCount = (columnCount || 30);
		this.rowCount = (rowCount || 30);
		
		// Check to see if the bomb count contains a percent sign.
		if (
			(typeof( bombCount ) == "string") &&
			(bombCount.indexOf( "%" ) > 0)			
			){
			
			// The bomb count is a percentage of the total number
			// of cells.
			this.bombCount = Math.floor(
				(this.columnCount * this.rowCount) *
				(parseInt( bombCount ) / 100)
			);
			
		} else {
		
			// The bomb count is just a standard number.
			this.bombCount = (bombCount || 15);
		
		}
		
		// Bind the click handler for the table. This way, we 
		// don't have to attach event handlers to each cell.
		this.table.click(
			function( event ){
				// Pass off to the table click handler.
				self.onClick( event );
				
				// Cancel default event.
				return( false );
			}
		);
		
		// Initialize the table.
		this.initTable();
	};
	
	
	// I build the actual markup of the table using the 
	// given number of columns and rows. 
	MineSweeper.prototype.buildTable = function(){
		// Build the markup for a given row.
		var rowHtml = ("<tr>" + $.repeatString( "<td class=\"active\">&nbsp;</td>", this.columnCount ) + "</tr>");
		
		// Build the markup for the table using the row
		// data the given number of times.
		var tableHtml = $.repeatString( rowHtml, this.rowCount );
		
		// Set the HTML of the table to fill it out.
		this.table.html( tableHtml );
	};
	
	
	// I check to see if an end-game has been reached.
	// If so, then I give the option to restart.
	MineSweeper.prototype.checkEndGame = function(){
		var message = "";
		var isEndGame = false;
		
		// Check to see if any of the bombs have exploded.
		if (this.bombCells.filter( ".bombed" ).size()){
			
			// Set the message.
			message = "You LOSE - Play Again?";
			
			// Flag the end game.
			isEndGame = true;
			
		// Check to see if there are any more active 
		// non-bomb cells. If not, then the user has 
		// successfully clicked all non-bomb cells.
		} else if (!this.nonBombCells.filter( ".active" ).size()){
		
			// Set the message.
			message = "You WIN - Play Again?";
			
			// Flag the end game.
			isEndGame = true;
		
		}
		
		// Check to see if the game is over.
		if (isEndGame){
			
			// Prompt for replay.
			if (confirm( message )){
			
				// Restart the game.
				this.restart();
			
			}
			
		}
	};
	
	
	// I clear the table of any markup.
	MineSweeper.prototype.clearTable = function(){
		this.table.empty();
	};
	
	
	// I initialize the table.
	MineSweeper.prototype.initTable = function(){
		var self = this;
		
		// Clear the table if there is any existing markup.
		this.clearTable();
		
		// Now that we have ensured that the table is 
		// empty, let's build out the HTML for the table.
		this.buildTable();
		
		// Gather the cells of the table.
		this.cells = this.table.find( "td" );
		
		// Set the "near bombs" data for each cell to 
		// zero. This is the number of bombs that the cell
		// is near.
		this.cells.data( "nearBombs", 0 );
		
		// For each cell, keep a collection of the cells
		// that are near this cell.
		this.cells.each(
			function( index, cellNode ){
				var cell = $( this );
				
				// Store the near cells.
				cell.data( "near", cell.near() );						
			}
		);
		
		// Randomly select and gather the bomb cells.
		this.bombCells = this.cells
			.randomFilter( this.bombCount )
			.addClass( "bomb" );
		;
		
		// Now that we've selected the bomb cells, let's 
		// get teh non-bomb cells.
		this.nonBombCells = this.cells.filter(
			function( index ){
				// If this cell does NOT appear in the bomb
				// cells collection, then it's a non-bomb
				// cell.
				return( self.bombCells.index( this ) == -1 );
			}
		);
		
		// Now that we have the bomb cells, let's go through
		// each of them and apply its "nearness" to the 
		// cells around it.
		this.bombCells.each(
			function( index, node ){
				var cell = $( this );
				var nearCells = cell.data( "near" );
				
				// For each near cell, increment the near
				// data counter.
				nearCells.each(
					function(){
						var nearCell = $( this );
						
						// Get the current near data and
						// increment it.
						nearCell.data( 
							"nearBombs", 
							(nearCell.data( "nearBombs" ) + 1)
						);
					}
				);
			}
		);
	};
	
	
	// I handle the clicks at the table level.
	MineSweeper.prototype.onClick = function( event ){
		// Get the trigger for the event.
		var target = $( event.target );
		
		// Check to make sure the target is an active cell.
		// If it is not, then we are not interested.
		if (!target.is( "td.active" )){
			
			// This cell is not of any concern; simply 
			// return out to prevent processing.
			return;
			
		}
		
		
		// Check to see if the ALT key was pressed. If it
		// was, then we are handling the caution toggle.
		// If not, then we are going to process a normal
		// click event.
		if (event.altKey){
		
			// Toggle the caution nature of this cell.
			this.toggleCaution( target );
		
		} else {
			
			// Check to see if the target was a bomb cell.
			if (target.is( ".bomb" )){
			
				// The user clicked on a bomb, which will end 
				// the game. Reveal the whole board (end-game 
				// check comes below).
				this.revealBoard();
			
			} else {
			
				// The target was not a bomb, so show it.
				this.revealCell( target );
			
			}
			
			// Check end game.
			this.checkEndGame();
		
		}				
	};
	
	
	// I restart the game.
	MineSweeper.prototype.restart = function(){
		// Re-initialize the table.
		this.initTable();
	};
	
	
	// I reveal the entire board.
	MineSweeper.prototype.revealBoard = function(){
		// Remove the transient classes.
		this.cells
			.removeClass( "active" )
			.removeClass( "caution" )
		;
		
		// Add the bombed classes to the bombs.
		this.bombCells.addClass( "bombed" );
		
		// Set the cell contents.
		this.cells.each(
			function( index, cellNode ){
				var cell = $( this );
				
				// Check to see if this is a bomb cell.
				if (cell.is( ".bomb" )){
				
					// Show an *.
					cell.html( "*" );
				
				} else if (cell.data( "nearBombs" )){
				
					// Show the count.
					cell.html( cell.data( "nearBombs" ) );
					
				}
			}
		);
	};
	
	
	// I reveal the given cell.
	MineSweeper.prototype.revealCell = function( cell ){
		var self = this;
		
		// Remove the active nature of the cell.
		cell
			.removeClass( "active" )
			.removeClass( "caution" )
		;
	
		// Check to see if the current cell is near any 
		// bombs. If it is, then we'll just show the 
		// current cell and it's nearness. If not, then
		// we'll continue to show the surrounding cells.
		if (cell.data( "nearBombs" )){
		
			// Set the content of the cell.
			cell.html( cell.data( "nearBombs" ) );
			
		} else {
		
			// Make sure the cell has no markup.
			cell.html( "&nbsp;" );
		
			// This cell was not near any bombs. Therefore,
			// it is reasonable to assume the user would
			// quickly reveal all cells around it. As such,
			// we will do that for them.
			cell.data( "near" )
				.filter( ".active" )
					.each(
						function( index, cellNode ){
							self.revealCell( $( this ) );
						}
					)
			;
			
		}
	};
	
	
	// I toggle the cautionary nature and display of the
	// given cell.
	MineSweeper.prototype.toggleCaution = function( cell ){
		// Check to see if there is already a caution on it.
		if (cell.is( ".caution" )){
			
			// Remove caution class.
			cell.removeClass( "caution" );
			
			// Set appropriate markup.
			cell.html( "&nbsp;" );
		
		} else {
		
			// Add caution class.
			cell.addClass( "caution" );
			
			// Set appropriate markup.
			cell.html( "?" );
		
		}
	};
	
	
	// ------------------------------------------------------ //
	// ------------------------------------------------------ //
	
	
	// Store the mine sweeper class in the window scope so
	// that people can reach it ouside of this bubble.
	window.MineSweeper = MineSweeper;

})( jQuery );