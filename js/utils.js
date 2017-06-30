'use strict';
console.log('utils script is running');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//note - original array will be modified
function shuffleArr(arr) {
    var temp = null;
    for (var i = arr.length - 1; i > 0; i--) {
        var shufflePos = getRandomIntInclusive(0, i);
        temp = arr[i]
        arr[i] = arr[shufflePos]
        arr[shufflePos] = temp
    }
}

//function adds a class to an element(caught with selector) than removes it after a delay
function toggleClassBySelectorTemporary(selector, classToAdd, delay) {
    var element = document.querySelector(selector);
    element.classList.add(classToAdd);
    setTimeout(function () {
        element.classList.remove(classToAdd);
    }, delay);
}

//function adds a class to an element than removes it after a delay
function toggleElClassTemporary(element, classToAdd, delay) {
    element.classList.add(classToAdd);
    setTimeout(function () {
        element.classList.remove(classToAdd);
    }, delay);
}

//adds a class if doesn't exist, otherwise removes it
function toggleElClass(element, targetClass) {
    (element.classList.contains(targetClass)) ? element.classList.remove(targetClass) : element.classList.add(targetClass);
}