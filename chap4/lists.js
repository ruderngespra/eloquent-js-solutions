function arrayToList(array) {
    if (array.length == 1) {
        return { value: array[0], rest: null };
    } else {
        return {
            value: array[0],
            rest: arrayToList(array.slice(1, array.length)),
        };
    }
}

function listToArray(list) {
    function buildArray(list, array) {
        if (list.rest == null) {
            return [...array, list.value];
        } else {
            array.push(list.value);
            return buildArray(list.rest, array);
        }
    }
    return buildArray(list, []);
}

function prepend(element, list) {
    return { value: element, rest: list };
}

function nth(list, number) {
    if (number == 0) {
        return list.value;
    } else {
        return nth(list.rest, number - 1);
    }
}

const testList = arrayToList([1, 2, 3, 'test', 5]);
console.log(testList);
console.log(nth(testList, 4));

/* 

Solution Haverbeke:

function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = { value: array[i], rest: list };
    }
    return list;
}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

function prepend(value, list) {
    return { value, rest: list };
}

function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
}

*/
