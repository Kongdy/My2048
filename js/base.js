/**
 * Created by e9060 on 2017/5/27.
 */
'use strict'

var board = new Array(4);
var score = 0;
var SUCCESS_STRING = "Success";
var GAMER_OVER_STRING = "Game Over";
/**
 *  网页打开初始化
 */
$(document).ready(function () {
    prepareForPhone();
    newGame();
});
/**
 * 注册监听事件
 */
$(document).keydown(function (event) {
    if($('#game_score').text() == SUCCESS_STRING)
    {
        newGame();
        return;
    }
    switch (event.keyCode)
    {
        case 37: //left
            moveLeft();
            break;
        case 38://top
            moveTop();
            break;
        case 39://right
            moveRight();
            break;
        case 40://bottom
            moveBottom();
            break;
        default:
            return;
    }
    generateOneNumber();
    setTimeout("updateBoardView()",220);
});
/**
 *  开始一局新的游戏
 */
function newGame() {
    init();
    // 生成两个数字
    generateOneNumber();
    generateOneNumber();
}


/**
 * 随机生成一个数字
 */
function generateOneNumber() {
    if(nospace(board))
        return false;

    var randX = parseInt(Math.floor(Math.random()*4));
    var randY = parseInt(Math.floor(Math.random()*4));
    var time = 0; // 循环次数,50为界限，超过50不再随机

    while (time < 50)
    {
        if(board[randX][randY] == 0)
        {
            break;
        }
        randX = parseInt(Math.floor(Math.random()*maxRaw));
        randY = parseInt(Math.floor(Math.random()*maxColumn));
        time++;
    }

    if(time >= 50)
    {
        for(var i = 0;i < maxRaw;i++)
        {
            for(var j = 0;j< maxColumn;j++)
            {
                if(board[i][j] == 0)
                {
                    randX = i;
                    randY = j;
                }
            }
        }
    }

    var randomNumber = Math.random() < 0.5?2:4;
    board[randX][randY] = randomNumber;
    showNumberWithAnimation(randX,randY,randomNumber);
    return true;
}
/**
 * 整体向左移动
 */
function moveLeft() {
    for(var i = 0;i < maxColumn ;i++)
    {
        for(var j = 0;j < maxRaw ;j++)
        {
            if(board[i][j] != 0)
            {
                var finalToK = -1;
                for(var k = j-1;k >= 0;k--)
                {
                    if(board[i][k] == 0)
                    {
                        finalToK = k;
                    } else if(board[i][k] == board[i][j]) {
                        showMoveWithAnimation(i,j,i,k);
                        board[i][k] = board[i][j]*2;
                        board[i][j] = 0;

                        score += board[i][k];

                        updateScore(score);

                        break;
                    } else {
                        break;
                    }
                }
                if(finalToK >= 0){
                    showMoveWithAnimation(i,j,i,finalToK);
                    board[i][finalToK] = board[i][j];
                    board[i][j] = 0;
                }
            }
        }
    }
}
/**
 * 整体向右移动
 */
function moveRight() {
    for(var i = 0;i < maxColumn;i++)
    {
        for(var j = maxRaw-1;j >= 0;j--)
        {
            if(board[i][j] > 0)
            {
                var finalToK = -1;
                for(var k = j+1;k < maxRaw;k++)
                {
                    if(board[i][k] == 0)
                    {
                        finalToK = k;
                    } else if(board[i][k] == board[i][j]) {

                        showMoveWithAnimation(i,j,i,k);
                        board[i][k] = board[i][j]*2;
                        board[i][j] = 0;
                        score += board[i][k];

                        updateScore(score);

                        break;
                    } else {
                        break;
                    }
                }

                if(finalToK >= 0)
                {
                    showMoveWithAnimation(i,j,i,finalToK);
                    board[i][finalToK] = board[i][j];
                    board[i][j] = 0;
                }
            }
        }
    }
}
/**
 * 整体向上移动
 */
function moveTop() {
    for(var j = 0;j < maxRaw;j++)
    {
        for(var i = 0 ;i < maxColumn ;i++)
        {
            var finalToK = -1;
            for(var k = i-1;k >= 0;k--)
            {
                if(board[k][j] == 0)
                {
                    finalToK = k;
                } else if(board[k][j] == board[i][j]) {
                    showMoveWithAnimation(i,j,k,j);
                    board[k][j] = board[i][j]*2;
                    board[i][j] = 0;

                    score += board[k][j];

                    updateScore(score);

                    break;
                } else {
                    break;
                }
            }

            if(finalToK >= 0)
            {
                showMoveWithAnimation(i,j,finalToK,j);
                board[finalToK][j] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}
/**
 * 整体向下移动
 */
function moveBottom() {
    for(var j = 0;j < maxRaw;j++)
    {
        for(var i = maxColumn-1;i >= 0 ;i--)
        {
            var finalToK = -1;
            for(var k = i+1;k < maxColumn;k++)
            {
                if(board[k][j] == 0)
                {
                    finalToK = k;
                } else if(board[k][j] == board[i][j]) {
                    showMoveWithAnimation(i,j,k,j);
                    board[k][j] = board[i][j]*2;
                    board[i][j] = 0;

                    score += board[k][j];

                    updateScore(score);
                    break;
                } else {
                    break;
                }
            }

            if(finalToK >= 0)
            {
                showMoveWithAnimation(i,j,finalToK,j);
                board[finalToK][j] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}

/**
 * 初始化棋盘
 */
function init() {
    // row
    for(var i = 0;i < maxRaw;i++)
    {
        board[i] = new Array(maxColumn);
        // column
        for(var j = 0;j < maxColumn;j++)
        {
            board[i][j] = 0;
            var grid_cell = $('#grid_cell_'+i+'_'+j);
            grid_cell.css('top',get_pos_top(i,j));
            grid_cell.css('left',get_pos_left(i,j));
        }
    }
    createBoardView();
    score = 0;
    updateScore(score);
}

/**
 * 刷新棋盘上产生的数字
 */
function createBoardView() {
    var numberCellClass =  $('.number_cell');
    numberCellClass.remove();
    for(var i = 0;i < maxRaw;i++)
    {
        for(var j = 0;j < maxColumn;j++)
        {
            $('#checker_board').append('<div class="number_cell" id="number_cell_'+i+'_'+j+'" ></div>');
            var numberCell = $('#number_cell_'+i+'_'+j);

            if(board[i][j] == 0)
            {
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',get_pos_top(i,j)+cell_side_length/2);
                numberCell.css('left',get_pos_left(i,j)+cell_side_length/2);

            } else {
                numberCell.css('width',cell_side_length);
                numberCell.css('height',cell_side_length);
                numberCell.css('top',get_pos_top(i,j));
                numberCell.css('left',get_pos_left(i,j));
                numberCell.css('background-color',getBackgroundColorByNumber(board[i][j]));
                numberCell.css('color',getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
    numberCellClass.css('line-height',cell_side_length+'px');
    numberCellClass.css('font-size',0.6*cell_side_length+'px');
}

/**
 * 刷新棋盘上产生的数字
 */
function updateBoardView() {
    for(var i = 0;i < maxRaw;i++)
    {
        for(var j = 0;j < maxColumn;j++)
        {
            var numberCell = $('#number_cell_'+i+'_'+j);

            if(board[i][j] == 0)
            {
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.text("");
                numberCell.css('background-color','#00000000');
                numberCell.css('color','#00000000');
            } else {
                numberCell.css('width',cell_side_length);
                numberCell.css('height',cell_side_length);
                numberCell.css('top',get_pos_top(i,j));
                numberCell.css('left',get_pos_left(i,j));
                numberCell.css('background-color',getBackgroundColorByNumber(board[i][j]));
                numberCell.css('color',getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
}

function updateScore(score) {
    $('#game_score').text(score);
}

/**
 * 兼容pc和phone
 */
function  prepareForPhone() {
    if(document_width > 500)
    {
        checkerboard_width = 500;
        cell_side_length = 100;
        cell_space = 20;
    }

    var checkBoard = $('#checker_board');
    checkBoard.css('width',checkerboard_width-cell_space*2);
    checkBoard.css('height',checkerboard_width-cell_space*2);
    checkBoard.css('padding',cell_space);
    checkBoard.css('border-radius',0.02*checkerboard_width);

    var grid_cell = $('.grid_cell');
    grid_cell.css('width',cell_side_length);
    grid_cell.css('height',cell_side_length);
    grid_cell.css('border-radius',0.02*checkerboard_width);
}
