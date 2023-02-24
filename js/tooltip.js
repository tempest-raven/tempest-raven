"use strict";

document.addEventListener("mouseover", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.getAttribute || target.getAttribute("tooltip-type") === null){
        return false;
    }
    let tooltipType = target.getAttribute("tooltip-type");
    let tooltipData = target.getAttribute("tooltip-data");
    const functionMap = {
        "ability": renderAbility,
        "buff": renderBuff
    }
    const dataMap = {
        "ability": gameData.abilities,
        "buff": gameData.buffs
    }
    const fn = functionMap[tooltipType];
    const element = dataMap[tooltipType].get(tooltipData);
    const tooltip = document.getElementById("tooltip");
    tooltip.appendChild(fn(element));
    moveTooltip(event.clientX, event.clientY);
    tooltip.classList.remove("hidden");
});

document.addEventListener("mouseout", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.getAttribute || target.getAttribute("tooltip-type") === null){
        return false;
    }
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.add("hidden");
    while (tooltip.firstChild){
        tooltip.removeChild(tooltip.lastChild);
    }
})

document.addEventListener("mousemove", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.getAttribute || target.getAttribute("tooltip-type") === null){
        return false;
    }
    moveTooltip(event.clientX, event.clientY);
});

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