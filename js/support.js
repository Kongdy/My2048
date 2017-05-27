/**
 * Created by e9060 on 2017/5/27.
 *
 *  支持js
 */

'use strict'

var document_width = window.screen.availWidth;
var checkerboard_width =  0.92*document_width;
var cell_side_length = 0.18*document_width;
var cell_space = 0.04*document_width;

function get_pos_top(i,j) {
    return cell_space+i*(cell_space+cell_side_length);
}

function get_pos_left(i,j) {
    return cell_space+j*(cell_space+cell_side_length);
}

function getBackgroundColorByNumber(number) {
    switch (number)
    {
        case 2:return '#eee4da';break;
        case 4:return '#ede0c8'; break;
        case 8:return '#f2b179'; break;
        case 16:return '#f59563'; break;
        case 32:return '#f67c5f'; break;
        case 64:return '#f65e3b'; break;
        case 128:return '#edcf72'; break;
        case 256:return '#edcc61'; break;
        case 512:return '#9c0'; break;
        case 1024:return '#33b5e5'; break;
        case 2048:return '#09c'; break;
        case 4096:return '#a6c'; break;
        case 8192:return '#93c'; break;
    }
    return 'black';
}

function getNumberColor(number) {
    if(number < 8)
        return '#776e65';
    return 'white';
}

