"use strict";

const j5       = require('johnny-five');
const RaspPiIo = require('raspi-io');
const mongoose = require('mongoose');
const Button   = require('./button.model');

let board = new j5.Board({
    io: new RaspPiIo()
});
mongoose.Promise = Promise;

board.on('ready', () => {
    mongoose.connect('mongodb://localhost/button_watchdog', { useMongoClient: true, keepAlive: true }).then(
        () => {
            let led          = new    j5.Led('P1-7');
            let redButton    = new j5.Button('P1-11');
            let yellowButton = new j5.Button('P1-13');
            let greenButton  = new j5.Button('P1-15');
            let blueButton   = new j5.Button('P1-19');
            let purpleButton = new j5.Button('P1-21');
            let blackButton  = new j5.Button('P1-23');

            redButton.on('down', () => {
                console.log('RED  pushed');
                feedBackByLed(led);
                saveButton('red');
            });
            yellowButton.on('down', () => {
                console.log('YELLOW pushed');
                feedBackByLed(led);
                saveButton('yellow');
            });
            greenButton.on('down', () => {
                console.log('GREEN pushed');
                feedBackByLed(led);
                saveButton('green');
            });
            blueButton.on('down', () => {
                console.log('BLUE pushed');
                feedBackByLed(led);
                saveButton('blue');
            });
            purpleButton.on('down', () => {
                console.log('PURPLE pushed');
                feedBackByLed(led);
                saveButton('purple');
            });
            blackButton.on('down', () => {
                console.log('BLACK pushed');
                feedBackByLed(led);
                saveButton('black');
            });
        },
        err => { console.log(err); }
    )
});

function saveButton(color) {
    Button.create({color: color}, (err, doc) => {
        if (err) { console.log(doc); }
    });
}

function feedBackByLed(led) {
    led.strobe(100);
    setTimeout(() => {
        led.stop();
        led.off();
    }, 1000);
}
