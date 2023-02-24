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

document.addEventListener("click", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.classList.contains("abilityEdit")){
        return false;
    }
    let abilityId = +target.getAttribute("x-abilityId");
    let ability = gameData.abilities.get(abilityId);
    let form = document.getElementById("abilityForm");
    form.reset();
    for (let [name, value] of Object.entries(ability)){
        const el = form.elements[name];
        if (el === undefined){
            continue;
        }
        
        if (Array.isArray(value)){
            for (const checkbox of el){
                checkbox.checked = value.includes(checkbox.value);
            }
            continue;
        }
        if (el.type === "checkbox") {
            el.checked = el.value == value;
            continue;
        }
        if (el.type === "color"){
            el.value = value.replace("0x", "#");
            continue;
        }
        if (el.classList 
            && el.classList.contains("percent")
            && isNumeric(value)){
            value = value * 100;
        }
        el.value = value;
    }
    document.querySelectorAll(".contentPage").forEach(el => el.classList.add("hidden"));
    document.querySelector(".contentPage#editAbility").classList.remove("hidden");
})

document.addEventListener("click", event => {
    console.log(2);
    return false;
})

/** @type {Awaited<ReturnType<loadGameScripts>>} */
let gameData;
window.addEventListener('DOMContentLoaded', async (event) => {
    loadHTML();
    gameData = await loadGameScripts();
    const abilityEl = document.getElementById("abilityList");
    gameData.abilities.forEach(a => abilityEl.appendChild(renderAbility(a)));
    
    const buffEl = document.getElementById("buffList");
    gameData.buffs.forEach(a => buffEl.appendChild(renderBuff(a)));
});