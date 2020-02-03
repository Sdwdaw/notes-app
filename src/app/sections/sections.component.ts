import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  private sectionsUrl = 'api/sections';  // URL to web api
  sections: Section[];
  activeSection: string;
  sectionsReplaceUrl = '/sections/replace';
  filterValue = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.readSections();
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  readSections(): void {
    this.getSections()
      .subscribe(sections => {
        this.sections = sections;
        if (!this.activeSection && this.sections.length > 0) {
          this.showSection(this.sections[0]);
        }
      })
  }

  @Output() sectionChanged: EventEmitter<string> =
    new EventEmitter<string>();

  showSection(section: Section) {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value;
    if (!title) {return;}

    // check for duplicates
    if (this.sections.map(s => s.title)
      .find(t => t === title)) { return; }

    const section: Section = { title };
    this.sections.unshift(section);
    this.showSection(section);

    // write sections to server and clear add section input box
    this.writeSections().subscribe(res =>
      newSection.value = '');
  }

  writeSections() {
    return this.http.post(this.sectionsReplaceUrl, this.sections);
  }

}

export interface Section {
  _id?: string;
  title: string;
}
