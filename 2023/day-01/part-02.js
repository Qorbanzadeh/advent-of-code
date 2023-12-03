/* 
--- Part Two ---

Your calculation isn't quite right.
It looks like some of the digits are actually spelled out with letters:
one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

*/

import fs from "fs";

const dataPath = "./input.txt";
const example = "./part-02-example.txt";

const wordDigits = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

// Precompile the regular expressions
const wordDigitRegex = new RegExp(Object.keys(wordDigits).join("|"), "i");
const numberRegex = /\d/;

function findFirstDigit(line) {
  const firstNumericMatch = line.search(numberRegex);
  const firstWordDigitMatch = line.match(wordDigitRegex);

  if (
    firstNumericMatch !== -1 &&
    (!firstWordDigitMatch ||
      firstNumericMatch < line.indexOf(firstWordDigitMatch[0]))
  ) {
    return line[firstNumericMatch];
  } else if (firstWordDigitMatch) {
    return wordDigits[firstWordDigitMatch[0].toLowerCase()];
  }
  return "0";
}

function findLastDigit(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    if (numberRegex.test(line[i])) return line[i];
    for (const word in wordDigits) {
      if (
        line.substr(i - word.length + 1, word.length).toLowerCase() === word
      ) {
        return wordDigits[word];
      }
    }
  }
  return "0";
}

function partTwo(input) {
  const lines = fs.readFileSync(input, "utf-8").trim().split("\n");
  return lines.reduce((sum, line) => {
    const firstDigit = findFirstDigit(line);
    const lastDigit = findLastDigit(line);
    return sum + Number(firstDigit + lastDigit);
  }, 0);
}

console.log(partTwo(example)); // 281

console.log(partTwo(dataPath)); // 54504
