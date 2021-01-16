function linkTo(where){
	window.top.location.href = where;
}

/*
Testing
let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback);

function batteryCallback(batteryObject) {
   printBatteryStatus(batteryObject);
}
function printBatteryStatus(batteryObject) {
    //console.log("IsCharging", batteryObject.charging);
    console.log("Percentage", batteryObject.level * 100);

    //console.log("charging Time", batteryObject.chargingTime);
    //console.log("DisCharging Time", batteryObject.dischargingTime);
}
It worked
*/