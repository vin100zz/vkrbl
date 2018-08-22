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
  letter: Letter = null;

  constructor() {
  }

  getLetter(): Letter {
    return this.letter;
  }

  setLetter(letter: Letter): void {
    this.letter = letter;
  }
}


export class Board {
  matrix: Cell[][] = [];

  constructor() {
    const NB_CELLS = 15;
    this.matrix = [];
    for (let x = 0; x < NB_CELLS; ++x) {
      let row = [];
      for (let y = 0; y < NB_CELLS; ++y) {
        row.push(new Cell());
      }
      this.matrix.push(row);
    }
  }

  getMatrix(): Cell[][] {
    return this.matrix;
  }
}