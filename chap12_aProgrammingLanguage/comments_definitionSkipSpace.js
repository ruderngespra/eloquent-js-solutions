// My solution:

const skipSpace = string => {
    string = string.replace(/#.*/g, '');
    let first = string.search(/\S/);
    if (first == -1) return '';
    return string.slice(first);
};

module.exports.skipSpace = skipSpace;

// Solution Haverbeke:

// function skipSpace(string) {
//   let skippable = string.match(/^(\s|#.*)*/);
//   return string.slice(skippable[0].length);
// }
