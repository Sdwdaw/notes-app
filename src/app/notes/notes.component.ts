import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {
  private notesUrl = 'api/notes';  // URL to web api
  notes: Note[];
  @Input() section: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  text: string;
  constructor(
    private http: HttpClient
  ) { }

  ngOnChanges() {
    this.getNotesNotes();
  }

  getNotes(): Observable<Note[]> {
    if (!this.section == null) return of([] as Note[]);
    return this.http.get<Note[]>(this.notesUrl, {params: {section: this.section}});
  }

  getNotesNotes(): void {
    this.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  add(noteText: HTMLTextAreaElement) {
    const note = {
      text: noteText.value,
      section: this.section,
    };
    noteText.value = '';
    this.addNote(note);
  }

  addNote(note: Note): void {
    this.http.post<Note>(this.notesUrl, note, this.httpOptions)
      .subscribe((data) => this.getNotesNotes());
    }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}

interface Note {
  text: string;
}
