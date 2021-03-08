const Benchmark = require('benchmark');
const chalk = require('chalk');
const { createMatrix, filterAndMap, filterAndMapWithSet, reduce, reduceWithSet, } = require('../test_methods');

const rows = 10000;
const columns = 10000;

const sizeOfMatrix = `${Number(rows).toLocaleString()} rows x ${Number(columns).toLocaleString()} columns --- ${Number(rows * columns).toLocaleString()} elements\n`;

console.log(`Size of Matrix: ${sizeOfMatrix}`);

const items = [
    {
        getRange: () => createMatrix(rows, columns),
        name: "Columns",
    },
    {
        getRange: () => createMatrix(rows, columns),
        name: "Overall"
    },
    {
        getRange: () => createMatrix(rows, columns),
        name: "Rows"
    }
];

const suite = new Benchmark.Suite;

suite
    .add('.filter().map()', function () {
        filterAndMap(items, ["Columns"])
    })
    .add('.reduce()', function () {
        reduce(items, ["Columns"])
    })
    .add('.filter().map() using Set', function () {
        filterAndMapWithSet(items, ["Columns"])
    })
    .add('.reduce() using Set', function () {
        reduceWithSet(items, ["Columns"])
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('error', function (e) {
        console.error(`\nError when testing: ${e.target.name}`);
        console.error(`Error: ${e.target.error}\n`);
    })
    .on('complete', function () {
        const fastest = this.filter('fastest');
        let results = this.filter('fastest').map('name');

        if (fastest.length > 1) {
            results = this.map((method, i) => `#${i + 1} - ${method.name}\n`);
        }

        console.log(chalk.green('\nThe fastest method is: \n'));
        results.forEach((result) => console.log(chalk.green(result)));
    })
    // run async or not
    .run({ 'async': true });
