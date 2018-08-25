import { Component, OnInit } from '@angular/core';

import { Letter } from '../../model/model'
import { Board } from '../../model/model'

import { DictionaryService } from '../../services/dictionary.service'
import { SolverService } from '../../services/solver.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  board: Board;
  letters: Letter[];

  constructor(private dictionary: DictionaryService, private solver: SolverService) { }

  ngOnInit() {
    this.letters = [new Letter('R'), new Letter('S'), new Letter('M'), new Letter('I'), new Letter('N'), new Letter('T'), new Letter('N')];

    // this.letters = [new Letter('A'), new Letter('B'), new Letter('C')];

    this.board = new Board();

    this.board.getMatrix()[7][7].setLetter(new Letter('O'));
    this.board.getMatrix()[7][8].setLetter(new Letter('U'));

    let anchors = this.solver.computeAnchors(this.board);
    console.log(anchors);

    this.dictionary.whenReady(() => {
      this.solver.computeFeasibleWords(this.letters, this.board, anchors[1]);
    });

  }

}
