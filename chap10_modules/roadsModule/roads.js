// My solution is not correct, as my buildGraph function does not
// expect an array of two-element arrays but the roads away as it is.

const { buildGraph } = require('./graph');

const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    'Marketplace-Farm',
    'Marketplace-Post Office',
    'Marketplace-Shop',
    'Marketplace-Town Hall',
    'Shop-Town Hall',
];

const roadGraph = buildGraph(roads);
console.log(roadGraph);
module.exports = { roadGraph };

/* 

Solution Haverbeke (which relies on a different buildGraph function):
exports.roadGraph = buildGraph(roads.map(r => r.split("-")));

*/
