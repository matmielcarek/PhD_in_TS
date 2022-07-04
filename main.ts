import * as fs from "fs";
import * as csv from "fast-csv"; //both @fast-csv/format and @fast-csv/parse

class SingleSetupData {
  private data: any = [];
  constructor(
    private _directory: string,
    private _config: number,
    private _liquid: string,
    private _height: number,
    private _period: number,
    private _amplitude: number,
    private _state: string
  ) {}

  patch() {
    return (
      this._directory +
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
      ".csv"
    );
  }

  read() {
    const parseOptions = {
      headers: [undefined, undefined, "c", undefined],
      delimiter: ";",
      discardUnmappedColumns: true,
    };

    fs.createReadStream(this.patch(), { encoding: "utf16le" })
      .pipe(csv.parse(parseOptions))
      .on("error", (error) => console.error(error))
      .on("data", (row: any) => this.data.push(row))
      .on("end", (rowCount: any) => {
        console.log(this.data), console.log(rowCount);
      });
  }
}

let dataSet = new SingleSetupData("data/raw/", 1, "w", 400, 0, 0, "S");
console.log(dataSet.patch());
dataSet.read();

// const ws = fs.createWriteStream("data/formatted/1-w-04-0-0_S.csv");

// const csvStream = csv.format({ headers: ["c"], alwaysWriteHeaders: true });
// csvStream.pipe(ws);

// data.forEach((row: any) => {
//   csvStream.write(row);
// });

// csvStream.end();
