$(function() {
    var undefined;
    var $game            = $('.game');
    var $board           = $game.find('.board');
    var $boardCells      = $board.find('.cell');
    var $selected        = $([]);
    var board            = null;
    var highlighted      = null;
    var counters         = null;
    var templates        = null;
    var gameLoaderHandle = null;
    var board = '090000006\n' +
              '000960485\n' +
              '000581000\n' +
              '004000000\n' +
              '517200900\n' +
              '602000370\n' +
              '100804020\n' +
              '706000810\n' +
              '300090000';
    var @parsedBoard = parseBoard(board);




    $(document.body).bind('click', function() {
        if ($selected.length > 0) {
            closeCellInput($selected);
        }
    });

    function parseBoard(board) {
      return board.split('\n').map(function(row) {
        return row.split('').map(function(num) {
          return +num;
        });
      });
    };

    $board.delegate('.cell.empty', 'click', function(e) {
        if ($game.hasClass('running') == false) {
            return false;
        }

        e.preventDefault();
        e.stopPropagation();

        if ($selected.length > 0) {
            closeCellInput($selected);
        }

        $selected = $(this);
        $selected.html('<input type="text"/>').find('input').focus();

        highlightCells(null);

        return;
    });

    $board.delegate('.cell.empty', 'keydown', function(e) {

        var $this = $(this);
        var $cell = $this.closest('.cell');

        e.preventDefault();
        e.stopPropagation();

        // ENTER, ESC
        if (e.keyCode == 13 || e.keyCode == 27) {
            closeCellInput($cell);

            return;
        }
        // digits between 1-9
        else if (e.keyCode >= 49 && e.keyCode <= 57) {
            var number = e.keyCode-48;
            $cell.find('input').val(number);
        }

        return;
    });

    $board.delegate('.cell.solved', 'click', handleHighlightTrigger);
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
        var target    = board.solution[index]+1;
        var number    = $cell.find('input').val();
        var complete  = false;

        $cell.empty().removeClass('empty').removeClass('solved').attr('style', null);

        if (number == target) {
            $cell.text(number).addClass('solved');
            counters[number]++;
            highlightCells(number);
            udpateLegend();

            complete = checkComplete();
        }
        else if (number != '') {
            var cell      = $cell[0];
            var animator  = new Animator({duration:750});
            var animation = new ColorStyleSubject(cell, "background-color", "#FF8888", "#FFFFFF");

            $cell.text('').addClass('empty');
            animator.addSubject(animation).play();
        }
        else {
            $cell.text('').addClass('empty');
        }

        $selected = $([]);

        if (complete) {
            highlightCells(null);
            setGameStateClass('complete');

            $menu.data('config', {});
            $menu.data('state', 'complete-singleplayer');
            $menu.data('salutation', 'well done!');
            showMenu();
        }
    }

    function handleHighlightTrigger(e) {
        if ($game.hasClass('running') == false) {
            return false;
        }

        e.preventDefault();

        if ($selected.length > 0) {
            closeCellInput($selected);
        }

        var $this  = $(this);
        var number = $this.text();

        $selected.empty();
        $selected = $([]);

        return;
    }
});