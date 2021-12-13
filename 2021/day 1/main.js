const fs = require('fs')

// Read the input file and remove the empty lines
const lines = fs.readFileSync('./input.txt', 'utf8')
  .split('\n')
  .filter((x) => Boolean(x))
  .map((x) => parseInt(x))

const part1 = () => {

  let measurments = 0;

  // How many measurements are larger than the previous measurement?
  for (let index = 0; index < lines.length; index++) {
    const last = lines[index - 1];
    const current = lines[index];
    if (current > last) {
      measurments++;
    }
  }
  console.log('Part 1:', measurments);
}



const part2 = () => {

  let three_measurement = 0;

  // How many sums are larger than the previous sum?
  for (let index = 0; index < lines.length; index++) {
    const last = lines[index - 1] + lines[index - 2] + lines[index - 3];
    const current = lines[index] + lines[index - 1] + lines[index - 2];
    if (current > last) {
      three_measurement++;
    }
  }

  console.log('Part 2:', three_measurement);
}


part1();
part2();