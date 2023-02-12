elementMainArray = ["Physical","Magic","Ice","Fire","Lightning","Earth","Shadow","Poison"];
elementColorArray = ["0xC40000","0xFB95C8","0x68CBF4","0xFF6600","0xFFCC00","0x856B47","0x664D80","0x508349"];

function toPercent(value){
    if (typeof value === "number"){
        //Keeps one decimal on the final percentage
        return `${Math.round(value * 1000) / 10}%`;
    } else {
        return value;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    initLoad();
});