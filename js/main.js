"use strict";

function showPage(pagename){
    document.querySelectorAll(".contentPage").forEach(el => el.classList.add("hidden"));
    document.querySelector(".contentPage#" + pagename).classList.remove("hidden");
}

document.getElementById("navbar").addEventListener("click", event => {
    /** @type {HTMLElement} */
    let target = event.target;
    if (!target.classList.contains("navbutton")){
        return false;
    }
    showPage(target.getAttribute("x-page"));
})

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
            value = Math.round(+value * 100);
        }
        el.value = value;
    }
    showPage("editAbility");
})

document.addEventListener("submit", event => {
    event.preventDefault();

    /** @type {HTMLFormElement} */
    const form = event.target;
    if (form.getAttribute("id") !== "abilityForm") {
        return false;
    }
    /** @type {Ability} */
    let ability;
    let id = form.elements.namedItem("id").value;
    if (id === ""){
        ability = new Ability();
        let index = gameData.abilityScript.length;
        while (id === "" || index > 0) {
            const element = gameData.abilityScript[index];
            if (element instanceof Ability){
                id = element.id + 1;
            }
            index--;
        }
        ability.id = id;
        gameData.abilities.set(id, ability);
        gameData.abilityScript.push(ability);
    } else {
        ability = gameData.abilities.get(+id);
    }
    const data = new FormData(form);
    const formElements = Array.from(form.elements)
        .filter(e => e.name && e.name !== "id");
    for (let element of formElements){
        let name = element.name;
        let value = element.value;
        if (element.type === "checkbox"
        && !element.checked) {
            value = element.getAttribute("x-unchecked");
        }
        if (element.type === "radio"
        && !element.checked) {
            continue;
        }
        if (element.getAttribute("x-array") !== null){
            value = data.getAll(name);
        }
        if (element.classList.contains("percent")
            && isNumeric(value)){
            value = +value / 100;
        }
        if (isNumeric(value)){
            value = +value;
        }
        if (element.type === "color"){
            value = value.replace("#", "0x");
        }
        if (value === "") {
            value = null;
        }
        ability[name] = value;
    }
    showPage("abilityList");
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