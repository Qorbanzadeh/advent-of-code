const fs = require('fs');

// Read the input file and remove the empty lines
const lines = fs
    .readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter((x) => Boolean(x));

// How many bits are in each line?
const length = lines[0].length;

// Count the zero and one bits in each line
const countBits = (lines) => {
    const zeros = Array(length).fill(0);
    const ones = Array(length).fill(0);

    for (const line of lines) {
        const bits = line.split('');
        bits.forEach((bit, index) => {
            if (bit === '0') {
                zeros[index]++;
            } else {
                ones[index]++;
            }
        });
    }

    return { zeros, ones };
}
const part1 = () => {
    const { zeros, ones } = countBits(lines);
    let gamma = '';
    let epsilon = '';

    for (let i = 0; i < length; i++) {
        let bit = 0;
        if (ones[i] > zeros[i]) {
            bit = 1;
        }
        gamma += bit;
        epsilon += bit === 1 ? 0 : 1;
    }
    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

// Filter out the lines with the most common bit
const getOxygenRating = (lines, index = 0) => {
    const { zeros, ones } = countBits(lines);
    let mostCommonBit = '1';
    if (zeros[index] > ones[index]) {
        mostCommonBit = '0';
    }
    const newLines = lines.filter((line) => line[index] === mostCommonBit);
    if (newLines.length === 1) {
        return newLines[0];
    }
    return getOxygenRating(newLines, index + 1);
}

// Filter out the lines with the least common bit
const getCO2Rating = (lines, index = 0) => {
    const { zeros, ones } = countBits(lines);
    let leastCommonBit = '0';
    if (zeros[index] > ones[index]) {
        leastCommonBit = '1';
    }
    const newLines = lines.filter((line) => line[index] === leastCommonBit);
    if (newLines.length === 1) {
        return newLines[0];
    }
    return getCO2Rating(newLines, index + 1);
}

const part2 = () => {
    const oxygenRating = getOxygenRating(lines);
    const CO2Rating = getCO2Rating(lines);

    console.log(parseInt(oxygenRating, 2) * parseInt(CO2Rating, 2));
}

part1();
part2();