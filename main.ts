//% weight=30 icon="\uf1b9" color=#000080 block="アイデオキット"
namespace kagabitideo {

    export enum direction {
        //% block="前"
        Forward = 1,
        //% block="後"
        Back = 0
    }

    //% group="リレー制御"
    //% blockId="relay_on"
    //% block="リレー ON"
    export function　relayOn(){
        pins.digitalWritePin(DigitalPin.P8, 1)
    }

    //% group="リレー制御"
    //% blockId="relay_off"
    //% block="リレー OFF"
    export function relayOff() {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }

    //% group="モーター制御"
    //% blockId="motor"
    //% block="モーターの強さ %power"
    export function motorA(power: number) {
        if (power > 1023) {
            power = 1023
        } else if (power < -1023) {
            power = -1023
        }

        if (power > 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Forward);
            pins.analogWritePin(AnalogPin.P14, Math.abs(power));
        } else if (power < 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Back);
            pins.analogWritePin(AnalogPin.P14, Math.abs(power));
        } else {

            pins.analogWritePin(AnalogPin.P14, 0);

        }
    }

}
