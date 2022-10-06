"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrappWeb = void 0;
const { Worker } = require("worker_threads");
let workDir = __dirname + "../../../utils/dbWorker.js";
const axios_1 = __importDefault(require("axios"));
const cheerio = require("cheerio");
const url = "https://www.iban.com/exchange-rates";
const scrappWeb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    mainFunc(url).then((response) => {
        // start worker
        const worker = new Worker(workDir);
        console.log("Sending crawled data to dbWorker...");
        // send formatted data to worker thread
        worker.postMessage(response);
        res.status(200).send(response);
        // listen to message from worker thread
        worker.on("message", (message) => {
            console.log(message);
        });
    });
});
exports.scrappWeb = scrappWeb;
const mainFunc = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch html data from url
    let res = yield fetchData(url);
    if (!res.data) {
        console.log("Invalid data Obj");
        return;
    }
    const html = res.data;
    let dataObj = new Object();
    // mount html page to the root element
    const $ = cheerio.load(html);
    // select table classes, all table rows inside table body
    const statsTable = $(".table.table-bordered.table-hover.downloads > tbody > tr");
    //loop through all table rows and get table data
    statsTable.each(function () {
        let title = $(this).find("td").text(); // get the text in all the td elements
        let newStr = title.split("\t"); // convert text (string) into an array
        newStr.shift(); // strip off empty array element at index 0
        formatStr(newStr, dataObj); // format array string and store in an object
    });
    return dataObj;
});
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Crawling data...");
        // make http call to url
        let response = yield (0, axios_1.default)(url).catch((err) => console.log(err));
        if (response.status !== 200) {
            console.log("Error occurred while fetching data");
            return;
        }
        return response;
    });
}
function formatStr(arr, dataObj) {
    let regExp = /[^A-Z]*(^\D+)/; // regex to match all the words before the first digit
    let newArr = arr[0].split(regExp); // split array element 0 using the regExp rule
    dataObj[newArr[1]] = newArr[2]; // store object
}
