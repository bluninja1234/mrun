#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

var files = [];

console.log("loading...");

if (!fs.existsSync(path.join(__dirname, "/modules"))) {
    fs.mkdirSync(path.join(__dirname, "/modules"));
    console.log("Setting up initial install...");
    fs.writeFileSync(path.join(__dirname, "/modules/help.js"), "module.exports = function help(done) { console.log(\"Mrun\"); done(); }")
}

fs.readdir(path.join(__dirname, "/modules"), (err, data) => {
    if (err) throw new Error(err);

    files = data;

    startLauncher();
});

function startLauncher() {
    console.log("loaded");
    prompt();
}

function prompt() {
    readline.question("MR v1, press 'help' for commands\n>", answer => {
        if (answer === "exit") {
            readline.close()
        } else {
            if (files.includes(answer + ".js") || files.includes(answer + ".ts")) {
                require(path.join(__dirname, `/modules/${answer}`))(prompt);
            } else {
                console.log(`No module called ${answer} found`);
                prompt();
            }
        }
    });
}