"use strict";

function toPercent(value){
    if (typeof value === "number"){
        //Keeps one decimal on the final percentage
        return `${Math.round(value * 1000) / 10}%`;
    } else {
        return value;
    }
}

// https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/174921#174921
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
