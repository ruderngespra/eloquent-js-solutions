function countChar(string, char) {
    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == char) counter += 1;
    }
    return counter;
}

function countBs(string) {
    return countChar(string, 'B');
}

function countChar2(string, char) {
    return string
        .split('')
        .reduce(
            (total, currentValue) => (currentValue == char ? total + 1 : total),
            0
        );
}

/*

Solution Haverbeke:

function countChar(string, ch) {
  let counted = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == ch) {
      counted += 1;
    }
  }
  return counted;
}

function countBs(string) {
  return countChar(string, "B");
}

*/
