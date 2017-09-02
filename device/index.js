"use strict";

const j5 = require('johnny-five');
const RaspPiIo = require('raspi-io');
let board = new j5.Board({
    io: new RaspPiIo()
});

board.on('ready', () => {
    let led          = new    j5.Led('P1-3');
    let redButton    = new j5.Button('P1-5');
    let yellowButton = new j5.Button('P1-7');
    let greenButton  = new j5.Button('P1-11');
    let blueButton   = new j5.Button('P1-13');
    let purlpeButton = new j5.Button('P1-15');
    let blackButton  = new j5.Button('P1-19');

    redButton.on('down', () => {
        console.log('RED  pushed');
        feedBackByLed(led);
    });
    yellowButton.on('down', () => {
        console.log('YELLOW pushed');
        feedBackByLed(led);
    });

});

function feedBackByLed(led) {
    led.strobe(100);
    setTimeout(() => {
        led.stop();
        led.off();
    }, 1000);
}
