const Group = require('./groups.js').Group;

class groupIterator {
    constructor(group) {
        this.position = 0;
        this.group = group.state;
    }
    next() {
        if (this.position === this.group.length) return { done: true };
        this.position = this.position + 1;
        return { value: this.group[this.position - 1], done: false };
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new groupIterator(this);
};

for (let value of Group.from(['a', 'b', 'c'])) {
    console.log(value);
}
// → a
// → b
// → c

/*

Relevant parts of Solution Haverbeke:

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.position = 0;
    }

    next() {
        if (this.position >= this.group.members.length) {
            return { done: true };
        } else {
            let result = {
                value: this.group.members[this.position],
                done: false,
            };
            this.position++;
            return result;
        }
    }
}

*/
