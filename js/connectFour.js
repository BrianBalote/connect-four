// START
(function (c4, $, undefined) {

    'use strict'

    var cells = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ];

    var winner = '';
    var isCurrentPlayerRed = true;
    var target = 4;

    function checkVertical(row, col) {
        var count = 0;
        if (cells[row][col] != '') {
            for (var offset = 1; offset < target; offset++) {
                if (cells[row + offset][col] != cells[row][col]) {
                    return;
                }
                count++;
            }
        }
        if (count == target - 1) {
            winner = cells[row][col];
        }
    }

    function checkHorizontal(row, col) {
        var count = 0;
        if (cells[row][col] != '') {
            for (var offset = 1; offset < target; offset++) {
                if (cells[row][col + offset] != cells[row][col]) {
                    return;
                }
                count++;
            }
        }
        if (count == target - 1) {
            winner = cells[row][col];
        }
    }

    function checkDiagonalRight(row, col) {
        var count = 0;
        if (cells[row][col] != '') {
            for (var offset = 1; offset < target; offset++) {
                if (cells[row + offset][col + offset] != cells[row][col]) {
                    return;
                }
                count++;
            }
        }
        if (count == target - 1) {
            winner = cells[row][col];
        }
    }

    function checkDiagonalLeft(row, col) {
        var count = 0;
        if (cells[row][col] != '') {
            for (var offset = 1; offset < target; offset++) {
                if (cells[row + offset][col - offset] != cells[row][col]) {
                    return;
                }
                count++;
            }
        }
        if (count == target - 1) {
            winner = cells[row][col];
        }
    }

    function checkIfCompleted() {

        var moveCtr = 0;

        for (var row = 0; row < cells.length; row++) {
            for (var col = 0; col < cells[row].length; col++) {
                if (row + target < cells[row].length) {
                    checkVertical(row, col);
                }
                if (col + target - 1 <= cells.length) {
                    checkHorizontal(row, col);
                }
                if (row + target < cells[row].length && col >= target - 1) {
                    checkDiagonalLeft(row, col);
                }
                if (row + target < cells[row].length && col + target - 1 <= cells.length) {
                    checkDiagonalRight(row, col);
                }

                if (cells[row][col] != '') {
                    moveCtr++;
                }
            }
        }

        if (moveCtr == 42) {
            winner = 'draw';
        }
    }

    function checkWinner() {
        if (winner == 'red') {
            $('#red_wins_text').show();
            $('#red_turn_text').hide();
            $('#yellow_turn_text').hide();
        } else if (winner == 'yellow') {
            $('#yellow_wins_text').show();
            $('#red_turn_text').hide();
            $('#yellow_turn_text').hide();
        } else if (winner == 'draw') {
            $('#red_wins_text').hide();
            $('#red_turn_text').hide();
            $('#yellow_wins_text').hide();
            $('#yellow_turn_text').hide();
            $('#draw_text').show();
        }
    }

    function updateBoard(col, color) {

        for (var row = 0; row < cells.length; row++) {
            if (cells[row][col] == '') {

                cells[row][col] = color;
                $('#r' + row + 'c' + col).removeClass('white').addClass(color);

                return true;
            }
        }

        return false;
    }

    c4.reset = function() {

        isCurrentPlayerRed = true;
        winner = '';
        for (var row = 0; row < cells.length; row++) {
            for (var col = 0; col < cells[row].length; col++) {

                cells[row][col] = '';

                $('#r' + row + 'c' + col).removeClass();
                $('#r' + row + 'c' + col).addClass('circle white');
            }
        }

        $('#red_wins_text').hide();
        $('#red_turn_text').show();
        $('#yellow_wins_text').hide();
        $('#yellow_turn_text').hide();
        $('#draw_text').hide();
    }

    c4.onCircleClick = function (row, col) {

        if (winner != '') {
            return;
        } else {
            if (isCurrentPlayerRed) {
                updateBoard(col, 'red');
                isCurrentPlayerRed = false;
                $('#red_turn_text').hide();
                $('#yellow_turn_text').show();
            } else {
                updateBoard(col, 'yellow');
                isCurrentPlayerRed = true;
                $('#red_turn_text').show();
                $('#yellow_turn_text').hide();
            }
        }

        checkIfCompleted();
        checkWinner();
    }

    // TODO AI

}(window.c4 = window.c4 || {}, jQuery));

// END