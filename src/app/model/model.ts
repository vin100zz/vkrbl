export class Letter {
  character: string;

  constructor(character: string) {
    this.character = character;
  }

  getCharacter(): String {
    return this.character;
  }
}


export class Cell {
  row: number;
  column: number;
  letter: Letter = null;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
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
}