let text = "'I'm the cook,' he said, 'it's my job.'";

// My solution:
const regEx = /'([^]+?)'($|\s)/g;
console.log(text.replace(regEx, '"$1"$2'));

// Solution Haverbeke:
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
