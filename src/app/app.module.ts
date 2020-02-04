import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NotesComponent } from './notes/notes.component';
import { SectionsComponent } from './sections/sections.component';
import { SectionFilterPipe } from './section-filter.pipe';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from "@angular/router";
import { ViewSectionComponent } from './view-section/view-section.component';
import {CanDeactivateNoteService} from "./can-deactivate-note.service";
import { UserFormComponent } from './user-form/user-form.component';

const appRoutes: Routes = [

  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: 'register', component: UserFormComponent },
  { path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [

    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
