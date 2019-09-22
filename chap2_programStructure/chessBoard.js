let chessboardString = '';
let white = true;
const size = 8;
for (let i = 0; i < size * size; i += 1) {
    let nextGrid = '';
    if (white) {
        nextGrid = ' ';
    } else {
        nextGrid = '#';
    }
    if (i % size == 0) {
        nextGrid += '\n';
        white = !white;
    }
    white = !white;
    chessboardString = chessboardString + nextGrid;
}

console.log(chessboardString);

/*

Solution Haverbeke:

let size = 8;
let board = "";

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}

console.log(board);

*/
