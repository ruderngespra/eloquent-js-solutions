function isEven(number) {
    if (number == 0) return true;
    if (number == 1) return false;
    if (number > 1) {
        return isEven(number - 2);
    }
    if (number < 0) return isEven(-number);
}

/*

Solution Haverbeke:

function isEven(n) {
  if (n == 0) return true;
  else if (n == 1) return false;
  else if (n < 0) return isEven(-n);
  else return isEven(n - 2);
}

*/
