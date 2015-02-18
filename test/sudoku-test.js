module ('Sudoku Puzzle Tests');

  var board = '090000006\n' +
              '000960485\n' +
              '000581000\n' +
              '004000000\n' +
              '517200900\n' +
              '602000370\n' +
              '100804020\n' +
              '706000810\n' +
              '300090000';

  var expectedBoard = [
    [0,9,0,0,0,0,0,0,6],
    [0,0,0,9,6,0,4,8,5],
    [0,0,0,5,8,1,0,0,0],
    [0,0,4,0,0,0,0,0,0],
    [5,1,7,2,0,0,9,0,0],
    [6,0,2,0,0,0,3,7,0],
    [1,0,0,8,0,4,0,2,0],
    [7,0,6,0,0,0,8,1,0],
    [3,0,0,0,9,0,0,0,0]
  ];

test('make board into an array', function() {

  function parseBoard(board) {
      return board.split('\n').map(function(row) {
        return row.split('').map(function(num) {
          return +num;
        });
      });
    };

  var parsedBoard = parseBoard(board);

  deepEqual(9, parsedBoard.length);
  deepEqual(9, parsedBoard[0].length);
  deepEqual(parsedBoard, expectedBoard);

});

test('should save all of the empty positions of board', function() {

  var expectedPositions = [
    [0,0],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],
    [1,2],[1,5],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],[3,0],
    [3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[4,4],[4,5],
    [4,7],[4,8],[5,1],[5,3],[5,4],[5,5],[5,8],[6,1],[6,2],
    [6,4],[6,6],[6,8],[7,1],[7,3],[7,4],[7,5],[7,8],[8,1],
    [8,2],[8,3],[8,5],[8,6],[8,7],[8,8]
  ];

  function saveEmptyPositions(board) {
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

  var emptyPositions = saveEmptyPositions(expectedBoard);

  deepEqual(51, emptyPositions.length);
  deepEqual(expectedPositions, emptyPositions);

});

test('check row for values', function(assert) {

  function checkRow(board, row, value) {
    for(var i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
        return i;
      }
    }
    return true;
  };

  assert.ok(checkRow(expectedBoard, 0, 2));
  assert.equal(1, checkRow(expectedBoard, 0, 9));

});

test('check column for values', function(assert) {

  function checkColumn(board, column, value) {
    for(var i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
        return i;
      }
    }
    return true;
  };

  assert.ok(checkColumn(expectedBoard, 0, 9));
  assert.equal(4, checkColumn(expectedBoard, 0, 5));

});

test('check 3x3 values do not match', function(assert) {

  function checkSquare(board, column, row, value) {
    var columnCorner = 0;
    var rowCorner = 0;
    var squareSize = 3;

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

  assert.ok(checkSquare(expectedBoard, 2, 2, 1));
  assert.ok(checkSquare(expectedBoard, 7, 7, 9));
  deepEqual([0, 1], checkSquare(expectedBoard, 2, 2, 9));
  deepEqual([6, 7], checkSquare(expectedBoard, 7, 7, 2));

});

