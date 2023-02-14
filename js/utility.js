function toPercent(value){
    if (typeof value === "number"){
        //Keeps one decimal on the final percentage
        return `${Math.round(value * 1000) / 10}%`;
    } else {
        return value;
    }
}