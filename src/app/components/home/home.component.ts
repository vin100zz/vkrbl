import { Component, OnInit } from '@angular/core';

import { Letter } from '../../model/model'
import { Board } from '../../model/model'

import { DictionaryService } from '../../services/dictionary.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  board: Board;
  letters: Letter[];

  constructor(private dictionary: DictionaryService) { }

  ngOnInit() {
    this.dictionary.buildTree();

    this.letters = [new Letter('A'), new Letter('S'), new Letter('H'), new Letter('B'), new Letter('U'), new Letter('T'), new Letter('O')];

    this.board = new Board();

    this.board.getMatrix()[7][6].setLetter(new Letter('C'));
    this.board.getMatrix()[7][7].setLetter(new Letter('A'));
    this.board.getMatrix()[7][8].setLetter(new Letter('R'));

  }

}
