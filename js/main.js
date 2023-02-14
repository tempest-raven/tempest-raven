elementMainArray = ["Physical","Magic","Ice","Fire","Lightning","Earth","Shadow","Poison"];
elementColorArray = ["0xC40000","0xFB95C8","0x68CBF4","0xFF6600","0xFFCC00","0x856B47","0x664D80","0x508349"];

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
    tooltip.style.left = event.clientX + 10 + "px";
    tooltip.style.top = event.clientY + 10 + "px";
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
    const tooltip = document.getElementById("tooltip");
    tooltip.style.left = event.clientX + 10 + "px";
    tooltip.style.top = event.clientY + 10 + "px";
});

/** @type {Awaited<ReturnType<initLoad>>} */
let gameData;
window.addEventListener('DOMContentLoaded', async (event) => {
    gameData = await initLoad();
    const content = document.getElementById("content");
    gameData.abilities.forEach(a => content.appendChild(renderAbility(a)));
    gameData.buffs.forEach(a => content.appendChild(renderBuff(a)));
});