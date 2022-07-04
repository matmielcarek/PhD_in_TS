"use strict";
exports.__esModule = true;
var fs = require("fs");
var csv = require("fast-csv"); //both @fast-csv/format and @fast-csv/parse
var SingleSetupData = /** @class */ (function () {
    function SingleSetupData(_directory, _config, _liquid, _height, _period, _amplitude, _state) {
        this._directory = _directory;
        this._config = _config;
        this._liquid = _liquid;
        this._height = _height;
        this._period = _period;
        this._amplitude = _amplitude;
        this._state = _state;
        this.data = [];
    }
    SingleSetupData.prototype.patch = function () {
        return (this._directory +
            this._config +
            "-" +
            this._liquid +
            "-0" +
            this._height / 100 +
            "-" +
            this._period * 1000 +
            "-" +
            this._amplitude / 100 +
            "_" +
            this._state +
            ".csv");
    };
    SingleSetupData.prototype.read = function () {
        var _this = this;
        var parseOptions = {
            headers: [undefined, undefined, "c", undefined],
            delimiter: ";",
            discardUnmappedColumns: true
        };
        fs.createReadStream(this.patch(), { encoding: "utf16le" })
            .pipe(csv.parse(parseOptions))
            .on("error", function (error) { return console.error(error); })
            .on("data", function (row) { return _this.data.push(row); })
            .on("end", function (rowCount) {
            console.log(_this.data), console.log(rowCount);
        });
    };
    return SingleSetupData;
}());
var dataSet = new SingleSetupData("data/raw/", 1, "w", 400, 0, 0, "S");
console.log(dataSet.patch());
dataSet.read();
// let data: any = [];
// const parseOptions = {
//   headers: [undefined, undefined, "c", undefined],
//   delimiter: ";",
//   discardUnmappedColumns: true,
// };
// fs.createReadStream("data/raw/1-w-04-0-0_S.csv", { encoding: "utf16le" })
//   .pipe(csv.parse(parseOptions))
//   .on("error", (error) => console.error(error))
//   .on("data", (row: any) => data.push(row))
//   .on("end", (rowCount: number) => {
//     console.log(data), console.log(rowCount);
//   });
// const ws = fs.createWriteStream("data/formatted/1-w-04-0-0_S.csv");
// const csvStream = csv.format({ headers: ["c"], alwaysWriteHeaders: true });
// csvStream.pipe(ws);
// data.forEach((row: any) => {
//   csvStream.write(row);
// });
// csvStream.end();
