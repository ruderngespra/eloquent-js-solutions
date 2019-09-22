require('./scripts.js');
require('./05_higher_order.js');

const dominantDirection = string => {
    return countBy(
        string
            .split('')
            .filter(
                character => characterScript(character.codePointAt(0)) !== null
            )
            .map(character => characterScript(character.codePointAt(0))),
        scriptData => scriptData.direction
    ).reduce(
        (total, directionObject) =>
            total.count >= directionObject ? total : directionObject,
        { name: 'no writing directions found', count: 0 }
    ).name;
};

// console.log(dominantDirection('asfasdjöfl!'));

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl

/* 

Solution Haverbeke:

function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : 'none';
    }).filter(({ name }) => name != 'none');
    if (counted.length == 0) return 'ltr';
    return counted.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

*/
