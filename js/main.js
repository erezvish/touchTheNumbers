'use strict';
console.log('app script is running');

var gInitData = {
    size: 16, //TODO later refactor to receive from user
    numsTopVal: 100
}
var gNums = [];
var gState = {
    isGameOn: false,
    isUserTurn: false,
    timePassed: 0
}
var $gEls;
var gIntervalClock;

var GAME_TEXTS =  {
    gameTime: 'Game Time',
    nextNumber: 'Next Number',
    chooseLevel: 'Choose Your Level',
    playingMessage: 'Playing',
    winMessage: 'Game Won!',
    loseMessage: 'Game Lost!'
};


$(document).ready(init);

function init() {
    $gEls = {
        nextNum: $('.next-number'),
        timer: $('.timer'),
        status: $('.status')
    }
    runGame();
}

function getInitialState() {
    gState.isGameOn = false;
    gState.isUserTurn = false;
    gState.currNumIdx = 0;
    gState.timePassed = 0;
    toggleVictory();
}


function buildBoard(size, numsTopVal) {
    var board = [];
    for (var i = 1; i <= numsTopVal; i++) {
        board.push(i);
    }
    shuffleArr(board);
    return board.slice(0, size);
}

function renderBoard(board) {
    var $elBoard = $('.board-area');
    // console.log($elBoard);
    var length = board.length;
    var strHTML = '';
    var i = 0;
    while (i < length) {
        var cubeSidesStr = '<div class="cube-face cube-face-back" onclick="cubeClicked(this.parentElement)"></div> <div class="cube-face cube-face-left" onclick="cubeClicked(this.parentElement)"></div> <div class="cube-face cube-face-right" onclick="cubeClicked(this.parentElement)"></div> <div class="cube-face cube-face-top" onclick="cubeClicked(this.parentElement)"></div> <div class="cube-face cube-face-bottom" onclick="cubeClicked(this.parentElement)"></div>'
        strHTML += '<div class="row"> '
        for (var j = 0; j < Math.sqrt(length); j++) {
            var val = board[i];
            strHTML += '<div class = "scene"> <div class="cube"> <div class="cube-face cube-face-front" onclick="cubeClicked(this.parentElement)" id="val' + val + '"> <h2>' + val + '</h2></div>' + cubeSidesStr + '</div> </div>';
            i++;
        }
        strHTML += '</div>';
    }
    $elBoard.html(strHTML);
}

function runGame() {
    getInitialState();
    gNums = buildBoard(gInitData.size, gInitData.numsTopVal);
    renderBoard(gNums);
    shuffleArr(gNums);
    $gEls.status.text(GAME_TEXTS.playingMessage);
    gState.isGameOn = true;
    gIntervalClock = setInterval(function clock() {
        gState.timePassed += 0.1;
        $gEls.timer.text(GAME_TEXTS.gameTime + ' ' + gState.timePassed.toFixed(1));
    }, 100);
    showNextNum();

}

function showNextNum() {
    $gEls.nextNum.text(GAME_TEXTS.nextNumber + ' ' + gNums[gState.currNumIdx]);
    gState.isUserTurn = true;
}

function cubeClicked(elCube) {
    if (!gState.isGameOn || !gState.isUserTurn) return;
    if (+elCube.innerText === gNums[gState.currNumIdx]) {
        // console.log('success, next num')
        gState.currNumIdx++;
        gState.isUserTurn = false;
        toggleElClass(elCube, 'flipped');
        checkWin();
    } else loseGame();

}

function checkWin() {
    if (gState.currNumIdx === gNums.length) {
        // console.log('Win!')
        showVictory();
        gState.isGameOn = false;
        clearInterval(gIntervalClock);
    }
    else showNextNum();
}

function loseGame() {
    // console.log('Too Bad, Lost!');
    gState.isGameOn = false;
    $gEls.status.text(GAME_TEXTS.loseMessage);
    clearInterval(gIntervalClock);
}

function showVictory() {
    var $ElCubes = $('.cube');
    toggleVictory();
    $gEls.status.text(GAME_TEXTS.winMessage);
}

function radioClicked(elRadio) {
    console.log(elRadio);
    gInitData.size = elRadio.value;
}

function toggleVictory() {
var $ElCubes = $('.cube');
    $ElCubes.each(function (index, cube) {
        setTimeout(function(){
            cube.classList.toggle('victory');
        },index * 100);
    });
}