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
          if (!cellValue) { cellValue = 0 }
          answerArray[rowIndex][cellIndex] = cellValue
        });
      });
      return answerArray
    };



    var $emptyBoardCells = $board.find('.cell.empty');
    $emptyBoardCells.click(function() {
      var originalNumber = $(this).text();
      $(this).html("<input type='text''/>");
      $(this).children().first().focus();
      $(this).children().first().keypress(function(e) {
        if (e.which == 13) {
          e.preventDefault();
          var newNum = $(this).val();
          $(this).parent().text(newNum);
          $selected = newNum
          checkValue(getUserAnswers(), findColumn($(this).text()), row, newNum)
          closeCellInput($cell)
        }
      });
      $(this).blur(function() {
        $(this).parent().text(originalNumber);
      });
    });

    c
    function findColumn(row) {
      return row.indexOf($selected)
    }

    function findRow()

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

    function closeCellInput($cell) {
      var text = $cell.text()
      if ($.isNumeric(text)) {
        $cell.removeClass('empty')
        $selected = $([]);
      }
    }
});