var parseBoard = function(board) {
  return board.split('\n').map(function(row) {
    return row.split('').map(function(num) {
      return +num;
    });
  });
};

var saveEmptyPositions = function(board) {
  var emptyPositions = [];

  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }

  return emptyPositions;
};

var checkRow = function(board, row, value) {
  for(var i = 0; i < board[row].length; i++) {
    if(board[row][i] === value) {
      return i;
    }
  }
  return true;
};

var checkColumn = function(board, column, value) {
  for(var i = 0; i < board.length; i++) {
    if(board[i][column] === value) {
      return i;
    }
  }
  return true;
};

var checkSquare = function(board, column, row, value) {
  var columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

      while(column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  while(row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  for(var i = rowCorner; i < rowCorner + squareSize; i++) {
    for(var j = columnCorner; j < columnCorner + squareSize; j++) {
      if(board[i][j] === value) {
        return [i, j];
      }
    }
  }
  return true;
};