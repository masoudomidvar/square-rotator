import * as fs from 'fs';
import csv from 'csv-parser';

/**
 * SquareRotator class receives a CSV file (through process method)
 * that contains arrays of integers considered as square tables.
 * Each element of this square table is then rotated clockwise.
 * The final arrays will be written to an output file.
 *
 * The arrays are only valid if they are NxN square tables.
 *
 * @example
 * input = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * output = [4,1,2,7,5,3,8,9,6]
 */
export class SquareRotator
{
	process(inputFilePath: string): void
	{
		console.log(`id,json,is_valid`);
		fs.createReadStream(inputFilePath)
			.pipe(csv())
			.on('data', (data) => {
				const id = data.id;
				const json = JSON.parse(data.json);

				if (this.isValidSquareTable(json)) {
					const rotatedTable = this.rotateTable(json);

					console.log(`${id},"${JSON.stringify(rotatedTable)}",true`);
				} else {
					console.log(`${id},"[]",false`);
				}
			});
	}

	rotateTable(input: number[]): number[]
	{
		const arrLength = input.length;
		const tableEdgeLength = this.getTableEdgeLength(input);

		const output = JSON.parse(JSON.stringify(input))

		const steps = Math.floor(tableEdgeLength / 2);

		for (let step = 0; step < steps; step++) {
			for (let index  = 0; index < arrLength; index++) {
				const i = Math.floor(index / tableEdgeLength);
				const j = index % tableEdgeLength;

				if (i == step && j >= step && j < (tableEdgeLength - step)) {
					if (j !== (tableEdgeLength - 1 - step)) {
						output[i*tableEdgeLength+j+1] = input[index];
						continue;
					}
					output[(i+1)*tableEdgeLength+j] = input[index];
					continue;
				}

				if ((j == tableEdgeLength-1-step) && i >= step && i < (tableEdgeLength - step)) {
					if (i !== (tableEdgeLength - 1 - step)){
						output[(i+1)*tableEdgeLength+j] = input[index];
						continue;
					}
					output[i*tableEdgeLength+j-1] = input[index];
					continue;
				}

				if ((i == tableEdgeLength-1-step) && j >= step && j < (tableEdgeLength - step)) {
					if (j !== step) {
						output[i*tableEdgeLength+j-1] = input[index];
						continue;
					}
					output[(i-1)*tableEdgeLength+j] = input[index];
					continue;
				}

				if (j == step && i >= step && i < (tableEdgeLength - step)) {
					output[(i-1)*tableEdgeLength+j] = input[index];
				}
			}
		}

		return output;
	}

	isValidSquareTable (table: number[]): boolean
	{
		const tableElementsCount = this.getTableElementsCount(table);

		return Number.isInteger(Math.sqrt(tableElementsCount));
	}

	getTableElementsCount(table: number[]): number
	{
		return Object.keys(table).length;
	}

	getTableEdgeLength(table: number[]): number
	{
		return Math.sqrt(this.getTableElementsCount(table));
	}
}
