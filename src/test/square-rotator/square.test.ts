import { SquareRotator as SquareRotatorService } from '../../square-rotator/square-rotator';
import * as fs from 'fs';
import csv from 'csv-parser';

const SquareRotator = new SquareRotatorService();

describe('Square Rotator', () => {
  test('The rotation from the given input file should match the given output file.', async () => {
    const rotated: string[] = [];
    const expected: string[] = [];

    const rotatedTable = await new Promise((resolve) => {
      fs.createReadStream('./src/test/square-rotator/input.csv')
        .pipe(csv())
        .on('data', (data) => {
          const id = data.id;
          const json = JSON.parse(data.json);

          if (SquareRotator.isValidSquareTable(json)) {
            const rotatedTable = SquareRotator.rotateTable(json);
            rotated.push(`${ id },"${ JSON.stringify(rotatedTable) }",true`);
          } else {
            rotated.push(`${ id },"[]",false`);
          }
          resolve(rotated);
        });
    });

    const expectedTable = await new Promise((resolve) => {
      fs.createReadStream('./src/test/square-rotator/output.csv')
        .pipe(csv())
        .on('data', (data) => {
          const id = data.id;
          const json = JSON.parse(data.json);
          const is_valid = data.is_valid;

          expected.push(`${ id },"${ JSON.stringify(json) }",${ is_valid }`);
          resolve(expected);
        });
    });

    expect(rotatedTable).toEqual(expectedTable);
  });
});
