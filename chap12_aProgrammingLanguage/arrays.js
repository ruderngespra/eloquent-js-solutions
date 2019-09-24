const { run, specialForms, topScope, evaluate } = require('./12_language');

// My solutions:

topScope.array = (...arguments) => {
    let newArray = [];
    for (let element of arguments) {
        newArray.push(element);
    }
    return newArray;
};

topScope.length = array => {
    return array.length;
};

topScope.element = (array, n) => {
    return array[n];
};

// Testing:

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);

/*

Solution Haverbeke:

topScope.array = (...values) => values;
topScope.length = array => array.length;
topScope.element = (array, i) => array[i];

*/
