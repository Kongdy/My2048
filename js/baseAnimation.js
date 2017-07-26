/**
 * Created by e9060 on 2017/5/27.
 *
 * 动画呈现js
 */


/**
 * 动画显示随机生成的数字
 * @param i
 * @param j
 * @param randomNumer
 */
function showNumberWithAnimation(i,j,randomNumber) {
    var numberCell = $('#number_cell_'+i+"_"+j);
    numberCell.css('background-color',getBackgroundColorByNumber(randomNumber));
    numberCell.css('color',getNumberColor(randomNumber));
    numberCell.css('top',get_pos_top(i,j));
    numberCell.css('left',get_pos_left(i,j));
    numberCell.text(randomNumber);
    numberCell.animate(
        {
            width:cell_side_length,
            height:cell_side_length
        },500
    );
}

function showMoveWithAnimation(orI,orJ,toI,toJ) {
    var numberCell = $('#number_cell_'+orI+'_'+orJ);
    numberCell.animate(
        {
            top:get_pos_top(toI,toJ),
            left:get_pos_left(toI,toJ)
        },220
    );
}

