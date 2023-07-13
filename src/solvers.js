/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // create a new board obj using n parameter
  // this creates a new board with n rows and n columns, elements in each array are set to 0
  // set n = 5 to check behaivor
  //console.log('board: ', board);
  // solution returns an array of arrays
  // use .rows property to get an array of array of the new board we made
  // iterate through rows
  // iterate through columns
  // set the value at [rows index, column index] to 1
  // we can then check to see if there is a conflict using the property hasAnyRooksConflicts previously made in board.js
  // this returns a bool value
  // check if conflicts occur
  // if the value returns true set that row index at column index to 0
  // eventually the board will finish iterating and all conflicts should be resolved
  // return the solution
  var board = new Board({'n': n});
  var solution = board.rows();

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // get factorial of n (permutations) n!/(n - r)!
  // first rook can be on any row or col so n^2
  // second rook cant be in the same row or column so (n-1)^2
  // set solutionCount to 1 as 0! = 1 so if we have 0 rooks there is 1 solution (way) for no rooks to on the 1x1 chess board
  // there can never be zero solutions as n (objects/choices) is equal to the number of ways we can choose [row][col] (r objects)
  // iterate until we reach n
  // solution count = solutionCount * (n - i)
  // for example n = 5
  // i = 0  (5 - 0) => 1 = 1 * 5 = 5
  // i = 1  (5 - 1) => 5 = 5 * 4 = 20
  // i = 2  (5 - 2) => 20 = 20 * 3 = 60
  // i = 3  (5 - 3) => 60 = 60 * 2 = 120
  // i = 4  (5 - 4) => 120 = 120 * 1 = 120
  var solutionCount = 1;
  for (var i = 0; i < n; i++) {
    solutionCount = solutionCount * (n - i);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log('test with n: ', n, ' queens');
  var solution = [];

  var boardNavigator = function(board, row) {
    if (row === n) {
      solution = board.rows();
      return solution;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
        if (board.hasAnyQueensConflicts() === false) {
          var newBoard = boardNavigator(board, row + 1);
          // if row +1 not in board
          if (newBoard !== undefined) {
            return newBoard;
          }
        }
        board.togglePiece(row, col);
      }
    }
  };

  if (n === 2 || n === 3) {
    var board = new Board({'n': n});
    var solution = board.rows();
  } else {
    boardNavigator(new this.Board({'n': n}), 0);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  // testing -----

  // console.log('test with n: ', n, ' queens');
  var solutionCount = 0;
  var boardNavigator = function(board, row) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var col = 0; col < n; col++) {
        //togglePiece on
        board.togglePiece(row, col);
        // working code here:
        if (board.hasAnyQueenConflictsOn(row, col) === false) {
          var newBoard = boardNavigator(board, row + 1);
        }
        board.togglePiece(row, col);
        // remove return newBoard here
      }
    }
  };
  boardNavigator(new this.Board({'n': n}), 0);
  // testing -----
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};