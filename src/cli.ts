import { SquareRotator as SquareRotatorService } from './square-rotator/square-rotator';

if (process.argv.length !== 3) {
    console.error("Wrong command. Run the command as: node cli.js input.csv > output.csv OR node cli.js input.csv");
    process.exit(1);
}

const inputFile = process.argv[2];

const SquareRotator = new SquareRotatorService();

SquareRotator.process(inputFile);
