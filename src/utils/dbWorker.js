"use strict";
const { parentPort } = require("worker_threads");
// recieve crawled data from main thread
parentPort.once("message", (message) => {
    console.log(message);
    console.log("Recieved data from mainWorker...");
    //Store in Db
    // send data back to main thread if operation was successful
    parentPort.postMessage("Data saved successfully");
});
