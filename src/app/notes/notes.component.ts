import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotesService} from "../notes.service";

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
  @ViewChild('noteText' , { static: false })
  noteText: ElementRef<HTMLTextAreaElement>;
  constructor(
    private http: HttpClient,
    private notesService: NotesService
  ) { }

  ngOnChanges() {
    this.readNotes();
  }

  readNotes(): void {
    this.notesService.getNotes(this.section)
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
      .subscribe((data) => this.readNotes());
    }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}

export interface Note {
  text: string;
}
