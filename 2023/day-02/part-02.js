/*
Part - 02

As you continue your walk, the Elf poses a second question:
in each game you played,
what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
*/

import fs from "fs";

const dataInput = "./input.txt";
const example = "./example.txt";

function calculateMinimumCubesForGames(games) {
  return games.reduce((totalPower, game) => {
    const minCounts = game.subsets.reduce(
      (max, subset) => ({
        red: Math.max(max.red, subset.red),
        green: Math.max(max.green, subset.green),
        blue: Math.max(max.blue, subset.blue),
      }),
      { red: 0, green: 0, blue: 0 }
    );

    return totalPower + minCounts.red * minCounts.green * minCounts.blue;
  }, 0);
}

function parseGameData(lines) {
  return lines.map((line) => {
    const [gameIdPart, subsetsPart] = line.split(": ");
    const gameId = parseInt(gameIdPart.split(" ")[1]);

    const subsets = subsetsPart.split(";").map((subset) => {
      const cubeCounts = { red: 0, green: 0, blue: 0 };
      subset
        .trim()
        .split(", ")
        .forEach((cube) => {
          const [count, color] = cube.split(" ");
          cubeCounts[color] = parseInt(count);
        });
      return cubeCounts;
    });

    return { gameId, subsets };
  });
}

function partTwo(input) {
  try {
    const lines = fs.readFileSync(input, "utf-8").trim().split("\n");
    const gameData = parseGameData(lines);
    return calculateMinimumCubesForGames(gameData);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

console.log(partTwo(example));
console.log(partTwo(dataInput));
