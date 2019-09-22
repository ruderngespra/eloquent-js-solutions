// My solution:

const { anyStorage, bigOak } = require('./11_async.js');

async function locateScalpel(nest, nestName = nest.name) {
    let storageValue = await anyStorage(nest, nestName, 'scalpel');
    if (!storageValue) {
        throw Error('No storage value found.');
    }
    if (storageValue == nestName) {
        return nestName;
    }
    return locateScalpel(nest, storageValue);
}

locateScalpel(bigOak).then(console.log);

function locateScalpel2(nest, nestName = nest.name) {
    return anyStorage(nest, nestName, 'scalpel').then(storageValue => {
        if (storageValue == nestName) {
            return nestName;
        }
        if (storageValue == undefined) {
            return new Error('No storage value found.');
        }
        return locateScalpel2(nest, storageValue);
    });
}

locateScalpel2(bigOak).then(console.log);

/*

Solution Haverbeke

async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next == current) return current;
    current = next;
  }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then(next => {
      if (next == current) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

*/
