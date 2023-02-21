"use strict";
function moveTooltip(x, y){
    const tooltip = document.getElementById("tooltip");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (x / windowWidth < 0.8){
        tooltip.style.left = x + 10 + "px";
        tooltip.style.right = "";
    } else {
        tooltip.style.left = "";
        tooltip.style.right = windowWidth - (x + 10) + "px";
    }

    if (y / windowHeight < 0.8){
        tooltip.style.top = y + 10 + "px";
        tooltip.style.bottom = "";
    } else {
        tooltip.style.top = "";
        tooltip.style.bottom = windowHeight - (y + 10) + "px";
    }
}

function toPercent(value){
    if (typeof value === "number"){
        //Keeps one decimal on the final percentage
        return `${Math.round(value * 1000) / 10}%`;
    } else {
        return value;
    }
}