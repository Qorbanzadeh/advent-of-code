/*
--- Part One ---

The newly-improved calibration document consists of lines of text;
Each line originally contained a specific "calibration value" that the Elves now need to recover.
On each line, the calibration value can be found by combining the "first digit" and the "last digit" (in that order)
To form a single "two-digit" number.

*/

import fs from "fs";

const dataPath = "./input.txt";
const example = "./part-01-example.txt";

function partOne(input) {
  const lines = fs.readFileSync(input, "utf-8").trim().split("\n");

  let sum = 0;

  for (let line of lines) {
    const first = line.split("").find((v) => !isNaN(v));
    const last = line.split("").findLast((v) => !isNaN(v));

    sum += Number(first + last);
  }
  return sum;
}

console.log(partOne(example)); // 142
console.log(partOne(dataPath)); // 54597
