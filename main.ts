//% weight=30 icon="\uf1b9" color=#000080 block="アイデオキット"
namespace kagabitideo {

    //% group="リレー制御"
    //% blockId="relay_on"
    //% block="テスト"
    export function　relayOn(){
        pins.digitalWritePin(DigitalPin.P8, 1)
    }

    //% group="リレー制御"
    //% blockId="relay_on"
    //% block="テスト"
    export function relayOff() {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }

}
