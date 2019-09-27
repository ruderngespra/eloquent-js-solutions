// My solution:

const { readdir, readFile, stat } = require('fs').promises;

const regExString = process.argv[2];
function buildRegExFromString(string) {
    const regExStringFirstPart = string.slice(1, string.lastIndexOf('/'));
    const regExStringSecondPart = string.slice(string.lastIndexOf('/') + 1);
    const regEx = new RegExp(regExStringFirstPart, regExStringSecondPart);
    return regEx;
}

const regEx = buildRegExFromString(regExString);
const fileList = process.argv.slice(3);

function printAll(regEx, fileList) {
    return Promise.all(
        fileList.map(fileName =>
            stat(fileName)
                .then(stats => {
                    if (stats.isDirectory()) {
                        const dirName = fileName;
                        return readdir(dirName).then(fileList =>
                            printAll(
                                regEx,
                                fileList.map(
                                    fileName => `${dirName}/${fileName}`
                                )
                            )
                        );
                    } else
                        return readFile(fileName, 'utf8').then(
                            content => regEx.test(content) && fileName
                        );
                })
                .catch(err => {
                    console.log('Error: ', err);
                })
        )
    ).then(list => list.flat(Infinity).filter(value => value != false));
}

printAll(regEx, fileList).then(list => {
    list.forEach(fileName => {
        console.log(fileName);
    });
});

/* 

Solution Haverbeke:

There are some differences between my and Haverbekes approach:
- I tried to solve the exercise with only asynchronous methods (mainly for learning purposes)
- Whereas Haverbeke expects a string that internally is being transformed into a RegEx, I directly expect a RegEx as input.

const {statSync, readdirSync, readFileSync} = require("fs");

let searchTerm = new RegExp(process.argv[2]);

for (let arg of process.argv.slice(3)) {
  search(arg);
}

function search(file) {
  let stats = statSync(file);
  if (stats.isDirectory()) {
    for (let f of readdirSync(file)) {
      search(file + "/" + f);
    }
  } else if (searchTerm.test(readFileSync(file, "utf8"))) {
    console.log(file);
  }
}

*/
