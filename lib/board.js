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
    var $cell = $(this);
    var originalNumber = $cell.text();
    $cell.html("<input type='text'>");
    var $input = $cell.find('input');
    $input.focus().keypress(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        var newNum = $(this).val();
        $cell.text(newNum);
        $selected = newNum
        checkValue(getUserAnswers(), findColumn($cell.siblings()), $cell.parent().attr('id'), newNum)
        closeCellInput($cell);
      }
    });
    $(this).children().first().blur(function() {
      $(this).text(originalNumber);
    });
  });

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
    return answerArray
  };


  function findColumn(row) {
    return row.indexOf($selected);
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