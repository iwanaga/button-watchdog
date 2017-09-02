"use strict";

const j5 = require('johnny-five');
const RaspPiIo = require('raspi-io');
let board = new j5.Board({
    io: new RaspPiIo()
});

board.on('ready', () => {
    let led = new j5.Led('P1-7');
    let button = new j5.Button('P1-11');

    button.on('down', () => {
        console.log('button pushed');
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
