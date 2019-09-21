function deepEqual(value1, value2) {
    if (typeof value1 != 'object' || typeof value2 != 'object')
        return value1 === value2;
    if (value1 == null || value2 == null) return undefined;
    const value1Keys = newFunction();
    const value2Keys = Object.keys(value2);
    if (value1Keys.length != value2Keys.length) return false;
    for (let keyName of value1Keys) {
        if (!deepEqual(value1[keyName], value2[keyName])) return false;
    }
    return true;
    function newFunction() {
        return Object.keys(value1);
    }
}

console.log(
    deepEqual(
        { test: 'tesafd', asfd: 234, rf: false },
        { test: 'tesafd', asfd: 234, rf: false }
    )
);

console.log(deepEqual([2, 2, 3, 'test', 5], [1, 2, 3, 'test', 5]));

/* 

Solution Haverbeke:

function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

*/
