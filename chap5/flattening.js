const flattenArray = array =>
    array.reduce((total, array) => total.concat(array), []);
