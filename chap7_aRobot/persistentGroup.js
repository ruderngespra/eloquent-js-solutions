function checkForValueInArray(value, array) {
    return array.indexOf(value) !== -1;
}

class PGroup {
    constructor(state = []) {
        this.state = state;
    }
    add(value) {
        const newState = this.state.slice(0);
        newState.push(value);
        return new PGroup(newState);
    }
    delete(value) {
        return new PGroup(this.state.filter(v => v !== value));
    }
    has(value) {
        return checkForValueInArray(value, this.state);
    }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false

/* 

Solution Haverbeke:

class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }

  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(m => m !== value));
  }

  has(value) {
    return this.members.includes(value);
  }
}

*/
