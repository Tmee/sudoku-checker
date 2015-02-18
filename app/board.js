$(function() {
    var undefined;
    var $game            = $('.game');
    var $board           = $game.find('.board');
    var $emptyBoardCells = $board.find('.cell.empty');
    var $selected        = $([]);

    $(document.body).bind('click', function() {
        if ($selected.length > 0) {
          closeCellInput($selected);
        }
    });

    $emptyBoardCells.click( function(e) {
        if ($selected.length > 0) {
          console.log($selected);
          closeCellInput($selected);
        }
        editCell($(this));
        return;
    });

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