// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rowArray = this.rows()[rowIndex]; // returns array at rowIndex
      var counter = 0;

      for (var i = 0; i < rowArray.length; i++) {
        var element = rowArray[i];
        if (element !== 0) {
          counter++;
        }
      }
      return (counter > 1); // fixme
    },

    hasAnyRowConflicts: function() {
      var array = this.rows(); // returns array of arrays;
      var counter = 0;


      for (var i = 0; i < array.length; i++) {
        var subArray = array[i]; //should be an array
        var sum = 0;
        for (var j = 0; j < subArray.length; j++) {
          var element = subArray[j];
          console.log('old sum: ', sum)
          sum += element;
        }

        if (sum > 1) {
          return true;
        }
      }
      return false;
    },
    // test if any rows on this board contain conflicts
    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rowsArray = this.rows(); // array of arrays;
      var sum = 0;

      for (var i = 0; i < rowsArray.length; i++) {
        var element = rowsArray[i]; // array
        sum += element[colIndex];
      }

      return (sum > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rowsArray = this.rows(); // array of arrays
      for (var i = 0; i < rowsArray[0].length; i++) {
        var sum = 0;
        for (var j = 0; j < rowsArray.length; j++) { // 3 times
          sum += rowsArray[j][i];
        }
        console.log(sum);
        if (sum > 1) {
          return true;
        }
      }
      return false; // fixme
    },
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   var conflict = false;
    //   var board = this.attributes;

    //   return conflict; // fixme
    // },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // majorDiagonalColumnIndexAtFirstRow will be starting column index atFirst Row
      // assumes always a perfect square
      // assumes values can't be added off the board


      // [0][majorDiagonalColumnIndexAtFirstRow]
      // [1][majorDiagonalColumnIndexAtFirstRow + 1]
      // [2][majorDiagonalColumnIndexAtFirstRow + 2]
      /// ...
      // [n-1][majorDiagonalColumnIndexAtFirstRow + (n-1)]
      var sum = 0;
      var n = this.attributes.n;
      var rowsArray = this.rows(); // array of array
      //console.log(n);
      for (var i = 0; i < n; i++) {
        element = rowsArray[i][majorDiagonalColumnIndexAtFirstRow + i];
        if (element === undefined) {
          continue;
        }
        sum += element;
      }
      return (sum > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.attributes.n;
      var start = (n * -1) + 1;
      for (var i = start; i < n - 1; i++) {
        var conflict = this.hasMajorDiagonalConflictAt(i);
        if (conflict === true) {
          return conflict;
        }
      }
      return false; // fixme
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    /*
    var matrix = [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    */
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var sum = 0;
      var n = this.attributes.n;
      var rowsArray = this.rows(); // array of arrays
      for (var i = 0; i < rowsArray.length; i++) {
        element = rowsArray[i][minorDiagonalColumnIndexAtFirstRow - i];
        if (element === undefined) {
          continue;
        }
        sum += element;
      }
      console.log(sum);
      return (sum > 1);
    },
    //
    //[0, 1, 0 ,0]
    //[1, 0, 0, 0]
    //[0, 0, 0, 0]
    //[0, 0, 0, 0]
    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;
      var start = n + 1;
      // n = 4;
      // n - 1 = 3;
      // i > 0;
      console.log('matrix: ', this.attributes);
      for (var i = start; i > 0; i--) {
        console.log('start: ', start, 'column index: ', i);
        var conflict = this.hasMinorDiagonalConflictAt(i);
        if (conflict === true) {
          return conflict;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
}());