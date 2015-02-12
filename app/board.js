$(function() {
    var undefined;
    var $game            = $('.game');
    var $board           = $game.find('.board');
    var $boardCells      = $board.find('.cell');
    var $selected        = $([]);

    $(document.body).bind('click', function() {
        if ($selected.length > 0) {
          closeCellInput($selected);
        }
    });

    $boardCells.click( function() {
      $(this).html('<input type="text"/>').find('input').focus();
    })

    $board.on('.cell.empty', 'click', function(e) {
        if ($selected.length > 0) {
          console.log($selected);
          closeCellInput($selected);
        }

        $selected = $(this);
        $selected.html('<input type="text"/>').find('input').focus();

        return;
    });

    $board.on('.cell.empty', 'keydown', function(e) {

        var $this = $(this);
        var $cell = $this.closest('.cell');

        // ENTER, ESC
        if (e.keyCode == 13 || e.keyCode == 27) {
            closeCellInput($cell);

            return;
        }
        // digits between 1-9
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            var number = e.keyCode-48;
            $cell.find('input').val(number);
        }

        return;
    });

    function editCell() {
        $(".cell").click(function() {
            var OriginalNumber = $(this).text();
            $(this).addClass("cellEditing");
            $(this).html("<input type='text' style='font-size: 150%;width: 20px; height: 30px;'/>");
            $(this).children().first().focus();
            $(this).children().first().keypress(function(e) {
                if (e.which == 13) {
                    var newContent = $(this).val();
                    $(this).parent().text(newContent);
                    $(this).parent().removeClass("cellEditing");
                }
            });
            $(this).children().first().blur(function() {
                $(this).parent().text(OriginalContent);
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