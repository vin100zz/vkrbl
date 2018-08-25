export class Letter {
  character: string;

  constructor(character: string) {
    this.character = character;
  }

  getCharacter(): string {
    return this.character;
  }
}


export class Cell {
  row: number;
  column: number;
  letter: Letter = null;

  constructor(row: number, column: number, letter: Letter = null) {
    this.row = row;
    this.column = column;
    this.letter = letter;
  }

  getRow(): number {
    return this.row;
  }

  getColumn(): number {
    return this.column;
  }

  getLetter(): Letter {
    return this.letter;
  }

  setLetter(letter: Letter): void {
    this.letter = letter;
  }
}


export class Board {
  NB_CELLS: number = 15;

  matrix: Cell[][] = [];

  constructor() {

    this.matrix = [];
    for (let x = 0; x < this.NB_CELLS; ++x) {
      let row = [];
      for (let y = 0; y < this.NB_CELLS; ++y) {
        row.push(new Cell(x, y));
      }
      this.matrix.push(row);
    }
  }

  getMatrix(): Cell[][] {
    return this.matrix;
  }

  getCells(): Cell[] {
    return this.matrix.reduce((res, row) => res.concat(row), []);
  }

  getFreeNeighborCells(cell: Cell): Cell[] {
    let neighbors = [this.getLeftCell(cell), this.getRightCell(cell), this.getTopCell(cell), this.getBottomCell(cell)];
    return neighbors.filter(cell => cell && !cell.getLetter());
  }

  getLeftCell(cell: Cell): Cell {
    if (cell.getColumn() > 0) {
      return this.matrix[cell.getRow()][cell.getColumn() - 1];
    }
    return null;
  }

  getRightCell(cell: Cell): Cell {
    if (cell.getColumn() < this.NB_CELLS - 1) {
      return this.matrix[cell.getRow()][cell.getColumn() + 1];
    }
    return null;
  }

  getTopCell(cell: Cell): Cell {
    if (cell.getRow() > 0) {
      return this.matrix[cell.getRow() - 1][cell.getColumn()];
    }
    return null;
  }

  getBottomCell(cell: Cell): Cell {
    if (cell.getRow() < this.NB_CELLS - 1) {
      return this.matrix[cell.getRow() + 1][cell.getColumn()];
    }
    return null;
  }

  getSimulatedHorizontalWord(anchor: Cell, simulatedCells: Cell[]): string {
    let row = anchor.getRow();
    let column = anchor.getColumn();
    let word = this.getLetterInSimulatedLetters(simulatedCells, row, column).getCharacter();
    while (column > 0) {
      --column;
      let letter = this.getLetterOnBoardOrInSimulatedLetters(simulatedCells, row, column);
      if (letter) {
        word = letter.getCharacter() + word;
      } else {
        break;
      }
    }
    column = anchor.getColumn();
    while (column < this.NB_CELLS - 1) {
      ++column;
      let letter = this.getLetterOnBoardOrInSimulatedLetters(simulatedCells, row, column);
      if (letter) {
        word += letter.getCharacter();
      } else {
        break;
      }
    }
    return word;
  }

  private getLetterOnBoardOrInSimulatedLetters(simulatedCells: Cell[], row: number, column: number): Letter {
    let letter = this.matrix[row][column].getLetter();
    if (letter) {
      return letter;
    }
    return this.getLetterInSimulatedLetters(simulatedCells, row, column);
  }

  private getLetterInSimulatedLetters(simulatedCells: Cell[], row: number, column: number): Letter {
    let simulatedCell = simulatedCells.find(cell => cell.getRow() === row && cell.getColumn() === column);
    return simulatedCell ? simulatedCell.getLetter() : null;
  }

  getNextFreeLeftCell(anchor: Cell, simulatedCells: Cell[]): Cell {
    let row = anchor.getRow();
    let column = anchor.getColumn();
    while (column > 0) {
      --column;
      let letter = this.getLetterOnBoardOrInSimulatedLetters(simulatedCells, row, column);
      if (!letter) {
        return this.matrix[row][column];
      }
    }
    return null;
  }

  getNextFreeRightCell(anchor: Cell, simulatedCells: Cell[]): Cell {
    let row = anchor.getRow();
    let column = anchor.getColumn();
    while (column < this.NB_CELLS - 1) {
      ++column;
      let letter = this.getLetterOnBoardOrInSimulatedLetters(simulatedCells, row, column);
      if (!letter) {
        return this.matrix[row][column];
      }
    }
    return null;
  }
}