// Haverbeke Environment Code with all main functions exported:

const parseExpression = function(program) {
    program = skipSpace(program);
    let match, expr;
    if ((match = /^"([^"]*)"/.exec(program))) {
        expr = { type: 'value', value: match[1] };
    } else if ((match = /^\d+\b/.exec(program))) {
        expr = { type: 'value', value: Number(match[0]) };
    } else if ((match = /^[^\s(),#"]+/.exec(program))) {
        expr = { type: 'word', name: match[0] };
    } else {
        throw new SyntaxError('Unexpected syntax: ' + program);
    }

    return parseApply(expr, program.slice(match[0].length));
};

module.exports.parseExpression = parseExpression;

// I add this here in order so solve the comments challenge:

const skipSpace =
    require('./comments_definitionSkipSpace').skipSpace ||
    function(string) {
        let first = string.search(/\S/);
        if (first == -1) return '';
        return string.slice(first);
    };

module.exports.skipSpace = skipSpace;

const parseApply = function(expr, program) {
    program = skipSpace(program);
    if (program[0] != '(') {
        return { expr: expr, rest: program };
    }
    program = skipSpace(program.slice(1));
    expr = { type: 'apply', operator: expr, args: [] };
    while (program[0] != ')') {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ',') {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ')') {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
};

module.exports.parseApply = parseApply;

const parse = function(program) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError('Unexpected text after program');
    }
    return expr;
};
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}

module.exports.parse = parse;

var specialForms = Object.create(null);

const evaluate = function(expr, scope) {
    if (expr.type == 'value') {
        return expr.value;
    } else if (expr.type == 'word') {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == 'apply') {
        let { operator, args } = expr;
        if (operator.type == 'word' && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == 'function') {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError('Applying a non-function.');
            }
        }
    }
};

module.exports.evaluate = evaluate;

specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError('Wrong number of args to if');
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError('Wrong number of args to while');
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Incorrect use of define');
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

var topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '==', '<', '>']) {
    topScope[op] = Function('a, b', `return a ${op} b;`);
}

topScope.print = value => {
    console.log(value);
    return value;
};

module.exports.run = function(program) {
    return evaluate(parse(program), Object.create(topScope));
};

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError('Functions need a body');
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != 'word') {
            throw new SyntaxError('Parameter names must be words');
        }
        return expr.name;
    });

    return function() {
        if (arguments.length != params.length) {
            throw new TypeError('Wrong number of arguments');
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

// I add this here in order so solve the fixingScope challenge:
specialForms.set = require('./fixingScope_setDefinition') || null;

module.exports.topScope = topScope;
module.exports.specialForms = specialForms;

// module.exports = topScope;
// run(`
// do(define(pow, fun(base, exp,
// if(==(exp, 0),
// 1,
// *(base, pow(base, -(exp, 1)))))),
// print(pow(2, 10)))
// `);
