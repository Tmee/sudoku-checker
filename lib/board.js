$(function() {
  var undefined;
  var $game         = $('.game');
  var $board        = $game.find('.board');
  var $selected     = ([])
  var expectedBoard = [[0,9,0,0,0,0,0,0,6],
                      [0,0,0,9,6,0,4,8,5],
                      [0,0,0,5,8,1,0,0,0],
                      [0,0,4,0,0,0,0,0,0],
                      [5,1,7,2,0,0,9,0,0],
                      [6,0,2,0,0,0,3,7,0],
                      [1,0,0,8,0,4,0,2,0],
                      [7,0,6,0,0,0,8,1,0],
                      [3,0,0,0,9,0,0,0,0]
                    ];

  // Create the board
  $('.row').each(function (rowIndex, row) {
    $(this).find('.cell').each(function (cellIndex, cell) {
      var cellValue = expectedBoard[rowIndex][cellIndex];
      if (cellValue) {
        $(this).text(cellValue);
        $(this).addClass('set');
      }
      else {
        $(this).addClass('empty');
      }
    });
  });
  //  finish board

  var $emptyBoardCells = $board.find('.cell.empty');
  $emptyBoardCells.click(function() {
    var lastPlayOnBoard = getUserAnswers();
    var $cell = $(this);
    $cell.html("<input type='text'>");
    var $input = $cell.find('input');
    $input.focus().keypress(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        var newNum = $(this).val();
        $cell.text(newNum);
        $selected = newNum
        var columnNumber = findColumn($cell.siblings().andSelf());
        var rowNumber = parseInt($cell.parent().attr('id')) - 1;
        var valueNumber = toInt($selected);
        console.log(columnNumber, rowNumber, valueNumber);
        if (!checkValue(lastPlayOnBoard, columnNumber, rowNumber, valueNumber)) {
          $cell.addClass('incorrect');
          $cell.removeClass('correct');
        } else {
          $cell.addClass('correct');
          $cell.removeClass('incorrect');
        }
      closeCellInput($cell);
      }
    });
  });

  function toInt(string) {
    return parseInt(string);
  }

  function getUserAnswers() {
    var answerArray = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];

    $('.row').each(function (rowIndex, row) {
      $(this).find('.cell').each(function (cellIndex, cell) {
        var cellValue = parseInt($(this).text());
        if (!cellValue) { cellValue = 0 };
        answerArray[rowIndex][cellIndex] = cellValue;
      });
    });
    console.log('answerArray' + answerArray);
    return answerArray
  };


  function findColumn(row) {
    text = [];
    for (var i = 0; i < row.length; i++) {
      text.push($(row[i]).text())
    }
    return text.indexOf($selected);
  };

  var reset = function () {
    $('.row').each(function (rowIndex, row) {
      $(this).find('.cell').each(function (cellIndex, cell) {
        var cellValue = expectedBoard[rowIndex][cellIndex];
        if (cellValue) {
          $(this).text(cellValue);
          $(this).addClass('set');
        }
        else {
          $(this).addClass('empty');
        }
      });
    });
  }

  function closeCellInput(cell) {
    var text = cell.text()
    if ($.isNumeric(text)) {
      cell.removeClass('empty');
      $selected = $([]);
    }
  }
});