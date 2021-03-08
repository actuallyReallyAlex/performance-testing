/**
 * Filters and returns 2D array.
 * @param {NamedRange[]} items array of items
 * @param {String[]} names Optional list of names to filter results
 */
function filterAndMap(items, names) {
    return items.filter((namedItem) => names ? names.includes(namedItem.name) : true).map((namedItem) => namedItem.getRange());
}

/**
 * Filters and returns 2D array.
 * @param {NamedRange[]} items array of items
 * @param {String[]} names Optional list of names to filter results
 */
function reduce(items, names) {
    return items.reduce((acc, value) => {
        if ((names && names.includes(value.name)) || !names) {
            return [...acc, value.getRange()]
        }
        return acc;
    }, [])
}

/**
 * Filters and returns 2D array.
 * @param {NamedRange[]} items array of items
 * @param {String[]} names Optional list of names to filter results
 */
function filterAndMapWithSet(items, names) {
    const setNames = new Set(names);
    return items.filter((namedItem) => setNames ? setNames.has(namedItem.name) : true).map((namedItem) => namedItem.getRange());
}

/**
 * Filters and returns 2D array.
 * @param {NamedRange[]} items array of items
 * @param {String[]} names Optional list of names to filter results
 */
function reduceWithSet(items, names) {
    const setNames = new Set(names);
    return items.reduce((acc, value) => {
        if ((setNames && setNames.has(value.name)) || !setNames) {
            return [...acc, value.getRange()]
        }
        return acc;
    }, [])
}


/**
 * Creates a 2D matrix of values
 * @param {number} rows -> number of rows in matrix
 * @param {number} columns -> number of columns in matrix
 * @returns {[][]} -> matrix
 */
function createMatrix(rows, columns) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < columns; j++) {
            row.push(j)
        }
        matrix.push(row);
    };

    return matrix;
}

module.exports = {
    createMatrix,
    filterAndMap,
    filterAndMapWithSet,
    reduce,
    reduceWithSet,
};