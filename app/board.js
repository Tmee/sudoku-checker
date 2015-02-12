$(function() {
    var undefined;
    var $game            = $('.game');
    var $board           = $game.find('.board');
    var $emptyBoardCells = $board.find('.cell.empty');
    var $boardCells = $board.find('.cell.empty');
    var $selected        = $([]);

    $(document.body).bind('click', function() {
        if ($selected.length > 0) {
          closeCellInput($selected);
        }
    });

    $emptyBoardCells.click(function(e) {
        if ($selected.length > 0) {
          console.log($selected);
          closeCellInput($selected);
        }

        $cell = $(this);
        editCell($(this));

        return;
    });

    // $emptyBoardCells.on('keydown', function(e) {

    //     var $this = $(this);
    //     var $cell = $this.closest('.cell');

    //     e.preventDefault();
    //     e.stopPropagation();

    //     // ENTER, ESC
    //     if (e.keyCode == 13 || e.keyCode == 27) {
    //         closeCellInput($cell);

    //         return;
    //     }
    //     // digits between 1-9
    //     if (e.keyCode >= 49 && e.keyCode <= 57) {
    //         var number = e.keyCode-48;
    //         $cell.find('input').val(number);
    //     }

    //     return;
    // });

    function editCell($cell) {
      $cell.click(function() {
        var OriginalNumber = $(this).text();
        $(this).addClass("cellEditing");
        $(this).html("<input type='text''/>");
        $(this).children().first().focus();
        $(this).children().first().keypress(function(e) {
          if (e.which == 13) {
            e.preventDefault();
            console.log(newNum)
            console.log(OriginalNumber)
            var newNum = $(this).val();
            $(this).parent().text(newNum);
            $(this).parent().removeClass("cellEditing");
          }
        });
        $(this).children().first().blur(function() {
          $(this).parent().text(OriginalNumber);
          $(this).parent().removeClass("cellEditing");
        });
      });
    };

    function closeCellInput($cell) {
        var index     = $boardCells.index($cell);
        var number    = $cell.find('input').val();
        var complete  = false;

        $cell.empty().removeClass('empty').removeClass('solved').attr('style', null);
        $selected = $([]);
    }
});