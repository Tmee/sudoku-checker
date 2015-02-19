var parseBoard = function(board) {
  return board.split('\n').map(function(row) {
    return row.split('').map(function(num) {
      return +num;
    });
  });
};

var checkRow = function(board, row, value) {
  for(var i = 0; i < board[row].length; i++) {
    console.log(board[row][i], value);
    if(board[row][i] === value) {
      return false;
    }
  }
  return true;
};

var checkColumn = function(board, column, value) {
  for(var i = 0; i < board.length; i++) {
    if(board[i][column] === value) {
      return false;
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
        return false;
      }
    }
  }
  return true;
};

var checkValue = function(board, column, row, value) {
  if(this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.checkSquare(board, column, row, value)) {
    return true;
  } else {
    return false;
  }
};