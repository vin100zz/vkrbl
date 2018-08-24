import { Injectable } from '@angular/core';

import { Cell } from '../model/model'
import { Board } from '../model/model'

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor() { }

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

  computeFeasibleWords(anchor: Cell): void {

  }

}
