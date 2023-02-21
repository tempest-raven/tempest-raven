"use strict";

document.getElementById("navbar").addEventListener("click", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.classList.contains("navbutton")){
        return false;
    }
    document.querySelectorAll(".contentPage").forEach(el => el.classList.add("hidden"));
    document.querySelector(".contentPage#" + target.getAttribute("x-view")).classList.remove("hidden");
})

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

/** @type {Awaited<ReturnType<initLoad>>} */
let gameData;
window.addEventListener('DOMContentLoaded', async (event) => {
    loadHTML();
    gameData = await loadGameScripts();
    const abilityEl = document.getElementById("abilityList");
    gameData.abilities.forEach(a => abilityEl.appendChild(renderAbility(a)));
    
    const buffEl = document.getElementById("buffList");
    gameData.buffs.forEach(a => buffEl.appendChild(renderBuff(a)));
});