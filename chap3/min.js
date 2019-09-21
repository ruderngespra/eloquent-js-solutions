function min(x, y) {
    return x == y ? 'equal' : x > y ? y : x;
}

console.log(min(3, -6));

/*

Solution Haverbeke:

function min(a, b) {
  if (a < b) return a;
  else return b;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10 

*/
