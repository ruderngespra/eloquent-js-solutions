const { parse, skipSpace } = require('./12_language');

console.log(parse('# hello\nx'));
// → {type: "word", name: "x"}

console.log(parse('a # one\n   # two\n()'));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
