$(function() {
    var undefined;
    var $game            = $('.game');
    var $board           = $game.find('.board');
    var $selected        = $([]);
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

    function makeAnswersArray(board) {
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
    $emptyBoardCells.click( function(e) {
        editCell($(this));
        return;
    });

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

    function editCell($cell) {
      $cell.click(function() {
        var OriginalNumber = $(this).text();
        $(this).addClass("cellEditing");
        $(this).html("<input type='text''/>");
        $(this).children().first().focus();
        $(this).children().first().keypress(function(e) {
          if (e.which == 13) {
            closeCellInput($(this))
            e.preventDefault();
            var newNum = $(this).val();
            $(this).parent().text(newNum);
            $cell.removeClass("cellEditing");
            closeCellInput($cell)
          }
        });
        $(this).children().first().blur(function() {
          $(this).parent().text(OriginalNumber);
          $(this).parent().removeClass("cellEditing");
        });
      });
    };

    function closeCellInput($cell) {
      var text = $cell.text()
      if ($.isNumeric(text)) {
        $cell.removeClass('empty')
        $selected = $([]);
      }
    }
});