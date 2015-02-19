// For future functionality
module.exports.solvePuzzle = function(board, emptyPositions) {
  var limit = 9,
      i, row, column, value, found;
  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    value = board[row][column] + 1;
    found = false;

    while(!found && value <= limit) {
      if(this.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      }
      else {
        value++;
      }
    }

    if(!found) {
      board[row][column] = 0;
      i--;
    }
  }

  board.forEach(function(row) {
    console.log(row.join());
  });

  return board;
};

module.exports.solveSudoku = function(board) {
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptyPositions(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptyPositions);
};