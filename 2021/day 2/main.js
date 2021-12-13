const fs = require('fs')

const lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .filter((x) => Boolean(x)).map(x => ({
        direction: x.split(' ')[0],
        unit: parseInt(x.split(' ')[1])
    }))

const part1 = () => {
    const submarine = {
        position: 0,
        depth: 0
    }

    for (const line of lines) {
        switch (line.direction) {
            case 'forward':
                submarine.position += line.unit;
                break;
            case 'up':
                submarine.depth -= line.unit;
                break;
            case 'down':
                submarine.depth += line.unit;
                break;
        }
    }

    console.log('Part 1', submarine.position * submarine.depth);
}




const part2 = () => {

    const submarine = {
        position: 0,
        depth: 0,
        aim: 0
    }

    for (const line of lines) {
        switch (line.direction) {
            case 'forward':
                submarine.position += line.unit;
                submarine.depth += (submarine.aim * line.unit);
                break;
            case 'up':
                submarine.aim -= line.unit;
                break;
            case 'down':
                submarine.aim += line.unit;
                break;
        }
    }
    console.log('Part 2', submarine.position * submarine.depth);
}

part1();
part2();