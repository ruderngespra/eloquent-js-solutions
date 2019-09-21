function range(start, end, step = 1) {
    const numbersArray = [];
    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        numbersArray.push(i);
    }
    return numbersArray;
}

console.log(range(5, 2, -1));

function sum(arrayOfNumbers) {
    let counter = 0;
    for (let element of arrayOfNumbers) {
        counter += Number(element);
    }
    return counter;
}

console.log(sum(range(1, 10)));

/*

Solution Haverbeke:

function range(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum(array) {
  let total = 0;
  for (let value of array) {
    total += value;
  }
  return total;
}

*/
