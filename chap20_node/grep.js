const { stat, readdir } = require('fs').promises;

// const regExString = process.argv[2];
// function buildRegExFromString(string) {
//     const regExStringFirstPart = string.slice(1, string.lastIndexOf('/'));
//     const regExStringSecondPart = string.slice(string.lastIndexOf('/') + 1);
//     const regEx = new RegExp(regExStringFirstPart, regExStringSecondPart);
//     return regEx;
// }

// const regEx = buildRegExFromString(regExString);
// const fileList = process.argv.slice(3);
// const filteredListAsString = fileList
//     .filter(fileName => regEx.test(fileName))
//     .join('\n');

// console.log(filteredListAsString);

function checkIfFileIsDirectory(nameString) {
    return stat(nameString).then(stats => {
        return stats.isDirectory();
    });
}

function getFileListForDirectory(nameString) {
    return readdir(nameString);
}

checkIfFileIsDirectory('grep.js').then(console.log);
checkIfFileIsDirectory('fileServer').then(console.log);

getFileListForDirectory('grep.js')
    .then(console.log)
    .catch(console.log);

// ---

// const regEx = process.argv[2].split('/');
// console.log('4:0', 'regEx :', regEx);

// console.log(regEx.test('hey'));

// const test1 = new RegExp('/abc/');
// console.log('12:0', 'test1 :', test1);

// const test2 = '/abc/';

// console.log(test2.indexOf('/'));
// console.log(test2.lastIndexOf('/'));
// console.log(test2.indexOf('/'));
