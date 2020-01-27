import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  private notesUrl = 'api/notes';  // URL to web api
  notes: Note[];
  section: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  text: string;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getNotesNotes();
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNotesNotes(): void {
    this.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  add(text: string) {
    text = text.trim();
    if (!text) {return;}
    this.addNote( { text } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions);
    }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}

interface Note {
  text: string;
}
