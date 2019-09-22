const every = (array, test) => {
    for (let i = 0; i < array.length; i += 1) {
        if (!test(array[i])) return false;
    }
    return true;
};

const every2 = (array, test) => !array.some(value => !test(value));
