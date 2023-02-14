/**
 * 
 * @param {Ability} ability 
 */
function renderAbility(ability){
    //Skip the "None" move
    if (ability.id === 0){
        return document.createElement("div");
    }
    /** @type {HTMLElement} */
    const element = document.getElementById("abilityTemplate").cloneNode(true);
    element.removeAttribute("id");
    element.setAttribute("x-abilityId", ability.id);
    element.querySelector(".abilityId").textContent = ability.id;
    element.querySelector(".abilityTitle").title = "Localized name: " + ability.localizedName(gameData.langStrings);
    element.querySelector(".abilityName").textContent = ability.name;
    element.querySelector(".abilityCost").textContent = ability.getCostString();
    element.querySelector(".abilityDesc").textContent = ability.localizedDescription(gameData.langStrings);
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
        scalings.push(toPercent(ability.healthScale) + " of maximum Health");
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

    if (ability.accuracyMultiplier !== 1 || ability.critChanceMultiplier){
        element.querySelector(".abilityHitModifiers").classList.remove("hidden");
        element.querySelector(".abilityAccuracy").textContent = toPercent(ability.accuracyMultiplier);
        element.querySelector(".abilityCritChance").textContent = toPercent(ability.critChanceMultiplier ?? 1);
    }
    
    if (ability.focusScale){
        element.querySelector(".abilityFocusScale").classList.remove("hidden");
        element.querySelector(".abilityFocusMulti").textContent = toPercent(ability.focusScale);
        element.querySelector(".abilityBaseMulti").textContent = toPercent(ability.baseMultiplier);
    }

    if (ability.buffId){
        element.querySelector(".abilityBuff").classList.remove("hidden");
        element.querySelector(".abilityBuffChance").textContent = toPercent(ability.buffApplyChance ?? 1);
        element.querySelector(".abilityBuffId").setAttribute("tooltip-data", JSON.parse(ability.buffId));
        element.querySelector(".abilityBuffId").textContent = ability.buffId;
        element.querySelector(".abilityBuffTarget").textContent = ability.buffTarget === 1 ? "self" : "target";
    }

    return element;
}

/**
 * 
 * @param {Buff} buff 
 */
function renderBuff(buff){
    /** @type {HTMLElement} */
    const element = document.getElementById("buffTemplate").cloneNode(true);
    element.removeAttribute("id");

    element.querySelector(".buffName").textContent = buff.localizedName(gameData.langStrings);
    element.querySelector(".buffId").textContent = buff.id;
    element.querySelector(".buffDesc").textContent = buff.localizedDescription(gameData.langStrings);

    const dataEl = element.querySelector(".buffData");
    const attributeEl = element.querySelector(".buffAttributes");
    buff.attributes.forEach((value, id) => {
        let attributeData = Buff.attributeMap.get(id);
        if (attributeData === undefined){
            return;
        }
        let [key, fn] = attributeData;
        let processedValue = fn(value);
        if (processedValue !== null){
            processedValue = ": " + processedValue;
        }
        let newAttributeEl = attributeEl.cloneNode(true);
        newAttributeEl.classList.remove("hidden");
        newAttributeEl.querySelector(".attributeId").textContent = key;
        newAttributeEl.querySelector(".attributeValue").textContent = processedValue;
        dataEl.appendChild(newAttributeEl);
    });
    return element;
}