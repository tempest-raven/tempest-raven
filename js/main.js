elementMainArray = ["Physical","Magic","Ice","Fire","Lightning","Earth","Shadow","Poison"];
elementColorArray = ["0xC40000","0xFB95C8","0x68CBF4","0xFF6600","0xFFCC00","0x856B47","0x664D80","0x508349"];

/**
 * 
 * @param {Ability} ability 
 */
function renderAbility(ability){
    //Skip the "None" move
    if (ability.id === 0){
        return;
    }
    /** @type {HTMLElement} */
    const element = document.getElementById("abilityTemplate").cloneNode(true);
    element.removeAttribute("id");
    element.setAttribute("x-abilityId", ability.id);
    element.querySelector(".abilityId").textContent = ability.id;
    element.querySelector(".abilityName").textContent = ability.name;
    element.querySelector(".abilityCost").textContent = ability.getCostString();
    element.querySelector(".abilityDesc").textContent = ability.localizedDescription();
    element.querySelector(".abilityElement").textContent = (JSON.parse(ability.element) ?? "Physical") + " type";

    let scalings = [];
    if (ability.strengthScale){
        scalings.push(toPercent(ability.strengthScale) + " Strength");
    }
    if (ability.instinctScale){
        scalings.push(toPercent(ability.instinctScale) + " Instinct");
    }
    if (ability.speedScale){
        scalings.push(toPercent(ability.speedScale) + " Speed");
    }
    if (ability.healthScale){
        scalings.push(toPercent(ability.healthScale) + " Health");
    }
    if (ability.flatModifier){
        scalings.push(ability.flatModifier);
    }
    const scaleString = scalings.join(" + ").replaceAll("_root.hackMove[2]", toPercent(ability.strengthScale));
    element.querySelectorAll(".abilityScale")
        .forEach(span => span.textContent = scaleString);
    
    const targets = [];
    ability.canTargetSelf ? targets.push("self") : null;
    ability.canTargetAlly ? targets.push("ally") : null;
    ability.canTargetEnemy ? targets.push("enemy") : null;
    if (scaleString !== ""){
        element.querySelector(`.abilityEffect[x-effect="${ability.moveType}"]`).classList.remove("hidden");
    }
    
    element.querySelector(".abilityTargets").textContent = "Targets " + targets.join("/");
    
    if (ability.buffElementReqCount){
        element.querySelector(".abilityRequirements").classList.remove("hidden");
        element.querySelector(".abilityReqCount").textContent = ability.buffElementReqCount;
        element.querySelector(".abilityReqType").textContent = ability.buffElementRequirement;
    }

    if (ability.dispelCount){
        element.querySelector(".abilityDispel").classList.remove("hidden");
        element.querySelector(".abilityDispelCount").textContent = ability.dispelCount;
        element.querySelector(".abilityDispelArray").textContent = ability.dispelElementArray.join(", ");
        element.querySelector(".abilityDispelPositive").classList.toggle("hidden", ability.dispelPositive === 1);
    }

    element.querySelector(".abilityAccuracy").textContent = toPercent(ability.accuracyMultiplier ?? 1);
    element.querySelector(".abilityCritChance").textContent = toPercent(ability.critChanceMultiplier ?? 1);
    
    if (ability.focusScale){
        element.querySelector(".abilityFocusScale").classList.remove("hidden");
        element.querySelector(".abilityFocusMulti").textContent = toPercent(ability.focusScale);
        element.querySelector(".abilityBaseMulti").textContent = toPercent(ability.baseMultiplier);
    }

    if (ability.buffId){
        element.querySelector(".abilityBuff").classList.remove("hidden");
        element.querySelector(".abilityBuffChance").textContent = toPercent(ability.buffApplyChance ?? 1);
        element.querySelector(".abilityBuffId").textContent = ability.buffId;
        element.querySelector(".abilityBuffTarget").textContent = ability.buffTarget === 1 ? "self" : "target";
    }

    document.getElementById("content").appendChild(element);
}

function toPercent(value){
    if (typeof value === "number"){
        //Keeps one decimal on the final percentage
        return `${Math.round(value * 10) * 10}%`;
    } else {
        return value;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    initLoad();
});