function reverseArray(array) {
    const newArray = [];
    for (let element of array) {
        newArray.unshift(element);
    }
    return newArray;
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < array.length / 2; i += 1) {
        const frontValue = array[i];
        const backValue = array[array.length - 1 - i];
        array[i] = backValue;
        array[array.length - 1 - i] = frontValue;
    }
    return array;
}

console.log([1, 24, 5, 75]);
console.log(reverseArray([1, 24, 5, 75]));
console.log(reverseArrayInPlace([1, 24, 5, 75]));

/*

Solution Haverbeke:

function reverseArray(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
        output.push(array[i]);
    }
    return output;
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}

*/
