# Square Rotator

This application receives a CSV file representing a series of tables, implement a rotation engine that parses, verifies and rotates each table, and finally outputs a CSV file with all valid and rotated tables.
It is implemented with Node.js and Typescript.

## Prerequisites

- node: `v19`
- npm: `v9`

## Input Sample

The input will be a CSV file with the columns id and json. You can assume id to be a string and json to be a string (JSON encoded data).<br/>
(A file called input.csv is available in the root directory as the sample data.)

id,json<br/>
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"<br/>
2,"[40, 20, 90, 10]"<br/>
3,"[-5]"<br/>
9,"[2, -0]"<br/>
5,"[2, -5, -5]"<br/>
8,"[1, 1, 1, 1, 1]”<br/>

## Output Sample

The output should be a CSV-encoded series of rotated tables with the columns id, json and is_valid. The latter is an indicator of whether or not a given table is valid, if it is not, json should be an empty array.

id,json,is_valid<br/>
1,"[4, 1, 2, 7, 5, 3, 8, 9, 6]",true<br/>
2,"[90, 40, 10, 20]",true<br/>
3,"[-5]",true<br/>
9,"[]",false<br/>
5,"[]",false<br/>
8,”[]",false<br/>

## Theory

You work with a list of numbers that represent a table your program has to interpret correctly. Since there is nothing but a flat list, the program has to infer the rows and columns from this data, if needed.

If the square edge length is odd and there is a singular field in the middle of the table, it is not moved.

## Run

1. Install dependencies

    ```sh
    npm install
    ```

2. Build

    ```sh
    npm run build
    ```

3. Run

    ```sh
    node cli.js input.csv > output.csv
    ```
## Test

Jest framework is used for testing the functionality of this application.<br/>
To run test please run the following command:

    npm run test
