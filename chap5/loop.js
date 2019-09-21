function loop(value, testFunction, updateFunction, bodyFunction) {
    if (!testFunction(value)) return false;
    bodyFunction(value);
    loop(updateFunction(value), testFunction, updateFunction, bodyFunction);
}

/*

Solution Haverbeke:

function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}

*/
