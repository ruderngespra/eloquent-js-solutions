// Test case:

const testObject = { test: 1 };

console.log(testObject.hasOwnProperty('toString'));
// -> false

testObject.hasOwnProperty = () => 'I will not tell you anything!';

// Now I can not access the hasOwnProperty property of testObjects
// prototype anymore:
console.log(testObject.hasOwnProperty('toString'));
// -> 'I will not tell you anything!'

// Solution:
console.log(Object.hasOwnProperty.call(testObject, 'test'));
