import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Node {
  letter: string;
  isValidWord: boolean = false;
  children: Map<string, Node> = new Map<string, Node>();

  constructor(letter: string) {
    this.letter = letter;
  }

  setValidWord(): void {
    this.isValidWord = true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  words: string[] = [];

  tree: Map<string, Node> = new Map<string, Node>();

  readyCb: Function;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<string[]>('assets/dictionary.json').subscribe(data => {
      this.words = data;
      this.buildTree();
      this.readyCb();
    });
  }

  whenReady(readyCb: Function): void {
    this.readyCb = readyCb;
  }

  getWords(): string[] {
    return this.words;
  }

  getTree(): Map<string, Node> {
    return this.tree;
  }

  buildTree(): void {
    this.words.forEach(word => {
      var firstLetter = word.substr(0, 1);
      if (!this.tree[firstLetter]) {
        this.tree[firstLetter] = new Node(firstLetter);
      }
      var currentNode = this.tree[firstLetter];

      var letters = word.substr(1).split('');
      letters.forEach(letter => {
        if (!currentNode.children[letter]) {
          currentNode.children[letter] = new Node(letter);
        }
        currentNode = currentNode.children[letter];
      });

      currentNode.setValidWord();
    });
  }

  wordExists(word: string): boolean {
    return true; //this.words.includes(word);
  }


}
