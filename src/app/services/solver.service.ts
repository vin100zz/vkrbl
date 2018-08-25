import { Injectable } from '@angular/core';

import { Cell } from '../model/model'
import { Board } from '../model/model'
import { Letter } from '../model/model'

import { DictionaryService } from '../services/dictionary.service'


@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor(private dictionary: DictionaryService) { }

  computeAnchors(board: Board): Cell[] {
    let anchors: Set<Cell> = new Set<Cell>();
    board.getCells().forEach(cell => {
      if (cell && cell.getLetter()) {
        let freeNeighborCells = board.getFreeNeighborCells(cell);
        freeNeighborCells.forEach(cell => anchors.add(cell));
      }
    });
    return Array.from(anchors);
  }

  computeFeasibleWords(letters: Letter[], board: Board, anchor: Cell): string[] {
    let words: string[] = [];

    letters.forEach(letter => {
      let remainingLetters = letters.filter(l => l.getCharacter() !== letter.getCharacter());
      let simulatedCells = [new Cell(anchor.getRow(), anchor.getColumn(), letter)];

      let newHorizontalWord = board.getSimulatedHorizontalWord(anchor, simulatedCells);
      if (this.isWordValid(newHorizontalWord)) {
        words.push(newHorizontalWord);
      }

      this.computeFeasibleWordsByAddingLettersOnRightSide(remainingLetters, board, anchor, simulatedCells, words);
      this.computeFeasibleWordsByAddingLettersOnLeftSide(remainingLetters, board, anchor, simulatedCells, words);
    });
    console.log(words);
    return words;
  }

  private computeFeasibleWordsByAddingLettersOnLeftSide(letters: Letter[], board: Board, anchor: Cell, simulatedCells: Cell[], words: string[]): void {
    let getNextFreeLeftCell = board.getNextFreeLeftCell(anchor, simulatedCells);
    if (getNextFreeLeftCell) {
      letters.forEach(letter => {
        let remainingLetters = letters.filter(l => l.getCharacter() !== letter.getCharacter());
        let newSimulatedCells = simulatedCells.slice(0);
        newSimulatedCells.push(new Cell(getNextFreeLeftCell.getRow(), getNextFreeLeftCell.getColumn(), letter));

        let newHorizontalWord = board.getSimulatedHorizontalWord(anchor, newSimulatedCells);
        if (this.isWordValid(newHorizontalWord)) {
          words.push(newHorizontalWord);
        }
        this.computeFeasibleWordsByAddingLettersOnRightSide(remainingLetters, board, anchor, newSimulatedCells, words);
        this.computeFeasibleWordsByAddingLettersOnLeftSide(remainingLetters, board, anchor, newSimulatedCells, words);
      });
    }
  }

  private computeFeasibleWordsByAddingLettersOnRightSide(letters: Letter[], board: Board, anchor: Cell, simulatedCells: Cell[], words: string[]): void {
    let nextFreeRightCell = board.getNextFreeRightCell(anchor, simulatedCells);
    if (nextFreeRightCell) {
      letters.forEach(letter => {
        let remainingLetters = letters.filter(l => l.getCharacter() !== letter.getCharacter());
        let newSimulatedCells = simulatedCells.slice(0);
        newSimulatedCells.push(new Cell(nextFreeRightCell.getRow(), nextFreeRightCell.getColumn(), letter));

        let newHorizontalWord = board.getSimulatedHorizontalWord(anchor, newSimulatedCells);
        if (this.isWordValid(newHorizontalWord)) {
          words.push(newHorizontalWord);
        }

        this.computeFeasibleWordsByAddingLettersOnRightSide(remainingLetters, board, anchor, newSimulatedCells, words);
      });
    }
  }

  private isWordValid(word: string): boolean {
    return true;
  }

}
