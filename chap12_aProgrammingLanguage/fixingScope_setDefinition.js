const { evaluate } = require('./12_language');

// My solution:

const set = (args, scope) => {
    const outerScope = Object.getPrototypeOf(scope);
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Incorrect use of set');
    }
    let value = evaluate(args[1], scope);
    if (Object.prototype.hasOwnProperty.call(scope, args[0].name)) {
        scope[args[0].name] = value;
    } else if (Object.prototype.hasOwnProperty.call(outerScope, args[0].name)) {
        outerScope[args[0].name] = value;
    } else {
        throw ReferenceError('No binding available with this identifier.');
    }
    return value;
};

module.exports = set;

/*

Solution Haverbeke:

In comparison to my solution Haverbeke covers any amount of nested
scopes, whereas I only account for one outer and one inner (local) scope.

specialForms.set = (args, env) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Bad use of set");
  }
  let varName = args[0].name;
  let value = evaluate(args[1], env);

  for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
  }
  throw new ReferenceError(`Setting undefined variable ${varName}`);
};


*/
