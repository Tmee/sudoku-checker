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

  var expectedPositions = [
    [0,0],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],
    [1,2],[1,5],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],[3,0],
    [3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[4,4],[4,5],
    [4,7],[4,8],[5,1],[5,3],[5,4],[5,5],[5,8],[6,1],[6,2],
    [6,4],[6,6],[6,8],[7,1],[7,3],[7,4],[7,5],[7,8],[8,1],
    [8,2],[8,3],[8,5],[8,6],[8,7],[8,8]
  ];

test('make board into an array', function() {

  var parsedBoard = parseBoard(board);

  deepEqual(9, parsedBoard.length);
  deepEqual(9, parsedBoard[0].length);
  deepEqual(parsedBoard, expectedBoard);

});

test('should save all of the empty positions of board', function() {

  var emptyPositions = saveEmptyPositions(expectedBoard);

  deepEqual(51, emptyPositions.length);
  deepEqual(expectedPositions, emptyPositions);

});

test('check row for values', function(assert) {

  assert.ok(checkRow(expectedBoard, 0, 2));
  assert.equal(false, checkRow(expectedBoard, 0, 9));

});

test('check column for values', function(assert) {

  assert.ok(checkColumn(expectedBoard, 0, 9));
  assert.equal(false, checkColumn(expectedBoard, 0, 5));

});

test('check 3x3 values do not match', function(assert) {

  assert.ok(checkSquare(expectedBoard, 2, 2, 1));
  assert.ok(checkSquare(expectedBoard, 7, 7, 9));
  assert.equal(false, checkSquare(expectedBoard, 2, 2, 9));
  assert.equal(false, checkSquare(expectedBoard, 7, 7, 2));

});

test('check values valid for position', function(assert) {

  assert.ok(checkValue(expectedBoard, 0, 0, 2));
  assert.ok(checkValue(expectedBoard, 3, 7, 3));
  assert.equal(false, checkValue(expectedBoard, 0, 0, 9));
  assert.equal(false, checkValue(expectedBoard, 3, 7, 1));

});


