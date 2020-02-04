import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Note} from "./notes/notes.component";
import {Section} from "./sections/sections.component";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesUrl = 'api/notes'; // URL to web api
  section: Section[];

  constructor(private http: HttpClient) { }

  getNotes(section: string): Observable<Note[]> {
    if (section == null) return of([] as Note[]);
    return this.http.get<Note[]>(this.notesUrl, {params: {section}});
  }
}
