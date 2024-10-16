//%  weight=30 icon="\uf1b9" color=#000080 block = "アイデオキット"
namespace kagabitideo {

    export enum direction {
        //% block="Forward"
        Forward = 1,
        //% block="Back"
        Back = -1,
        //% block="stop"
        Stop = 0
    }

    export enum dark_or_bright{
        //% block="暗い"
        Is_Dark,
        //% block="明るい"
        Is_Bright
    }

    let deforeDirection = direction.Stop;
    music.stopAllSounds()
    motorA(0)

    //% group="明るさセンサー"
    //% blockId="right_threshold"
    //% block="%rightnum より %setting"
    //% rightnum.min=0 rightnum.max=255
    export function rightThreshold(rightnum: number, setting: dark_or_bright): boolean {
        if (setting === dark_or_bright.Is_Bright) {
            if (input.lightLevel() > rightnum) {
                return true
            } else {
                return false
            }
        } else {
            if (input.lightLevel() < rightnum) {
                return true
            } else {
                return false
            }
        }
    }
    
    //% group="明るさセンサー"
    //% blockId="is_dark"
    //% block="暗い"
    export function isDark():boolean{
        if(input.lightLevel() < 20){
            return true
        }else{
            return false
        }
    }

    //% group="明るさセンサー"
    //% blockId="is_bright"
    //% block="明るい"
    export function isBright(): boolean {
        if (input.lightLevel() >= 20) {
            return true
        } else {
            return false
        }
    }

    //% group="P8リレースイッチ"
    //% blockId="relay_on"
    //% block="リレースイッチ ON"
    export function　relayOn(){
        pins.digitalWritePin(DigitalPin.P8, 1)
    }

    //% group="P8リレースイッチ"
    //% blockId="relay_off"
    //% block="リレースイッチ OFF"
    export function relayOff() {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }

    //% group="P12人感センサー"
    //% blockId="human_move"
    //% block="人が動いた"
    export function humanMove():boolean {
        if(pins.digitalReadPin(DigitalPin.P12)==1){
            return true;
        }else{
            return false;
        }
    }

    //% group="P13/P14モーター制御"
    //% blockId="motor"
    //% block="モーターの強さ %power"
    //% power.min=-1023 power.max=1023
    export function motorA(power: number) {
        if (power > 1023) {
            power = 1023
        } else if (power < -1023) {
            power = -1023
        }

        if (power > 0) {
            //逆電力対応
            if (deforeDirection == direction.Back){
                pins.analogWritePin(AnalogPin.P14, 0);
                basic.pause(50)
            }
            pins.digitalWritePin(DigitalPin.P13, direction.Forward);
            pins.analogWritePin(AnalogPin.P14, Math.abs(power));
            deforeDirection = direction.Forward;
        } else if (power < 0) {
            //逆電力対応
            if (deforeDirection == direction.Forward) {
                pins.analogWritePin(AnalogPin.P14, 0);
                basic.pause(50)
            }
            pins.digitalWritePin(DigitalPin.P13, direction.Back);
            pins.analogWritePin(AnalogPin.P14, Math.abs(power));
            deforeDirection = direction.Back;
        } else {
            pins.analogWritePin(AnalogPin.P14, 0);
            deforeDirection = direction.Stop;
        }
    }

    //% group="データ計測"
    //% blockId="serialNameVal"
    //% block="データを表示 名前 %paraname 値 %value"
    export function serialNameVal(paraname:string,value:number):void{
        serial.writeValue(paraname, value);
    }
}
