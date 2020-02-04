import { Injectable } from '@angular/core';
import {NotesEditorComponent} from "./notes-editor/notes-editor.component";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateNoteService {

  constructor() { }


  canDeactivate(
    notesEditorComponent: NotesEditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    const note = notesEditorComponent
      .notesComponent.noteText.nativeElement.value;
    if (note && note.length > 0) {
      return window.confirm(
        `You have entered the note.
      Do you really want to change section?`);
    } else {
      return true;
    }
  }
}
