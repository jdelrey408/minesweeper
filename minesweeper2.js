//generate a player board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
  //#6 start a for loop that iterates through the number of rows
  for (rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];

    //nested for loop. This for loop creates a row
    for (columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
    const column = [];
    //#9 - create spaces and push it into the rows
    row.push(' ');
    }
    //push row into board
    board.push(row);
  }
  return board;
};// end of generatePlayerBoard

//12 - generate a bomb board
//For example, generateBombBoard(5, 9, 14) would result in a 5 x 9 game board (45 total squares) with 14 bombs placed randomly on the board.
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
    const column = [];
    //16 push null to row (null means no value here since this baord wont be seen by user)
    row.push(null);
    }

  board.push(row);
} //end of nested for loops


//17 - generate randow bombs
let numberOfBombsPlaced = 0;
while (numberOfBombsPlaced < numberOfBombs) {
    // The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
    //Math.floor makes the random nummber a whole number and not a decimal. rounds down (floor)
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    //3 - player actvity
    if (board[randomRowIndex][randomColumnIndex] !== 'B'){
    //4 - player actvity
    //24 - place a bomb on the board
    // use the board variable and access the space at the generated randomRowIndex and randomColumnIndex. Set it equal to 'B'.
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    }

    //24 - place a bomb on the board
    // use the board variable and access the space at the generated randomRowIndex and randomColumnIndex. Set it equal to 'B'.

} //end of while loop
return board;
};//end generate bomb board

//generate neighbor bombs function
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    //tiles around the bomb/ omits 0,0
    [-1, -1],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1] ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    //check if the row and column indices for neighboring tiles are valid
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      // we'll want to check if the tile at those indices (on the bombBoard) already contains a bomb ('B').
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
      numberOfBombs++;
      }
    };
    return numberOfBombs;
  });

}; //end of getNumberOfNeighborBombs

//start fliptile()
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('Already flipped that tile!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};//end fliptile()

//To print our board, regardless of size, we will join together each element in each row with ' | '
const printBoard = (board) => {
  //join multiple items - combine items in a row, then combining all the rows in an array
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 3);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 1, 0); //[0,0]
console.log('Updated Player Board:');
printBoard(playerBoard);
