import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [
    {text: 'Note one'},
    {text: 'Note two'}
  ];
  text: string;
  constructor() { }

  ngOnInit() {
  }

  add() {
    const note = {text: this.text};
    this.notes.push(note);
    this.text = '';
  }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}

interface Note {
  text: string;
}
