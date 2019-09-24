### Closure

Functions in Egg are able to access the global scope as well as their
own scope because of this mechanism which is part of the
'fun'-implementation:

```js
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
```

This first defines a localScope that inherits all the bindings of the
global scope and then within the loop adds all the arguments that are
given to the function as additional bindings that are specific to its
local scope.
