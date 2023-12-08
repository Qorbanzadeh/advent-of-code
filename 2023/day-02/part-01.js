/*
Day 2: Cube Conundrum - part 01
    
As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue.
Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is
to figure out information about the number of cubes.

To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes,
show them to you, and then put them back in the bag. He'll do this a few times per game.

You play several games and record the information from each game (your puzzle input).
Each game is listed with its ID number (like the 11 in Game 11: ...) followed by
a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

Notes:
12 red
13 green
14 blue
*/

import fs from "fs";

const dataInput = "./input.txt";
const example = "./example.txt";

// Check if a game is possible with the given maxCubes
function isGamePossible(game, maxCubes) {
  return game.subsets.every(
    (subset) =>
      subset.red <= maxCubes.red &&
      subset.green <= maxCubes.green &&
      subset.blue <= maxCubes.blue
  );
}

// Parse the game data from input lines
function parseGameData(lines) {
  return lines.map((line) => {
    const [gameIdPart, subsetsPart] = line.split(": ");
    const gameID = parseInt(gameIdPart.split(" ")[1]);

    const subsets = subsetsPart.split(";").map((subset) => {
      const cubeCounts = { red: 0, green: 0, blue: 0 };
      subset
        .trim()
        .split(", ")
        .forEach((cube) => {
          const [count, color] = cube.split(" ");
          cubeCounts[color] += parseInt(count);
        });
      return cubeCounts;
    });

    return { gameID, subsets };
  });
}

// Calculate the sum of game IDs where the game is possible
function partOne(input) {
  try {
    const lines = fs.readFileSync(input, "utf-8").trim().split("\n");
    const maxCubes = { red: 12, green: 13, blue: 14 };
    const gameData = parseGameData(lines);

    const possibleGameIds = gameData
      .filter((game) => isGamePossible(game, maxCubes))
      .map((game) => game.gameID);

    return possibleGameIds.reduce((sum, id) => sum + id, 0);
  } catch (error) {
    console.error("Error reading file:", error);
    return 0;
  }
}

console.log(partOne(example));
console.log(partOne(dataInput));
